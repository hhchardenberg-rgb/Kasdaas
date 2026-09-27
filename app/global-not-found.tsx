import "@fontsource-variable/fraunces";
import "@fontsource-variable/manrope";
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "404 · Kas Daas", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="grid min-h-dvh place-items-center px-6 text-center">
          <div>
            <p className="eyebrow mb-3">404</p>
            <h1 className="text-4xl">Kas Daas</h1>
            <p className="mt-3 text-ink-soft">Deze pagina bestaat niet · This page doesn&apos;t exist</p>
            <Link href="/" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-ocean-800 px-6 font-semibold text-white">Home</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
