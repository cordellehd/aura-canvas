import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  { n: "01", title: "Connect channels", body: "Link Instagram, TikTok, LinkedIn, X, YouTube and threads in under two minutes with OAuth." },
  { n: "02", title: "Train your voice", body: "Nebula ingests your last 90 days of posts and brand docs to lock in tone, style and taboo topics." },
  { n: "03", title: "Approve the plan", body: "Review the AI-generated month at a glance. Swipe to approve, edit inline, or hand back to the agent." },
  { n: "04", title: "Grow on autopilot", body: "Nebula publishes, replies, tests and reports — you check the weekly digest and pour a coffee." },
];

export function Workflow() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".step-row", {
        x: -40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.to(".workflow-line", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="workflow" ref={root} className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neon">How it works</p>
          <h2 className="text-4xl font-semibold md:text-5xl">
            From logo to launch in <span className="text-gradient">under an hour.</span>
          </h2>
        </div>

        <div className="relative">
          <div
            className="workflow-line absolute left-6 top-0 h-full w-px origin-top scale-y-0 md:left-1/2"
            style={{ background: "linear-gradient(180deg, var(--neon), var(--neon-2))" }}
          />
          <div className="space-y-16">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`step-row relative flex items-start gap-6 md:gap-12 ${i % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""}`}
              >
                <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full glass font-display text-sm text-neon md:mx-auto">
                  {s.n}
                </div>
                <div className="glass flex-1 rounded-2xl p-6 md:max-w-md">
                  <h3 className="mb-2 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
