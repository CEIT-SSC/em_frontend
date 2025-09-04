"use client";
import { useState } from "react";
import { RegisterStepOne } from "./steps/registerStepOne";
import { RegisterStepTwo } from "./steps/registerStepTwo";
import { RegisterStepThird } from "./steps/registerStepThird";

const Page = () => {
  const [step, setStep] = useState(0);
  const [mail, setMail] = useState("a@gmail.com");

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  if (step === 0)
    return (
      <RegisterStepOne
        submitCallback={(mail) => setMail(mail)}
        nextStep={onNextStep}
      />
    );
  if (step === 1) return <RegisterStepTwo email={mail} nextStep={onNextStep} />;

  return <RegisterStepThird />;
};

export default Page;
