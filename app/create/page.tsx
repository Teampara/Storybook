"use client";

import { FormEvent, useMemo, useState } from "react";
import type { GeneratedStory, StoryFormData } from "@/types/story";

const TOTAL_STEPS = 8;

const initialData: StoryFormData = {
  name: "",
  age: "",
  hobby: "",
  favoriteFood: "",
  artStyle: "Watercolor",
};

export default function CreatePage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [story, setStory] = useState<GeneratedStory | null>(null);
  const [form, setForm] = useState<StoryFormData>(initialData);

  const progress = useMemo(() => `${Math.round((step / TOTAL_STEPS) * 100)}%`, [step]);

  const handleGenerate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as GeneratedStory;
      setStory(data);
      setStep(TOTAL_STEPS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyStory = async () => {
    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 19900, currency: "INR", receipt: `storybook-${Date.now()}` }),
    });
    const order = await response.json();
    const Razorpay = (window as Window & { Razorpay?: any }).Razorpay;

    if (!Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const checkout = new Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Paraspect Storybook",
      description: "Buy personalized storybook",
      order_id: order.id,
      handler: () => alert("Payment success! We'll deliver your story soon."),
      theme: { color: "#5CC8FF" },
    });

    checkout.open();
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-white p-5">
        <div className="mb-2 flex items-center justify-between text-sm font-semibold">
          <span>Story Wizard Step {step} / {TOTAL_STEPS}</span>
          <span>{progress}</span>
        </div>
        <div className="h-2 rounded-full bg-paraspect-cloud">
          <div className="h-2 rounded-full bg-paraspect-sky transition-all" style={{ width: progress }} />
        </div>
      </div>

      <form onSubmit={handleGenerate} className="grid gap-4 rounded-2xl bg-white p-5">
        {[
          ["name", "Child Name", "Aarav"],
          ["age", "Age", "7"],
          ["hobby", "Hobby", "Football"],
          ["favoriteFood", "Favorite Food", "Dosa"],
          ["artStyle", "Art Style", "Pixar 3D"],
        ].map(([key, label, placeholder], idx) => (
          <label key={key} className="grid gap-1 text-sm font-semibold">
            {label}
            <input
              required
              value={form[key as keyof StoryFormData]}
              onFocus={() => setStep(Math.min(TOTAL_STEPS, idx + 2))}
              onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))}
              placeholder={placeholder}
              className="rounded-xl border border-paraspect-ink/20 px-3 py-2 font-normal"
            />
          </label>
        ))}

        <button
          disabled={isLoading}
          className="mt-2 rounded-full bg-paraspect-ink px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {isLoading ? "Generating..." : "Generate 10-Page Story"}
        </button>
      </form>

      {story && (
        <article className="space-y-4 rounded-2xl bg-white p-5">
          <h2 className="text-2xl font-black">{story.title}</h2>
          <p className="text-sm">Visual DNA: {story.visualDNA} · Seed: {story.seed}</p>
          <ol className="list-decimal space-y-2 pl-5 text-sm">
            {story.pages.map((page, idx) => (
              <li key={`${idx}-${page.slice(0, 16)}`}>{page}</li>
            ))}
          </ol>
          <button
            onClick={handleBuyStory}
            className="rounded-full bg-paraspect-coral px-6 py-3 text-sm font-bold text-white"
          >
            Buy Story
          </button>
        </article>
      )}
    </section>
  );
}
