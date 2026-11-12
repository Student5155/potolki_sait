"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Плавная прокрутка — только на устройствах с мышью и без запрета на анимацию */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -64 } });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}

export function lockScroll(lock: boolean) {
  if (typeof window === "undefined") return;
  if (lock) window.__lenis?.stop();
  else window.__lenis?.start();
  document.documentElement.style.overflow = lock ? "hidden" : "";
}
