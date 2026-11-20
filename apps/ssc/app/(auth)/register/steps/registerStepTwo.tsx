import { Button, ButtonVariant } from "@ssc/ui";
import { digitsToHindi, digitsToLatin } from "../../../../utils/digitsToHindi";
import { FormEventHandler, useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import { clientApi } from "~/core/api/client/clientApi";

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
      toast.error("کد تأیید ۶ رقمی را کامل وارد کنید");
      return;
    }

    try {
      await clientApi.auth.verifyEmail(mail, digitsToLatin(otp));
      nextStep();
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error("کد تأیید درست نیست. دوباره بررسی کنید.");
      } else {
        toast.error("ایمیل تأیید نشد. دوباره تلاش کنید.");
      }
    }
  };

  const resendOtp = async () => {
    try {
      await clientApi.auth.resendOtp(mail);
      toast.success("کد تأیید را دوباره فرستادیم");
      setRemainingTime(120);
    } catch {
      toast.error("کد تأیید ارسال نشد. دوباره تلاش کنید.");
    }
  };

  return (
    <form className="flex flex-col gap-4 h-max" noValidate onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">تأیید ایمیل</h1>
        <p className="text-sm leading-7 text-muted text-whiteText">
          کد تأیید را به{" "}
          <span className="ssc-inline-link">
            {mail}
          </span>{" "}
          فرستادیم.
        </p>
        <p className="text-sm leading-7 text-muted text-whiteText">
          ایمیل را پیدا نکردید؟ پوشه اسپم را هم ببینید.
        </p>
      </div>

      <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={OTP_LENGTH}
        containerStyle="flex flex-row-reverse gap-4 justify-center px-4 sm:px-24"
        inputStyle="border-b-2 w-48 gradient-border !w-full outline-none text-3xl font-bold"
        shouldAutoFocus
        inputType="text"
        renderInput={(props) => <input {...props} />}
      />

      <div className="flex flex-col items-center py-4 md:py-6 md:px-9 gap-2.5">
        <div className="w-full flex flex-col items-center gap-2.5">
          <p
            className="ssc-inline-link font-medium text-lg cursor-pointer"
            onClick={remainingTime <= 0 ? resendOtp : undefined}
          >
            {remainingTime > 0 ? digitsToHindi(remainingTime) : "ارسال دوباره کد"}
          </p>
          <Button
            className="w-full"
            variant={ButtonVariant.PRIMARY}
            label="تأیید ایمیل"
            type="submit"
            loading={isLoading}
            disable={otp.length < OTP_LENGTH}
          />
        </div>
      </div>
    </form>
  );
};
