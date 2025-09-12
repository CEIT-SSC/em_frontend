"use client";

import { theme } from "antd";
import { WorkshopCard } from "../../../../components/features/workshops/WorkshopCard";
import { PayBox } from "../../../../components/features/cart/PayBox";
import ProductCart from "components/features/cart/ProductCart";

const { useToken } = theme;

export default function ShoppingBagPage() {
  const { token } = useToken();

  // Sample cart items matching the React project
  const cartItems = [
    {
      id: 1,
      title: "توسعه بازی با Unity",
      description:
        "آموزش اصول پایه ای برنامه نویسی و توسعه بازی های دو بعدی و سه بعدی با موتور یونیتی",
      instructor: "امیر حسینی",
      date: "1404/1/22، 9:00",
      price: "25,000",
      is_online: false, // Changed from isInPerson: true
      onAddToCart: () => console.log("Removing Unity workshop from cart"),
    },
    {
      id: 2,
      title: "طراحی گرافیک برای بازی‌ها",
      description: "اصول طراحی شخصیت، محیط و رابط کاربری برای بازی های دیجیتال",
      instructor: "سارا محمدی",
      date: "1404/2/5، 14:00",
      price: "20,000",
      is_online: true, // Changed from isInPerson: false
      onAddToCart: () => console.log("Removing Graphics workshop from cart"),
    },
    {
      id: 3,
      title: "برنامه‌نویسی پیشرفته بازی",
      description:
        "تکنیک‌های پیشرفته برنامه‌نویسی، بهینه‌سازی کد و الگوریتم‌های هوش مصنوعی",
      instructor: "محمد رضایی",
      date: "1404/2/10، 10:30",
      price: "30,000",
      is_online: false, // Changed from isInPerson: true
      onAddToCart: () =>
        console.log("Removing Advanced Programming workshop from cart"),
    },
    {
      id: 3,
      title: "برنامه‌نویسی پیشرفته بازی",
      description:
        "تکنیک‌های پیشرفته برنامه‌نویسی، بهینه‌سازی کد و الگوریتم‌های هوش مصنوعی",
      instructor: "محمد رضایی",
      date: "1404/2/10، 10:30",
      price: "30,000",
      is_online: false, // Changed from isInPerson: true
      onAddToCart: () =>
        console.log("Removing Advanced Programming workshop from cart"),
    },
    {
      id: 3,
      title: "برنامه‌نویسی پیشرفته بازی",
      description:
        "تکنیک‌های پیشرفته برنامه‌نویسی، بهینه‌سازی کد و الگوریتم‌های هوش مصنوعی",
      instructor: "محمد رضایی",
      date: "1404/2/10، 10:30",
      price: "30,000",
      is_online: false, // Changed from isInPerson: true
      onAddToCart: () =>
        console.log("Removing Advanced Programming workshop from cart"),
    },
    {
      id: 3,
      title: "برنامه‌نویسی پیشرفته بازی",
      description:
        "تکنیک‌های پیشرفته برنامه‌نویسی، بهینه‌سازی کد و الگوریتم‌های هوش مصنوعی",
      instructor: "محمد رضایی",
      date: "1404/2/10، 10:30",
      price: "30,000",
      is_online: false, // Changed from isInPerson: true
      onAddToCart: () =>
        console.log("Removing Advanced Programming workshop from cart"),
    },
    {
      id: 3,
      title: "برنامه‌نویسی پیشرفته بازی",
      description:
        "تکنیک‌های پیشرفته برنامه‌نویسی، بهینه‌سازی کد و الگوریتم‌های هوش مصنوعی",
      instructor: "محمد رضایی",
      date: "1404/2/10، 10:30",
      price: "30,000",
      is_online: false, // Changed from isInPerson: true
      onAddToCart: () =>
        console.log("Removing Advanced Programming workshop from cart"),
    },
    {
      id: 3,
      title: "برنامه‌نویسی پیشرفته بازی",
      description:
        "تکنیک‌های پیشرفته برنامه‌نویسی، بهینه‌سازی کد و الگوریتم‌های هوش مصنوعی",
      instructor: "محمد رضایی",
      date: "1404/2/10، 10:30",
      price: "30,000",
      is_online: false, // Changed from isInPerson: true
      onAddToCart: () =>
        console.log("Removing Advanced Programming workshop from cart"),
    },
    {
      id: 3,
      title: "برنامه‌نویسی پیشرفته بازی",
      description:
        "تکنیک‌های پیشرفته برنامه‌نویسی، بهینه‌سازی کد و الگوریتم‌های هوش مصنوعی",
      instructor: "محمد رضایی",
      date: "1404/2/10، 10:30",
      price: "30,000",
      is_online: false, // Changed from isInPerson: true
      onAddToCart: () =>
        console.log("Removing Advanced Programming workshop from cart"),
    },
    {
      id: 3,
      title: "برنامه‌نویسی پیشرفته بازی",
      description:
        "تکنیک‌های پیشرفته برنامه‌نویسی، بهینه‌سازی کد و الگوریتم‌های هوش مصنوعی",
      instructor: "محمد رضایی",
      date: "1404/2/10، 10:30",
      price: "30,000",
      is_online: false, // Changed from isInPerson: true
      onAddToCart: () =>
        console.log("Removing Advanced Programming workshop from cart"),
    },
  ];

  return (
    <div className="flex flex-col flex-1 w-full overflow-hidden">
      <div
        className="flex-1 w-full overflow-auto"
        style={{
          padding: token.padding,
        }}
      >
        <div className="flex flex-col gap-4 w-full max-h-80">
          {cartItems.map((item, index) => (
            <ProductCart
              key={index}
              imageUrl={"/images/superMario.png"}
              title="تسست"
              price={100000}
              onRemove={item.onAddToCart}
            />
          ))}
        </div>
      </div>

      <PayBox />
    </div>
  );
}
