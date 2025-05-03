// lib/groqapi2.ts

import { Groq } from 'groq-sdk'

// Direct API key usage (not recommended for production)
const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
})

export async function getCureFromGroq(disease: string): Promise<string> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `What are the effective steps to cure ${disease} in plants? Please include both natural and chemical remedies, along with prevention tips and best practices to maintain plant health. Hindi`,
        },
      ],
      model: 'gemma2-9b-it',
      temperature: 0.7,
      max_completion_tokens: 1024,
    })

    return chatCompletion.choices[0]?.message?.content || 'No cure information available.'
  } catch (err) {
    console.error('Groq error:', err)
    return 'Unable to fetch cure instructions right now.'
  }
}
