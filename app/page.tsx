import Link from "next/link";

export default function Home() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
      <p className="inline-block rounded-full bg-paraspect-sun/50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-paraspect-ink">
        Mobile-first story maker
      </p>
      <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
        Turn your child into the hero of a magical bedtime adventure.
      </h1>
      <p className="mt-4 max-w-2xl text-base text-paraspect-ink/80 md:text-lg">
        Share their favorite food, hobby, and dream style, and get a 10-page personalized storybook with consistent artwork.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/create"
          className="rounded-full bg-paraspect-ink px-6 py-3 text-center text-base font-bold text-white transition hover:bg-paraspect-coral"
        >
          Start Story
        </Link>
        <a
          href="https://paraspect.in"
          className="rounded-full border border-paraspect-ink px-6 py-3 text-center text-base font-semibold"
        >
          Visit Paraspect
        </a>
      </div>
    </section>
  );
}
