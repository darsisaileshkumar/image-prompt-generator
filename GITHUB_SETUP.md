# How to Push the Human Memory Camera Engine to GitHub

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in (or sign up if you don't have an account)
2. Click the **+** icon in the top-right → **New repository**
3. Fill in:
   - **Repository name**: `human-memory-camera-engine` (or your preferred name)
   - **Description**: "Convert dog stories into realistic smartphone photo prompts using AI"
   - **Public** or **Private** (your choice)
   - **Add a README file**: Check this box
   - **Add .gitignore**: Select "Node" from the dropdown
4. Click **Create repository**

---

## Step 2: Set Up Git Locally

### If you don't have Git installed:
- **macOS**: `brew install git`
- **Windows**: Download from [git-scm.com](https://git-scm.com)
- **Linux**: `sudo apt-get install git`

### Configure Git (one-time setup):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## Step 3: Clone the Repository

On your computer, open a terminal/command prompt and run:

```bash
git clone https://github.com/YOUR_USERNAME/human-memory-camera-engine.git
cd human-memory-camera-engine
```

(Replace `YOUR_USERNAME` with your GitHub username)

---

## Step 4: Add Your Code Files

Copy these files into the project folder:

```bash
# From the root of your cloned repo:
cp /mnt/user-data/outputs/human_memory_camera_engine.jsx .
cp /mnt/user-data/outputs/GITHUB_SETUP.md .
```

Or manually copy `human_memory_camera_engine.jsx` into the folder.

---

## Step 5: Create a Complete Project Structure

Your folder should look like this:

```
human-memory-camera-engine/
├── human_memory_camera_engine.jsx    # Your React component
├── package.json                      # Project metadata
├── README.md                         # Documentation
├── .gitignore                        # (auto-created)
└── .env.example                      # (optional, for API keys)
```

### Create `package.json`:

```bash
npm init -y
```

Then edit it to look like this:

```json
{
  "name": "human-memory-camera-engine",
  "version": "1.0.0",
  "description": "Convert dog stories into realistic smartphone photo prompts using Claude AI",
  "type": "module",
  "keywords": ["ai", "dog", "photography", "claude", "prompt-generation"],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### Create/Update `README.md`:

```markdown
# Human Memory Camera Engine

Convert dog-related story scenarios into ultra-realistic smartphone photo prompts that look like genuine human memories captured casually in real life.

## Features

- **Scene Analysis**: Understands the dog, behavior, environment, and emotional tone
- **Human Intention Detection**: Infers why the moment was worth capturing
- **Camera Behavior Simulation**: Mimics realistic phone photography angles and imperfections
- **Realism Elements**: Adds authentic environmental and lighting details
- **Final Image Prompt**: Generates a detailed, realistic photography prompt

## Tech Stack

- **React** - Frontend UI
- **Claude Sonnet 4** - AI model for prompt generation
- **Anthropic API** - Backend

## Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/human-memory-camera-engine.git
cd human-memory-camera-engine
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Add your Anthropic API key to .env
```

## Usage

The React component works in any Claude AI artifact or React environment. Just paste `human_memory_camera_engine.jsx` into your project.

### Quick Start in Claude.ai

1. Create a new artifact
2. Paste the entire code from `human_memory_camera_engine.jsx`
3. Set the language to "React"
4. Start generating prompts!

### API Setup

The component uses the Anthropic API. Make sure you have:
- An Anthropic API key
- Network access enabled in your environment

## Example Input

```
"Bella sat quietly under the dinner table during a friend's dinner party"
```

## Example Output

The app generates:
- Scene Analysis
- Human Intention
- Camera Behavior
- Realism Elements
- **Final Image Prompt** (ready for Midjourney, DALL-E, or Stable Diffusion)

## License

MIT - Feel free to use this in your projects!

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## Author

Created with ❤️ for dog lovers and AI enthusiasts
```

---

## Step 6: Create `.env.example`

```bash
cat > .env.example << 'EOF'
# Anthropic API Configuration
VITE_ANTHROPIC_API_KEY=your_api_key_here

# Note: Never commit your actual API key to GitHub
# Create a .env file locally with your real key
# .env is listed in .gitignore and won't be pushed
EOF
```

---

## Step 7: Check What's Ready to Push

```bash
git status
```

You should see all your new files listed (in red = not yet staged).

---

## Step 8: Stage Your Files

```bash
# Stage all files
git add .

# Or stage specific files
git add human_memory_camera_engine.jsx
git add package.json
git add README.md
```

---

## Step 9: Create Your First Commit

```bash
git commit -m "Initial commit: Add Human Memory Camera Engine React component"
```

Good commit message examples:
- `"Add React component for photo prompt generation"`
- `"Initial project setup with API integration"`
- `"Add documentation and examples"`

---

## Step 10: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

If you already have a `main` branch:
```bash
git push origin main
```

---

## Verify Success

Go to `github.com/YOUR_USERNAME/human-memory-camera-engine` in your browser. You should see:
- ✅ All your files listed
- ✅ Your README displayed
- ✅ Commit history visible

---

## Future Commits (After Initial Push)

Every time you make changes:

```bash
# See what changed
git status

# Stage changes
git add .

# Commit with a message
git commit -m "Fix bug in camera behavior analysis"

# Push to GitHub
git push origin main
```

---

## Common Commands Reference

```bash
# Check status
git status

# See commit history
git log --oneline

# Add files
git add .                    # All files
git add filename.js          # Single file

# Commit
git commit -m "Your message"

# Push
git push origin main

# Pull latest changes
git pull origin main

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Delete a branch
git branch -d feature-name
```

---

## Troubleshooting

### "Authentication failed"
If you get an auth error, use GitHub Personal Access Token:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `repo` scope
3. Use the token as your password when prompted

Or set up SSH keys for passwordless pushing.

### ".gitignore not working"
If `node_modules` is already tracked:
```bash
git rm -r --cached node_modules/
git commit -m "Remove node_modules from tracking"
git push
```

### "Need to update README after pushing"
```bash
# Edit README.md locally
git add README.md
git commit -m "Update documentation"
git push origin main
```

---

## Next Steps

Once your code is on GitHub:

1. **Add a License**: Go to your repo settings → License template → Choose "MIT"
2. **Enable GitHub Pages**: Settings → Pages → Deploy from main branch
3. **Add GitHub Actions**: CI/CD workflows for automated testing
4. **Collaborate**: Invite others to contribute

---

**You're all set! 🚀 Your code is now on GitHub!**
