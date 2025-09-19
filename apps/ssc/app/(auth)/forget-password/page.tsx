"use client";
import { useState, Suspense } from "react";
import { Button, ButtonSize, ButtonVariant } from "@ssc/ui";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "@bprogress/next";
import { ForgetStepOne } from "./steps/ForgetStepOne";
import { ForgetStepTwo } from "./steps/ForgetStepTwo";
import Link from "next/link";

const RegisterContent = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const onBackButtonClick = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      {step === 0 && (
        <Link href={"/login"} className="w-full flex justify-end">
          <Button
            className="flex justify-end bg-none !rounded-full text-whiteText"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.OUTLINE}
            label={"بازگشت به ورود"}
            suffixIcon={MdArrowBack}
            onClick={onBackButtonClick}
          />
        </Link>
      )}
      {step === 0 && <ForgetStepOne nextStep={onNextStep} />}
      {step === 1 && <ForgetStepTwo />}
    </>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full flex items-center justify-center h-64">
          <div className="text-center text-whiteText">در حال بارگذاری...</div>
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
};

export default Page;
