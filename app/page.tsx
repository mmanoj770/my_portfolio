import Hero from "@/components/home/Hero";
import WhoIAm from "@/components/home/WhoIAm";
import CurrentFocus from "@/components/home/CurrentFocus";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Quote from "@/components/home/Quote";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <main className="relative bg-[#0B0B0B] text-ink selection:bg-signal selection:text-black">
      {/* HERO SECTION */}
      <Hero />

      {/* WHO I AM */}
      <WhoIAm />

      {/* CURRENT FOCUS */}
      <CurrentFocus />

      {/* FEATURED PROJECTS */}
      <FeaturedProjects />

      {/* QUOTE STATEMENT */}
      <Quote />

      {/* CONTACT CTA */}
      <ContactCTA />
    </main>
  );
}
