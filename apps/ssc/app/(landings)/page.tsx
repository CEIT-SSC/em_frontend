import AssociationSection from "./components/Community/AssociationSection";
import EventRoadmap from "./components/Community/EventRoadmap";
import PartnersSection from "./components/Community/PartnersSection";
import EventList from "./components/Events/EventList";
// import notfound from "~/assets/notfound.png";
import ImagesCarousel from "./components/ImagesCarousel/ImagesCarousel";
import HeroSection from "./components/Hero/HeroSection";
import TeamMemberCard from "~/app/components/TeamMemberCard";
import abbas from "~/assets/members/abbas.jpg";
import ashkan from "~/assets/members/ashkan.jpg";
import delaraam from "~/assets/members/delaraam.png";
import javad from "~/assets/members/javad.jpg";
import alireza from "~/assets/members/alireza.png";
import behrad from "~/assets/members/behrad.jpg";
import saba from "~/assets/members/saba.jpg";

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
        <h2 id="events-heading" className="ssc-section-heading">رویداد ها</h2>
        <EventList />
      </section>
      <EventRoadmap />

      <section className="ssc-container ssc-section border-t border-border" aria-labelledby="team-heading">
        <h2 id="team-heading" className="ssc-section-heading">تیم ما</h2>
        <p className="ssc-section-description">
          منتخب انتخابات دور 19ام انجمن علمی مهندسی کامپیوتر امیرکبیر
        </p>
        <div className="ssc-team-grid">
          <TeamMemberCard
            name="محمدجواد اکبری"
            position="دبیر انجمن"
            photoUrl={javad.src}
            githubUrl="https://github.com/Javad-Ak"
            linkedinUrl="https://www.linkedin.com/in/mo-ja-akbari/"
          />
          <TeamMemberCard
            name="صبا سیدطبایی"
            position="مسئول مالی"
            photoUrl={saba.src}
            linkedinUrl="https://www.linkedin.com/in/saba-seyed-tabaei"
          />
          <TeamMemberCard
            name="امیرعباس انتظاری"
            position="مسئول ارتباط با صنعت"
            photoUrl={abbas.src}
            githubUrl="https://github.com/AmirabbasEntezari"
          />
          <TeamMemberCard
            name="دلارام روحانی"
            position="مسئول آموزشی"
            photoUrl={delaraam.src}
            linkedinUrl="https://www.linkedin.com/in/delaraamroohani"
          />
          <TeamMemberCard
            name="اشکان چاجی"
            position="مسئول مسابقات"
            photoUrl={ashkan.src}
            githubUrl="https://github.com/ashkanchaji"
            linkedinUrl="https://www.linkedin.com/in/ashkan-chaji-71493434b/"
          />
          <TeamMemberCard
            name="علیرضا صفری"
            position="مسئول انفورماتیک"
            photoUrl={alireza.src}
            githubUrl="https://github.com/Alireza12ss"
            linkedinUrl="https://www.linkedin.com/in/alireza-safari-3ba3942b8/"
          />
          <TeamMemberCard
            name="بهراد حضوری"
            position="مسئول روابط عمومی"
            photoUrl={behrad.src}
            githubUrl="https://github.com/BehradHZ"
          />
        </div>
      </section>
      <PartnersSection />
    </main>
  );
}
