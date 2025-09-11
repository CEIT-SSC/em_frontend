import { Button, ButtonSize } from "@ssc/ui";
import Image from "next/image";
import Tabs from "./components/tabs/Tabs";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row min-h-[100vh]">
      <div className="w-full md:w-100 md:py-9 md:px-8 p-4 flex flex-col justify-between border-l border-(--TextWhite)/10 shadow-[0px_0px_10px_0px_rgba(199,199,199,40)]">
        <Link href="/" className="flex items-center gap-1">
          <div className="w-16 md:w-20 aspect-square justify-items-center content-center">
            <Image
              width={50}
              height={60}
              src="/logo.png"
              alt="ssc logo"
              className="md:scale-125"
            />
          </div>
          <div className="md:text-[16px] text-[12px]">
            <p>انجمن علمی</p>
            <p>مهندسی کامپیوتر</p>
            <p>دانشگاه پلی تکنیک تهران</p>
          </div>
        </Link>
        <div className="h-full py-8 flex flex-col gap-8 items-center">
          <div className="flex flex-col gap-3 items-center">
            <Image
              width={128}
              height={128}
              src="/member.png"
              alt="profile photo"
              className="w-32 h-32 rounded-full"
            />
            <h4 className="text-2xl/[150%] font-bold">اشکان چاجی</h4>
            <Link href="/dashboard/edit-account">
              <Button
                size={ButtonSize.SMALL}
                className="border rounded-full"
                label="ویرایش حساب"
              />
            </Link>
          </div>
          <Tabs />
        </div>
        <Button
          size={ButtonSize.SMALL}
          className="bg-red-700 text-[12px] font-bold"
          label="خروج از حساب کاربری"
        />
      </div>
      <div className="w-full px-4 pt-12 pb-100 md:p-12 md:pb-12">
        {children}
      </div>
    </div>
  );
}
