"use client";

import { Button, Col, Flex, Row, Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface SponsorsProps {
  padding?: string;
  backgroundColor?: string;
}

export function Sponsors({
  padding = "3rem 2rem",
  backgroundColor,
}: SponsorsProps) {
  const t = useTranslations("app");

  // Sponsor data matching the React project exactly
  const sponsors = [
    {
      name: "IncytelGames",
      description: "description",
      logo: "/assets/images/sponsors/incytelGames.png",
      link: "https://www.incytel.com/",
    },
    {
      name: "Yektanet",
      description: "description",
      logo: "/assets/images/sponsors/yektanet.png",
      link: "https://www.yektanet.com/",
    },
    {
      name: "AsiaTech",
      description: "description",
      logo: "/assets/images/sponsors/asiatech.png",
      link: "https://asiatech.ir/",
    },
    {
      name: "SnappFood",
      description: "description",
      logo: "/assets/images/sponsors/snappfood.png",
      link: "https://snappfood.ir/",
    },
    {
      name: "PGJ",
      description: "description",
      logo: "/assets/images/sponsors/pgj.png",
      link: "https://persiangj.ir/",
    },
  ];

  return (
    <Flex
      vertical
      align="center"
      justify="space-between"
      style={{
        width: "100%",
        padding: padding,
        backgroundColor: backgroundColor,
      }}
    >
      <Typography.Title
        level={1}
        style={{
          fontWeight: 900,
          color: "white",
        }}
      >
        {t("sponsors.title")}
      </Typography.Title>
      <Row
        align="middle"
        justify="center"
        style={{ width: "100%" }}
        gutter={[32, 32]}
      >
        {sponsors.map((sponsor, index) => (
          <Col
            span={24}
            xxl={4}
            lg={6}
            md={8}
            sm={12}
            key={index}
            style={{ height: "200px" }}
          >
            <Flex
              align="center"
              justify="center"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
              }}
            >
              <Button
                type="text"
                style={{ width: "100%", height: "100%" }}
                href={sponsor.link}
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={200}
                  height={150}
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              </Button>
            </Flex>
          </Col>
        ))}
      </Row>
    </Flex>
  );
}
