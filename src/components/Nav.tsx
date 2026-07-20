import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SoundToggle } from "./SoundToggle";
import { MagneticButton } from "./MagneticButton";

const links = [
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "Workflow" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 200], [8, 22]);
  const bg = useTransform(scrollY, [0, 200], ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.08)"]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full border border-glass-border px-4 py-2.5 md:px-6"
      style={{
        backdropFilter: `blur(${blur.get()}px) saturate(160%)`,
        background: bg,
      }}
    >
      <a href="#top" className="flex items-center gap-2 font-display text-base font-semibold">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: "linear-gradient(135deg, var(--neon), var(--neon-2))" }}
        >
          <Sparkles className="h-4 w-4 text-black" />
        </span>
        <span>Nebula<span className="text-neon">.ai</span></span>
      </a>

      <nav className="hidden items-center gap-1 md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <SoundToggle />
        <ThemeToggle />
        <MagneticButton className="hidden !px-5 !py-2 text-xs md:inline-flex">Get Started</MagneticButton>
      </div>
    </motion.header>
  );
}
