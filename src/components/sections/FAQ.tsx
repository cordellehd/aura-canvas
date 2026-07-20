import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  { q: "Which platforms does Nebula support?", a: "Instagram, TikTok, LinkedIn, X, YouTube Shorts, Threads, Facebook and Pinterest — all natively via official APIs." },
  { q: "Will the AI sound like me?", a: "Yes. We fine-tune on your past posts, brand voice guide and taboo list. You can veto anything and Nebula learns from every edit." },
  { q: "Do I keep control of publishing?", a: "Toggle any channel between autopilot, review-then-publish, or draft-only. You are always in the loop." },
  { q: "Is there a free trial?", a: "14 days on the Growth plan, no card required." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neon">FAQ</p>
          <h2 className="text-4xl font-semibold md:text-5xl">Questions, answered.</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="glass overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-display text-base font-medium">{f.q}</span>
                <Plus
                  className={`h-4 w-4 transition-transform duration-300 ${open === i ? "rotate-45 text-neon" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
