import { InterviewWizard } from "./components/interview-wizard";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Paraspect AI Storybook</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
          Build a magical, personalized storybook for your child in minutes.
        </p>
      </section>

      <InterviewWizard />
    </div>
  );
}
