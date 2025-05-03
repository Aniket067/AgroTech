// app/api/groq/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { crop } = await req.json();
  const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: 'Missing GROQ API key' }, { status: 500 });
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: [
        { role: 'system', content: 'You are an expert agriculture assistant.' },
        { role: 'user', content: `How do I grow ${crop}? Provide step-by-step guidance with important notes.` },
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'GROQ API failed' }, { status: 500 });
  }

  const data = await response.json();
  return NextResponse.json({ result: data.choices[0].message.content });
}
