"use client";

import { useState } from "react";

type StoryInput = {
  heroName: string;
  age: string;
  hobby: string;
  artStyle: string;
};

const STEP_COUNT = 3;

export function InterviewWizard() {
  // This object stores all answers in one place.
  const [data, setData] = useState<StoryInput>({
    heroName: "",
    age: "",
    hobby: "",
    artStyle: "",
  });

  // This tells us which step screen to show right now.
  const [step, setStep] = useState(1);

  const setField = (field: keyof StoryInput, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const canGoStep1 = data.heroName.trim().length > 0 && data.age.trim().length > 0;
  const canGoStep2 = data.hobby.trim().length > 0;
  const canFinish = data.artStyle.trim().length > 0;

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      {/* Progress info helps users know where they are. */}
      <div className="mb-6">
        <p className="mb-2 text-xs text-slate-500 sm:text-sm">
          Step {step} of {STEP_COUNT}
        </p>
        <div className="h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-[#003366] transition-all"
            style={{ width: `${(step / STEP_COUNT) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Hero basics</h2>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Hero Name</span>
            <input
              value={data.heroName}
              onChange={(e) => setField("heroName", e.target.value)}
              placeholder="e.g. Anaya"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-[#003366] focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Age</span>
            <input
              type="number"
              min={1}
              max={18}
              value={data.age}
              onChange={(e) => setField("age", e.target.value)}
              placeholder="e.g. 8"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-[#003366] focus:ring-2"
            />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Hero details</h2>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Hobby</span>
            <input
              value={data.hobby}
              onChange={(e) => setField("hobby", e.target.value)}
              placeholder="e.g. Cycling"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-[#003366] focus:ring-2"
            />
          </label>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Visual style</h2>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Art Style</span>
            <select
              value={data.artStyle}
              onChange={(e) => setField("artStyle", e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none ring-[#003366] focus:ring-2"
            >
              <option value="">Select art style</option>
              <option value="watercolor">Watercolor</option>
              <option value="3d-cartoon">3D Cartoon</option>
              <option value="anime">Anime</option>
              <option value="storybook-classic">Classic Storybook</option>
            </select>
          </label>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-50 sm:w-auto"
        >
          Back
        </button>

        {step < STEP_COUNT ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(STEP_COUNT, s + 1))}
            disabled={(step === 1 && !canGoStep1) || (step === 2 && !canGoStep2)}
            className="w-full rounded-lg bg-[#003366] px-4 py-2 font-medium text-white disabled:bg-slate-400 sm:w-auto"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            disabled={!canFinish}
            className="w-full rounded-lg bg-[#003366] px-4 py-2 font-medium text-white disabled:bg-slate-400 sm:w-auto"
          >
            Generate Storybook
          </button>
        )}
      </div>
    </div>
  );
}
