import { NextResponse } from "next/server";

// Placeholder route to confirm App Router API wiring.
// In Phase 2, this file will export NextAuth handlers.
export async function GET() {
  return NextResponse.json({ message: "NextAuth route placeholder" });
}
