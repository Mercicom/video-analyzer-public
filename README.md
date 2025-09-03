# 🎬 Video Analyzer

**Analyze videos with AI to extract marketing insights**

Extract from any video:
- 🎯 **Visual Hook** - Most compelling visual element in first 3 seconds
- 📝 **Text Hook** - Attention-grabbing text/caption suggestions  
- 🗣️ **Voice Hook** - Engaging verbal hooks and taglines
- 📜 **Full Script** - Complete transcript with timestamps
- 😤 **Pain Point** - Problems addressed and solutions positioned

**Built for non-developers** - Just enter your API key and analyze videos instantly!

## 🚀 Quick Start (3 Minutes Setup)

### Step 1: Get Your Copy
1. **Fork this repository** - Click the "Fork" button at the top of this page
2. **Download to your computer**:
   - Click the green "Code" button on YOUR forked repository  
   - Click "Download ZIP" and extract it
   - OR if you have Git: `git clone https://github.com/YOUR-USERNAME/video-analyzer-public.git`

### Step 2: Install Node.js (One-time setup)
- Download and install from: https://nodejs.org 
- Choose the LTS version (18 or newer)
- This gives you `npm` which you'll need

### Step 3: Get Your API Key
- Go to: https://aistudio.google.com/app/apikey
- Click "Create API Key" 
- Copy the key (starts with `AIza...`)

### Step 4: Setup & Run
Open your terminal/command prompt in the project folder and run:

```bash
npm install        # Install dependencies (takes 1-2 minutes)
npm run setup      # Enter your API key when prompted  
npm run dev        # Start the server
```

### Step 5: Use It! 
- Open: http://localhost:3000/video-analyzer
- Upload video files (MP4, WebM, etc.)
- Click "Analyze" and wait for results
- Export as CSV or JSON

**That's it! 🎉 No coding required.**

## Environment Variables

Only one is required to run the Video Analyzer:
- `GOOGLE_API_KEY` – your Gemini API key

You can also set optional limits (defaults shown):
- `RATE_LIMIT_PER_MINUTE=10`
- `MAX_VIDEO_SIZE_MB=100`
- `MAX_VIDEOS_PER_BATCH=50`

See `.env.example` for a full list (other providers are optional and not needed for video analysis).

## 🔧 Troubleshooting

### Common Issues

**"API key not configured"**
- Run `npm run setup` again and enter your Gemini API key
- Make sure you copied the full key (starts with `AIza...`)

**"Rate limit exceeded"** 
- The tool automatically waits and retries (this is normal!)
- Reduce batch size if analyzing many videos
- Free Gemini API: 15 requests per minute

**"File too large"**
- Default limit: 100MB per video
- Try compressing your video or use smaller files
- To increase: edit `.env.local` and add `MAX_VIDEO_SIZE_MB=200`

**"npm command not found"**
- Install Node.js from https://nodejs.org first
- Restart your terminal after installation

**Videos not uploading**
- Supported formats: MP4, WebM, MOV, AVI
- Make sure file isn't corrupted
- Try a different video file

### Need Help?
- Check that Node.js is installed: `node --version` 
- Check that dependencies are installed: `ls node_modules` should show folders
- Still stuck? Create an issue on GitHub

## ✨ Features

### Core Video Analysis
- **Smart Hook Detection** - AI identifies the most engaging visual, text, and voice elements
- **Complete Transcription** - Full word-by-word transcript with precise timestamps  
- **Pain Point Analysis** - Understands what problems the video addresses
- **Batch Processing** - Analyze multiple videos at once
- **Export Results** - Download as CSV or JSON for further use

### Built for Non-Technical Users
- **Simple Setup** - Just run 3 commands and enter your API key
- **No Coding Required** - Clean web interface, no configuration files to edit
- **Automatic Rate Limiting** - Handles API limits automatically 
- **Progress Tracking** - See real-time analysis progress
- **Error Recovery** - Automatically retries failed analyses

### Optional Features (Additional API Keys Required)
If you add other API keys, you can also access:
- **AI Chat** - Talk to different AI models (OpenAI, Anthropic)
- **Voice Recording** - Record and transcribe voice notes (Deepgram)
- **Image Generation** - Create images from text (Replicate)
- **User Authentication** - Save your work (Firebase)

*But remember: Only Google Gemini API key is required for video analysis!*

## 📋 Requirements

- **Node.js 18+** (free from nodejs.org)
- **Google Gemini API Key** (free from Google AI Studio)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Video files** in common formats (MP4, WebM, MOV, etc.)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: TailwindCSS  
- **AI**: Google Gemini Vision API
- **Optional**: OpenAI, Anthropic, Deepgram, Replicate APIs
