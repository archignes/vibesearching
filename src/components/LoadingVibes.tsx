"use client";

import { useState, useEffect } from "react";
import type { LoadingVibesProps } from "@/types/componentTypes";

const loadingPhrases = [
  "Revibing your search query",
  "Reviving searching",
  "Vivifying search",
];

export default function LoadingVibes({
  isVisible,
}: LoadingVibesProps): JSX.Element {
  const [phrases, setPhrases] = useState<string[]>([]);
  const [dots, setDots] = useState("");

  // Reset phrases/dots whenever we become visible again
  useEffect(() => {
    if (isVisible) {
      setPhrases([loadingPhrases[0]]);
      setDots("");
    }
  }, [isVisible]);

  // Add a new phrase every 1s, but only while visible
  useEffect(() => {
    if (!isVisible) return;

    const phraseInterval = setInterval(() => {
      setPhrases((prev) => {
        if (prev.length < loadingPhrases.length) {
          return [...prev, loadingPhrases[prev.length]];
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(phraseInterval);
  }, [isVisible]);

  // Animate the dots every 0.4s, but only while visible
  useEffect(() => {
    if (!isVisible) return;

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev === "..." ? "" : prev + "."));
    }, 400);

    return () => clearInterval(dotsInterval);
  }, [isVisible]);

  if (!isVisible) return <></>;

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center transition-opacity duration-300">
      <div className="space-y-2 max-w-md text-center">
        {phrases.map((phrase, index) => (
          <div
            key={index}
            className={`text-purple-500 font-medium transition-opacity duration-500 ${
              index === phrases.length - 1 ? "opacity-100" : "opacity-60"
            }`}
          >
            {phrase}
            {index === phrases.length - 1 ? dots : "..."}
          </div>
        ))}
      </div>
    </div>
  );
}
