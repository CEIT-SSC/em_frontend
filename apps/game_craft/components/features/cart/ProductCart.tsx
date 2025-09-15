import {digitsToHindi, moneyFormat} from "@ssc/utils";
import Image from "next/image";
import React from "react";
import {Card, Flex, Typography, Button, theme} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";

const {useToken} = theme;

interface Props {
    title: string;
    price: string;
    imageUrl: string;
    onRemove: () => void;
}

const ProductCart = (props: Props) => {
    const {token} = useToken();

    return (
        <Card
            variant={"borderless"}
            style={{
                width: '100%',
            }}
            styles={{
                body: {padding: token.padding}
            }}
        >
            <Flex
                align="center"
                justify="space-between"
                gap="middle"
                wrap
                style={{width: '100%'}}
            >
                {/* Left section - Image and Title */}
                <Flex
                    align="center"
                    gap="middle"
                    style={{flex: 1, minWidth: 0}}
                >
                    <Image
                        src={props.imageUrl}
                        alt={props.title}
                        width={64}
                        height={64}
                        style={{
                            borderRadius: token.borderRadius,
                            objectFit: 'cover',
                            flexShrink: 0
                        }}
                    />
                    <Typography.Title
                        level={5}
                        style={{
                            margin: 0,
                            flex: 1,
                            minWidth: 0,
                            lineHeight: 1.4
                        }}
                        ellipsis={{rows: 2}}
                    >
                        {props.title}
                    </Typography.Title>
                </Flex>

                {/* Right section - Price and Delete */}
                <Flex
                    align="center"
                    gap="middle"
                    style={{flexShrink: 0}}
                >
                    <Typography.Text
                        strong
                        style={{
                            fontSize: token.fontSizeXL,
                            color: token.colorPrimary
                        }}
                    >
                        {digitsToHindi(moneyFormat(props.price))} تومان
                    </Typography.Text>
                    <Button
                        type="dashed"
                        variant={"filled"}
                        color={"danger"}
                        size={"large"}
                        icon={<DeleteOutlined/>}
                        onClick={props.onRemove}
                        style={{
                            color: token.colorTextSecondary,
                            padding: token.paddingXS
                        }}
                        aria-label="حذف محصول"
                    />
                </Flex>
            </Flex>
        </Card>
    );
};

export default ProductCart;
