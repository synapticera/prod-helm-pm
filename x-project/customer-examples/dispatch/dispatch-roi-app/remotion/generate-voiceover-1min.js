/**
 * Generate 1-minute fast version voiceover using ElevenLabs API
 */

const fs = require('fs');
const path = require('path');

const ELEVEN_API_KEY = process.env.ELEVEN_API_KEY;
const VOICE_ID = 'TxGEqnHWrfWFTfGW9XjX'; // Josh - Deep, resonant, gravitas

if (!ELEVEN_API_KEY) {
  console.error('Error: ELEVEN_API_KEY environment variable not set');
  process.exit(1);
}

const scenes = [
  {
    id: 'scene1-fast',
    text: "Dispatch faces a choice: adopt AI conservatively, or transform aggressively. Here's what each path delivers."
  },
  {
    id: 'scene2-fast',
    text: "Conservative: 2.3 million in savings, zero to three months. Moderate: 6 million saved in six to nine months. Aggressive: 10 million annually, twelve to fifteen months."
  },
  {
    id: 'scene3-fast',
    text: "Customer Success saves 1.7 million through AI support. R&D saves 3.5 million with AI-generated code. Sales and Marketing add another 3 million in efficiencies."
  },
  {
    id: 'scene4-fast',
    text: "The aggressive path triples EBITDA from 4 million to 11.4 million. At a 10x multiple, that's 57 million in enterprise value creation—a 30x return on AI investment."
  },
  {
    id: 'scene5-fast',
    text: "Every scenario delivers 6x ROI or better. The question isn't whether to adopt AI—it's how fast to move. The window to lead is now."
  }
];

async function generateVoiceover(scene) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVEN_API_KEY
      },
      body: JSON.stringify({
        text: scene.text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.8,
          style: 0.2,
          use_speaker_boost: true
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.statusText}`);
  }

  const audioBuffer = await response.arrayBuffer();
  const audioPath = path.join(__dirname, '../public/audio', `${scene.id}.mp3`);

  fs.writeFileSync(audioPath, Buffer.from(audioBuffer));
  console.log(`✓ Generated ${scene.id}.mp3`);

  return audioPath;
}

async function main() {
  console.log('Generating 1-minute fast version voiceover (Josh voice)...\n');

  // Ensure audio directory exists
  const audioDir = path.join(__dirname, '../public/audio');
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  // Generate all voiceovers
  for (const scene of scenes) {
    await generateVoiceover(scene);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n✓ All 1-minute voiceovers generated successfully!');
  console.log(`Audio files saved to: ${audioDir}`);
}

main().catch(console.error);
