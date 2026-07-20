import { MagneticButton } from "@/components/MagneticButton";
import { Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div
          className="relative overflow-hidden rounded-3xl border border-glass-border p-12 text-center md:p-20"
          style={{
            background:
              "radial-gradient(600px circle at 50% 0%, color-mix(in oklab, var(--neon) 30%, transparent), transparent 60%), var(--glass)",
          }}
        >
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--neon),var(--neon-2))]">
            <Sparkles className="h-5 w-5 text-black" />
          </div>
          <h2 className="text-4xl font-semibold md:text-5xl">
            Ship a month of content <span className="text-gradient">tonight.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Spin up your AI crew in minutes. First 14 days are on us — cancel anytime.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton>Start free trial</MagneticButton>
            <MagneticButton variant="ghost">Talk to sales</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-glass-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} Nebula AI Labs, Inc.</div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Status</a>
        </div>
      </div>
    </footer>
  );
}
