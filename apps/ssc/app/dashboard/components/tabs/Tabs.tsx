import React from "react";
import ActiveTab from "./ActiveTab";

const tabItems = [
  { label: "اطلاعات من", href: "/dashboard" },
  { label: "تیم های من", href: "/dashboard/teams" },
  { label: "گواهی های من", href: "/dashboard/certificates" },
  { label: "پرداخت ها", href: "/dashboard/payments" },
];

const Tabs = () => {
  return (
    <div className="w-full flex flex-col gap-2.5">
      {tabItems.map((item) => (
        <ActiveTab key={item.label} href={item.href}>
          {item.label}
        </ActiveTab>
      ))}
    </div>
  );
};

export default Tabs;
