"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, User, FileText, Briefcase, Mail } from "lucide-react";

export default function MacNavbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", path: "/", icon: Terminal },
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Resume", path: "/resume", icon: FileText },
    { name: "About", path: "/about", icon: User },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
    >
      {links.map((link) => {
        const isActive = pathname === link.path;
        return (
          <Link
            key={link.name}
            href={link.path}
            className={`relative flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-full ${
              isActive ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="navbar-indicator"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative flex items-center gap-2 z-10">
              <link.icon size={14} />
              <span className="hidden sm:inline">{link.name}</span>
            </span>
          </Link>
        );
      })}
    </motion.div>
  );
}
