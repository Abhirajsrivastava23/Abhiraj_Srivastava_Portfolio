import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { PassionSection } from "@/components/sections/PassionSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      <HeroSection />
      <PassionSection />
      <ExpertiseSection />
      <EducationSection />
      <AchievementsSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
}
