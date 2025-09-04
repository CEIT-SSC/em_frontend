import { Button, ButtonVariant } from "@ssc/ui";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

interface Props {}

export const RegisterStepThird = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-max">
      <GradientCheckIcon />
      <p className="w-full text-2xl font-bold text-white text-center pt-8">
        ثبت نام شما با موفقیت انجام شد
      </p>
      <div className="w-full flex flex-col items-center gap-2.5 px-8 py-4">
        <Button
          className="w-full"
          variant={ButtonVariant.PRIMARY}
          label="ورود"
          onClick={() => router.push("/login")}
        />
      </div>
    </div>
  );
};

const GradientCheckIcon = () => {
  return (
    <>
      <svg
        key="gradientCheckIcon_painter"
        width="0"
        height="0"
        aria-hidden
        focusable="false"
      >
        <linearGradient
          id="gradientCheckIcon_painter"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="-15%" stopColor="#ff715b" />
          <stop offset="100%" stopColor="#cb48b7" />
        </linearGradient>
      </svg>
      <FaCheckCircle
        style={{ fill: "url(#gradientCheckIcon_painter)" }}
        size={100}
      />
    </>
  );
};
