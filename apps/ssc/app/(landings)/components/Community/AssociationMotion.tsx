"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Follow the reader through the process without hiding or moving the copy.
export default function AssociationMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>(".ssc-association-process li"));
    const preference = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let visible = false;
    let frame: number | null = null;

    function reset() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      root!.removeAttribute("data-scroll-motion");
      steps.forEach(step => {
        step.removeAttribute("data-reached");
        step.style.removeProperty("--connection-progress");
      });
    }

    function measure() {
      frame = null;
      // Read geometry together before updating styles. The marker is 2rem tall.
      const centers = steps.map(step => {
        const marker = step.firstElementChild!;
        const bounds = marker.getBoundingClientRect();
        return bounds.top + bounds.height / 2;
      });
      const readingLine = window.innerHeight * 0.62;
      root!.setAttribute("data-scroll-motion", "true");
      steps.forEach((step, index) => {
        step.setAttribute("data-reached", String(centers[index] <= readingLine));
        if (index < steps.length - 1) {
          const progress = Math.max(0, Math.min(1,
            (readingLine - centers[index]) / Math.max(1, centers[index + 1] - centers[index]),
          ));
          step.style.setProperty("--connection-progress", String(progress));
        }
      });
    }

    function update() {
      if (!preference.matches || document.hidden) {
        reset();
        return;
      }
      if (visible && frame === null) frame = requestAnimationFrame(measure);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      update();
    });
    observer.observe(root);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    document.addEventListener("visibilitychange", update);
    preference.addEventListener("change", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("visibilitychange", update);
      preference.removeEventListener("change", update);
      reset();
    };
  }, []);

  return <div ref={rootRef} className="ssc-association-work">{children}</div>;
}
