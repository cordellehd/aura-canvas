import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Ctx = { muted: boolean; toggle: () => void; play: (kind?: "hover" | "click") => void };
const SoundCtx = createContext<Ctx>({ muted: true, toggle: () => {}, play: () => {} });

/**
 * Tiny WebAudio blip generator — no assets, no network.
 * Muted by default; users opt in.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("muted");
    if (stored === "false") setMuted(false);
  }, []);

  const ensure = useCallback(() => {
    if (!ctxRef.current && typeof window !== "undefined") {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AC) ctxRef.current = new AC();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (kind: "hover" | "click" = "hover") => {
      if (muted) return;
      const ctx = ensure();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = kind === "click" ? 620 : 880;
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    },
    [muted, ensure],
  );

  const toggle = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      localStorage.setItem("muted", String(next));
      return next;
    });
  }, []);

  return <SoundCtx.Provider value={{ muted, toggle, play }}>{children}</SoundCtx.Provider>;
}

export const useSound = () => useContext(SoundCtx);
