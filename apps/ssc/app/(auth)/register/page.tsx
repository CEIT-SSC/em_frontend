"use client";
import { useState } from "react";
import { RegisterStepOne } from "./steps/registerStepOne";
import { RegisterStepTwo } from "./steps/registerStepTwo";
import { RegisterStepThird } from "./steps/registerStepThird";
import { Button, ButtonSize, ButtonVariant } from "@ssc/ui";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "@bprogress/next";

const Page = () => {
  const [step, setStep] = useState(0);
  const [mail, setMail] = useState("none");
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
      <div className="w-full flex justify-end">
        <Button
          className="flex justify-end bg-none !rounded-full text-whiteText"
          size={ButtonSize.SMALL}
          variant={ButtonVariant.OUTLINE}
          label="صفحه اصلی"
          suffixIcon={MdArrowBack}
          onClick={onBackButtonClick}
        />
      </div>
      {step === 0 && (
        <RegisterStepOne
          submitCallback={(mail) => setMail(mail)}
          nextStep={onNextStep}
        />
      )}
      {step === 1 && <RegisterStepTwo email={mail} nextStep={onNextStep} />}
      {step === 2 && <RegisterStepThird />}
    </>
  );
};

export default Page;
