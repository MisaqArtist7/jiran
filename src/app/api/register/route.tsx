import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch('https://jiran-api.com/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('Register API error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
