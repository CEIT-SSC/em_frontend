import Image from "next/image";
import TriptychMotion from "./TriptychMotion";
import "./hero-image-variants.css";

export type HeroImageVariant = "original" | "focus" | "collage" | "triptych";

const photos = {
  gamecraft: { src: "/events/gamecraft/1.png", alt: "شرکت‌کنندگان گیم‌کرفت در حال ساخت بازی و کار تیمی پشت لپ‌تاپ‌ها" },
  community: { src: "/events/linuxfest/4.png", alt: "عکس دسته‌جمعی شرکت‌کنندگان و برگزارکنندگان لینوکس‌فست" },
  contest: { src: "/events/acpc/2.JPG", alt: "هم‌فکری اعضای یک تیم در مسابقه برنامه‌نویسی ACPC" },
  maker: { src: "/events/gamecraft/3.png", alt: "یکی از شرکت‌کنندگان گیم‌کرفت در حال کار با لپ‌تاپ" },
  gathering: { src: "/events/gamecraft/5.png", alt: "عکس یادگاری جمع شرکت‌کنندگان گیم‌کرفت" },
  talk: { src: "/events/linuxfest/1.png", alt: "ارائه و حضور شرکت‌کنندگان در سالن لینوکس‌فست" },
};

function Photo({ photo, priority = false, sizes = "(min-width: 900px) 28vw, 65vw" }: {
  photo: keyof typeof photos;
  priority?: boolean;
  sizes?: string;
}) {
  // Hidden mobile artwork stays lazy; visible featured photos get higher fetch priority.
  return <Image {...photos[photo]} fill loading="lazy" fetchPriority={priority ? "high" : "auto"} sizes={sizes} className="object-cover" />;
}

export default function HeroImages({ variant = "original" }: { variant?: HeroImageVariant }) {
  if (variant === "focus") {
    return (
      <figure className="ssc-hero-visual ssc-hero-focus">
        <div className="ssc-hero-focus-photo">
          <Photo photo="contest" priority sizes="(min-width: 1280px) 584px, (min-width: 900px) 45vw, calc(100vw - 40px)" />
        </div>
        <figcaption className="ssc-hero-focus-caption">
          <div><bdi lang="en">ACPC</bdi><span>وقتی مسئله، ما را دور هم جمع می‌کند.</span></div>
          <span>از آرشیو انجمن</span>
        </figcaption>
      </figure>
    );
  }

  if (variant === "collage") {
    return (
      <figure className="ssc-hero-visual ssc-hero-collage">
        <div className="ssc-hero-collage-stage">
          <div className="ssc-hero-print ssc-hero-print-main">
            <div className="ssc-hero-print-photo"><Photo photo="gathering" priority /></div>
            <span>یک قاب، کلی هم‌مسیر.</span>
          </div>
          <div className="ssc-hero-print ssc-hero-print-talk">
            <div className="ssc-hero-print-photo"><Photo photo="talk" sizes="(min-width: 900px) 220px, 40vw" /></div>
            <bdi lang="en">LinuxFest</bdi>
          </div>
          <div className="ssc-hero-print ssc-hero-print-contest">
            <div className="ssc-hero-print-photo"><Photo photo="contest" sizes="(min-width: 900px) 250px, 45vw" /></div>
            <bdi lang="en">ACPC</bdi>
          </div>
        </div>
        <figcaption className="ssc-hero-caption"><span>خاطره‌هایی که با هم می‌سازیم</span><span>از آرشیو انجمن</span></figcaption>
      </figure>
    );
  }

  if (variant === "triptych") {
    return (
      <figure className="ssc-hero-visual ssc-hero-triptych">
        <TriptychMotion>
          <div className="ssc-hero-triptych-column">
            <div className="ssc-hero-triptych-photo"><Photo photo="maker" priority sizes="(min-width: 1280px) 190px, (min-width: 768px) 15vw, 30vw" /></div>
            <span>می‌سازیم</span><bdi lang="en">GameCraft</bdi>
          </div>
          <div className="ssc-hero-triptych-column">
            <div className="ssc-hero-triptych-photo"><Photo photo="contest" sizes="(min-width: 1280px) 190px, (min-width: 768px) 15vw, 30vw" /></div>
            <span>حل می‌کنیم</span><bdi lang="en">ACPC</bdi>
          </div>
          <div className="ssc-hero-triptych-column">
            <div className="ssc-hero-triptych-photo"><Photo photo="community" sizes="(min-width: 1280px) 190px, (min-width: 768px) 15vw, 30vw" /></div>
            <span>کنار همیم</span><bdi lang="en">LinuxFest</bdi>
          </div>
        </TriptychMotion>
      </figure>
    );
  }

  return (
    <figure className="ssc-hero-photos">
      <div className="ssc-hero-photo ssc-hero-photo-main">
        <Photo photo="gamecraft" priority sizes="(min-width: 1280px) 584px, (min-width: 900px) 45vw, calc(100vw - 40px)" />
      </div>
      <div className="ssc-hero-photo ssc-hero-photo-community"><Photo photo="community" sizes="(min-width: 900px) 260px, 50vw" /></div>
      <div className="ssc-hero-photo ssc-hero-photo-contest"><Photo photo="contest" sizes="(min-width: 900px) 280px, 50vw" /></div>
      <figcaption className="ssc-hero-caption"><span>گیم‌کرفت، لینوکس‌فست و ACPC</span><span>از آرشیو انجمن</span></figcaption>
    </figure>
  );
}
