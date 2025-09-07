"use client";

import {Button, Flex, Grid, Image, theme, Typography} from "antd";
import {useTranslations} from "next-intl";
import {useRouter, usePathname} from "next/navigation";
import {useDashboardNavigations} from "@/lib/config/dashboard-navigation";
import {DotLottieReact} from '@lottiefiles/dotlottie-react';
// import fireworks from "../../../public/lottie/Fireworks.lottie";

const {useToken} = theme;
const {useBreakpoint} = Grid;

interface DashboardNavigationCardProps {
    toggleDrawerOpen?: () => void;
}

export function DashboardNavigationCard({toggleDrawerOpen}: DashboardNavigationCardProps) {
    const t = useTranslations();
    const {token} = useToken();
    const router = useRouter();
    const pathname = usePathname();
    const dashboardNavigations = useDashboardNavigations();
    const screens = useBreakpoint();

    const handleLogout = () => {
        // Clear user session or token here
        // Redirect to login page
        router.push('/');
    };

    // Function to check if a route is active
    const isActiveRoute = (route: string) => {
        return pathname === route;
    };

    return (
        <Flex
            vertical
            align="center"
            justify="start"
            style={{
                backgroundColor: token.colorBgBase,
                width: "100%",
                borderRadius: token.borderRadius,
                padding: screens.lg ? token.padding : 0,
            }}
        >
            <Flex
                vertical
                align="center"
                justify="center"
                style={{width: "100%"}}
                gap="small"
            >
                <Flex
                    vertical
                    align="center"
                    justify="center"
                    style={{width: "100%"}}
                    gap="small"
                >
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            // backgroundColor: 'white',
                            width: '30%',
                            aspectRatio: '1/1'
                        }}
                    >
                        <Flex
                            align={"center"}
                            justify={"center"}
                            style={{
                                width: "100%",
                                borderRadius: "50%",
                                overflow: "hidden",
                                aspectRatio: "1/1",
                                zIndex: 1,
                            }}
                        >
                            <Image
                                src=""
                                width="100%"
                                height="auto"
                                alt="user-avatar"
                                fallback="/mario/giphy-1.gif"
                            />
                        </Flex>
                        <DotLottieReact
                            src={"/lottie/Fireworks.lottie"}
                            autoplay
                            loop
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "250%",
                                height: "250%",
                                gridArea: "1 / 1",
                                zIndex: 0,
                            }}
                        />
                    </div>
                    <Typography.Title level={4} style={{fontWeight: 800, margin: 0}}>
                        Mahdi Haeri
                    </Typography.Title>
                </Flex>

                <Flex
                    vertical
                    align="center"
                    justify="center"
                    style={{width: "100%"}}
                    gap="small"
                >
                    {dashboardNavigations.map((item) => (
                        <Button
                            key={item.route}
                            type={isActiveRoute(item.route) ? "primary" : "dashed"}
                            size="large"
                            style={{width: "100%"}}
                            onClick={() => {
                                router.replace(item.route);
                                if (toggleDrawerOpen) {
                                    toggleDrawerOpen();
                                }
                            }}
                        >
                            {item.name}
                        </Button>
                    ))}
                    <Button
                        danger
                        type="dashed"
                        size="large"
                        style={{width: "100%"}}
                        onClick={handleLogout}
                    >
                        {t('app.auth.logout')}
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
