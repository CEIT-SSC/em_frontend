"use client";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { motion } from "framer-motion";

type CarouselImageType = {
  src: StaticImport | string;
  alt?: string;
  width: number;
  height: number;
};

interface Props {
  images: CarouselImageType[];
  direction?: "ltr" | "rtl";
  animationDuration?: number;
}

const ImagesCarousel = ({ images, direction, animationDuration }: Props) => {
  const duplicatedImages = [...images, ...images];

  const slideWidth = 416;
  const totalDistance = slideWidth * images.length;

  return (
    <div className="overflow-hidden select-none">
      <motion.div
        className="flex"
        dir={direction === "rtl" ? "ltr" : "rtl"}
        animate={{
          x: [-0, totalDistance * (direction === "rtl" ? -1 : 1)],
        }}
        transition={{
          duration: animationDuration ?? images.length * 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="flex-none w-[400px] h-64 mr-4 select-none"
          >
            <Image
              src={image.src}
              alt={image.alt || "Event Image"}
              width={image.width}
              height={image.height}
              className="min-w-0 rounded-2xl w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImagesCarousel;
