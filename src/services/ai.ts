/**
 * ai.ts -- Central service layer for all OpenAI API communication.
 * All AI calls (path generation, Inner Guide chat, future features) go through
 * this file. Swap the model or provider here without touching any screen code.
 */
import { QuizAnswer, BeyondIPath } from '../types';

const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';
// const MODEL = 'gpt-4o';
const MODEL = 'gpt-4o-mini'; // swap to gpt-4o before prod release

const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

async function callOpenAI(messages: { role: string; content: string }[], maxTokens = 1000, attempt = 1): Promise<string> {
  if (!API_KEY) {
    throw new Error('EXPO_PUBLIC_OPENAI_API_KEY is not set in your environment.');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, messages }),
  });

  if (response.status === 429 && attempt < 3) {
    await wait(10000 * attempt); // 10s, then 20s
    return callOpenAI(messages, maxTokens, attempt + 1);
  }

  if (!response.ok) {
    const msg = response.status === 429
      ? 'Too many requests. Please wait a moment and try again.'
      : `OpenAI API error: ${response.status} ${response.statusText}`;
    throw new Error(msg);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function pingAI(): Promise<string> {
  return callOpenAI([{ role: 'user', content: 'Say "Connected" only.' }], 10);
}

export async function generatePath(answers: QuizAnswer[]): Promise<BeyondIPath> {
  const answerLines = answers.map((a, i) => `${i + 1}. ${a.optionText}`).join('\n');

  const systemPrompt = `You are a compassionate inner transformation guide for Beyond I, a personal growth app. Based on a user's quiz answers, generate a warm, personalized transformation path.

Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:
{
  "summary": "A warm 1-2 sentence intro addressing the user directly, referencing their answers",
  "path": [
    {
      "name": "Modality name",
      "category": "One of: Stillness, Movement, Expression, Connection, Reflection",
      "why": "1-2 sentences on why this fits their specific answers",
      "howToStart": "One concrete, gentle first step they can take today"
    }
  ]
}

Return exactly 3 path items. Be warm, specific to their answers, non-clinical, and grounding.`;

  const userMessage = `Here are my quiz answers:\n${answerLines}`;

  const raw = await callOpenAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage },
  ], 800);

  try {
    return JSON.parse(raw) as BeyondIPath;
  } catch {
    throw new Error('Could not parse the path response. Please try again.');
  }
}
