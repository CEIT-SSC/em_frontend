import { Button, ButtonSize } from "@ssc/ui";
import Image from "next/image";
import Tabs from "./components/Tabs/Tabs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[100vh]">
      <div className="w-100 py-9 px-8 flex flex-col justify-between border-l border-(--TextWhite)/10 shadow-[0px_0px_10px_0px_rgba(199,199,199,40)]">
        <div className="flex gap-1">
          <div className="w-16 h-16 justify-items-center content-center">
            <Image width={50} height={60} src="/logo.png" alt="ssc logo" />
          </div>
          <div className="text-center">
            <p>انجمن علمی</p>
            <p>مهندسی کامپیوتر</p>
            <p>دانشگاه پلی تکنیک تهران</p>
          </div>
        </div>
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
            <Button
              size={ButtonSize.SMALL}
              className="border rounded-full"
              label="ویرایش حساب"
            />
          </div>
          <Tabs />
        </div>
        <Button
          size={ButtonSize.SMALL}
          className="bg-red-700 rounded-lg text-[12px]"
          label="خروج از حساب کاربری"
        />
      </div>
      <div className="w-full p-12">{children}</div>
    </div>
  );
}
