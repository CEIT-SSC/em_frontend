import React from "react";
import TeamMemberCard from "~/app/components/TeamMemberCard";
import abbas from "~/assets/members/abbas.jpg";
import ashkan from "~/assets/members/ashkan.jpg";
import delaraam from "~/assets/members/delaraam.png";
import javad from "~/assets/members/javad.jpg";
import alireza from "~/assets/members/alireza.png";
import behrad from "~/assets/members/behrad.jpg";
import saba from "~/assets/members/saba.jpg";

const page = () => {
  return (
    <div className="py-6">
      <h2 className="text-5xl/[150%] font-bold text-center">تیم ما</h2>
      <p className="text-[18px]/[150%] font-bold text-(--TextWhite) text-center">
        منتخب انتخابات دور 19ام انجمن علمی مهندسی کامپیوتر امیرکبیر
      </p>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 py-8 px-4">
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
    </div>
  );
};

export default page;
