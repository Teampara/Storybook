import Link from "next/link";
import AuthButton from "@/components/AuthButton";

export default function Navbar() {
  return (
    <nav className="no-print sticky top-0 z-30 border-b border-paraspect-sky/40 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="https://paraspect.in" className="text-lg font-black text-paraspect-ink">
          Paraspect Storybook
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/create"
            className="rounded-full bg-paraspect-sky px-4 py-2 text-sm font-semibold text-paraspect-ink transition hover:bg-paraspect-mint"
          >
            Start Story
          </Link>
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
