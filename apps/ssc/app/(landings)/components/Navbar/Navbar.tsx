import Image from "next/image";
import Link from "next/link";
import ActiveLink from "./ActiveLink";
import AuthData from "./AuthData";
import HamburgerMenu from "./HamburgerMenu";

export const navbarItems = [
  { label: "خانه", href: "/" },
  { label: "رویداد ها", href: "/#events" },
  { label: "درباره ما", href: "/about" },
  { label: "داشبورد", href: "/dashboard" },
];

export default function Navbar() {
  return (
    <header className="border-b border-border">
      <nav className="ssc-container flex min-h-24 items-center justify-between gap-6 py-3" aria-label="ناوبری اصلی">
        <div className="flex items-center gap-10">
          <Link href="/" aria-label="انجمن علمی مهندسی کامپیوتر؛ خانه" className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={40} height={48} className="h-12 w-10" />
            <span className="text-sm leading-6">انجمن علمی مهندسی کامپیوتر<span className="block text-xs text-muted">دانشگاه صنعتی امیرکبیر</span></span>
          </Link>
          <div className="hidden items-center gap-6 lg:flex">{navbarItems.map(item => <ActiveLink href={item.href} key={item.href}>{item.label}</ActiveLink>)}</div>
        </div>
        <div className="hidden lg:block"><AuthData /></div>
        <HamburgerMenu />
      </nav>
    </header>
  );
}
