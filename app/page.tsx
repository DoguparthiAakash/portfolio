import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TechStackSection from "@/components/sections/TechStackSection";
import TimelineSection from "@/components/sections/TimelineSection";
import GithubSection from "@/components/sections/GithubSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <div className="px-6 md:px-12 lg:px-24 xl:px-48 mx-auto max-w-7xl w-full">
        <AboutSection />
        <ProjectsSection />
        <TechStackSection />
        <TimelineSection />
        <GithubSection />
        <ContactSection />
      </div>
    </div>
  );
}
