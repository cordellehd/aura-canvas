import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Workflow } from "@/components/sections/Workflow";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA, Footer } from "@/components/sections/CTA";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Nebula.ai",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "Autonomous AI agents that plan, publish, engage and grow your brand across every social channel.",
          offers: { "@type": "Offer", price: "29", priceCurrency: "USD" },
        }),
      },
    ],
  }),
});

function Landing() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative bg-grid"
    >
      <Nav />
      <Hero />
      <Features />
      <Workflow />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </motion.main>
  );
}
