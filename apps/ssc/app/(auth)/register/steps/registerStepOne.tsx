import { Button, ButtonVariant, PhoneNumberField, TextField } from "@ssc/ui";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "react-toastify";
import { useState } from "react";
import { clientApi } from "~/core/api/client/clientApi";
import { useSearchParams } from "next/navigation";

type Inputs = {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const userSchema = z
  .object({
    email: z.string().email({ message: "یک آدرس ایمیل معتبر وارد کنید" }),
    phoneNumber: z
      .string()
      .min(10, { message: "شماره موبایل را در ۱۰ رقم و بدون صفر اول وارد کنید" })
      .max(10, { message: "شماره موبایل را در ۱۰ رقم و بدون صفر اول وارد کنید" })
      .regex(/^9[0-9]{9}$/, { message: "شماره موبایل را با ۹ و بدون صفر اول وارد کنید" }),
    password: z
      .string()
      .min(8, { message: "رمز عبور باید دست‌کم ۸ کاراکتر داشته باشد" })
      .max(32, { message: "رمز عبور باید حداکثر ۳۲ کاراکتر داشته باشد" })
      .regex(/[A-Z]/, { message: "یک حرف بزرگ انگلیسی به رمز عبور اضافه کنید" })
      .regex(/[a-z]/, { message: "یک حرف کوچک انگلیسی به رمز عبور اضافه کنید" })
      .regex(/[0-9]/, { message: "یک عدد به رمز عبور اضافه کنید" }),
    confirmPassword: z.string(),
    firstName: z
      .string()
      .min(2, { message: "دست‌کم ۲ حرف وارد کنید" })
      .max(150, { message: "حداکثر ۱۵۰ کاراکتر وارد کنید" }),
    lastName: z
      .string()
      .min(2, { message: "دست‌کم ۲ حرف وارد کنید" })
      .max(150, { message: "حداکثر ۱۵۰ کاراکتر وارد کنید" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "تکرار رمز عبور با رمز اول یکی نیست",
    path: ["confirmPassword"],
  });

interface Props {
  nextStep: () => void;
  submitCallback: (mail: string) => void;
}

// TODO: create a formatter for phone number input to have persian digits in ui

export const RegisterStepOne = ({ nextStep, submitCallback }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);

      const registrationData = {
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        firstName: data.firstName,
        lastName: data.lastName,
      };
      // TODO: save this in a redux store so we can restore inputs data after back button clicked

      const response = await clientApi.auth.register(registrationData);
      if (response.status === 201 || response.status === 200) {
        submitCallback(registrationData.email);
        nextStep();
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.email) {
        toast.error("با این ایمیل قبلاً ثبت‌نام کرده‌اید. وارد حسابتان شوید.");
      } else if (error.response?.data?.phone_number) {
        toast.error("با این شماره موبایل قبلاً ثبت‌نام کرده‌اید.");
      } else {
        toast.error("ثبت‌نام انجام نشد. دوباره تلاش کنید.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-max"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">ثبت‌نام</h1>
        <p className="text-sm leading-7 text-muted">
          حساب کاربری دارید؟{" "}
          <Link
            className="ssc-inline-link"
            href={{
              pathname: "/login",
              query: Object.fromEntries(params.entries()),
            }}
          >
            وارد شوید
          </Link>
        </p>
      </div>

      <div className="w-full flex flex-col justify-between sm:flex-row gap-4">
        <TextField
          name="firstName"
          id="firstName"
          label="نام"
          placeholder="نامتان را وارد کنید"
          errorText={errors.firstName?.message}
          disabled={isLoading}
          required
          {...register("firstName")}
        />
        <TextField
          name="lastName"
          id="lastName"
          label="نام خانوادگی"
          placeholder="نام خانوادگی‌تان را وارد کنید"
          errorText={errors.lastName?.message}
          disabled={isLoading}
          required
          {...register("lastName")}
        />
      </div>

      <TextField
        name="email"
        id="email"
        type="email"
        autoComplete="email"
        dir="ltr"
        label="ایمیل"
        placeholder="ایمیلتان را وارد کنید"
        errorText={errors.email?.message}
        disabled={isLoading}
        required
        {...register("email")}
      />

      <PhoneNumberField
        name="phoneNumber"
        id="phoneNumber"
        label="شماره تلفن همراه"
        placeholder="9123456789"
        errorText={errors.phoneNumber?.message}
        disabled={isLoading}
        required
        maxLength={10}
        {...register("phoneNumber")}
      />

      <TextField
        name="password"
        id="password"
        type="password"
        autoComplete="new-password"
        label="رمز عبور"
        guidance="رمز عبور: ۸ تا ۳۲ کاراکتر، با حرف بزرگ و کوچک انگلیسی و عدد"
        placeholder="رمز عبورتان را وارد کنید"
        errorText={errors.password?.message}
        disabled={isLoading}
        required
        {...register("password")}
      />

      <TextField
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
        label="تکرار رمز عبور"
        placeholder="همان رمز عبور را دوباره وارد کنید"
        errorText={errors.confirmPassword?.message}
        disabled={isLoading}
        required
        {...register("confirmPassword")}
      />

      <div className="flex flex-col items-center py-4 md:py-6 md:px-9 gap-2.5">
        <div className="w-full flex flex-col items-center gap-2.5">
          <Button
            className="w-full"
            variant={ButtonVariant.PRIMARY}
            label="ثبت‌نام"
            type="submit"
            loading={isLoading}
          />
        </div>
      </div>
    </form>
  );
};
