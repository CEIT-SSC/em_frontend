import Image from "next/image";
import { Button, ButtonSize, ButtonVariant } from "@ssc/ui";
import ActiveLink from "./ActiveLink";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";

const navbarItems = [
  { label: "خانه", href: "/" },
  { label: "رویداد ها", href: "/#events" },
  { label: "دریافت مدرک", href: "/certificates" },
  { label: "فرصت های شغلی", href: "/careers" },
  { label: "ترمچین", href: "/termchin" },
  { label: "درباره ما", href: "/about" },
];

const Navbar = async () => {
  const showLinks = () => {
    return navbarItems.map((item) => (
      <ActiveLink href={item.href} key={item.label}>
        {item.label}
      </ActiveLink>
    ));
  };

  const showLogo = () => {
    return (
      <Image
        src="/logo.png"
        alt="ssc logo"
        width={50}
        height={60}
        className="w-[50px] h-[60px]"
      />
    );
  };

  const showLoginLinks = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <>
      <nav className="w-full relative p-6 xl:px-24 z-10">
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center gap-8">
            {showLogo()}
            {showLinks()}
          </div>
          <div className="flex items-center gap-2">{showLoginLinks()}</div>
        </div>
        <div className="flex justify-between items-center md:hidden">
          {showLogo()}
          <HamburgerMenu />
        </div>
      </nav>
      <div
        id="hamburger-menu"
        className="fixed hidden top-0 left-0 pt-27 w-[100vw] h-[100vh] z-9 bg-(--background) flex-col justify-between items-center"
      >
        <div className="flex flex-col gap-4 py-8 text-center text-2xl/[150%]">
          {showLinks()}
        </div>
        <div className="flex p-3.5 pb-30 gap-2.5 scale-150">
          {showLoginLinks()}
        </div>
      </div>
    </>
  );
};

export default Navbar;
