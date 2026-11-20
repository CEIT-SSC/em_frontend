"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { HiPaperAirplane } from "react-icons/hi2";

export default function RoadmapMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const svg = root.querySelector("svg.ssc-roadmap-route")!;
    const track = root.querySelector<SVGPathElement>(".ssc-roadmap-route-track")!;
    const ink = root.querySelector<SVGPathElement>(".ssc-roadmap-route-ink")!;
    const traveler = root.querySelector<HTMLElement>(".ssc-roadmap-traveler")!;
    const stops = Array.from(root.querySelectorAll<HTMLElement>(".ssc-roadmap-event"));
    const preference = matchMedia("(prefers-reduced-motion: no-preference)");
    let points: { x: number; y: number }[] = [];
    let length = 0;
    let visible = false;
    let dirty = true;
    let frame: number | null = null;

    function render() {
      frame = null;
      const bounds = root!.getBoundingClientRect();
      if (dirty) {
        points = stops.map(stop => {
          const marker = stop.querySelector(".ssc-roadmap-marker")!.getBoundingClientRect();
          return { x: marker.left + marker.width / 2 - bounds.left, y: marker.top + marker.height / 2 - bounds.top };
        });
        const path = points.map((point, index) => {
          if (!index) return `M${point.x},${point.y}`;
          const previous = points[index - 1];
          const middle = (previous.y + point.y) / 2;
          return `C${previous.x},${middle} ${point.x},${middle} ${point.x},${point.y}`;
        }).join(" ") + (points.length === 1 ? ` l0,1` : "");
        svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
        track.setAttribute("d", path);
        ink.setAttribute("d", path);
        length = track.getTotalLength();
        dirty = false;
      }
      if (!points.length) return;
      const reduced = !preference.matches;
      const readingY = innerHeight * 0.58 - bounds.top;
      // Find the route position at the reading line, including curved segments.
      let low = 0;
      let high = length;
      for (let iteration = 0; iteration < 12; iteration++) {
        const middle = (low + high) / 2;
        if (track.getPointAtLength(middle).y < readingY) low = middle;
        else high = middle;
      }
      const distance = reduced ? length : (low + high) / 2;
      const position = track.getPointAtLength(distance);
      const next = track.getPointAtLength(Math.min(length, distance + 2));
      const previous = track.getPointAtLength(Math.max(0, distance - 2));
      ink.style.strokeDasharray = `${length}`;
      ink.style.strokeDashoffset = `${length - distance}`;
      traveler.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) rotate(${Math.atan2(next.y - previous.y, next.x - previous.x) * 180 / Math.PI + 45}deg)`;
      stops.forEach((stop, index) => {
        stop.dataset.reached = String(reduced || points[index].y <= readingY);
        const offset = reduced ? 0 : Math.max(-1, Math.min(1, (points[index].y - readingY) / innerHeight)) * (index % 2 ? -14 : 14);
        stop.style.setProperty("--stop-drift", `${offset}px`);
      });
      root!.dataset.routeReady = "true";
      root!.dataset.singleStop = String(points.length === 1);
    }

    function update() {
      if (visible && !document.hidden && frame === null) frame = requestAnimationFrame(render);
    }
    const resizeObserver = new ResizeObserver(() => { dirty = true; update(); });
    resizeObserver.observe(root);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && frame !== null) { cancelAnimationFrame(frame); frame = null; }
      update();
    });
    intersectionObserver.observe(root);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    document.addEventListener("visibilitychange", update);
    preference.addEventListener("change", update);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("visibilitychange", update);
      preference.removeEventListener("change", update);
    };
  }, []);

  return (
    <div ref={rootRef} className="ssc-roadmap-journey">
      <svg className="ssc-roadmap-route" aria-hidden="true" preserveAspectRatio="none" focusable="false">
        <path className="ssc-roadmap-route-track" />
        <path className="ssc-roadmap-route-ink" />
      </svg>
      <span className="ssc-roadmap-traveler" aria-hidden="true"><HiPaperAirplane /></span>
      {children}
    </div>
  );
}
