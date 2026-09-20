"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const layers = [
  {
    className: "gc-home-parallax__layer--back",
    src: "/assets/images/hollow-knight/hero/hornet.png",
    alt: "Hornet from Hollow Knight",
    depth: 1,
  },
  {
    className: "gc-home-parallax__layer--logo",
    src: "/images/dark-3d.svg",
    alt: "GameCraft logo",
    depth: 0.8,
  },
  {
    className: "gc-home-parallax__layer--front",
    src: "/assets/images/hollow-knight/hero/knight.png",
    alt: "The Knight from Hollow Knight",
    depth: 0.55,
  },
] as const;

export function HomeParallaxArtwork() {
  const artworkRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const artwork = artworkRef.current;
    if (!artwork) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interactionSurface =
      artwork.closest<HTMLElement>(".gc-home-intro") ?? artwork;

    const layerElements = Array.from(
      artwork.querySelectorAll<HTMLElement>("[data-parallax-depth]")
    );

    const updateLayers = (timestamp: number) => {
      const position = positionRef.current;
      const target = targetRef.current;
      const previousTimestamp = lastFrameTimeRef.current ?? timestamp;
      const elapsed = Math.min(timestamp - previousTimestamp, 64);
      const easing = 1 - Math.exp(-elapsed / 105);

      lastFrameTimeRef.current = timestamp;
      position.x += (target.x - position.x) * easing;
      position.y += (target.y - position.y) * easing;

      layerElements.forEach((layer) => {
        const depth = Number(layer.dataset.parallaxDepth);
        layer.style.setProperty("--layer-x", `${position.x * depth}px`);
        layer.style.setProperty("--layer-y", `${position.y * depth}px`);
      });
      if (Math.hypot(target.x - position.x, target.y - position.y) > 0.01) {
        frameRef.current = requestAnimationFrame(updateLayers);
      } else {
        frameRef.current = null;
        lastFrameTimeRef.current = null;
      }
    };

    const animate = () => {
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(updateLayers);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = interactionSurface.getBoundingClientRect();
      targetRef.current = {
        x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 18,
        y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 14,
      };
      animate();
    };

    const resetPosition = () => {
      targetRef.current = { x: 0, y: 0 };
      animate();
    };

    interactionSurface.addEventListener("pointermove", handlePointerMove);
    interactionSurface.addEventListener("pointerleave", resetPosition);
    return () => {
      interactionSurface.removeEventListener("pointermove", handlePointerMove);
      interactionSurface.removeEventListener("pointerleave", resetPosition);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={artworkRef}
      className="gc-home-parallax"
      aria-label="GameCraft and Hollow Knight artwork"
      role="img"
    >
      <div className="gc-home-parallax__glow" aria-hidden="true" />
      {layers.map((layer) => (
        <img
          key={layer.src}
          className={`gc-home-parallax__layer ${layer.className}`}
          src={layer.src}
          alt={layer.alt}
          data-parallax-depth={layer.depth}
          style={
            {
              "--layer-x": "0px",
              "--layer-y": "0px",
              "--layer-z": `${layer.depth * 35}px`,
            } as CSSProperties
          }
          draggable={false}
        />
      ))}
    </div>
  );
}
