'use client'

import {Button, Col, Divider, Flex, Input, Row, theme, Typography} from 'antd'
import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {Link} from '@/lib/navigation'
import Image from 'next/image'

const {useToken} = theme

export default function LoginPage() {
    const {token} = useToken()
    const t = useTranslations('app.auth')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        try {
            setLoading(true)
            // TODO: Implement login API call
            console.log('Login:', {email, password})
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Flex style={{padding: '1rem', width: '100%', height: '100%'}}>
            <Row style={{height: '100%', width: '100%'}}>
                <Col
                    span={24}
                    order={2}
                    md={{span: 12, order: 1}}
                >
                    <Flex
                        align="center"
                        justify="center"
                        style={{width: '100%', height: '100%'}}
                    >
                        {/* Login Form */}
                        <Flex
                            vertical
                            align="center"
                            justify="space-between"
                            style={{
                                padding: '1rem',
                                borderRadius: token.borderRadius,
                                minWidth: '300px',
                                minHeight: '400px',
                                backgroundColor: token.colorBgBase,
                                width: '25vw',
                                height: '50vh'
                            }}
                        >
                            <Flex
                                vertical
                                align="center"
                                justify="center"
                                gap="small"
                                style={{width: '100%'}}
                            >
                                <Divider type="horizontal" variant="solid" style={{margin: 0, borderColor: token.colorBorder}}>
                                    <Image
                                        src="/images/light-3d-bulb.svg"
                                        alt="logo"
                                        width={50}
                                        height={50}
                                    />
                                </Divider>

                                <Input
                                    placeholder={t('email')}
                                    size="large"
                                    variant="filled"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <Input.Password
                                    placeholder={t('password')}
                                    size="large"
                                    variant="filled"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <Flex align="center" justify="start" style={{width: '100%'}}>
                                    <Link href="/auth/forgot-password" style={{fontSize: 'small'}}>
                                        {t('forgotPassword')}
                                    </Link>
                                </Flex>
                            </Flex>

                            <Flex
                                vertical
                                align="center"
                                justify="center"
                                style={{width: '100%'}}
                                gap="small"
                            >
                                <Button
                                    type="primary"
                                    size="large"
                                    style={{width: '100%'}}
                                    loading={loading}
                                    onClick={handleLogin}
                                >
                                    {t('login')}
                                </Button>
                                <Flex align="center" justify="center" gap="small">
                                    <Typography.Text type="secondary">
                                        {t('doNotHaveAccount')}
                                    </Typography.Text>
                                    <Link href="/auth/signup">
                                        {t('signUp')}
                                    </Link>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Col>
                <Col
                    span={0}
                    order={1}
                    md={{span: 12, order: 2}}
                >
                    <Flex
                        vertical
                        align="center"
                        justify="center"
                        style={{height: '100%', width: '100%'}}
                        gap={1}
                    >
                        <Typography.Title style={{color: token.colorAction, fontWeight: 600, margin: 0}}>
                            {t('login')}
                        </Typography.Title>
                        <Image
                            src="/images/dark-3d.svg"
                            alt="logo"
                            width={200}
                            height={200}
                        />
                    </Flex>
                </Col>
            </Row>
        </Flex>
    )
}
