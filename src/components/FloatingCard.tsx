import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Card that tilts in 3D toward the cursor. */
export function FloatingCard({
  icon,
  title,
  children,
  className,
}: {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn(
        "glass group relative overflow-hidden rounded-2xl p-6 transition-shadow duration-500 hover:shadow-[var(--shadow-glow)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(400px circle at var(--x,50%) var(--y,50%), color-mix(in oklab, var(--neon) 22%, transparent), transparent 60%)" }}
      />
      {icon && (
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-neon">
          {icon}
        </div>
      )}
      <h3 className="mb-2 font-display text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </motion.div>
  );
}
