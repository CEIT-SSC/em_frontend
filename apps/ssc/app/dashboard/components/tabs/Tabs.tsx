import React from "react";
import ActiveTab from "./ActiveTab";

const tabItems = [
  { label: "اطلاعات من", href: "/dashboard" },
  { label: "تیم های من", href: "/dashboard/teams" },
  // { label: "گواهی های من", href: "/dashboard/certificates" },
  // { label: "پرداخت ها", href: "/dashboard/payments" },
  // { label: "تیم های من", href: "/dashboard/soon" },
  // { label: "گواهی های من", href: "/dashboard/soon" },
  { label: "پرداخت ها", href: "/dashboard/soon" },
  { label: "کلاس آنلاین من", href: "/dashboard/classes" },
];

interface TabsProps {
  onTabClick?: () => void;
}

const Tabs = ({ onTabClick }: TabsProps) => {
  return (
    <div className="w-full flex flex-col gap-2.5">
      {tabItems.map((item) => (
        <ActiveTab key={item.label} href={item.href} onClick={onTabClick}>
          {item.label}
        </ActiveTab>
      ))}
    </div>
  );
};

export default Tabs;
