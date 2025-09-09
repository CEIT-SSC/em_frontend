"use client";

import { Button, ButtonVariant, TextField } from "@ssc/ui";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "@bprogress/next";
import { signIn, getSession } from "next-auth/react";

type Inputs = {
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z.string().email({ message: "ایمیل وارد شده معتبر نیست" }),
  password: z.string().min(1, { message: "رمز عبور الزامی است" }),
});

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.ok) {
        // Get the session to access the tokens
        const session = await getSession();
        if (session?.user) {
          toast.success("ورود با گوگل موفقیت‌آمیز بود");
          router.push("/");
        }
      } else if (result?.error) {
        toast.error("خطا در ورود با گوگل");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("خطا در ورود با گوگل");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
      if (res.status === 200) {
        toast.success("ورود موفقیت‌آمیز بود");
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("خطا در ورود");
    } finally {
      setIsLoading(false);
    }
    // dispatch(login(data));
  };

  return (
    <div className="flex flex-col gap-4 h-max">
      <div className="flex flex-col gap-2">
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
      </div>

      <TextField
        name="email"
        id="email"
        type="email"
        label="ایمیل"
        placeholder="ایمیل خود را وارد کنید"
        errorText={errors.email?.message}
        disabled={isLoading}
        required
        {...register("email")}
      />

      <TextField
        name="password"
        id="password"
        type="password"
        label="رمز عبور"
        placeholder="رمز عبور خود را وارد کنید"
        errorText={errors.password?.message}
        disabled={isLoading}
        required
        {...register("password")}
      />
      <div className="flex flex-col items-center py-6 px-9 gap-2.5">
        <p className="text-whiteText">
          رمز عبور خود را فراموش کرده اید؟{" "}
          <a className="default-gradient text-transparent bg-clip-text" href="">
            بازیابی رمز عبور
          </a>
        </p>
        <div className="w-full md:w-3/4 flex flex-col items-center gap-4">
          <Button
            className="w-full"
            variant={ButtonVariant.PRIMARY}
            label="ورود"
            loading={isLoading}
            onClick={handleSubmit(onSubmit)}
          />
          <div className="w-full flex gap-3.5">
            {/* <Button
              className="w-48 bg-secondary-background text-whiteText"
              variant={ButtonVariant.OUTLINE}
              label="ورود با گیتهاب"
            /> */}
            <Button
              className="w-full bg-secondary-background text-whiteText"
              variant={ButtonVariant.OUTLINE}
              label="ورود با گوگل"
              onClick={handleGoogleSignIn}
              loading={isGoogleLoading}
              disable={isLoading || isGoogleLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
