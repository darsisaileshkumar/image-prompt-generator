# 🐾 Human Memory Camera Engine

Convert dog-related story scenarios into ultra-realistic smartphone photo prompts that look like genuine human memories captured casually in real life.

## ✨ Features

- **Scene Analysis** — Understands the dog, behavior, environment, and emotional tone
- **Human Intention Detection** — Infers why the moment was worth capturing
- **Camera Behavior Simulation** — Mimics realistic phone photography angles and imperfections
- **Realism Elements** — Adds authentic environmental and lighting details
- **Final Image Prompt** — Generates a detailed, realistic photography prompt ready for AI image generators

## 🛠 Tech Stack

- **React 18** — Interactive UI component
- **Claude Sonnet 4** — Advanced AI model for understanding and prompt generation
- **Anthropic API** — Backend AI service
- **TypeScript/JSX** — Modern React syntax

## 📦 Installation & Setup

### Option 1: Use in Claude.ai (Easiest)

1. Go to [claude.ai](https://claude.ai)
2. Start a new conversation
3. Create a new artifact (or paste into an existing one)
4. Copy the entire content of `human_memory_camera_engine.jsx`
5. Set artifact language to **React**
6. Start generating prompts!

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/human-memory-camera-engine.git
cd human-memory-camera-engine

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your Anthropic API key to .env
# VITE_ANTHROPIC_API_KEY=sk-ant-...

# Start development server
npm run dev
```

### Option 3: Use with Vite

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
# Copy human_memory_camera_engine.jsx into src/
npm run dev
```

## 🚀 Usage

### Basic Workflow

1. **Describe your dog moment** — Write a short scenario or story about your dog
   - "Bella sat quietly under the dinner table during a friend's dinner"
   - "Max jumped into the laundry basket and fell asleep"
   - "Luna stole a sock and hid it under the couch"

2. **Generate analysis** — Click "Generate Prompt" or press ⌘↵

3. **Review the analysis** — Explore:
   - Scene Analysis
   - Human Intention
   - Camera Behavior
   - Realism Elements

4. **Copy the final prompt** — Click "Copy prompt" on the image prompt

5. **Use in AI image generator**:
   - Midjourney: Paste in Discord
   - DALL-E 3: Paste in ChatGPT
   - Stable Diffusion: Paste in ComfyUI or WebUI

### Example Input & Output

**Input:**
```
Bella sat quietly under the dinner table through the entire dinner party, 
behaving like a perfect guest while everyone ate.
```

**Output (Final Prompt):**
```
Casual iPhone photo taken during dinner at a friend's house, captured from a 
seated person's perspective looking downward under a wooden dining table. 
A calm golden retriever quietly lying beneath the table near a couple small 
crumbs on the floor, warm indoor evening lighting, partial chair legs and 
table edge visible, imperfect composition, slight motion softness, realistic 
home environment, candid unposed moment, natural phone camera grain, 
authentic snapshot aesthetic, looks like a real memory quickly captured by 
a guest, not cinematic, not studio photography, not professionally composed.
```

## 🧠 How It Works

The system uses Claude Sonnet 4 to process dog stories through a 7-step workflow:

1. **Scene Understanding** — Detects dog breed, behavior, environment, time of day
2. **Human Intention Analysis** — Infers why the moment matters (cute, funny, surprising)
3. **Camera Behavior Simulation** — Determines realistic phone angles and perspectives
4. **Environment Realism** — Adds authentic lighting, clutter, and imperfections
5. **Smartphone Camera Realism** — Incorporates grain, blur, focus inconsistencies
6. **Anti-AI Protection Rules** — Ensures the prompt avoids cinematic/AI-generated aesthetics
7. **Final Prompt Construction** — Combines all elements into a cohesive image prompt

### Core Principle

> The image should look like a random real-life moment captured on a phone, not a professional photoshoot or AI artwork.

## 🔑 API Keys

You'll need an **Anthropic API key** to use this project:

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account or log in
3. Generate an API key
4. Add it to your `.env` file: `VITE_ANTHROPIC_API_KEY=sk-ant-...`

**Never commit your API key to GitHub!** It's in `.gitignore` for security.

## 📁 Project Structure

```
human-memory-camera-engine/
├── human_memory_camera_engine.jsx    # Main React component
├── package.json                      # Project dependencies
├── .env.example                      # API key template
├── .gitignore                        # Git ignore rules
├── README.md                         # This file
└── GITHUB_SETUP.md                  # GitHub push instructions
```

## 🎨 Component Features

- **Beautiful serif typography** — Playfair Display + Source Serif 4
- **Responsive design** — Works on desktop and mobile
- **Keyboard shortcuts** — ⌘↵ to generate
- **Color-coded sections** — Visual hierarchy for easy scanning
- **Copy buttons** — One-click copying for each section
- **Example scenarios** — Pre-loaded dog stories to try
- **Loading states** — Visual feedback while processing
- **Error handling** — Clear messages if something goes wrong

## 🔧 Customization

### Change the System Prompt

Edit the `SYSTEM_PROMPT` constant in the component to adjust how Claude analyzes stories:

```javascript
const SYSTEM_PROMPT = `Your custom instructions here...`
```

### Add More Example Scenarios

Modify the `EXAMPLE_SCENARIOS` array:

```javascript
const EXAMPLE_SCENARIOS = [
  "Your story here",
  "Another story",
  // ...
]
```

### Modify Colors

Each section has a unique color. Change the `sectionMeta` array to customize:

```javascript
const sectionMeta = [
  { key: "scene_analysis", icon: "ti-eye", label: "Scene Analysis", color: "#185FA5", bg: "#E6F1FB" },
  // ...
]
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag & drop the dist/ folder to Netlify
```

### Deploy to GitHub Pages

```bash
npm run build
git add dist/
git commit -m "Build for GitHub Pages"
git push origin main
```

Then enable GitHub Pages in Settings → Pages → Deploy from main branch.

## 📝 Example Scenarios to Try

```
"Charlie refused to leave the car after a vet visit"
"Max found a muddy puddle and dove in headfirst"
"Bella kept stealing socks from the laundry basket"
"Luna sat on the lap of every guest at the party"
"Oscar fell asleep mid-walk and had to be carried home"
"Daisy barked at her own reflection in the mirror"
"Bruno tried to fit his entire head in a small toy box"
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/your-feature`
3. **Make changes** and test thoroughly
4. **Commit**: `git commit -m "Add your feature"`
5. **Push**: `git push origin feature/your-feature`
6. **Open a Pull Request**

### Ideas for Contributions

- Add more example dog scenarios
- Improve the system prompt
- Add different UI themes
- Create a CLI version
- Add multi-language support
- Integrate with other AI models (OpenAI, Anthropic)
- Build an API wrapper

## 📄 License

This project is licensed under the **MIT License** — you're free to use it for personal or commercial projects. See [LICENSE](LICENSE) for details.

## ❓ FAQ

**Q: Can I use this with other AI image generators?**
A: Yes! The final prompt works with Midjourney, DALL-E, Stable Diffusion, and others.

**Q: Do I need an Anthropic API key?**
A: Only if running locally. Claude.ai artifacts work without keys.

**Q: Can I modify the prompt output?**
A: Absolutely! The final prompt is just text — edit it however you like.

**Q: Is my API key safe?**
A: Yes, it's in `.gitignore` and won't be uploaded to GitHub.

**Q: Can I use this commercially?**
A: Yes, under the MIT license. Respect OpenAI/Anthropic's terms for image generators.

**Q: How accurate are the prompts?**
A: They're designed to mimic real casual phone photography. Results vary with the image generator.

## 🐛 Troubleshooting

### "API Error" message
- Check your API key is valid
- Ensure it's in the `.env` file
- Verify you have API credits remaining

### Component doesn't load
- Clear browser cache
- Try a different browser
- Check browser console for errors (F12)

### Slow generation
- The first request may take 3-5 seconds
- Check your internet connection
- Anthropic API might be under load

## 📧 Support

- **Issues**: Create an issue on [GitHub Issues](https://github.com/YOUR_USERNAME/human-memory-camera-engine/issues)
- **Discussions**: Start a discussion in [GitHub Discussions](https://github.com/YOUR_USERNAME/human-memory-camera-engine/discussions)
- **Email**: Contact me at your.email@example.com

## 🙏 Acknowledgments

- Built with [Claude Sonnet 4](https://www.anthropic.com/claude) by Anthropic
- UI inspired by editorial design and dog photography communities
- Thanks to all the dog lovers testing this project!

---

**Made with ❤️ for dog lovers and AI enthusiasts** 🐾

[Star us on GitHub](https://github.com/YOUR_USERNAME/human-memory-camera-engine) if you found this useful!
