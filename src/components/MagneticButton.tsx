import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSound } from "@/hooks/useSound";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
  strength?: number;
};

/** Button with cursor-following magnetic pull. */
export function MagneticButton({ children, className, variant = "primary", strength = 0.35, onMouseEnter, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });
  const { play } = useSound();

  return (
    <motion.button
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onMouseEnter={(e) => {
        play("hover");
        onMouseEnter?.(e);
      }}
      onClick={(e) => {
        play("click");
        rest.onClick?.(e);
      }}
      style={{ x: sx, y: sy }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold transition-shadow",
        variant === "primary"
          ? "text-primary-foreground [background:linear-gradient(120deg,var(--neon),var(--neon-2))] shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-2)]"
          : "glass text-foreground hover:bg-white/10",
        className,
      )}
      {...rest}
      onMouseDown={undefined}
    >
      {children}
    </motion.button>
  );
}
