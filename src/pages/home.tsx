import { useEffect, useState } from "react";

const BSCSCAN_URL =
  "https://bscscan.com/token/0x9757f7552121CC67ba291c34fAf5C53ECDf1228D";
const TELEGRAM_URL = "https://t.me/trash_coin9";
const CONTRACT_ADDRESS = "0x9757f7552121CC67ba291c34fAf5C53ECDf1228D";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const TOKENOMICS = [
  {
    label: "Total Supply",
    value: "1,000,000,000",
    suffix: "TSHC",
    percent: 100,
    detail: "Fixed supply, minted once. No further tokens will ever be created.",
  },
  {
    label: "Liquidity",
    value: "60%",
    suffix: "of supply",
    percent: 60,
    detail: "Locked in the primary PancakeSwap pool to secure trading depth.",
  },
  {
    label: "Community",
    value: "40%",
    suffix: "of supply",
    percent: 40,
    detail: "Allocated to holders, airdrops, and community growth initiatives.",
  },
];

const SOCIALS = [
  { label: "Telegram", href: TELEGRAM_URL },
  { label: "BscScan", href: BSCSCAN_URL },
  { label: "X (Twitter)", href: "https://x.com/Trash_Coin2026" },
];

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function CopyAddressButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group flex w-full items-center justify-between gap-3 rounded-md border border-white/15 bg-white/[0.03] px-4 py-3 font-mono text-xs text-white/60 transition-colors hover:border-white/30 hover:text-white/90 sm:text-sm"
    >
      <span className="truncate">{CONTRACT_ADDRESS}</span>
      <span className="shrink-0 uppercase tracking-wider text-white/40 group-hover:text-white">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(["about", "tokenomics", "team", "contact"]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/5 font-mono text-sm font-bold tracking-tight">
            TS
          </span>
          <span className="font-mono text-sm font-semibold tracking-[0.15em] uppercase">
            Trash Coin
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                active === link.href.slice(1)
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <a
            href={BSCSCAN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-white/85"
          >
            Buy TSHC
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-white transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-white transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium uppercase tracking-wide text-white/70 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={BSCSCAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-black"
            >
              Buy TSHC
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-white/10 pt-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06), transparent 40%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          Live on BNB Smart Chain
        </p>

        <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
          TRASH COIN: A Community-Driven Digital Asset
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
          Fostering decentralized engagement and participation within the
          crypto ecosystem on the BNB Smart Chain.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href={BSCSCAN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:-translate-y-0.5"
          >
            View on BscScan
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-white/25 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white/50 hover:bg-white/5"
          >
            Join Telegram
          </a>
        </div>

        <div className="mt-14 max-w-md">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            Contract Address
          </p>
          <CopyAddressButton />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href={BSCSCAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-white/85"
            >
              Buy TSHC DEX
            </a>
            <a
              href="https://app.uniswap.org/explore/tokens/bnb/0x9757f7552121cc67ba291c34faf5c53ecdf1228d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-md border border-white/25 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Buy TSHC Uniswap
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-b border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-16">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              01 / About
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for the ones who show up
            </h2>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-white/65 sm:text-lg">
            <p>
              TRASH COIN (TSHC) was created as an open, community-first asset
              on the BNB Smart Chain. Rather than relying on a single team or
              central authority to dictate its direction, TSHC is designed
              so that its holders drive its growth — through participation,
              conversation, and shared ownership of what the token becomes.
              Every wallet holding TSHC has a stake in a project built in
              the open, not behind closed doors.
            </p>
            <p>
              Transparency and accessibility sit at the core of how TSHC
              operates. The contract is publicly verifiable on BscScan,
              liquidity is locked and visible on-chain, and anyone can
              acquire TSHC directly through a decentralized exchange without
              needing permission or an intermediary. There are no hidden
              allocations and no obscured mechanics — what you see on-chain
              is what exists. TRASH COIN exists to prove that a digital
              asset can be simple, honest, and genuinely owned by its
              community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tokenomics() {
  return (
    <section id="tokenomics" className="border-b border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          02 / Tokenomics
        </p>
        <h2 className="mb-14 text-3xl font-bold tracking-tight sm:text-4xl">
          Simple by design, transparent by default
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {TOKENOMICS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col justify-between rounded-lg border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-white/25"
            >
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                  {item.label}
                </p>
                <p className="text-3xl font-black tracking-tight sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-white/40">{item.suffix}</p>
              </div>

              <div className="mt-8">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/55">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="border-b border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          03 / Team
        </p>
        <h2 className="mb-14 text-3xl font-bold tracking-tight sm:text-4xl">
          Core Team
        </h2>

        <div className="max-w-sm">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25">
            <div className="flex aspect-[4/3] items-center justify-center border-b border-white/10 bg-white/[0.03]">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/5">
                <span className="font-mono text-3xl font-bold text-white/40">
                  B
                </span>
              </div>
            </div>

            <div className="p-7">
              <h3 className="text-xl font-bold">Aro</h3>
              <p className="mt-1 text-sm uppercase tracking-wide text-white/40">
                Founder
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Founder of TRASH COIN, focused on building a transparent,
                community-owned asset on the BNB Smart Chain.
              </p>

              <a
                href="https://github.com/arodevloment"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aro's GitHub profile"
                className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.97 3.24 9.19 7.73 10.68.56.1.77-.24.77-.54 0-.27-.01-1.15-.02-2.09-3.14.68-3.8-1.34-3.8-1.34-.51-1.31-1.25-1.66-1.25-1.66-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.51-.29-5.15-1.26-5.15-5.6 0-1.24.44-2.25 1.16-3.04-.12-.29-.5-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.8 10.8 0 0 1 5.72 0c2.18-1.47 3.13-1.16 3.13-1.16.62 1.57.23 2.73.11 3.02.73.79 1.16 1.8 1.16 3.04 0 4.35-2.65 5.31-5.17 5.59.4.35.76 1.03.76 2.08 0 1.5-.01 2.71-.01 3.08 0 .3.2.65.78.54A10.51 10.51 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          04 / Contact
        </p>
        <div className="flex flex-col gap-10 border-b border-white/10 pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get in touch
            </h2>
            <a
              href="mailto:info@trashcoin.site"
              className="mt-4 inline-block text-lg text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
            >
              info@trashcoin.site
            </a>
          </div>

          <div className="flex flex-wrap gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/15 px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/35 hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-xs text-white/35 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} TRASH COIN (TSHC). All rights reserved.</p>
          <p>Built on BNB Smart Chain.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <Hero />
        <About />
        <Tokenomics />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
