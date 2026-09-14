"use client";

import {theme, Grid, Flex, Typography, Divider, Button} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useDashboardNavigations} from "../../../lib/config/dashboard-navigation";
import {DashboardHeader} from "../../../components/layout/dashboard";
import {DashboardNavigationCard} from "../../../components/layout/dashboard";
import LogoWithText from "../../../components/common/LogoWithText";
import {usePathname} from "lib/navigation";
import {useAuth} from "lib/hooks/useAuth";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";

const {useToken} = theme;
const {useBreakpoint} = Grid;

interface DashboardLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
    const screens = useBreakpoint();
    const {token} = useToken();
    const dashboardNavigations = useDashboardNavigations();
    const pathname = usePathname();
    const {isAuthenticated, isLoading} = useAuth();
    const router = useRouter();
    const t = useTranslations();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, isLoading, router]);

    const handleBackToHome = () => {
        router.push("/");
    };

    return (
        <Flex className="gc-dashboard gc-dashboard-world"
            vertical
            style={{
                width: "100%",
                height: "100vh",
                position: "relative",
            }}
        >
            <DashboardHeader/>

            <Flex
                className="gc-dashboard-shell"
                vertical
                align="center"
                justify="start"
                flex={1}
                style={{
                    width: "100%",
                    padding: "clamp(1rem, 3vw, 2rem)",
                }}
                gap="large"
            >
                {screens.lg ? (
                    <Flex
                        className="gc-dashboard-masthead"
                        align="center"
                        justify="space-between"
                        style={{width: "100%"}}
                    >
                        {/* Back button aligned with logo */}
                        <Button
                            type="dashed"
                            icon={<ArrowLeftOutlined/>}
                            onClick={handleBackToHome}
                            size="large"
                        >
                            {t("button.backToHome")}
                        </Button>

                        {/* Logo in center */}
                        <LogoWithText variant="light"/>

                        {/* Empty div for spacing balance */}
                        <div style={{ width: "140px" }} />
                    </Flex>
                ) : (
                    <></>
                )}
                <Flex
                    align="start"
                    justify="center"
                    style={{
                        width: "100%",
                    }}
                    gap="small"
                >
                    {screens.lg ? (
                        <Flex className="gc-dashboard-navigation-wrap" flex={1} style={{position: "sticky", top: ".5rem"}}>
                            <DashboardNavigationCard/>
                        </Flex>
                    ) : (
                        <></>
                    )}
                    <Flex
                        className="gc-dashboard-content"
                        flex={3}
                        vertical
                        align="center"
                        justify="start"
                        style={{
                            height: "100%",
                        }}
                    >
                        <Flex
                            vertical
                            align="center"
                            justify="start"
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <Flex
                                className="gc-dashboard-content-heading"
                                vertical
                                align="center"
                                justify="center"
                                style={{
                                    width: "100%",
                                    padding: token.padding,
                                    paddingBottom: 0,
                                }}
                            >
                                <Typography.Title
                                    level={3}
                                    style={{margin: 0, fontWeight: 950}}
                                >
                                    {
                                        dashboardNavigations.find((item) => item.route === pathname)
                                            ?.name
                                    }
                                </Typography.Title>
                                <Divider
                                    type="horizontal"
                                    variant="dashed"
                                    style={{borderColor: token.colorBorder}}
                                />
                            </Flex>
                            <Flex
                                className="gc-dashboard-content-body"
                                vertical
                                flex={1}
                                style={{
                                    width: "100%",
                                }}
                            >
                                {children}
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
