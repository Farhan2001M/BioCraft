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
You are an AI assistant tasked with generating bios based on user input.

Instructions:

Analyze the User's Input:
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
  - Highlight the most important information about the user.
  - Avoid using too many buzzwords or overdoing humor.
  - Never use the user's name in the bio.
  - Ensure that each bio length is between 120 and 140 characters.
  - Provide exactly 4 bios, no more or less.
  - If 'EmojisAndHashtags' is true, include relevant emojis (4 to 5) in between bio and 2 or 3 hashtags at the end; 
  - if 'EmojisAndHashtags' is false, do not include emojis or hashtags .
  - The response must be in JSON format.
  - Also Double check that if Emojis And Hashtags are only present in the bio's if the user has asked for it.. otherwise not..
  - Also remember that unlike hashtags which should be at the end , my emojis should be in in between the bio text where they need to aside their respective text etc...

Additional Guidelines:
  - Maintain clarity and coherence in each bio.
  - Provide response in JSON format only.
`;


export async function generateBio(input: string, temperature: number, model: string) {
  const { object: data } = await generateObject({
    model: groq(model),
    system: systemPrompt,
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
