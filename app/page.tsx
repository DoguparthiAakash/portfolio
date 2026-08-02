import dynamic from 'next/dynamic';
import HeroSection from "@/components/sections/HeroSection";

// Dynamically import all below-the-fold components to reduce initial JS payload
// This is critical for fast loading on low internet connectivity
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"));
const TechStackSection = dynamic(() => import("@/components/sections/TechStackSection"));
const TimelineSection = dynamic(() => import("@/components/sections/TimelineSection"));
const GithubSection = dynamic(() => import("@/components/sections/GithubSection"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));
const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"));

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <LoadingScreen />
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
