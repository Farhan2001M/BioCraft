"use server"

import { createGroq } from '@ai-sdk/groq';
import { z } from 'zod';
import { generateObject } from 'ai';
import endent from "endent";

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.Groq_API_KEY
});

// Map of platform-specific instructions
const platformInstructions: Record<string, string> = {
  "LinkedIn": "If the tone is professional, emphasize work experience, skills, and achievements. If the tone is funny or sarcastic, blend subtle humor with professional language.",
  "Facebook": "Generate a friendly and personable bio that highlights interests, hobbies, and a warm tone.",
  "Twitter": "Craft a witty, concise, and direct bio with clever wordplay, while ensuring clarity even if a humorous tone is requested.",
  "Instagram": "Create a creative, visually engaging bio with lifestyle hints and natural integration of emojis if requested.",
  "WhatsApp": "Produce a short, catchy, and fun bio that feels like a messaging status.",
  "Reddit": "Develop an authentic, quirky bio with a conversational, sometimes self-deprecating style.",
  "Snapchat": "Generate a playful and ephemeral bio with an informal, fun vibe.",
  "TikTok": "Develop an energetic and trendy bio that reflects creativity and dynamic personality.",
};

export async function generateBio(
  input: string, 
  temperature: number, 
  model: string,
  platform: string
) {
  // Build a dynamic system prompt based on the selected platform.
  const dynamicSystemPrompt = endent`
    You are an AI assistant specialized in generating authentic social media bios. Your task is to create exactly 4 unique bios based on the following user inputs and requirements. The final output must be in strict JSON format, with a key "data" mapping to an array of 4 objects. Each object must contain a single key "bio" with a string value.

    **Overall Bio Constraints:**
    - Each bio must be between 120 and 140 characters.
    - Each bio must answer:
        - Who is the user?
        - What do they do?
        - What can others expect from them?
    - Integrate the user's descriptive input seamlessly.
    - Reflect the selected bio type ("personal" or "brand") in the content.
    - Ensure the language is clear, authentic, and applicable in the real world.

    **Platform-Specific Instructions:**
    - Platform: ${platform}
    - Instructions: ${platformInstructions[platform]}
      - For example, on LinkedIn, the bio should be succinct and professional. If the user selects a funny tone, blend subtle humor with professionalism.
      - On Facebook, the tone should be warm and personable.
      - On Twitter, the bio should be witty and concise.
      - On Instagram, the bio should be creative with lifestyle hints.
      - On WhatsApp, it should be short and catchy.
      - On Reddit, the bio should be quirky and conversational.
      - On Snapchat, the bio should be playful and informal.
      - On TikTok, the bio should be energetic and trendy.

    **Tone & Style Adjustments:**
    - Use the selected tone (professional, casual, sarcastic, funny, passionate, or thoughtful) to guide word choice and mood.
    - If the tone and platform guidelines seem to conflict (for example, a funny tone on LinkedIn), blend the tone so that humor is subtle and appropriate.
    - Do not explicitly mention the tone, platform, or bio type in the final bio.

    **Emojis & Hashtags:**
    - If the 'EmojisAndHashtags' option is true:
        - Integrate 4 to 5 relevant emojis naturally within the text.
        - Append 2 to 3 relevant hashtags at the end of the bio.
    - If false, do not include any emojis or hashtags.

    **Formatting:**
    - Your response must be valid JSON with exactly 4 bios. For example:
      {
        "data": [
          {"bio": "First generated bio text here..."},
          {"bio": "Second generated bio text here..."},
          {"bio": "Third generated bio text here..."},
          {"bio": "Fourth generated bio text here..."}
        ]
      }
    - Do not include any additional text or explanation.

    **Summary:**
    1. Identify the selected platform and apply its specific style guidelines.
    2. Incorporate the selected tone and adjust the language accordingly.
    3. Reflect the chosen bio type (personal vs brand) in the content.
    4. Seamlessly integrate the user-provided input.
    5. Respect all constraints regarding length, formatting, and emoji/hashtag usage.
    6. Output exactly 4 bios in the required JSON format.
  `;

  const { object: data } = await generateObject({
    model: groq(model),
    system: dynamicSystemPrompt,
    prompt: input,
    maxTokens: 1024,
    temperature: temperature,
    schema: z.object({
      data: z.array(
        z.object({
          bio: z.string().describe("Generated bios with optional emojis and hashtags."),
        })
      ),
    }),
  });
  return { data };
}


// const systemPrompt = endent`
// You are an AI assistant tasked with generating bios based on user input.

// Instructions:

// Analyze the User's Input:
//   - Carefully review the provided tone and bio type.
//   - Understand the user's core focus and primary activities.

// Generate the Bio:

//   - Create a bio that succinctly answers:
//     - Who is the user?
//     - What does the user do?
//     - What can others expect from the user?
//     - Reflect the given 'Bio Tone' and 'Bio Type' in the style and language of the bio. Do not explicitly mention the tone or type.

// Bio Requirements:

//   - Use an informal and approachable tone.
//   - Highlight the most important information about the user.
//   - Avoid using too many buzzwords or overdoing humor.
//   - Never use the user's name in the bio.
//   - Ensure that each bio length is between 120 and 140 characters.
//   - Provide exactly 4 bios, no more or less.
//   - If 'EmojisAndHashtags' is true, include relevant emojis (4 to 5) in between bio and 2 or 3 hashtags at the end; 
//   - if 'EmojisAndHashtags' is false, do not include emojis or hashtags .
//   - The response must be in JSON format.
//   - Also Double check that if Emojis And Hashtags are only present in the bio's if the user has asked for it.. otherwise not..
//   - Also remember that unlike hashtags which should be at the end , my emojis should be in in between the bio text where they need to aside their respective text etc...

// Additional Guidelines:
//   - Maintain clarity and coherence in each bio.
//   - Provide response in JSON format only.
// `;


// export async function generateBio(input: string, temperature: number, model: string) {
//   const { object: data } = await generateObject({
//     model: groq(model),
//     system: systemPrompt,
//     prompt: input,
//     maxTokens: 1024,
//     temperature: temperature,
//     schema: z.object({
//       data: z.array(
//         z.object({
//           bio: z.string().describe("Generated bios with optional emojis and hashtags."),
//         })
//       ),
//     }),
//   });
//   return { data };
// }
