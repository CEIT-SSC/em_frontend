import Image from "next/image";
import { Button, ButtonSize, ButtonVariant } from "@ssc/ui";
import ActiveLink from "./ActiveLink";
import Link from "next/link";

const navbarItems = [
  { label: "خانه", href: "/" },
  { label: "رویداد ها", href: "/#events" },
  { label: "دریافت مدرک", href: "/certificates" },
  { label: "فرصت های شغلی", href: "/careers" },
  { label: "ترمچین", href: "/termchin" },
  { label: "درباره ما", href: "/about" },
];

const Navbar = async () => {
  return (
    <nav className="max-w-full justify-between items-center p-6 xl:px-24 hidden md:flex">
      <div className="flex items-center gap-8">
        <Image
          src="/logo.png"
          alt="ssc logo"
          width={50}
          height={60}
          className="w-[50px] h-[60px]"
        />
        {navbarItems.map((item) => (
          <ActiveLink href={item.href} key={item.label}>
            {item.label}
          </ActiveLink>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button
            className="min-h-9 min-w-16"
            variant={ButtonVariant.TEXT}
            size={ButtonSize.SMALL}
            label="ورود"
          />
        </Link>
        <Link href="/register">
          <Button
            className="min-h-9 min-w-16"
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.SMALL}
            label="ثبت نام"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
