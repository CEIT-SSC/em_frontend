import Image from "next/image";
import React from "react";
import { Button, ButtonSize, TextField } from "@ssc/ui";

const page = () => {
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="text-5xl font-bold">اطلاعات من</h2>
      <div className="py-8 px-4 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2.5">
          <Image
            width={128}
            height={128}
            src="/event.png"
            alt="profile photo"
            className="w-32 h-32 rounded-full"
          />
          <Button
            size={ButtonSize.SMALL}
            className="border rounded-full"
            label="ویرایش عکس"
          />
        </div>
        <div className="flex pt-3 gap-3">
          <TextField id="first-name" name="info" label="نام" />
          <TextField id="last-name" name="info" label="نام خانوادگی" />
        </div>
        <div className="flex pt-3 gap-3">
          <TextField id="first-name" name="info" label="مقطع تحصیلی" />
          <TextField id="university" name="info" label="دانشگاه" />
        </div>
        <div className="pt-3">
          <TextField
            id="student-number"
            name="info"
            type="number"
            label="شماره دانشجویی"
          />
        </div>
      </div>
      <div className="flex justify-center py-6 px-32">
        <Button
          className="bg-(--MainGray) text-whiteText w-full"
          size={ButtonSize.SMALL}
          label="ویرایش اطلاعات"
        />
      </div>
    </div>
  );
};

export default page;
