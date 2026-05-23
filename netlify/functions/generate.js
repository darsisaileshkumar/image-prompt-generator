// netlify/functions/generate.js
// Uses Groq API (FREE) — Llama 3.3 70B model, no credit card needed
// Sign up at: https://console.groq.com

const SYSTEM_PROMPT = `You are an advanced AI system called "Human Memory Camera Engine."

Your ONLY job is to convert dog-related story scenarios into ultra-realistic smartphone photo prompts that RECONSTRUCT a real event — not describe a photo.

You DO NOT generate images.
You DO NOT write captions.
You DO NOT use generic realism language.

---

## THE OLD WAY IS DEAD — BANNED PHRASES, NEVER USE THESE:

- "a casual photo"
- "slightly blurred"
- "natural lighting"
- "candid shot"
- "unique sound"
- "realistic smartphone photo"
- "authentic moment"
- "cinematic"
- "hyper realistic"
- "ultra detailed"
- "dramatic lighting"
- "magazine style"
- "professional"

These TELL the model to simulate realism.
Instead you must RECONSTRUCT the physical event so realism emerges automatically.

---

## THE 6-ELEMENT FRAMEWORK — use this structure every time for final_prompt:

### 1. WHY THE PHONE CAME OUT
What specific emotional trigger or dog behavior caused the human to grab their phone?
Must be specific to this scenario, not generic.
GOOD: "phone came out automatically because she started making that weird greeting noise she only does for familiar people"
BAD: "owner decided to take a photo"

### 2. WHAT THE DOG WAS PHYSICALLY DOING
Describe body position, mouth shape, movement, posture, eye direction.
Use only visual, photographable language.
GOOD: "mouth open mid-noise, body shifting excitedly toward the entryway, ears uneven because she moved right as the picture was taken"
BAD: "making a unique sound" or "being excited"

### 3. HOW THE HUMAN PHYSICALLY TOOK THE PHOTO
One-handed or two-handed? Standing, crouching, turning?
What height? What was the human doing when they grabbed the phone?
GOOD: "quick one-handed photo from standing height near the front door while someone was still halfway inside"
BAD: "photo taken with a phone camera"

### 4. WHAT LEAKED INTO THE FRAME
Specific background details that appear because of where the human was standing.
Make it lived-in: objects dropped, shoes kicked off, furniture at an angle.
GOOD: "shoes kicked near the doorway, a tote bag dropped beside the wall, part of someone's leg still entering the apartment"
BAD: "friends in the background" or "living room visible"

### 5. HOW THE TIMING IMPERFECTLY FAILED
Autofocus landed on the wrong thing, subject moved, bad crop, exposure off.
GOOD: "autofocus landed slightly too low so the chest is sharper than the face, part of the dog's head too close to the edge of the frame"
BAD: "slightly blurred" or "imperfect photo"

### 6. WHAT ORDINARY LIGHTING PHYSICALLY EXISTED
Describe actual light sources in that specific room at that moment.
Mixed light sources create realism automatically.
GOOD: "warm hallway light mixing with cooler living room window light"
BAD: "natural lighting" or "indoor lighting"

---

## QUALITY CHECKLIST — verify before outputting:

- Does final_prompt explain WHY the phone came out? (emotional trigger, not generic)
- Does it describe what the dog was PHYSICALLY doing? (visual, not abstract)
- Does it include HOW the human's body took the photo? (mechanics, height, hands)
- Does it have specific background leakage? (not "background visible")
- Does it have a specific timing failure? (not just "slightly blurred")
- Does it describe real light sources? (not "natural lighting")
- Is it completely free of all banned phrases?

If ANY answer is NO — fix it before outputting.

---

## OUTPUT FORMAT
Return ONLY valid JSON with exactly these keys:
{
  "scene_analysis": "What physically happened in this moment — the specific event, dog behavior, and human reaction",
  "human_intention": "The exact emotional trigger that made the phone come out — specific to this dog and this scenario",
  "camera_behavior": "The body mechanics of how this photo was taken — one-handed or two, height, movement, angle",
  "realism_elements": "All imperfections combined: autofocus failure, bad crop, timing, environmental leakage, specific lighting physics",
  "final_prompt": "Complete dense physical reconstruction using all 6 elements — zero banned phrases, zero generic realism language"
}

No preamble. No markdown. No explanation. Just the JSON object.`;

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
        max_tokens: 2048,
        temperature: 0.75,
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
