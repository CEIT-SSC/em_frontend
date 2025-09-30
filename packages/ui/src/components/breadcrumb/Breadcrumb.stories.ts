import React from "react";
import { Breadcrumb, BreadcrumbStep } from "./Breadcrumb";

export default {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
};

const steps: BreadcrumbStep[] = [
  { label: "اطلاعات تیم", description: "نام تیم", isCompleted: true },
  { label: "دعوت اعضا", description: "افزودن اعضا", isActive: true },
  { label: "تایید نهایی", description: "بررسی و ارسال" },
];

export const Default = {
  args: {
    steps,
  },
};

export const Simple = {
  args: {
    steps: [
      { label: "مرحله ۱", isCompleted: true },
      { label: "مرحله ۲", isActive: true },
      { label: "مرحله ۳" },
    ],
  },
};

export const Small = {
  args: {
    steps,
    size: "sm",
  },
};

export const Medium = {
  args: {
    steps,
    size: "md",
  },
};

export const Large = {
  args: {
    steps,
    size: "lg",
  },
};

export const WithoutConnector = {
  args: {
    steps: [
      { label: "Step 1", isCompleted: true },
      { label: "Step 2", isActive: true },
      { label: "Step 3" },
    ],
    showConnector: false,
  },
};
