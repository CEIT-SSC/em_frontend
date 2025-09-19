"use client";

import {Alert, Col, Empty, Flex, Row, Spin, theme, Typography} from "antd";
import {useTranslations} from "next-intl";
import {WorkshopCard} from "components/features/workshops/WorkshopCard";
import {PresentationType} from "@ssc/core";
import {usePurchases} from "lib/hooks/usePurchases";

const {useToken} = theme;

export default function EventsPage() {
    const {token} = useToken();
    const t = useTranslations("app");
    const { presentations, loading, error, isAuthenticated } = usePurchases();

    // Filter presentations by type
    const workshops = presentations.filter(p => p.type === "workshop" || p.type === "course");
    const talks = presentations.filter(p => p.type === "talk");

    const renderSection = (items: typeof presentations, title: string) => {
        if (loading) {
            return (
                <Flex
                    justify="center"
                    align="center"
                    style={{
                        height: "200px",
                        width: "100%",
                    }}
                >
                    <Spin size="large"/>
                </Flex>
            );
        }

        if (error) {
            return (
                <Alert
                    message={`خطا در بارگذاری ${title}`}
                    description={error}
                    type="error"
                    showIcon
                    style={{margin: token.margin}}
                />
            );
        }

        if (!items || items.length === 0) {
            return (
                <Flex
                    justify="center"
                    align="center"
                    style={{
                        height: "200px",
                        width: "100%",
                    }}
                >
                    <Empty
                        description={`شما در هیچ ${title.toLowerCase()}ی ثبت‌نام نکرده‌اید`}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                </Flex>
            );
        }

        return (
            <Row gutter={[16, 16]} style={{width: "100%"}}>
                {items.map((item) => (
                    <Col key={item.id} xs={24} sm={12} lg={8} xl={8}>
                        <WorkshopCard
                            presentation={item}
                            isPurchased={true}
                            workshopImage={item.type === PresentationType.WORKSHOP ? '/images/SuperMario.jpg'  : '/images/Luigi.jpg'}
                        />
                    </Col>
                ))}
            </Row>
        );
    };

    // If not authenticated, show message to login
    if (!isAuthenticated) {
        return (
            <Flex
                justify="center"
                align="center"
                style={{
                    height: "400px",
                    width: "100%",
                }}
            >
                <Alert
                    message="دسترسی غیرمجاز"
                    description="برای مشاهده رویدادهای خریداری شده، لطفا وارد حساب کاربری خود شوید."
                    type="warning"
                    showIcon
                />
            </Flex>
        );
    }

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{
                width: "100%",
                padding: token.padding,
            }}
            gap="large"
        >
            {/* Workshops Section */}
            <Flex
                vertical
                align="start"
                justify="center"
                style={{
                    width: "100%",
                }}
                gap="large"
            >
                <Typography.Title level={3} style={{fontWeight: 800, marginBottom: 0}}>
                    {t("dashboard.events.workshops")}
                </Typography.Title>
                {renderSection(workshops, "کارگاه")}
            </Flex>

            {/* Talks Section */}
            <Flex
                vertical
                align="start"
                justify="center"
                style={{
                    width: "100%",
                }}
                gap="large"
            >
                <Typography.Title level={3} style={{fontWeight: 800, marginBottom: 0}}>
                    {t("dashboard.events.talks")}
                </Typography.Title>
                {renderSection(talks, "ارائه")}
            </Flex>
        </Flex>
    );
}
