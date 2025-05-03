import { Groq } from 'groq-sdk';

// Allow using the API key in a browser-like environment (ONLY for dev)
const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export async function getGrowingInstructions(cropName: string): Promise<{ instruction: string | null }> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `You are an expert agricultural assistant. Please provide clear, practical, and well-structured growing instructions for the crop "${cropName}". 

Include the following:
1. **Soil requirements** (type, pH, nutrients)
2. **Climate and temperature preferences**
3. **Ideal planting time/season**
4. **Watering needs and irrigation tips**
5. **Fertilization schedule**
6. **Pest and disease management**
7. **Harvesting guidelines**

Format it using numbered sections with bullet points or short paragraphs under each heading. Be concise but informative, suitable for farmers and agriculture students.`
        }
      ],
      model: 'gemma2-9b-it',
      temperature: 0.7,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    const instructions = chatCompletion.choices[0]?.message?.content || 'No instructions available.';
    return { instruction: instructions };
  } catch (error) {
    console.error('Error fetching instructions from Groq:', error);
    return { instruction: 'Error fetching instructions.' };
  }
}
