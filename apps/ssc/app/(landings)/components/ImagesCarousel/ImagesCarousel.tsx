"use client";
import Image, { StaticImageData } from "next/image";
import { CSSProperties, useState } from "react";
import { HiPause, HiPlay } from "react-icons/hi2";

type CarouselImageType = { src: StaticImageData | string; alt?: string; width: number; height: number };
interface Props { images: CarouselImageType[]; direction?: "ltr" | "rtl"; animationDuration?: number }

export default function ImagesCarousel({ images, direction, animationDuration }: Props) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="ssc-photo-strip relative overflow-hidden select-none" dir="ltr">
      <div className="ssc-photo-track flex w-max" style={{
        "--photo-distance": `${images.length * 412}px`,
        animationDuration: `${animationDuration ?? images.length * 15}s`,
        animationDirection: direction === "rtl" ? "normal" : "reverse",
        animationPlayState: paused ? "paused" : "running",
      } as CSSProperties}>
        {[...images, ...images].map((image, index) => (
          <div key={index} aria-hidden={index >= images.length ? true : undefined} className="me-3 h-40 w-[25rem] flex-none md:h-48">
            <Image src={image.src} alt={index < images.length ? image.alt || "تصویری از رویدادهای انجمن علمی" : ""} width={image.width} height={image.height} className="h-full w-full rounded-xl object-cover" draggable={false} />
          </div>
        ))}
      </div>
      <button type="button" className="ssc-photo-toggle ssc-action ssc-action-secondary absolute bottom-2 right-3" aria-label={paused ? "پخش تصاویر" : "توقف حرکت تصاویر"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <HiPlay aria-hidden="true" /> : <HiPause aria-hidden="true" />}</button>
    </div>
  );
}
