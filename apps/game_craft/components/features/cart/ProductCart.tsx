import {digitsToHindi, moneyFormat} from "@ssc/utils";
import Image from "next/image";
import React from "react";
import {Card, Flex, Typography, Button, theme, Grid} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";

const {useToken} = theme;
const {useBreakpoint} = Grid;

interface Props {
    title: string;
    price: string;
    imageUrl: string;
    onRemove: () => void;
}

const ProductCart = (props: Props) => {
    const {token} = useToken();
    const screens = useBreakpoint();

    const isMobile = !screens.md;
    const imageSize = isMobile ? 48 : 64;

    return (
        <Card
            variant={"borderless"}
            style={{
                width: '100%',
            }}
            styles={{
                body: {
                    padding: isMobile ? token.paddingSM : token.padding
                }
            }}
        >
            <Flex
                align={isMobile ? "flex-start" : "center"}
                justify="space-between"
                gap={isMobile ? "small" : "middle"}
                vertical={isMobile}
                style={{width: '100%'}}
            >
                {/* Main content section - Image and Title */}
                <Flex
                    align="center"
                    gap={isMobile ? "small" : "middle"}
                    style={{
                        flex: 1,
                        minWidth: 0,
                        width: isMobile ? '100%' : 'auto'
                    }}
                >
                    <Image
                        src={props.imageUrl}
                        alt={props.title}
                        width={imageSize}
                        height={imageSize}
                        style={{
                            borderRadius: token.borderRadius,
                            objectFit: 'cover',
                            flexShrink: 0
                        }}
                    />
                    <Typography.Title
                        level={isMobile ? 5 : 5}
                        style={{
                            margin: 0,
                            flex: 1,
                            minWidth: 0,
                            lineHeight: 1.4,
                            fontSize: isMobile ? token.fontSizeSM : token.fontSizeLG
                        }}
                        ellipsis={{rows: isMobile ? 2 : 2}}
                    >
                        {props.title}
                    </Typography.Title>
                </Flex>

                {/* Price and Action section */}
                <Flex
                    align="center"
                    justify={isMobile ? "space-between" : "flex-end"}
                    gap={isMobile ? "middle" : "middle"}
                    style={{
                        flexShrink: 0,
                        width: isMobile ? '100%' : 'auto',
                        marginTop: isMobile ? token.marginXS : 0
                    }}
                >
                    <Typography.Text
                        strong
                        style={{
                            fontSize: isMobile ? token.fontSizeLG : token.fontSizeXL,
                            color: token.colorTextSecondary,
                            fontWeight: 600
                        }}
                    >
                        {digitsToHindi(moneyFormat(props.price))} تومان
                    </Typography.Text>
                    <Button
                        type="dashed"
                        variant={"filled"}
                        color={"danger"}
                        size={isMobile ? "middle" : "large"}
                        icon={<DeleteOutlined/>}
                        onClick={props.onRemove}
                        style={{
                            color: token.colorTextSecondary,
                            padding: isMobile ? token.paddingXXS : token.paddingXS,
                            minWidth: isMobile ? 'auto' : 'auto'
                        }}
                        aria-label="حذف محصول"
                    />
                </Flex>
            </Flex>
        </Card>
    );
};

export default ProductCart;
