import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paraspect AI Storybook",
  description: "AI-powered personalized storybooks for children.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Top nav bar with brand color (#003366). */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-[#003366] text-white">
          <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
            <Link href="/" className="text-base font-bold sm:text-lg">
              Paraspect AI Storybook
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/" className="rounded px-2 py-1 hover:bg-white/10">
                Home
              </Link>
              <Link href="/create" className="rounded px-2 py-1 hover:bg-white/10">
                Create
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">{children}</main>
      </body>
    </html>
  );
}
