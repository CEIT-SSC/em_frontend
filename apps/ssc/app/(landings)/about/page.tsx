import React from "react";
import TeamMemberCard from "~/app/components/TeamMemberCard";
import javad from "~/assets/members/javad.jpg";
import abbas from "~/assets/members/abbas.jpg";
import alireza from "~/assets/members/alireza.png";
import ashkan from "~/assets/members/ashkan.jpg";
import ashkan2 from "~/assets/members/ashkan2.png";
import behrad from "~/assets/members/behrad.jpg";
import delaraam from "~/assets/members/delaraam.png";
import saba from "~/assets/members/saba.jpg";

const page = () => {
  return (
    <div className="py-6">
      <h2 className="text-5xl/[150%] font-bold text-center">درباره ما</h2>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-lg/[160%] text-center text-whiteText mb-4">
          سلام! ما یه گروه از دانشجوهای عاشق برنامه‌نویسی و تکنولوژی هستیم که
          تصمیم گرفتیم یه سیستم کامل و راحت برای انجمن علمی دانشکده‌مون بسازیم
          تا همه چیز یه جا باشه و کارها راحت‌تر بشه.
        </p>
        <p className="text-lg/[160%] text-center text-whiteText mb-8">
          هرکی از ما توی یه بخش مختلف داره کار می‌کنه و واقعاً سخت تلاش می‌کنه.
          هدفمون اینه که یه پلتفرم درست و حسابی بسازیم که هم الان کاربردی باشه،
          هم توی آینده بتونه رشد کنه و کارهای بیشتری انجام بده.
        </p>
        <p className="text-xl/[150%] text-center font-semibold text-mainBlue mb-12">
          از همه تیممون برای این همه انرژی و وقتی که می‌ذارن ممنونیم! �
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 py-8 px-4">
        <TeamMemberCard
          name="محمدجواد اکبری"
          position="دبیر انجمن و مدیر پروژه"
          photoUrl={javad.src}
          githubUrl="https://github.com/Javad-Ak"
          linkedinUrl="https://www.linkedin.com/in/mo-ja-akbari/"
        />
      </div>
    </div>
  );
};

export default page;
