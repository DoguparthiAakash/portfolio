"use client";

import { useState, useEffect, useCallback } from "react";

interface TypewriterTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export default function TypewriterText({
  texts,
  speed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
  className = "",
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentText.length) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
        return speed + Math.random() * 40;
      } else {
        // Pause before deleting
        setIsDeleting(true);
        return pauseTime;
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
        return deleteSpeed;
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        return speed;
      }
    }
  }, [displayText, textIndex, isDeleting, texts, speed, deleteSpeed, pauseTime]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      tick();
    }, tick());

    return () => clearTimeout(timeout);
  }, [tick]);

  return (
    <span className={className}>
      {displayText}
      <span className="ml-0.5 inline-block w-[3px] h-[1em] align-middle animate-typewriter-cursor border-r-[3px] border-[var(--primary)]" />
    </span>
  );
}
