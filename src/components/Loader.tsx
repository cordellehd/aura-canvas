import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/** Full-screen loading screen with animated progress; auto-dismisses after 1.4s. */
export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            className="mb-8 h-16 w-16 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, var(--neon), var(--neon-2))",
              boxShadow: "var(--shadow-glow)",
            }}
            animate={{ rotate: [0, 180, 360], borderRadius: ["30%", "50%", "30%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Booting Nebula
          </div>
          <div className="mt-6 h-[2px] w-64 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full"
              style={{
                width: `${progress * 100}%`,
                background: "linear-gradient(90deg, var(--neon), var(--neon-2))",
                transition: "width 60ms linear",
              }}
            />
          </div>
          <div className="mt-2 font-mono text-xs text-muted-foreground">
            {Math.round(progress * 100).toString().padStart(3, "0")}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
