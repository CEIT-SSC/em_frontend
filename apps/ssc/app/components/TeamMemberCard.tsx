import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";

const TeamMemberCard = () => {
  return (
    <div className="w-104 h-129 border rounded-3xl overflow-hidden">
      <div className="h-75 default-gradient flex justify-center">
        <img src="member.png" alt="member photo" className="h-75" />
      </div>
      <div className="flex flex-col gap-2.5 py-2.5 px-4">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl/[150%] font-semibold">اشکان چاجی</h4>
          <p className="text-(--TextWhite) font-semibold">دبیر انجمن علمی</p>
        </div>
        <p className="text-(--TextWhite)/[150%]">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
        </p>
        <div className="flex justify-center gap-2.5 text-2xl">
          <a href="">
            <FaGithub />
          </a>
          <a href="">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
