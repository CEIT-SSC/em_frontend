import Button, { Variant, Size } from "@ui/components/button/Button";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-6">
      <div className="flex items-center gap-8">
        <img src="logo.png" alt="ssc logo" className="w-[50px] h-[60px]" />
        <Link href={"alaki"}>خانه</Link>
        <Link href={"alaki"}>رویداد ها</Link>
        <Link href={"alaki"}>دریافت مدرک</Link>
        <Link href={"alaki"}>فرصت های شغلی</Link>
        <Link href={"alaki"}>ترمچین</Link>
        <Link href={"alaki"}>درباره ما</Link>
      </div>
      <div className="flex items-center gap-8">
        <p>ورود</p>
        <Button variant={Variant.primary} size={Size.small} label="ثبت نام" />
      </div>
    </div>
  );
};

export default Navbar;
