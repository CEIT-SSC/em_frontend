import {Button, Flex, Image, theme, Typography,} from "antd";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import {useRouter} from "@/lib/navigation";
import {useDashboardNavigations} from "@/lib/config/dashboard-navigation";
import {useResponsive} from "@/lib/hooks/useResponsive";

const {useToken} = theme;

interface DashboardNavigationCardProps {
    onNavigate?: () => void;
}

export default function DashboardNavigationCard({onNavigate,}: DashboardNavigationCardProps) {
    const t = useTranslations("app");
    const {token} = useToken();
    const router = useRouter();
    const pathname = usePathname();
    const dashboardNavigations = useDashboardNavigations();
    const screens = useResponsive();

    const handleNavigation = (route: string) => {
        router.push(route);
        if (onNavigate) {
            onNavigate();
        }
    };

    const handleLogout = () => {
        router.push("/");
    };

    const isActive = (route: string) => pathname.includes(route);

    return (
        <Flex
            vertical
            align={"center"}
            justify={"start"}
            style={{
                backgroundColor: token.colorBgBase,
                width: '100%',
                borderRadius: token.borderRadius,
                padding: screens.lg ? token.padding : 0
            }}
        >
            <Flex vertical align={"center"} justify={"center"} style={{width: '100%'}} gap={"small"}>
                <Flex vertical align={"center"} justify={"center"} style={{width: '100%'}}
                      gap={"small"}>
                    <Flex
                        style={{
                            width: '30%',
                            borderRadius: '50%',
                            overflow: "hidden",
                            aspectRatio: '1/1',
                        }}
                    >
                        <Image
                            src={"/images/2024/staffs/mahdiHaeri.jpg"}
                            width={'100%'}
                            height={'auto'}
                            alt={"avatar"}
                            placeholder={
                                <Image src={'/svg/avatar-1.svg'} alt={'user-image'} width={'100%'} height={'auto'}/>
                            }
                        />
                    </Flex>
                    <Typography.Title level={4} style={{fontWeight: 800}}>
                        Mahdi Haeri
                    </Typography.Title>

                </Flex>
                <Flex
                    vertical
                    align={"center"}
                    justify={"center"}
                    style={{width: '100%'}}
                    gap={"small"}
                >
                    {dashboardNavigations.map(item => (
                        <Button
                            key={item.route}
                            type={isActive(item.route) ? "primary" : "dashed"}
                            size={"large"}
                            style={{width: '100%'}}
                            onClick={() => {
                                handleNavigation(item.route)
                            }}
                        >
                            {item.name}
                        </Button>
                    ))}
                    <Button
                        danger
                        type={"dashed"}
                        size={"large"}
                        style={{width: '100%'}}
                        onClick={handleLogout}
                    >
                        {t("auth.logout")}
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
