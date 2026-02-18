import type { StoryFormData } from "@/types/story";

export function generateSeed(): number {
  return Math.floor(1_000_000_000 + Math.random() * 9_000_000_000);
}

export function fallbackPages(input: StoryFormData): string[] {
  return Array.from({ length: 10 }).map((_, idx) =>
    `Page ${idx + 1}: ${input.name}, age ${input.age}, uses ${input.hobby} to help friends and enjoys ${input.favoriteFood} in a ${input.artStyle} world.`
  );
}

export function parsePages(text: string): string[] {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^\d+[).:-]?\s*/, ""));

  if (lines.length >= 10) {
    return lines.slice(0, 10);
  }

  const paragraphs = text.split(/\n\n+/).map((value) => value.trim()).filter(Boolean);
  return paragraphs.slice(0, 10);
}
