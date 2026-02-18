"use client";

import { useState } from "react";

type WizardData = {
  heroName: string;
  age: string;
  hobby: string;
  artStyle: string;
};

const TOTAL_STEPS = 3;

export function InterviewWizard() {
  // We store all answers in one place so it is easy to send to an API later.
  const [formData, setFormData] = useState<WizardData>({
    heroName: "",
    age: "",
    hobby: "",
    artStyle: "",
  });

  // This controls which screen of the wizard is currently visible.
  const [step, setStep] = useState(1);

  const updateField = (field: keyof WizardData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goNext = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const isStepOneValid = formData.heroName.trim() && formData.age.trim();
  const isStepTwoValid = formData.hobby.trim().length > 0;
  const isStepThreeValid = formData.artStyle.trim().length > 0;

  return (
    <section className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      {/* Progress bar helps users understand how many steps are left. */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500 sm:text-sm">
          <span>
            Step {step} of {TOTAL_STEPS}
          </span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-[#003366] transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Tell us about your hero</h2>
          <p className="text-sm text-slate-600">
            We will use these details to generate a personalized story.
          </p>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Hero Name</span>
            <input
              type="text"
              value={formData.heroName}
              onChange={(event) => updateField("heroName", event.target.value)}
              placeholder="e.g., Aarav"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-[#003366] focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Age</span>
            <input
              type="number"
              min={1}
              max={18}
              value={formData.age}
              onChange={(event) => updateField("age", event.target.value)}
              placeholder="e.g., 7"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-[#003366] focus:ring-2"
            />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">What does your hero enjoy?</h2>
          <p className="text-sm text-slate-600">This helps us shape the theme of the story.</p>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Hobby</span>
            <input
              type="text"
              value={formData.hobby}
              onChange={(event) => updateField("hobby", event.target.value)}
              placeholder="e.g., Painting"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-[#003366] focus:ring-2"
            />
          </label>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Choose the art style</h2>
          <p className="text-sm text-slate-600">
            This decides how all 10 images in the storybook will look.
          </p>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Art Style</span>
            <select
              value={formData.artStyle}
              onChange={(event) => updateField("artStyle", event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none ring-[#003366] focus:ring-2"
            >
              <option value="">Select a style</option>
              <option value="watercolor">Watercolor</option>
              <option value="3d-cartoon">3D Cartoon</option>
              <option value="anime">Anime</option>
              <option value="storybook-classic">Classic Storybook</option>
            </select>
          </label>

          {/* Review card so users can check details before submit. */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <p>
              <strong>Hero Name:</strong> {formData.heroName || "-"}
            </p>
            <p>
              <strong>Age:</strong> {formData.age || "-"}
            </p>
            <p>
              <strong>Hobby:</strong> {formData.hobby || "-"}
            </p>
            <p>
              <strong>Art Style:</strong> {formData.artStyle || "-"}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            disabled={(step === 1 && !isStepOneValid) || (step === 2 && !isStepTwoValid)}
            className="w-full rounded-lg bg-[#003366] px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            disabled={!isStepThreeValid}
            className="w-full rounded-lg bg-[#003366] px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
          >
            Generate Storybook
          </button>
        )}
      </div>
    </section>
  );
}
