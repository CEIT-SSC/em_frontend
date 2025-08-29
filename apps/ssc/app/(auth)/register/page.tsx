import { Button, ButtonSize, ButtonVariant, TextField } from "@ssc/ui";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

const page = () => {
  return (
    <>
      <h3 className="text-4xl font-bold">ثبت نام</h3>
      <p className="text-[20px]/[150%] font-bold">
        حساب کاربری دارید؟ وارد شوید کنید{" "}
        <Link
          className="default-gradient text-transparent bg-clip-text"
          href="/login"
        >
          وارد شوید
        </Link>
      </p>
      <TextField
        name="alaki"
        id="a"
        label="نام کاربری"
        placeholder="نام کاربری خود را وارد کنید"
      />
      <TextField
        name="alaki"
        id="a"
        label="ایمیل"
        placeholder="ایمیل خود را وارد کنید"
      />
      <TextField
        name="alaki"
        id="b"
        label="رمز عبور"
        guidance="رمز عبور باید شامل حروف بزرگ، حروف کوچک و عدد باشد"
        placeholder="رمز عبور خود را وارد کنید"
      />
      <TextField
        name="alaki"
        id="b"
        label="تکرار رمز عبور"
        guidance="تکرار رمز عبور باید شامل حروف بزرگ، حروف کوچک و عدد باشد"
        placeholder="رمز عبور خود را تکرار کنید"
      />
      <div className="flex flex-col items-center py-6 px-9 gap-2.5">
        <div className="w-100.5 flex flex-col items-center gap-2.5">
          <Button
            className="w-100"
            variant={ButtonVariant.PRIMARY}
            label="ثبت نام"
          />
        </div>
      </div>
    </>
  );
};

export default page;
