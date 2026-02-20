import { InterviewWizard } from "./components/interview-wizard";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Build your child&apos;s magical story</h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Answer a few questions and we will generate a personalized AI storybook.
        </p>
      </div>

      <InterviewWizard />
    </section>
  );
}
