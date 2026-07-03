import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white px-6">
      <div className="text-center">
        <p className="font-mono text-sm tracking-[0.3em] text-white/40 uppercase mb-4">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          This page doesn&apos;t exist.
        </h1>
        <Link
          href="/"
          className="inline-block border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
        >
          Back to TRASH COIN
        </Link>
      </div>
    </div>
  );
}
