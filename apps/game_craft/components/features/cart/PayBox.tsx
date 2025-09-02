'use client';

import {Button, Divider, Flex, theme, Typography} from 'antd';

const {useToken} = theme;

export function PayBox() {
    const {token} = useToken();

    // Sample cart totals
    const subtotal = 75000;
    const discount = 0;
    const total = subtotal - discount;

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{
                width: '100%',
                padding: token.padding,
                paddingTop: 0,
                zIndex: 1000,
            }}
            gap="small"
        >
            <Divider variant="dashed" type="horizontal" style={{borderColor: token.colorBorder}}/>

            <Flex
                align="center"
                justify="space-between"
                style={{
                    width: '100%',
                }}
                gap="middle"
            >
                <Typography.Text>
                    کد تخفیف دارید؟
                </Typography.Text>
                <Button type="dashed">
                    وارد کردن
                </Button>
            </Flex>

            <Flex
                vertical
                align="center"
                justify="center"
                style={{
                    width: '100%',
                }}
                gap="small"
            >
                <Flex
                    align="center"
                    justify="space-between"
                    style={{width: '100%'}}
                >
                    <Typography.Text>جمع کل:</Typography.Text>
                    <Typography.Text strong>
                        {subtotal.toLocaleString()} تومان
                    </Typography.Text>
                </Flex>

                {discount > 0 && (
                    <Flex
                        align="center"
                        justify="space-between"
                        style={{width: '100%'}}
                    >
                        <Typography.Text type="secondary">تخفیف:</Typography.Text>
                        <Typography.Text type="success">
                            -{discount.toLocaleString()} تومان
                        </Typography.Text>
                    </Flex>
                )}

                <Divider variant={"solid"} style={{margin: '8px 0', borderColor: token.colorBorder}}/>

                <Flex
                    align="center"
                    justify="space-between"
                    style={{width: '100%'}}
                >
                    <Typography.Title level={5} style={{margin: 0}}>
                        مبلغ نهایی:
                    </Typography.Title>
                    <Typography.Title level={5} style={{margin: 0, color: token.colorPrimary}}>
                        {total.toLocaleString()} تومان
                    </Typography.Title>
                </Flex>

                <Button type="primary" size="large" block style={{marginTop: token.margin}}>
                    <Flex align="center" justify="center" gap="small">
                        <Typography.Text style={{fontWeight: 900, color: 'white'}}>
                            پرداخت
                        </Typography.Text>
                    </Flex>
                </Button>
            </Flex>
        </Flex>
    );
}
