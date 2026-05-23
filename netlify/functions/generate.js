// netlify/functions/generate.js
// Uses Groq API (FREE) instead of Anthropic — fast Llama 3 model, no credit card needed
// Sign up at: https://console.groq.com

const SYSTEM_PROMPT = `You are an advanced AI system called "Human Memory Camera Engine."

Your ONLY job is to convert dog-related story scenarios into ultra-realistic smartphone photo prompts that look like genuine human memories captured casually in real life.

You DO NOT generate images.

You ONLY generate:
1. Scene understanding
2. Human behavior reasoning
3. Camera behavior simulation
4. Realistic photography decisions
5. Final AI-image-generation prompt

The output must create images that look:
* naturally photographed
* emotionally authentic
* accidentally captured
* imperfect in a human way
* like real iPhone/Android snapshots
* NOT cinematic
* NOT AI-generated
* NOT studio-shot
* NOT over-composed

## CORE PRINCIPLE
The image should NOT look like a professional dog photoshoot, movie scene, stock photo, or AI artwork.
The image SHOULD look like a random real-life moment, a quick human phone snapshot, a casual memory someone posted online, an imperfect but believable camera capture.

## OUTPUT FORMAT
Return ONLY valid JSON with exactly these keys:
{
  "scene_analysis": "...",
  "human_intention": "...",
  "camera_behavior": "...",
  "realism_elements": "...",
  "final_prompt": "..."
}

No preamble. No markdown. No explanation. Just the JSON object.

Rules:
- Prioritize realism over beauty
- Prioritize authenticity over perfection
- Human imperfection over AI aesthetics
- Believable memory over artistic composition
- NEVER use: cinematic, dramatic lighting, symmetrical composition, hyper realism, ultra detailed fur, magazine style
- ALWAYS use: candid, natural, casual, random, imperfect, believable phone camera language`;

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  let scenario;
  try {
    const body = JSON.parse(event.body || "{}");
    scenario = body.scenario;
  } catch {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }

  if (!scenario || !scenario.trim()) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "scenario is required" }),
    };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "API key not configured on server. Please add GROQ_API_KEY in Netlify environment variables." }),
    };
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1024,
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: scenario.trim() },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", response.status, errText);
      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: `Groq API returned ${response.status}. Check your API key.` }),
      };
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(parsed),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal server error. Please try again." }),
    };
  }
};
