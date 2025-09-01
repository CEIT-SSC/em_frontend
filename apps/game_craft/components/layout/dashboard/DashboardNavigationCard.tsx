"use client";

import {Button, Flex, Grid, Image, theme, Typography} from "antd";
import {useTranslations} from "next-intl";
import {useRouter, usePathname} from "next/navigation";
import {useDashboardNavigations} from "@/lib/config/dashboard-navigation";

const {useToken} = theme;
const {useBreakpoint} = Grid;

interface DashboardNavigationCardProps {
    open?: boolean;
    toggleDrawerOpen?: () => void;
}

export function DashboardNavigationCard({open, toggleDrawerOpen}: DashboardNavigationCardProps) {
    const t = useTranslations();
    const {token} = useToken();
    const router = useRouter();
    const pathname = usePathname();
    const dashboardNavigations = useDashboardNavigations();
    const screens = useBreakpoint();

    const handleLogout = () => {
        // Add logout logic here
        console.log("Logout functionality to be implemented");
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
                    <Flex
                        style={{
                            width: "30%",
                            borderRadius: "50%",
                            overflow: "hidden",
                            aspectRatio: "1/1",
                        }}
                    >
                        <Image
                            src="/images/avatar-placeholder.png"
                            width="100%"
                            height="auto"
                            alt="user-avatar"
                            fallback="/svg/avatar-1.svg"
                        />
                    </Flex>
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
                                router.push(item.route);
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
