import { Button, ButtonVariant, PhoneNumberField, TextField } from "@ssc/ui";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "react-toastify";
import { useState } from "react";
import { ApiModule } from "@ssc/core";

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
    email: z.string().email({ message: "ایمیل وارد شده معتبر نیست" }),
    phoneNumber: z
      .string()
      .min(10, { message: "شماره تلفن باید 11 رقم باشد" })
      .max(10, { message: "شماره تلفن باید 11 رقم باشد" })
      .regex(/^9[0-9]{9}$/, { message: "شماره تلفن وارد شده معتبر نیست" }),
    password: z
      .string()
      .min(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" })
      .max(32, { message: "رمز عبور باید حداکثر 32 کاراکتر باشد" })
      .regex(/[A-Z]/, { message: "رمز عبور باید شامل حداقل یک حرف بزرگ باشد" })
      .regex(/[a-z]/, { message: "رمز عبور باید شامل حداقل یک حرف کوچک باشد" })
      .regex(/[0-9]/, { message: "رمز عبور باید شامل حداقل یک عدد باشد" }),
    confirmPassword: z.string(),
    firstName: z
      .string()
      .min(2, { message: "حداقل 2 کاراکتر باشد" })
      .max(150, { message: "حداکثر 150 کاراکتر باشد" }),
    lastName: z
      .string()
      .min(2, { message: "حداقل 2 کاراکتر باشد" })
      .max(150, { message: "حداکثر 150 کاراکتر باشد" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمزهای عبور مطابقت ندارند",
    path: ["confirmPassword"],
  });

interface Props {
  nextStep: () => void;
  submitCallback: (mail: string) => void;
}

export const RegisterStepOne = ({ nextStep, submitCallback }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
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

      const response = await ApiModule.auth.register(registrationData);
      if (response.status === 201 || response.status === 200) {
        submitCallback(registrationData.email);
        nextStep();
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.email) {
        toast.error("این ایمیل قبلاً ثبت شده است");
      } else if (error.response?.data?.phone_number) {
        toast.error("این شماره تلفن قبلاً ثبت شده است");
      } else {
        toast.error("خطایی در ثبت نام رخ داد. لطفاً دوباره تلاش کنید.");
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
        <h3 className="text-4xl font-bold">ثبت نام</h3>
        <p className="text-[20px]/[150%] font-bold">
          حساب کاربری دارید؟{" "}
          <Link
            className="default-gradient text-transparent bg-clip-text"
            href="/login"
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
          placeholder="نام خود را وارد کنید"
          errorText={errors.firstName?.message}
          disabled={isLoading}
          required
          {...register("firstName")}
        />
        <TextField
          name="lastName"
          id="lastName"
          label="نام خانوادگی"
          placeholder="نام خانوادگی خود را وارد کنید"
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
        label="ایمیل"
        placeholder="ایمیل خود را وارد کنید"
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
        label="رمز عبور"
        guidance="رمز عبور باید شامل حروف بزرگ، حروف کوچک و عدد باشد"
        placeholder="رمز عبور خود را وارد کنید"
        errorText={errors.password?.message}
        disabled={isLoading}
        required
        {...register("password")}
      />

      <TextField
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        label="تکرار رمز عبور"
        placeholder="رمز عبور خود را تکرار کنید"
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
            label="ثبت نام"
            type="submit"
            loading={isLoading}
          />
        </div>
      </div>
    </form>
  );
};
