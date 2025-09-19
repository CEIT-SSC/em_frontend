import { Button, ButtonVariant, TextField } from "@ssc/ui";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { clientApi } from "~/core/api/client/clientApi";

type Inputs = {
  email: string;
};

const forgetPasswordSchema = z.object({
  email: z.string().email({ message: "ایمیل وارد شده معتبر نیست" }),
});

interface Props {
  nextStep: () => void;
}

export const ForgetStepOne = ({ nextStep }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(forgetPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      await clientApi.auth.forgotPassword(data.email);
      nextStep();
    } catch (error) {
      console.error("Error submitting form:", error);
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
        <h3 className="text-4xl font-bold">فراموشی رمز عبور</h3>
        <p className="text-lg opacity-870 font-bold mt-2">
          ایمیل حساب کاربری خود را وارد کنید
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
      <div className="flex flex-col items-center py-4 md:py-6 md:px-9 gap-2.5">
        <div className="w-full flex flex-col items-center gap-2.5">
          <Button
            className="w-full"
            variant={ButtonVariant.PRIMARY}
            label="دریافت رمز موقت"
            type="submit"
            loading={isLoading}
          />
        </div>
      </div>
    </form>
  );
};
