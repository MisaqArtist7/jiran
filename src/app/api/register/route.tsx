import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) { // lunch when post request send to this route
  try {
    const body = await request.json();

    const response = await fetch('https://jiran-api.com/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error('Register API error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
