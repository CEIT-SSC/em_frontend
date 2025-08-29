import { Button, ButtonVariant, TextField } from "@ssc/ui";
import Link from "next/link";

const page = () => {
  return (
    <>
      <h3 className="text-4xl font-bold">ورود</h3>
      <p className="text-[20px]/[150%] font-bold">
        حساب کاربری ندارید؟{" "}
        <Link
          className="default-gradient text-transparent bg-clip-text"
          href="/register"
        >
          ثبت نام{" "}
        </Link>
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
        <p className="text-whiteText">
          رمز عبور خود را فراموش کرده اید؟{" "}
          <a className="default-gradient text-transparent bg-clip-text" href="">
            بازیابی رمز عبور
          </a>
        </p>
        <div className="w-100.5 flex flex-col items-center gap-2.5">
          <Button
            className="w-100"
            variant={ButtonVariant.PRIMARY}
            label="ورود"
          />
          <div className="flex gap-3.5">
            <Button
              className="w-48"
              variant={ButtonVariant.OUTLINE}
              label="ورود با گیتهاب"
            />
            <Button
              className="w-48"
              variant={ButtonVariant.OUTLINE}
              label="ورود با گوگل"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
