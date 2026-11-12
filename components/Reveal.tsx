"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** rv — сдвиг и проявление, rv-mask — раскрытие маской, rv-lines — построчный заголовок */
  variant?: "rv" | "rv-mask" | "rv-lines";
  delay?: number;
  as?: ElementType;
  style?: CSSProperties;
};

export function Reveal({ children, className = "", variant = "rv", delay = 0, as, style }: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`${variant} ${className}`} style={{ "--d": `${delay}ms`, ...style } as CSSProperties}>
      {children}
    </Tag>
  );
}

/** Заголовок, раскрывающийся построчно */
export function Lines({
  lines,
  as = "h2",
  className = "",
  delay = 0,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal as={as} variant="rv-lines" className={`h-display ${className}`} delay={delay}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span style={{ "--i": i } as CSSProperties}>{line} </span>
        </span>
      ))}
    </Reveal>
  );
}
