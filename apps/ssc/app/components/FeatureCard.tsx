import Button from "@ui/components/button/Button";
import React from "react";
import { HiArrowLeft, HiOutlineArchive } from "react-icons/hi";

const FeatureCard = () => {
  return (
    <div className="w-100 h-110 p-2 flex flex-col gap-6 overflow-hidden">
      <HiOutlineArchive size={48} />
      <h3 className="text-[32px] font-bold">عنوان توضیح</h3>
      <p className="text-2xl text-(--TextWhite)">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی
      </p>
      <Button
        className="-ms-3"
        label="اطلاعات بیشتر"
        suffixIcon={HiArrowLeft}
      />
    </div>
  );
};

export default FeatureCard;
