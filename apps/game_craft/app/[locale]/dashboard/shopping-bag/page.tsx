'use client';

import { Flex, theme, Row, Col } from 'antd';
import { WorkshopCard } from '@/components/shared/WorkshopCard';
import { PayBox } from '@/components/shared/PayBox';

const { useToken } = theme;

export default function ShoppingBagPage() {
  const { token } = useToken();

  // Sample cart items matching the React project
  const cartItems = [
    {
      title: "توسعه بازی با Unity",
      description: "آموزش اصول پایه ای برنامه نویسی و توسعه بازی های دو بعدی و سه بعدی با موتور یونیتی",
      instructor: "امیر حسینی",
      date: "1404/1/22، 9:00",
      price: "25,000",
      isInPerson: true,
      onAddToCart: () => console.log("Removing Unity workshop from cart")
    },
    {
      title: "طراحی گرافیک برای بازی‌ها",
      description: "اصول طراحی شخصیت، محیط و رابط کاربری برای بازی های دیجیتال",
      instructor: "سارا محمدی",
      date: "1404/2/5، 14:00",
      price: "20,000",
      isInPerson: false,
      onAddToCart: () => console.log("Removing Graphics workshop from cart")
    },
    {
      title: "برنامه‌نویسی پیشرفته بازی",
      description: "تکنیک‌های پیشرفته برنامه‌نویسی، بهینه‌سازی کد و الگوریتم‌های هوش مصنوعی",
      instructor: "محمد رضایی",
      date: "1404/2/10، 10:30",
      price: "30,000",
      isInPerson: true,
      onAddToCart: () => console.log("Removing Advanced Programming workshop from cart")
    }
  ];

  return (
    <Flex
      vertical
      flex={1}
      style={{
        width: '100%',
        overflow: "hidden"
      }}
    >
      <Flex
        flex={1}
        style={{
          width: '100%',
          padding: token.padding,
          overflow: "auto"
        }}
      >
        <Row gutter={[16, 16]} style={{ width: '100%' }}>
          {cartItems.map((item, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <WorkshopCard workshop={item} />
            </Col>
          ))}
        </Row>
      </Flex>

      <PayBox />
    </Flex>
  );
}
