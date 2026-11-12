"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Телефоны и планшеты: эффекты, привязанные к прокрутке, там отключаем — они дают рывки */
export const isTouchLayout = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse), (max-width: 767px)").matches;

export { gsap, ScrollTrigger };
