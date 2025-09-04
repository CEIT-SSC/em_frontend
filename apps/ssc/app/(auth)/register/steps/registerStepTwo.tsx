import { Button, ButtonVariant } from "@ssc/ui";
import { digitsToHindi, digitsToLatin } from "../../../../utils/digitsToHindi";
import { FormEventHandler, useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { ApiModule } from "@ssc/core";
import { toast } from "react-toastify";

interface Props {
  nextStep: () => void;
  email: string;
}

const OTP_LENGTH = 6;

export const RegisterStepTwo = ({ nextStep, email: mail }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [remainingTime, setRemainingTime] = useState(120);

  useEffect(() => {
    setOtp(digitsToHindi(otp));
  }, [otp]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (remainingTime <= 0) return;
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [remainingTime]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (otp.length < OTP_LENGTH) {
      toast.error("کد تایید را به درستی وارد کنید");
      return;
    }

    try {
      await ApiModule.auth.verifyEmail(mail, digitsToLatin(otp));
      nextStep();
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error("کد تایید اشتباه است");
      } else {
        toast.error("خطایی در تایید ایمیل رخ داد. لطفاً دوباره تلاش کنید.");
      }
    }
  };

  const resendOtp = async () => {
    try {
      await ApiModule.auth.resendOtp(mail);
      toast.success("کد تایید مجددا ارسال شد");
      setRemainingTime(120);
    } catch {
      toast.error("خطا در ارسال مجدد کد تایید");
    }
  };

  return (
    <form className="flex flex-col gap-4 h-max" noValidate onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <h3 className="text-4xl font-bold">تایید ایمیل</h3>
        <p className="text-[20px]/[150%] font-bold text-whiteText">
          کد تایید به ایمیل شما به آدرس{" "}
          <span className="default-gradient text-transparent bg-clip-text">
            {mail}
          </span>{" "}
          ارسال شده است.
        </p>
        <p className="text-[20px]/[150%] font-bold text-whiteText">
          پوشه اسپم ایمیل خود را نیز چک کنید.
        </p>
      </div>

      <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={OTP_LENGTH}
        containerStyle="flex flex-row-reverse gap-4 justify-center px-24"
        inputStyle="border-b-2 w-48 gradient-border !w-full outline-none text-4xl font-bold"
        shouldAutoFocus
        inputType="text"
        renderInput={(props) => <input {...props} />}
      />

      <div className="flex flex-col items-center py-4 md:py-6 md:px-9 gap-2.5">
        <div className="w-full flex flex-col items-center gap-2.5">
          <p
            className="default-gradient text-transparent bg-clip-text font-medium text-lg cursor-pointer"
            onClick={remainingTime <= 0 ? resendOtp : undefined}
          >
            {remainingTime > 0 ? digitsToHindi(remainingTime) : "ارسال مجدد"}
          </p>
          <Button
            className="w-full"
            variant={ButtonVariant.PRIMARY}
            label="ثبت نام"
            type="submit"
            loading={isLoading}
            disable={otp.length < OTP_LENGTH}
          />
        </div>
      </div>
    </form>
  );
};
