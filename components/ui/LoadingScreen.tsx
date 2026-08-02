'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Loader displays for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
        >
          <div className="loader">
            <div className="text"><span>Loading</span></div>
            <div className="text"><span>Loading</span></div>
            <div className="text"><span>Loading</span></div>
            <div className="text"><span>Loading</span></div>
            <div className="text"><span>Loading</span></div>
            <div className="text"><span>Loading</span></div>
            <div className="text"><span>Loading</span></div>
            <div className="text"><span>Loading</span></div>
            <div className="text"><span>Loading</span></div>
            <div className="line"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
