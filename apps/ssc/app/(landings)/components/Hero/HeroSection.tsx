import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import HeroImages, { type HeroImageVariant } from "./HeroImages";

export default function HeroSection({ imageVariant = "triptych" }: { imageVariant?: HeroImageVariant }) {
  return (
      <section className="ssc-container ssc-hero" aria-labelledby="hero-heading">
        <div className="ssc-hero-copy">
          <h1 id="hero-heading" className="ssc-hero-heading">
            از هم یاد می‌گیریم،
            <span>با هم می‌سازیم</span>
          </h1>
          <p className="ssc-hero-description">
            ما انجمن علمی مهندسی کامپیوتر امیرکبیریم. کنار هم یاد می‌گیریم و
            می‌سازیم؛ از دنیای متن‌باز و بازی‌سازی تا هوش مصنوعی و رقابت‌های
            برنامه‌نویسی.
          </p>
          <div className="ssc-hero-actions">
            <a href="#events" className="ssc-action ssc-action-primary">
              رویدادها را ببینید
              <HiArrowLeft aria-hidden="true" />
            </a>
            <Link href="/about" className="ssc-hero-about">
              با ما آشنا شوید
              <HiArrowLeft aria-hidden="true" />
            </Link>
          </div>
          <ul className="ssc-hero-events" aria-label="از رویدادهای انجمن">
            <li><bdi lang="en">LinuxFest</bdi><span>دنیای متن‌باز</span></li>
            <li><bdi lang="en">GameCraft</bdi><span>بازی‌سازی</span></li>
            <li><bdi lang="en">AAISS</bdi><span>هوش مصنوعی</span></li>
            <li><bdi lang="en">ACPC</bdi><span>برنامه‌نویسی</span></li>
          </ul>
        </div>
        <HeroImages variant={imageVariant} />
      </section>
  );
}
