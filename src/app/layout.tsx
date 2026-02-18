import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paraspect AI Storybook",
  description: "Create personalized AI storybooks for children.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/*
          This is the top navigation bar.
          We keep it simple and clear so parents can use it quickly on mobile.
        */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-[#003366] text-white shadow-sm">
          <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-lg font-bold tracking-wide">
              Paraspect AI Storybook
            </Link>

            <div className="flex items-center gap-4 text-sm sm:text-base">
              <Link href="/story/create" className="rounded-md px-2 py-1 hover:bg-white/10">
                Create Story
              </Link>
              <Link href="/dashboard" className="rounded-md px-2 py-1 hover:bg-white/10">
                Dashboard
              </Link>
            </div>
          </nav>
        </header>

        {/* Main page container */}
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );
}
