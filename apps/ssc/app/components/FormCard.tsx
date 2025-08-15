import Button, { Size, Variant } from "@ui/components/button/Button";
import TextField from "@ui/components/text-field/TextField";
import React from "react";

const FormCard = () => {
  return (
    <div className="w-150 h-150 bg-black rounded-3xl p-6 flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          className="border rounded-full"
          size={Size.small}
          label="بازگشت"
        />
      </div>
      <h3 className="text-4xl/[150%] font-bold w-200">ورود</h3>
      <p className="text-[20px]/[150%] font-bold">
        حساب کاربری ندارید؟{" "}
        <a className="default-gradient text-transparent bg-clip-text" href="">
          ثبت نام
        </a>{" "}
        کنید
      </p>
      <TextField
        name="alaki"
        id="a"
        label="نام کاربری"
        placeholder="نام کاربری خود را وارد کنید"
      />
      <TextField
        name="alaki"
        id="b"
        label="رمز عبور"
        guidance="رمز عبور باید شامل حروف بزرگ، حروف کوچک و عدد باشد"
        placeholder="رمز عبور خود را وارد کنید"
      />
      <div className="flex flex-col items-center py-6 px-9 gap-2.5">
        <p>
          رمز عبور خود را فراموش کرده ایده؟{" "}
          <a className="default-gradient text-transparent bg-clip-text" href="">
            بازیابی رمز عبور
          </a>
        </p>
        <div className="w-100.5 flex flex-col items-center gap-2.5">
          <Button className="w-100" variant={Variant.primary} label="ورود" />
          <div className="flex gap-3.5">
            <Button
              className="w-48"
              variant={Variant.outline}
              label="ورود با گیتهاب"
            />
            <Button
              className="w-48"
              variant={Variant.outline}
              label="ورود با گوگل"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
