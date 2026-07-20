import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ClientOnly } from "@/components/ClientOnly";
import { MagneticButton } from "@/components/MagneticButton";
import { ArrowRight, Sparkles } from "lucide-react";

// Lazy-load the 3D scene — keeps three.js out of the initial bundle.
const Scene = lazy(() => import("@/components/three/Scene"));

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* 3D canvas */}
      <div className="pointer-events-none absolute inset-0">
        <ClientOnly>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </ClientOnly>
      </div>

      {/* soft radial vignette so text stays readable */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 20%, transparent, color-mix(in oklab, var(--background) 70%, transparent) 70%, var(--background) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-40 text-center md:pt-52">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-neon" />
          Now with autonomous multi-channel scheduling
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
        >
          Your social presence,{" "}
          <span className="text-gradient">run by an AI crew</span> that never sleeps.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Nebula orchestrates content, engagement and analytics across every channel — writing,
          scheduling and learning in real time so your brand compounds while you sleep.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton>
            Start free trial <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton variant="ghost">Watch the demo</MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex items-center gap-6 text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span>Trusted by</span>
          <span className="font-display text-sm text-foreground/60">Orbit</span>
          <span className="font-display text-sm text-foreground/60">Vercel</span>
          <span className="font-display text-sm text-foreground/60">Linear</span>
          <span className="hidden font-display text-sm text-foreground/60 md:inline">Notion</span>
        </motion.div>
      </div>
    </section>
  );
}
