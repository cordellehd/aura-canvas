import { Check } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

const tiers = [
  {
    name: "Starter",
    price: "$29",
    tag: "For creators finding their voice",
    features: ["3 social channels", "60 AI posts / mo", "Basic scheduling", "Weekly digest"],
  },
  {
    name: "Growth",
    price: "$89",
    tag: "For brands that want compound growth",
    features: ["10 channels", "Unlimited AI posts", "Reply co-pilot", "Trend radar", "Attribution dashboard"],
    featured: true,
  },
  {
    name: "Studio",
    price: "$249",
    tag: "For agencies running many brands",
    features: ["Unlimited channels", "Multi-brand workspaces", "Approval workflows", "White-label reports", "Priority SLA"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neon">Pricing</p>
          <h2 className="text-4xl font-semibold md:text-5xl">
            Pay for growth, <span className="text-gradient">not seats.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl p-8 ${
                t.featured
                  ? "border border-[color:var(--neon)]/50 bg-white/5 shadow-[var(--shadow-glow)]"
                  : "glass"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(120deg,var(--neon),var(--neon-2))] px-3 py-0.5 font-display text-[10px] uppercase tracking-widest text-black">
                  Most popular
                </div>
              )}
              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.tag}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold">{t.price}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-neon" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <MagneticButton
                  variant={t.featured ? "primary" : "ghost"}
                  className="w-full"
                >
                  Choose {t.name}
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
