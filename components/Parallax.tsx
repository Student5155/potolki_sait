"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Медленное смещение изображения внутри рамки при прокрутке */
export function Parallax({
  children,
  className = "",
  amount = 8,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: { trigger: outer.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={outer} className={`relative overflow-hidden ${className}`}>
      <div ref={inner} className="absolute inset-x-0 -inset-y-[12%] will-change-transform">
        {children}
      </div>
    </div>
  );
}
