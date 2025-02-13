"use server"

import { createGroq } from '@ai-sdk/groq';
import { z } from 'zod';
import { generateObject } from 'ai';
import endent from "endent";

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.Groq_API_KEY
});

const systemPrompt = endent`
You are an AI assistant tasked with generating Twitter bios based on user input.

Instructions:

Analyze the User's Inputs:
  - Carefully review the provided tone and bio type.
  - Understand the user's core focus and primary activities.

Generate the Bio:

  - Create a bio that succinctly answers:
    - Who is the user?
    - What does the user do?
    - What can others expect from the user?
  - Reflect the given 'Bio Tone' and 'Bio Type' in the style and language of the bio. Do not explicitly mention the tone or type.

Bio Requirements:

  - Use an informal and approachable tone.
  - Do not include hashtags or any words start with #.
  - Highlight the most important information about the user.
  - Avoid using too many buzzwords or overdoing humor.
  - Ensure that each bio length is between 120 and 140 characters.
  - Provide me with eaxactly 4 bio's not more or less.
  - If 'Add Emojis' is true, include relevant emojis maybe 2 or 3 atleast and 7-8 max but not more than that; if 'Add Emojis' is false, dont include any emojis .
  - The response must be in JSON format
  - 📈💻 📊 💡

Additional Guidelines:
  - Maintain clarity and coherence in each bio.
  - Provide response in JSON format only

Do not include any description, do not include the \`\`\`.
  Code (no \`\`\`):
  `;

export async function generateBio(input : string , temperature : number , model : string) {
  const { object : data } = await generateObject({
    model: groq(model),
    system: systemPrompt,
    prompt: input,
    maxTokens: 1024,
    temperature: temperature,
    schema: z.object({
      data: z.array(
        z.object({
          bio: z.string().describe('Add Generated bio\'s here..!'),
        })
      ),
    }),
  });
  return { data };
}
