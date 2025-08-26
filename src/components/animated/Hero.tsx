"use client";
import * as React from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitHeading } from "@/components/animated/SplitHeading";
import { RevealOnScroll } from "@/components/animated/RevealOnScroll";

export function Hero() {
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const bounds = () => card.getBoundingClientRect();

    const onMove = (e: MouseEvent) => {
      const b = bounds();
      const relX = (e.clientX - b.left) / b.width - 0.5; // -0.5..0.5
      const relY = (e.clientY - b.top) / b.height - 0.5;
      const rotateY = relX * 16; // tilt left/right
      const rotateX = -relY * 16; // tilt up/down
      gsap.to(card, { rotateX, rotateY, transformPerspective: 600, transformOrigin: "center", duration: 0.3, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.4, ease: "power2.out" });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="w-full">
      <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 sm:py-16">
        <div className="space-y-4">
          <SplitHeading as="h1" className="text-5xl font-extrabold tracking-tight">
            Todo • Weather • Notes
          </SplitHeading>
          <RevealOnScroll>
            <p className="text-gray-600 text-lg max-w-prose">
              Organize tasks, jot quick notes, and check the weather — all in one smooth, animated interface.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="flex gap-3">
              <a href="/todos" className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90">Open Todos</a>
              <a href="/notes" className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900">Open Notes</a>
            </div>
          </RevealOnScroll>
        </div>
        <div className="flex items-center justify-center">
          <div ref={cardRef} className="relative h-40 w-64 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm dark:border-gray-800 dark:from-gray-900 dark:to-gray-950">
            <div className="absolute inset-0 grid place-items-center">
              <Image src="/next.svg" alt="App" width={140} height={40} className="opacity-80 dark:invert" />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/40 dark:ring-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}


