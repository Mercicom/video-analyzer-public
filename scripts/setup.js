#!/usr/bin/env node
// Simple cross-platform setup script to create .env.local
// for non-developers: asks for your Gemini API key and writes the file.

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const projectRoot = path.resolve(__dirname, '..');
const envLocalPath = path.join(projectRoot, '.env.local');
const envExamplePath = path.join(projectRoot, '.env.example');

async function prompt(query) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(query, (ans) => { rl.close(); resolve(ans); }));
}

function ensureFromExample() {
  // Create a comprehensive template if .env.example doesn't exist
  if (!fs.existsSync(envExamplePath)) {
    const template = `# =====================================================
# VIDEO ANALYZER - ENVIRONMENT VARIABLES
# =====================================================

# =====================================================
# REQUIRED - For Video Analysis
# =====================================================

# Google Gemini API key (REQUIRED)
# Get your free API key: https://aistudio.google.com/app/apikey
GOOGLE_API_KEY=your_gemini_api_key_here

# =====================================================
# OPTIONAL - Application Limits
# =====================================================

# Rate limiting (requests per minute)
RATE_LIMIT_PER_MINUTE=10

# Video upload limits
MAX_VIDEO_SIZE_MB=100
MAX_VIDEOS_PER_BATCH=50

# =====================================================
# OPTIONAL - Additional AI Services
# =====================================================
# These are for additional features (chat, transcription, etc.)
# Not required for basic video analysis

# OpenAI API (for chat/transcription features)
# OPENAI_API_KEY=your_openai_api_key_here

# Anthropic API (for chat features)  
# ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Deepgram API (for voice transcription)
# DEEPGRAM_API_KEY=your_deepgram_api_key_here

# Replicate API (for image generation)
# REPLICATE_API_TOKEN=your_replicate_api_key_here

# =====================================================
# OPTIONAL - Firebase (for user authentication)
# =====================================================
# NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
# NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
# NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
# NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
`;
    return template;
  }
  
  try {
    return fs.readFileSync(envExamplePath, 'utf8');
  } catch (e) {
    return '';
  }
}

(async () => {
  console.log('\nVideo Analyzer – setup');
  console.log('This will create a .env.local file with your API key.');

  if (fs.existsSync(envLocalPath)) {
    console.log('\nA .env.local already exists.');
    const overwrite = (await prompt('Overwrite it? (y/N): ')).trim().toLowerCase();
    if (overwrite !== 'y') {
      console.log('Keeping existing .env.local.');
      process.exit(0);
    }
  }

  const apiKey = (await prompt('\nEnter your Google Gemini API key: ')).trim();
  if (!apiKey) {
    console.error('No API key provided. You can rerun `npm run setup` later.');
    process.exit(1);
  }

  const template = ensureFromExample();
  let output = template || '';

  // If we have an example, replace placeholder. Otherwise, build minimal file.
  if (output.includes('GOOGLE_API_KEY=')) {
    output = output.replace(/GOOGLE_API_KEY=.*\n?/, `GOOGLE_API_KEY=${apiKey}\n`);
  } else {
    output = `GOOGLE_API_KEY=${apiKey}\nRATE_LIMIT_PER_MINUTE=10\nMAX_VIDEO_SIZE_MB=100\n`;
  }

  try {
    fs.writeFileSync(envLocalPath, output, { encoding: 'utf8' });
    console.log(`\nCreated ${envLocalPath}`);
  } catch (e) {
    console.error('Failed to write .env.local:', e.message);
    process.exit(1);
  }

  console.log('\n✅ Setup complete! Next steps:');
  console.log('  1) npm install      (install dependencies)');
  console.log('  2) npm run dev       (start the server)');
  console.log('  3) Open http://localhost:3000/video-analyzer');
  console.log('\n💡 Tip: Only the Gemini API key is required. Other services are optional.');
  console.log('📖 See README.md for troubleshooting and additional features.');
})();

