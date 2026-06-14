"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Stagger reveal across the direct children of this element */
  stagger?: number;
}

export default function Reveal({ children, className = "", delay = 0, stagger }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) : [el];

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          stagger,
          ease: "power3.out",
        });
      },
    });

    return () => trigger.kill();
  }, [delay, stagger]);

  if (stagger) {
    const items = Children.map(children, (child) =>
      isValidElement<{ className?: string }>(child)
        ? cloneElement(child, { className: clsx(child.props.className, "reveal") })
        : child
    );
    return (
      <div ref={ref} className={className}>
        {items}
      </div>
    );
  }

  return (
    <div ref={ref} className={clsx("reveal", className)}>
      {children}
    </div>
  );
}
