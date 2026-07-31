'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';

type Project = {
  id: string;
  category: string;
  title: string;
  description: string;
  github: string;
  demo?: string;
  logo: string;
  logoSize?: number;
  logoClassName?: string;
};

const PROJECTS: Project[] = [
  {
    id: "mithlos",
    category: "OS Development",
    title: "Mithl OS",
    description: "A high-performance, independent operating system engineered from the ground up to maximize speed, aesthetic elegance, and granular control.",
    github: "https://github.com/DoguparthiAakash/Mithl",
    logo: "/logos/mithlos.png",
    logoSize: 72
  },
  {
    id: "uos",
    category: "Mobile OS",
    title: "UOS",
    description: "An alternative mobile operating system built upon FreeBSD, meticulously designed to emulate the fluidity of an iOS experience on ARM architectures.",
    github: "https://github.com/DoguparthiAakash/freebsd-src/tree/mobile-os/mobile",
    logo: "/logos/uos.png",
    logoClassName: "invert brightness-200 contrast-125 opacity-90"
  },
  {
    id: "nux",
    category: "Language Design",
    title: "NUX Language",
    description: "A custom programming language drawing inspiration from C, Rust, and Assembly. It elegantly harmonizes syntactical simplicity with robust memory safety.",
    github: "https://github.com/DoguparthiAakash",
    logo: "/logos/nux.png"
  },
  {
    id: "plaza",
    category: "Systems",
    title: "Plaza VM",
    description: "A sophisticated virtual machine manager developed in Rust, strategically leveraging the language's strict safety guarantees to facilitate secure VM orchestration.",
    github: "https://github.com/DoguparthiAakash/plazavm",
    logo: "/logos/plazavm.png",
    logoSize: 48
  },
  {
    id: "textbeans",
    category: "Software",
    title: "TextBeans",
    description: "A highly efficient, Java-based software solution engineered to seamlessly process diverse file formats within a unified, intuitive editing environment.",
    github: "https://github.com/DoguparthiAakash/Text-Beans",
    logo: "/logos/textbeans.png"
  },
  {
    id: "clerk",
    category: "AI Agent",
    title: "Clerk",
    description: "An Agent that be with you in your system as a buttler/friend. Automates tasks and provides intelligent assistance natively.",
    github: "https://github.com/DoguparthiAakash/clerk",
    logo: "/logos/clerk.png"
  }
];

const TOTAL_SETS = 30;
const SET_SIZE = PROJECTS.length;
const EXTENDED_PROJECTS = Array(TOTAL_SETS).fill(PROJECTS).flat();
const START_INDEX = Math.floor(TOTAL_SETS / 2) * SET_SIZE; // Middle of the 30 sets

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(START_INDEX);
  const [isReady, setIsReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const isHoveredRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const setHoverState = (state: boolean) => {
    isHoveredRef.current = state;
    setIsHovered(state);
    if (!state && timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const snap = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let closest: HTMLElement | null = null;
    let min = Infinity;

    const cards = container.querySelectorAll('.project-card');
    cards.forEach((card) => {
      const cardCenter = (card as HTMLElement).offsetLeft + (card as HTMLElement).offsetWidth / 2;
      const distance = Math.abs(center - cardCenter);

      if (distance < min) {
        min = distance;
        closest = card as HTMLElement;
      }
    });

    if (closest) {
      container.scrollTo({
        left: (closest as HTMLElement).offsetLeft - container.offsetWidth / 2 + (closest as HTMLElement).offsetWidth / 2,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Update active index for animations
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;
    
    const cards = container.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      const cardCenter = (card as HTMLElement).offsetLeft + (card as HTMLElement).offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }

    // Truly Infinite Loop: Seamless Jump
    if (closestIndex <= SET_SIZE * 2) {
       // Jump forward by 10 sets (60 cards)
       const targetIndex = closestIndex + (SET_SIZE * 10);
       const targetCard = cards[targetIndex] as HTMLElement;
       if (targetCard) {
         container.scrollTo({
           left: targetCard.offsetLeft - container.offsetWidth/2 + targetCard.offsetWidth/2,
           behavior: 'instant'
         });
       }
       return; // Exit early so we don't snap immediately after a jump
    } else if (closestIndex >= (TOTAL_SETS - 2) * SET_SIZE) {
       // Jump backward by 10 sets
       const targetIndex = closestIndex - (SET_SIZE * 10);
       const targetCard = cards[targetIndex] as HTMLElement;
       if (targetCard) {
         container.scrollTo({
           left: targetCard.offsetLeft - container.offsetWidth/2 + targetCard.offsetWidth/2,
           behavior: 'instant'
         });
       }
       return; 
    }

    // Debounced snap logic
    if (timerRef.current) clearTimeout(timerRef.current);
    
    if (isHoveredRef.current && !dragRef.current.isDown) {
      timerRef.current = setTimeout(() => {
        if (!dragRef.current.isDown) {
          snap();
        }
      }, 150);
    }
  };

  // Run once on mount to set initial scroll position to the middle
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      setTimeout(() => {
        const cards = container.querySelectorAll('.project-card');
        if (cards.length > START_INDEX) {
          const targetCard = cards[START_INDEX] as HTMLElement;
          const scrollPos = targetCard.offsetLeft - (container.offsetWidth / 2) + (targetCard.offsetWidth / 2);
          container.scrollTo({ left: scrollPos, behavior: 'instant' });
          handleScroll();
          setIsReady(true);
        }
      }, 50);
    }
    
    // Resize handler
    const handleResize = () => {
      if (containerRef.current) {
        snap();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Setup drag and wheel listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      dragRef.current.isDown = true;
      dragRef.current.startX = e.pageX;
      dragRef.current.scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
    };

    const handleMouseLeave = () => {
      if (dragRef.current.isDown) {
        dragRef.current.isDown = false;
        container.style.cursor = "grab";
        snap();
      }
    };

    const handleMouseUp = () => {
      if (dragRef.current.isDown) {
        dragRef.current.isDown = false;
        container.style.cursor = "grab";
        snap();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDown) return;
      e.preventDefault();
      const x = e.pageX - dragRef.current.startX;
      container.scrollLeft = dragRef.current.scrollLeft - x;
    };

    const handleWheel = (e: WheelEvent) => {
      // Horizontal wheel mapping
      if (e.deltaY !== 0 && e.deltaX === 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.style.cursor = "grab";
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Auto-scroll logic (slideshow style)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isReady) {
      interval = setInterval(() => {
        if (!isHoveredRef.current && containerRef.current && !dragRef.current.isDown) {
           const container = containerRef.current;
           const center = container.scrollLeft + container.offsetWidth / 2;
           let currentIdx = 0;
           let minDistance = Infinity;
           
           const cards = container.querySelectorAll('.project-card');
           cards.forEach((card, index) => {
             const cardCenter = (card as HTMLElement).offsetLeft + (card as HTMLElement).offsetWidth / 2;
             const distance = Math.abs(center - cardCenter);
             if (distance < minDistance) {
               minDistance = distance;
               currentIdx = index;
             }
           });
           
           const nextIdx = currentIdx + 1;
           if (cards[nextIdx]) {
             const nextCard = cards[nextIdx] as HTMLElement;
             container.scrollTo({
               left: nextCard.offsetLeft - container.offsetWidth / 2 + nextCard.offsetWidth / 2,
               behavior: 'smooth'
             });
           }
        }
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isReady]);

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-[rgba(255,255,255,0.08)] overflow-hidden relative">
      {/* Immersive ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F8CFF]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="relative z-10">
        <SectionHeading 
          title="My Projects" 
          subtitle="Pioneering systems programming, low-level architecture, and applied artificial intelligence."
        />
      </div>

      <div 
        className="w-full relative [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] md:[-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      >
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          onMouseEnter={() => setHoverState(true)}
          onMouseLeave={() => setHoverState(false)}
          onTouchStart={() => setHoverState(true)}
          onTouchEnd={() => setTimeout(() => setHoverState(false), 2000)}
          className={`relative flex overflow-x-auto gap-4 md:gap-6 pb-24 pt-12 px-[calc(50%-160px)] md:px-[calc(50%-170px)] hide-scrollbar items-center perspective-[2000px] transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}
          style={{ perspective: "2000px" }}
        >
        {EXTENDED_PROJECTS.map((project, index) => {
          const offset = index - activeIndex;
          
          let scale = 1;
          let rotateY = 0;
          let opacity = 1;
          let zIndex = 20;
          let blur = 0;
          let x = 0;
          
          if (offset < 0) {
            scale = Math.max(0.7, 1 - Math.abs(offset) * 0.15);
            rotateY = Math.min(35, Math.abs(offset) * 22); 
            opacity = Math.max(0.4, 1 - Math.abs(offset) * 0.4);
            zIndex = 10 - Math.abs(offset);
            blur = Math.min(4, Math.abs(offset) * 2);
            x = Math.abs(offset) * 40; 
          } else if (offset > 0) {
            scale = Math.max(0.7, 1 - Math.abs(offset) * 0.15);
            rotateY = Math.max(-35, -Math.abs(offset) * 22);
            opacity = Math.max(0.4, 1 - Math.abs(offset) * 0.4);
            zIndex = 10 - Math.abs(offset);
            blur = Math.min(4, Math.abs(offset) * 2);
            x = Math.abs(offset) * -40; 
          }

          const isActive = offset === 0;

          return (
            <motion.div
              key={`${project.id}-${index}`}
              className="project-card min-w-[320px] max-w-[320px] md:min-w-[340px] md:max-w-[340px] w-full h-[520px] rounded-[32px] relative group shrink-0 flex flex-col"
              animate={{ 
                scale, 
                rotateY, 
                opacity,
                x,
                z: isActive ? 50 : 0,
                filter: `blur(${blur}px)`
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ zIndex, transformOrigin: 'center center' }}
            >
              {/* Gradient Glowing Border (Active) */}
              <motion.div 
                className="absolute -inset-[2px] rounded-[34px] z-0 pointer-events-none"
                animate={{ opacity: isActive ? 1 : 0 }}
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(79,140,255,1) 100%)" }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Outer Glow (Active) */}
              <motion.div 
                className="absolute -inset-[2px] rounded-[34px] z-0 pointer-events-none"
                animate={{ opacity: isActive ? 0.6 : 0 }}
                style={{ background: "linear-gradient(135deg, #ffffff 0%, #4F8CFF 100%)", filter: "blur(15px)" }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Inactive subtle border */}
              <motion.div 
                className="absolute inset-0 rounded-[32px] border border-white/10 z-10 pointer-events-none transition-opacity duration-500"
                style={{ opacity: isActive ? 0 : 1 }}
              />

              {/* Main Card Surface */}
              <div className="absolute inset-[1px] rounded-[31px] bg-[#0A0A0A] z-10 overflow-hidden">
                {/* Subtle inner top glow */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
              </div>

              {/* Content Layer */}
              <div className="relative z-20 flex flex-col h-full p-8">
                {/* Top Bar: Action Links (Absolute so it doesn't push logo down) */}
                <div className="absolute top-6 right-6 flex gap-2 z-30">
                  {project.demo && (
                     <a href={project.demo} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:scale-105 flex items-center justify-center text-white transition-all backdrop-blur-md shadow-lg">
                       <FaExternalLinkAlt size={12} />
                     </a>
                  )}
                  <a href={project.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:scale-105 flex items-center justify-center text-white transition-all backdrop-blur-md shadow-lg">
                    <FaGithub size={16} />
                  </a>
                </div>

                {/* Middle: Logo & Title */}
                <div className="flex-1 flex flex-col items-center justify-center mt-6">
                  {/* Big Logo */}
                  <div className="w-28 h-28 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl relative overflow-hidden mb-6">
                     <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                     <Image 
                       src={project.logo} 
                       alt={project.title} 
                       width={project.logoSize ? project.logoSize * 1.5 : 56} 
                       height={project.logoSize ? project.logoSize * 1.5 : 56} 
                       className={`object-contain z-10 drop-shadow-md ${project.logoClassName || ''}`}
                     />
                  </div>

                  <h4 className="text-[10px] font-bold text-[#4F8CFF] uppercase tracking-[0.2em] mb-2 text-center">
                    {project.category}
                  </h4>
                  <h3 className="text-3xl font-heading font-bold text-white tracking-tight text-center">
                    {project.title}
                  </h3>
                </div>

                {/* Bottom: Description */}
                <div className="mt-auto flex flex-col pt-6 border-t border-white/5">
                  <p className="font-sans text-[#A1A1AA] text-sm leading-relaxed line-clamp-4 text-center">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
