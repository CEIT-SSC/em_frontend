import Image from "next/image";
import ActiveLink from "./ActiveLink";
import AuthData from "./AuthData";
import HamburgerMenu from "./HamburgerMenu";

export const navbarItems = [
  { label: "خانه", href: "/" },
  { label: "رویداد ها", href: "/#events" },
  // { label: "دریافت مدرک", href: "/certificates" },
  // { label: "فرصت های شغلی", href: "/careers" },
  // { label: "ترمچین", href: "/termchin" },
  { label: "درباره ما", href: "/about" },
  { label: "داشبورد", href: "/dashboard" },
];

const Navbar = async () => {
  return (
    <nav className="max-w-full justify-between items-center p-6 xl:px-24 flex">
      <div className="flex items-center gap-8">
        <Image
          src="/logo.png"
          alt="ssc logo"
          width={50}
          height={60}
          className="w-[50px] h-[60px]"
        />
        <div className="hidden md:flex items-center gap-8">
          {navbarItems.map((item) => (
            <ActiveLink href={item.href} key={item.label}>
              {item.label}
            </ActiveLink>
          ))}
        </div>
      </div>
      <div className="hidden md:block">
        <AuthData />
      </div>
      <HamburgerMenu />
    </nav>
  );
};

export default Navbar;
