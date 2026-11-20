"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Keep each photograph at a different depth, with the middle moving in opposition.
const motionLayers = [
  { distance: 64, response: 0.11 },
  { distance: -88, response: 0.075 },
  { distance: 48, response: 0.055 },
];

export default function TriptychMotion({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const columns = Array.from(container.children) as HTMLElement[];
    const preference = window.matchMedia(
      "(prefers-reduced-motion: no-preference)",
    );
    const positions = motionLayers.map(() => 0);
    let target = 0;
    let frame: number | null = null;
    let lastTime: number | null = null;
    let visible = false;
    let needsMeasurement = false;

    function reset() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      lastTime = null;
      target = 0;
      needsMeasurement = false;
      positions.fill(0);
      columns.forEach(column => {
        column.style.removeProperty("transform");
        column.style.removeProperty("will-change");
      });
    }

    function animate(time: number) {
      if (needsMeasurement) {
        // The stationary container anchors progress, so animated columns cannot feed back into it.
        const bounds = container!.getBoundingClientRect();
        target = Math.max(-1, Math.min(1,
          (window.innerHeight / 2 - bounds.top - bounds.height / 2) / window.innerHeight,
        ));
        needsMeasurement = false;
      }

      const elapsed = lastTime === null ? 1000 / 60 : Math.min(time - lastTime, 64);
      lastTime = time;
      let moving = false;

      motionLayers.forEach(({ distance, response }, index) => {
        const destination = target * distance;
        const blend = 1 - Math.pow(1 - response, elapsed / (1000 / 60));
        positions[index] += (destination - positions[index]) * blend;

        if (Math.abs(destination - positions[index]) < 0.05) {
          positions[index] = destination;
        } else {
          moving = true;
        }

        columns[index].style.transform = `translate3d(0, ${positions[index]}px, 0)`;
      });

      if (moving) {
        frame = requestAnimationFrame(animate);
      } else {
        frame = null;
        lastTime = null;
        columns.forEach(column => column.style.removeProperty("will-change"));
      }
    }

    function updateMotion() {
      if (!preference.matches || !visible || document.hidden) {
        reset();
        return;
      }
      needsMeasurement = true;
      if (frame === null) {
        columns.forEach(column => { column.style.willChange = "transform"; });
        frame = requestAnimationFrame(animate);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateMotion();
    });

    observer.observe(container);
    window.addEventListener("scroll", updateMotion, { passive: true });
    window.addEventListener("resize", updateMotion);
    document.addEventListener("visibilitychange", updateMotion);
    preference.addEventListener("change", updateMotion);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateMotion);
      window.removeEventListener("resize", updateMotion);
      document.removeEventListener("visibilitychange", updateMotion);
      preference.removeEventListener("change", updateMotion);
      reset();
    };
  }, []);

  return <div ref={containerRef} className="ssc-hero-triptych-columns">{children}</div>;
}
