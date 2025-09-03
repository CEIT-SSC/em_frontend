import { MdArrowBack } from "react-icons/md";
import { Button, ButtonSize, ButtonVariant } from "@ssc/ui";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-[100vh] px-9 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-9/16 h-full py-4 px-6">
        <video
          className="h-full object-cover object-center rounded-2xl"
          autoPlay
          muted
          loop
        >
          <source src="/events/acpc.mp4" />
        </video>
      </div>
      <div className="absolute max-w-[600px] h-max bg-secondary-background rounded-3xl p-6 flex flex-col gap-4">
        <Link href={"/"} className="flex justify-end">
          <Button
            className="flex justify-end bg-none !rounded-full text-whiteText"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.OUTLINE}
            label="بازگشت"
            suffixIcon={MdArrowBack}
          />
        </Link>
        {children}
      </div>
    </div>
  );
}
