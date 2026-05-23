# 🚀 Quick GitHub Push Guide (TL;DR)

## One-Time Setup

```bash
# 1. Create a repo on GitHub.com (no need to initialize)

# 2. Clone it locally
git clone https://github.com/YOUR_USERNAME/your-repo.git
cd your-repo

# 3. Copy your code files into this folder
cp human_memory_camera_engine.jsx .
cp package.json .
cp README.md .
cp .gitignore .
cp .env.example .

# 4. Configure git (one time only)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

## Push Your Code (3 Steps)

```bash
# Step 1: Stage all changes
git add .

# Step 2: Create a commit
git commit -m "Initial commit: Add Human Memory Camera Engine"

# Step 3: Push to GitHub
git push -u origin main
```

That's it! ✨

---

## Every Time You Make Changes

```bash
git add .
git commit -m "Your change description"
git push origin main
```

---

## Useful Git Commands

```bash
# Check what changed
git status

# See your commits
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# View a specific file's history
git log -p filename.js

# Download latest changes from GitHub
git pull origin main

# Create a new branch
git checkout -b feature-name

# Switch back to main
git checkout main

# Delete a branch
git branch -d feature-name
```

---

## Common Mistakes & Fixes

**"fatal: not a git repository"**
```bash
# You're in the wrong folder. Navigate to your repo:
cd /path/to/human-memory-camera-engine
```

**"nothing to commit"**
```bash
# You haven't made changes, or haven't staged them:
git add .
git commit -m "Your message"
```

**"rejected... fetch first"**
```bash
# Someone pushed changes. Update your local copy:
git pull origin main
git push origin main
```

**"authentication failed"**
```bash
# Use a GitHub Personal Access Token instead of password
# Generate at: github.com/settings/tokens
# Copy and paste token when prompted for password
```

---

## File Checklist Before Pushing

Make sure you have:
- ✅ `human_memory_camera_engine.jsx` (main code)
- ✅ `package.json` (dependencies)
- ✅ `README.md` (documentation)
- ✅ `.gitignore` (ignore node_modules & .env)
- ✅ `.env.example` (template for API key)
- ✅ `GITHUB_SETUP.md` (setup instructions)

---

## After First Push

Your repo is now public! To share:

```
https://github.com/YOUR_USERNAME/your-repo
```

Share this link with anyone who wants to see your code.

---

**That's all you need to know!** 🎉
