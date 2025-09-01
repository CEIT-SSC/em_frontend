import React from "react";
import { Button, ButtonSize, TextField } from "@ssc/ui";

const page = () => {
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="text-5xl font-bold">ویرایش حساب کاربری</h2>
      <div className="flex flex-col gap-7 py-8 px-4">
        <TextField id="username" name="account" label="نام کاربری" />
        <TextField id="email" name="account" label="ایمیل" />
        <div className="flex gap-3">
          <TextField id="old-password" name="account" label="رمز فعلی" />
          <TextField id="new-password" name="account" label="رمز جدید" />
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
