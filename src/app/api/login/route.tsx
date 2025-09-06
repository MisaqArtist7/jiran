import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try{
        const body = await request.json();
        const response = await fetch('https://jiran-api.com/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    }
    catch(error) {
        console.error('Login API error:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}