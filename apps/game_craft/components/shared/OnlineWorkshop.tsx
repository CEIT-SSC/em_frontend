"use client";

import {Flex, Grid, theme, Typography} from "antd";
import Wave from "./Wave";
import {WorkshopGrid} from "./WorkshopGrid";
import {useTranslations} from "next-intl";
import {useResponsive} from "@/lib/hooks/useResponsive";

const {useToken} = theme;

interface OnlineWorkshopProps {
    padding?: string;
    backgroundColor?: string;
}

export function OnlineWorkshop({
                                   padding = "3rem 2rem",
                                   backgroundColor,
                               }: OnlineWorkshopProps) {
    const {token} = useToken();
    const screens = useResponsive();
    const t = useTranslations();

    // Sample online workshop data matching the React project
    const onlineWorkshops = [
        {
            title: "برنامه‌نویسی بازی با C#",
            description:
                "آموزش پایه‌های برنامه‌نویسی C# برای توسعه بازی‌های کامپیوتری",
            instructor: "علی کریمی",
            date: "1404/2/15، 10:00",
            price: "15,000",
            isInPerson: false,
            onAddToCart: () => console.log("Added C# programming workshop to cart"),
        },
        {
            title: "طراحی سه بعدی کاراکتر",
            description:
                "آموزش اصول مدل‌سازی و طراحی کاراکترهای سه بعدی برای بازی‌ها",
            instructor: "مریم صادقی",
            date: "1404/2/20، 14:00",
            price: "18,000",
            isInPerson: false,
            onAddToCart: () =>
                console.log("Added 3D character design workshop to cart"),
        },
        {
            title: "هوش مصنوعی در بازی‌ها",
            description:
                "آشنایی با تکنیک‌های پیاده‌سازی هوش مصنوعی در بازی‌های ویدیویی",
            instructor: "دکتر حسین رضایی",
            date: "1404/3/5، 16:00",
            price: "20,000",
            isInPerson: false,
            onAddToCart: () => console.log("Added AI in games workshop to cart"),
        },
        {
            title: "طراحی صدا برای بازی",
            description:
                "اصول طراحی و تولید افکت‌های صوتی و موسیقی برای بازی‌های دیجیتال",
            instructor: "مهدی حسینی",
            date: "1404/3/10، 15:30",
            price: "12,000",
            isInPerson: false,
            onAddToCart: () => console.log("Added sound design workshop to cart"),
        },
    ];

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{
                width: "100%",
                backgroundColor: backgroundColor,
            }}
        >
            <Wave width="100%" height="auto" fill="#4F7B79"/>
            <Flex
                vertical
                align="center"
                justify="center"
                style={{
                    width: "100%",
                    padding: padding,
                }}
                gap="large"
            >
                <Typography.Title
                    level={screens.md ? 1 : 2}
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    {t("workshop.onlineWorkshops")}
                </Typography.Title>

                <WorkshopGrid workshops={onlineWorkshops}/>
            </Flex>
            <Wave
                width="100%"
                height="auto"
                fill={token.colorPrimary}
                style={{transform: "scaleY(-1) translateY(-2px)"}}
            />
        </Flex>
    );
}
