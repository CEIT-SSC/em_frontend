import Button, { Size } from "@ui/components/button/Button";
import React from "react";

const MiniEvent = () => {
  return (
    <div className="w-100 h-110 flex flex-col border rounded-3xl justify-between overflow-hidden">
      <img src="event.png" alt="event photo" className="h-40 object-cover" />
      <div className="h-full flex flex-col justify-between p-4">
        <div>
          <h4 className="text-2xl font-bold">مسابقه ACPC</h4>
          <p className="text-[14px]">
            دانشکده مهندسی کامپیوتر دانشگاه صنعتی امیرکبیر (پلی تکنیک تهران)
          </p>
        </div>
        <p className="text-(--TextWhite)">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
        </p>
        <div className="w-full flex justify-between items-center">
          <Button
            className="border rounded-full"
            size={Size.small}
            label="اطلاعات بیشتر"
          />
          <div className="flex items-center gap-1.5">
            <p>جمعه</p>
            <h3 className="text-[32px] font-bold">09</h3>
            <p>آبان</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniEvent;
