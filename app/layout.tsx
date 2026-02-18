import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paraspect Storybook",
  description: "Create magical personalised stories for children.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Providers>
          <Navbar />
          <main className="mx-auto min-h-[80vh] w-full max-w-5xl px-4 py-8">{children}</main>
          <Footer />
        </Providers>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
