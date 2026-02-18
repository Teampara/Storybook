import { NextRequest, NextResponse } from "next/server";
import { fallbackPages, generateSeed, parsePages } from "@/lib/story";
import type { StoryFormData } from "@/types/story";

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function POST(request: NextRequest) {
  const input = (await request.json()) as StoryFormData;
  const seed = generateSeed();

  const systemPrompt = `You are a bestselling children's story author.
Return strict JSON with fields: title, visualDNA, pages.
Rules:
- visualDNA must be exactly 3 words describing recurring look.
- pages must contain exactly 10 entries.
- each page must be 2 short kid-friendly sentences.
- include child details: name=${input.name}, age=${input.age}, hobby=${input.hobby}, favorite food=${input.favoriteFood}, art style=${input.artStyle}.`;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        title: `${input.name}'s Magical Quest`,
        visualDNA: "Bright hoodie freckles",
        seed,
        pages: fallbackPages(input),
      },
      { status: 200 }
    );
  }

  const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to generate story" }, { status: 500 });
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  let title = `${input.name}'s Magical Quest`;
  let visualDNA = "Bright hoodie freckles";
  let pages = fallbackPages(input);

  try {
    const parsed = JSON.parse(rawText);
    title = parsed.title ?? title;
    visualDNA = parsed.visualDNA ?? visualDNA;
    pages = Array.isArray(parsed.pages) ? parsed.pages.slice(0, 10) : parsePages(rawText);
  } catch {
    pages = parsePages(rawText);
  }

  if (pages.length < 10) {
    pages = fallbackPages(input);
  }

  return NextResponse.json({ title, visualDNA, seed, pages });
}
