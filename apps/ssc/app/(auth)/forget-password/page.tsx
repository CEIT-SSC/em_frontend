"use client";
import { useState, Suspense } from "react";
import { MdArrowBack } from "react-icons/md";
import { ForgetStepOne } from "./steps/ForgetStepOne";
import { ForgetStepTwo } from "./steps/ForgetStepTwo";
import Link from "next/link";

const RegisterContent = () => {
  const [step, setStep] = useState(0);

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <>
      {step === 0 && (
        <div className="mb-6 flex justify-end"><Link href="/login" className="ssc-action ssc-action-secondary">بازگشت به ورود<MdArrowBack aria-hidden="true" /></Link></div>
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
