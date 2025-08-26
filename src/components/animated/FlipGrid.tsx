"use client";
import * as React from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(Flip);

export function FlipGrid() {
  const [reverse, setReverse] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const shuffle = () => {
    const cards = Array.from(containerRef.current!.children) as HTMLElement[];
    const state = Flip.getState(cards);
    cards.reverse().forEach((c) => containerRef.current!.appendChild(c));
    Flip.from(state, { duration: 0.6, ease: "power1.inOut", stagger: 0.03 });
    setReverse((v) => !v);
  };

  return (
    <div className="space-y-3">
      <Button onClick={shuffle} variant="secondary">
        {reverse ? "Unshuffle" : "Shuffle"}
      </Button>
      <div ref={containerRef} className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 rounded-md bg-gray-100 dark:bg-gray-800" />
        ))}
      </div>
    </div>
  );
}


