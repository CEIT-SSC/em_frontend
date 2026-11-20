import AssociationSection from "./components/Community/AssociationSection";
import EventRoadmap from "./components/Community/EventRoadmap";
import PartnersSection from "./components/Community/PartnersSection";
import EventList from "./components/Events/EventList";
// import notfound from "~/assets/notfound.png";
import ImagesCarousel from "./components/ImagesCarousel/ImagesCarousel";
import HeroSection from "./components/Hero/HeroSection";
import TeamMemberCard from "~/app/components/TeamMemberCard";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import { getHomepageGeneration } from "~/content/team";

const imagesCarousel1: string[] = [
  "/events/acpc/2.JPG",
  "/events/linuxfest/4.png",
  "/events/acpc/6.JPG",
  "/events/gamecraft/1.png",
  "/events/emit/1.png",
  "/events/gamecraft/2.png",
  "/events/linuxfest/1.png",
  "/events/acpc/1.JPG",
  "/events/linuxfest/5.png",
  "/events/gamecraft/4.png",
];

const imagesCarousel2: string[] = [
  "/events/gamecraft/3.png",
  "/events/linuxfest/3.png",
  "/events/gamecraft/6.png",
  "/events/acpc/3.JPG",
  "/events/gamecraft/5.png",
  "/events/acpc/4.JPG",
  "/events/linuxfest/2.png",
  "/events/emit/2.png",
  "/events/acpc/5.JPG",
  "/events/linuxfest/6.png",
];

export default function Home() {
  const generation = getHomepageGeneration();
  return (
    <main>
      <HeroSection />
      <div className="flex flex-col gap-3 overflow-hidden py-4" role="region" aria-label="تصاویری از رویدادهای انجمن">
        <ImagesCarousel
          direction="rtl"
          animationDuration={180}
          images={imagesCarousel1.map((image) => ({
            src: image,
            width: 400,
            height: 200,
          }))}
        />
        <ImagesCarousel
          animationDuration={180}
          images={imagesCarousel2.map((image) => ({
            src: image,
            width: 400,
            height: 200,
          }))}
        />
      </div>
      <AssociationSection />
      <section className="ssc-container ssc-section ssc-events-section" id="events" aria-labelledby="events-heading">
        <h2 id="events-heading" className="ssc-section-heading">رویدادها</h2>
        <EventList />
      </section>
      <EventRoadmap />

      <section id="team" className="ssc-container ssc-section border-t border-border" aria-labelledby="team-heading">
        <div className="ssc-team-section-heading">
          <h2 id="team-heading" className="ssc-section-heading">تیم ما</h2>
          <Link href="/members" className="ssc-team-archive-link">اعضای دوره‌های پیشین<HiArrowLeft aria-hidden="true" /></Link>
        </div>
        <p className="ssc-section-description">
          اعضای دوره {generation.number.toLocaleString("fa-IR")} انجمن علمی مهندسی کامپیوتر امیرکبیر
        </p>
        <div className="ssc-team-grid">
          {generation.members.map(member => <TeamMemberCard key={member.name} {...member} />)}
        </div>
      </section>
      <PartnersSection />
    </main>
  );
}
