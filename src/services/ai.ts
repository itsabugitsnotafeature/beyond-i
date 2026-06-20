/**
 * ai.ts -- Central service layer for all OpenAI API communication.
 * All AI calls (path generation, Inner Guide chat, future features) go through
 * this file. Swap the model or provider here without touching any screen code.
 */
const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o';

export async function pingAI(): Promise<string> {
  if (!API_KEY) {
    throw new Error('EXPO_PUBLIC_OPENAI_API_KEY is not set in your environment.');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 10,
      messages: [{ role: 'user', content: 'Say "Connected" only.' }],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
