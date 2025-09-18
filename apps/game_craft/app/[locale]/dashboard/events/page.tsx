"use client";

import {Alert, Col, Empty, Flex, Row, Spin, theme, Typography} from "antd";
import {useAppDispatch, useAppSelector} from "lib/store/store";
import {useEffect} from "react";
import {fetchPurchasesThunk} from "lib/store/purchases/purchases.thunk";
import {
    purchasesErrorSelector,
    purchasesLoadingSelector,
    talksSelector,
    workshopsSelector,
} from "lib/store/purchases/purchases.selectors";
import {useTranslations} from "next-intl";
import {WorkshopCard} from "components/features/workshops/WorkshopCard";
import {PresentationOverview, PresentationType} from "@ssc/core";

const {useToken} = theme;

export default function EventsPage() {
    const dispatch = useAppDispatch();
    const workshops = useAppSelector(workshopsSelector);
    const talks = useAppSelector(talksSelector);
    const loading = useAppSelector(purchasesLoadingSelector);
    const error = useAppSelector(purchasesErrorSelector);
    const {token} = useToken();
    const t = useTranslations("app");

    useEffect(() => {
        dispatch(fetchPurchasesThunk());
    }, [dispatch]);

    const renderSection = (items: PresentationOverview[], title: string, sectionKey: string) => {
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
                {renderSection(workshops, "کارگاه", "workshop")}
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
                {renderSection(talks, "ارائه", "talk")}
            </Flex>
        </Flex>
    );
}
