/**
 * Generate voiceover audio using ElevenLabs API
 * Requires ELEVEN_API_KEY environment variable
 */

const fs = require("fs");
const path = require("path");

const ELEVEN_API_KEY = process.env.ELEVEN_API_KEY;

// Available voices - change VOICE_ID to try different narrators:
const VOICES = {
  adam: "pNInz6obpgDQGcFmaJgB", // Default - Deep, authoritative, professional (male)
  rachel: "EXAVITQu4vr4xnSDxMaL", // Calm, clear, professional (female)
  domi: "AZnzlk1XvdvUeBnXmlld", // Strong, confident, executive (female)
  bella: "EXAVITQu4vr4xnSDxMaL", // Soft, friendly, warm (female)
  antoni: "ErXwobaYiN019PkySvjV", // Well-rounded, pleasant (male)
  arnold: "VR6AewLTigWG4xSOukaG", // Crisp, clear, narrator style (male)
  josh: "TxGEqnHWrfWFTfGW9XjX", // Deep, resonant, gravitas (male)
  sam: "yoZ06aMxZJJ28mfd3POQ" // Young, energetic, upbeat (male)
};

// SELECT VOICE HERE:
const VOICE_ID = VOICES.josh; // Deep, resonant voice with gravitas

if (!ELEVEN_API_KEY) {
  console.error("Error: ELEVEN_API_KEY environment variable not set");
  process.exit(1);
}

const scenes = [
  {
    id: "scene1",
    text: "Dispatch is at a critical inflection point. With 25.7 million in annual recurring revenue, the question isn't whether to adopt AI—it's how aggressively to transform."
  },
  {
    id: "scene2",
    text: "Today, Dispatch operates with five core departments spending 19 million annually in operating expenses. When compared to industry benchmarks, several departments show opportunities for optimization—particularly in Customer Success, R&D, and G&A functions."
  },
  {
    id: "scene3",
    text: "We've modeled three AI transformation scenarios. Conservative: quick wins using existing vendor features, achievable in just zero to three months. Moderate: integrated workflows and cross-functional pilots, ready in six to nine months. And Aggressive: AI-native operations with autonomous agents, fully deployed in twelve to fifteen months."
  },
  {
    id: "scene4",
    text: "The Conservative path delivers 2.3 million in annual savings—a 12% cost reduction—with minimal risk. This requires just 380 thousand in investment, yielding a 6.2x return on investment with payback in two to three months."
  },
  {
    id: "scene5",
    text: "The Moderate scenario unlocks 6 million in savings—32% cost reduction—through integrated AI workflows. With 950 thousand in investment, this delivers impressive 6.3x returns while maintaining operational stability."
  },
  {
    id: "scene6",
    text: "The Aggressive transformation path achieves 10 million in annual savings—a remarkable 53% cost reduction. This requires 1.9 million in AI investment but delivers 6.5x returns. More importantly, it fundamentally repositions Dispatch for the AI-native future of work."
  },
  {
    id: "scene7",
    text: "Let's examine the department impact. Customer Success, currently spending 2.8 million with 19 full-time employees, can save up to 1.7 million through autonomous AI support handling 60% of tickets, predictive churn scoring, and voice AI for phone coverage."
  },
  {
    id: "scene8",
    text: "R&D shows the largest absolute opportunity: 3.5 million in savings from AI pair programming, automated testing, and DevOps agents—enabling 46% of code to be AI-generated while maintaining quality."
  },
  {
    id: "scene9",
    text: "The financial impact is transformative. The Aggressive scenario improves EBITDA from 4 million to 11.4 million—nearly tripling profitability. At a 10x EBITDA multiple, this creates 114 million in enterprise value, representing a 57 million gain from today's 57 million baseline valuation."
  },
  {
    id: "scene10",
    text: "Consider the leverage: every dollar invested in AI creates 30 dollars in enterprise value. This is a 30x return multiple—one of the highest-ROI investments available to the business."
  },
  {
    id: "scene11",
    text: "The implementation roadmap is clear. Start with low-risk vendor features in quarter one. Scale to integrated pilots in quarters two and three. Complete the transformation to AI-native operations within 15 months."
  },
  {
    id: "scene12",
    text: "The data is compelling. AI isn't a future consideration—it's an immediate operational imperative. The question is simple: which scenario will Dispatch choose? The window to lead in AI-native operations is closing. Let's discuss how to begin this transformation."
  }
];

async function generateVoiceover(scene) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVEN_API_KEY
      },
      body: JSON.stringify({
        text: scene.text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.statusText}`);
  }

  const audioBuffer = await response.arrayBuffer();
  const audioPath = path.join(__dirname, "audio", `${scene.id}.mp3`);

  fs.writeFileSync(audioPath, Buffer.from(audioBuffer));
  console.log(`✓ Generated ${scene.id}.mp3`);

  return audioPath;
}

async function main() {
  console.log("Generating voiceover for Dispatch AI ROI video...\n");

  // Ensure audio directory exists
  const audioDir = path.join(__dirname, "audio");
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  // Generate all voiceovers
  for (const scene of scenes) {
    await generateVoiceover(scene);
    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("\n✓ All voiceovers generated successfully!");
  console.log(`Audio files saved to: ${audioDir}`);
}

main().catch(console.error);
