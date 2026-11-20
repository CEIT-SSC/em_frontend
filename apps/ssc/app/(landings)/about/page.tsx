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
      <h1 className="ssc-section-heading">تیم پشت این سایت</h1>
      <div className="max-w-prose py-4">
        <p className="text-base leading-8 text-muted mb-4">
          ما بچه‌های تیم فنی انجمنیم. این سایت رو درست کردیم تا پیدا کردن
          رویدادها، ثبت‌نام و کارهای تیم‌ها راحت‌تر بشه. با هر برنامه هم
          سعی می‌کنیم سایت رو بهتر کنیم.
        </p>
        <p className="text-base leading-8 text-muted mb-8">
          خودمون هم توی همین مسیر یاد می‌گیریم؛ کد می‌زنیم، ایده‌هامون رو
          امتحان می‌کنیم و هر جا به مشکلی می‌خوریم، از هم کمک می‌گیریم.
        </p>
        <p className="text-base leading-8 font-semibold text-foreground mb-12">
          ممنون از همه بچه‌های تیم که برای این سایت وقت و انرژی گذاشتن.
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
          position="دیزاینر و توسعه‌دهنده فرانت‌اند"
          photoUrl={amirhossein.src}
          githubUrl="https://github.com/AmirhosseinAghighi"
          linkedinUrl="https://www.linkedin.com/in/amirhossein-aghighi/"
        />
        <TeamMemberCard
          name="معین عنایتی"
          position="توسعه‌دهنده بک‌اند و دوآپس"
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
          position="توسعه‌دهنده فرانت‌اند"
          photoUrl={pourya.src}
          githubUrl="https://github.com/PouryaFahimi"
          linkedinUrl="https://www.linkedin.com/in/pourya-fahimi/"
        />
        <TeamMemberCard
          name="مهدی حائری"
          position="توسعه‌دهنده فرانت‌اند"
          photoUrl={mahdi.src}
          githubUrl="https://github.com/MahdiHaeri"
          linkedinUrl="https://www.linkedin.com/in/mahdi-haeri-4406861b9/"
        />
      </div>
    </main>
  );
};

export default page;
