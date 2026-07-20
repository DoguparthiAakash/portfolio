"use client";

import MacNavbar from "@/components/layout/MacNavbar";
import HeroSection from "@/components/sections/HeroSection";
import BentoGridSection from "@/components/sections/BentoGridSection";
import ResumeSection from "@/components/sections/ResumeSection";
import NeuralVis3D from "@/components/three/NeuralVis3D";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <MacNavbar />
      
      {/* Spacer for fixed navbar */}
      <div className="pt-24" />
      
      <HeroSection />
      
      <NeuralVis3D />
      
      <BentoGridSection />
      
      <ResumeSection />
      
      {/* Footer */}
      <footer className="py-12 text-center text-gray-500 text-sm border-t border-white/10 mt-24">
        <p>© {new Date().getFullYear()} Aakash Doguparthi. All rights reserved.</p>
        <p className="mt-2">Machine Learning Engineer & Autonomous Systems Developer</p>
      </footer>
    </main>
  );
}
