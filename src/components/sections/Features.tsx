import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingCard } from "@/components/FloatingCard";
import { Brain, Calendar, MessageSquare, LineChart, Wand2, Radar } from "lucide-react";

const items = [
  { icon: <Brain className="h-5 w-5" />, title: "Autonomous strategist", body: "Learns your brand voice and audience, then plans a rolling 30-day content calendar aligned to your KPIs." },
  { icon: <Wand2 className="h-5 w-5" />, title: "Generative studio", body: "Draft, iterate and remix posts, threads, reels and stories from a single prompt — on-brand every time." },
  { icon: <Calendar className="h-5 w-5" />, title: "Smart scheduling", body: "Publishes at the moment each channel's audience is most active, adjusted continuously by live signals." },
  { icon: <MessageSquare className="h-5 w-5" />, title: "Reply co-pilot", body: "Triages comments and DMs, drafts responses in your tone, and escalates the ones that need a human." },
  { icon: <Radar className="h-5 w-5" />, title: "Trend radar", body: "Surfaces breakout topics, sounds and formats in your niche before they saturate." },
  { icon: <LineChart className="h-5 w-5" />, title: "Attribution", body: "Cross-channel analytics that tie every post to reach, engagement and revenue — no spreadsheets." },
];

export function Features() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from(".feature-title", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={root} className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="feature-title mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neon">The crew</p>
          <h2 className="text-4xl font-semibold md:text-5xl">
            Six AI agents. <span className="text-gradient">One growth engine.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Each agent owns a slice of your social workflow and hands off to the next automatically.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="feature-card">
              <FloatingCard icon={it.icon} title={it.title}>
                {it.body}
              </FloatingCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
