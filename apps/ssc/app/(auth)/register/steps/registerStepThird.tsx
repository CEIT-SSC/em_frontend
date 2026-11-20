import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

export const RegisterStepThird = () => {
  const params = useSearchParams();

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-max">
      <FaCheckCircle className="text-success" size={56} aria-hidden="true" />
      <p className="w-full text-2xl font-bold text-white text-center pt-8">
        ثبت نام شما با موفقیت انجام شد
      </p>
      <div className="w-full flex flex-col items-center gap-2.5 px-8 py-4">
        <Link
          href={{ pathname: "/login", query: Object.fromEntries(params.entries()) }}
          className="ssc-action ssc-action-primary w-full"
        >ورود</Link>
      </div>
    </div>
  );
};
