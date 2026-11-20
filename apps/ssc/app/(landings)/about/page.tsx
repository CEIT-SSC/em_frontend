import React from "react";
import TeamMemberCard from "~/app/components/TeamMemberCard";
import javad from "~/assets/members/javad.jpg";
import amirhossein from "~/assets/members/AmirhosseinAghighi.jpg";
import moein from "~/assets/members/MoeinEnayati.png";
import alireza from "~/assets/members/AlirezaNikooei.jpg";
import pourya from "~/assets/members/PouryaFahimi.jpg";
import mahdi from "~/assets/members/MahdiHaeri.jpg";

const page = () => {
  return (
    <main className="ssc-container ssc-section">
      <h1 className="ssc-section-heading">درباره ما</h1>
      <div className="max-w-prose py-4">
        <p className="text-base leading-8 text-muted mb-4">
          ما جمعی از دانشجویان علاقه‌مند به فناوری در دانشگاه صنعتی امیرکبیر
          هستیم که در بخش فنی انجمن علمی مهندسی کامپیوتر کنار هم کار می‌کنیم.
          هدف ما ساخت سامانه‌هایی است که هم کارهای دانشجویی امروز را ساده‌تر و
          منسجم‌تر کند و هم امکان رشد و گسترش در آینده داشته باشد.
        </p>
        <p className="text-base leading-8 text-muted mb-8">
          انجمن علمی برای ما جایی است که می‌توانیم با هم یاد بگیریم،
          تجربه‌هایمان را به اشتراک بگذاریم و مسیر نوآوری و همکاری را کنار هم
          ادامه دهیم؛ جایی که دانشجویان تازه‌وارد سریع‌تر مسیر خود را پیدا
          می‌کنند و همه فرصت ارتباط با صنعت و تجربه‌های تازه را به دست می‌آوریم.
        </p>
        <p className="text-base leading-8 font-semibold text-foreground mb-12">
          از همه تیممون برای این همه انرژی و وقتی که می‌ذارن ممنونیم!
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <TeamMemberCard
          name="محمدجواد اکبری"
          position="دبیر انجمن و مدیر پروژه"
          photoUrl={javad.src}
          githubUrl="https://github.com/Javad-Ak"
          linkedinUrl="https://www.linkedin.com/in/mo-ja-akbari/"
        />
        <TeamMemberCard
          name="امیرحسین عقیقی"
          position="دیزاینر و توسعه دهنده فرانت اند"
          photoUrl={amirhossein.src}
          githubUrl="https://github.com/AmirhosseinAghighi"
          linkedinUrl="https://www.linkedin.com/in/amirhossein-aghighi/"
        />
        <TeamMemberCard
          name="معین عنایتی"
          position="توسعه دهنده بک اند و دوآپس"
          photoUrl={moein.src}
          githubUrl="https://github.com/moeinEN"
          linkedinUrl="https://www.linkedin.com/in/moein-enayati"
        />
        <TeamMemberCard
          name="علیرضا نیکوئی"
          position="دوآپس"
          photoUrl={alireza.src}
          githubUrl="https://github.com/alirezanikooei"
          linkedinUrl="https://www.linkedin.com/in/alireza-nikooei-10655a1b5"
        />
        <TeamMemberCard
          name="پوریا فهیمی"
          position="توسعه دهنده فرانت اند"
          photoUrl={pourya.src}
          githubUrl="https://github.com/PouryaFahimi"
          linkedinUrl="https://www.linkedin.com/in/pourya-fahimi/"
        />
        <TeamMemberCard
          name="مهدی حائری"
          position="توسعه دهنده فرانت اند"
          photoUrl={mahdi.src}
          githubUrl="https://github.com/MahdiHaeri"
          linkedinUrl="https://www.linkedin.com/in/mahdi-haeri-4406861b9/"
        />
      </div>
    </main>
  );
};

export default page;
