import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1]; // "Bearer <token>" ["Bearer[0]", "abc123xyz[1]"]

    const response = await fetch("https://jiran-api.com/api/v1/auth/show", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return NextResponse.json({ message: "Data received", data });
  } catch {
    return NextResponse.json({ message: "Error occurred" }, { status: 500 });
  }
}
