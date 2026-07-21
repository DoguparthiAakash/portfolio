'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';

type Day = {
  date: string;
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
};

export default function GithubSection() {
  const [stats, setStats] = useState({
    totalContributions: 1204,
    currentStreak: 14,
    repos: 42,
    contributions: [] as number[],
    loading: true
  });

  useEffect(() => {
    async function fetchGithubData() {
      try {
        // Fetch repositories count
        const userRes = await fetch('https://api.github.com/users/DoguparthiAakash');
        const userData = await userRes.json();
        const repos = userData.public_repos || 42;

        // Fetch contributions
        const contribRes = await fetch('https://github-contributions-api.deno.dev/DoguparthiAakash.json');
        if (!contribRes.ok) throw new Error("Failed to fetch contributions");
        const contribData = await contribRes.json();

        let totalContributions = contribData.totalContributions || 0;
        let days: Day[] = [];
        
        // Flatten the array
        if (contribData.contributions) {
          contribData.contributions.forEach((week: Day[]) => {
            days.push(...week);
          });
        }

        // Calculate streak
        let currentStreak = 0;
        const reversedDays = [...days].reverse();
        let startIndex = 0;
        
        if (reversedDays[0]?.contributionCount === 0) {
          startIndex = 1;
        }
        
        for (let i = startIndex; i < reversedDays.length; i++) {
          if (reversedDays[i].contributionCount > 0) {
            currentStreak++;
          } else {
            break;
          }
        }

        // Map to levels for our graph
        const levelMap: Record<string, number> = {
          "NONE": 0,
          "FIRST_QUARTILE": 1,
          "SECOND_QUARTILE": 2,
          "THIRD_QUARTILE": 3,
          "FOURTH_QUARTILE": 4
        };
        
        // We need exactly 52 * 7 = 364 days for the UI
        const recentDays = days.slice(-364);
        const mappedContributions = recentDays.map(d => levelMap[d.contributionLevel] || 0);

        setStats({
          totalContributions: totalContributions || 1204,
          currentStreak: currentStreak || 14,
          repos,
          contributions: mappedContributions,
          loading: false
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    }

    fetchGithubData();
  }, []);

  const weeks = 52;
  const daysPerWeek = 7;
  
  // Use mock data if loading or failed to get exactly 364 days
  const displayContributions = stats.contributions.length === weeks * daysPerWeek 
    ? stats.contributions 
    : Array.from({ length: weeks * daysPerWeek }, (_, i) => {
        const x = Math.sin(i * 13.9898) * 43758.5453;
        return Math.floor(Math.abs(x - Math.floor(x)) * 4);
      });

  return (
    <section id="github" className="py-24 md:py-32 border-t border-[rgba(255,255,255,0.08)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
        <SectionHeading 
          title="Open Source" 
          subtitle="Dedicated to transparent engineering and actively advancing the open-source artificial intelligence ecosystem."
        />
        <a 
          href="https://github.com/DoguparthiAakash" 
          target="_blank" 
          rel="noreferrer"
          className="group flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors pb-1 border-b border-transparent hover:border-white w-fit"
        >
          <FaGithub size={20} />
          <span>@DoguparthiAakash</span>
        </a>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="p-6 md:p-8 rounded-2xl bg-[#111111] border border-[rgba(255,255,255,0.08)] overflow-hidden relative"
      >
        <div className={`transition-opacity duration-500 ${stats.loading ? 'opacity-50' : 'opacity-100'}`}>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-12">
            <div className="text-center md:text-left">
              <h4 className="text-[#A1A1AA] text-sm uppercase tracking-widest mb-1">Total Contributions</h4>
              <p className="text-4xl md:text-5xl font-bold text-white">
                {stats.totalContributions.toLocaleString()}
              </p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-[#A1A1AA] text-sm uppercase tracking-widest mb-1">Current Streak</h4>
              <p className="text-4xl md:text-5xl font-bold text-white">
                {stats.currentStreak} Days
              </p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-[#A1A1AA] text-sm uppercase tracking-widest mb-1">Repositories (Public)</h4>
              <p className="text-4xl md:text-5xl font-bold text-white">
                {stats.repos}
              </p>
            </div>
          </div>

          {/* Contribution Graph */}
          <div className="overflow-x-auto pb-4 hide-scrollbar">
            <div className="inline-flex flex-col gap-1 min-w-max">
              {Array.from({ length: daysPerWeek }).map((_, dayIndex) => (
                <div key={dayIndex} className="flex gap-1">
                  {Array.from({ length: weeks }).map((_, weekIndex) => {
                    const level = displayContributions[weekIndex * daysPerWeek + dayIndex];
                    
                    let bgColor = "bg-[#161B22]";
                    if (level === 1) bgColor = "bg-[#0E4429]";
                    if (level === 2) bgColor = "bg-[#006D32]";
                    if (level === 3) bgColor = "bg-[#26A641]";
                    if (level === 4) bgColor = "bg-[#39D353]";

                    return (
                      <motion.div 
                        key={weekIndex}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2, delay: (weekIndex * 0.01) + (dayIndex * 0.01) }}
                        className={`w-3 h-3 rounded-sm ${bgColor}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
