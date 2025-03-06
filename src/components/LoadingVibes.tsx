// src/components/LoadingVibes.tsx

"use client";

import { useState, useEffect } from "react";
import type { LoadingVibesProps } from "@/types/componentTypes";

const loadingPhrases = [
  "Revibing your search query",
  "Reviving searching",
  "Vivifying search",
  "Extracting search vibes",
  "Amplifying query resonance",
  "Vibrating at search frequency"
];

export default function LoadingVibes({ isVisible }: LoadingVibesProps): JSX.Element {
  const [phrases, setPhrases] = useState<string[]>([loadingPhrases[0]]);
  const [dots, setDots] = useState("");

  // Add a new phrase every second
  useEffect(() => {
    if (!isVisible) return;
    
    const phraseInterval = setInterval(() => {
      if (phrases.length < loadingPhrases.length) {
        setPhrases(prev => [...prev, loadingPhrases[prev.length]]);
      }
    }, 1000);

    return () => clearInterval(phraseInterval);
  }, [isVisible, phrases.length]);

  // Animate the dots
  useEffect(() => {
    if (!isVisible) return;
    
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 400);

    return () => clearInterval(dotsInterval);
  }, [isVisible]);

  if (!isVisible) return <></>;

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center transition-opacity duration-300">
      <div className="space-y-2 max-w-md text-center">
        {phrases.map((phrase, index) => (
          <div 
            key={phrase} 
            className={`text-purple-500 font-medium transition-opacity duration-500 ${
              index === phrases.length - 1 ? 'opacity-100' : 'opacity-60'
            }`}
          >
            {phrase}{index === phrases.length - 1 ? dots : "..."}
          </div>
        ))}
      </div>
    </div>
  );
}