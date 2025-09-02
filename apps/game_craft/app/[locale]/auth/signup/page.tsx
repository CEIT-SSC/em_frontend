'use client'

import {Button, Col, Divider, Flex, Input, Row, theme, Typography} from 'antd'
import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {Link} from '@/lib/navigation'
import Image from 'next/image'
import {message} from 'antd'

const {useToken} = theme

export default function SignUpPage() {
    const {token} = useToken()
    const t = useTranslations('app.auth')
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSignUp = async () => {
        try {
            setLoading(true)
            // TODO: Implement signup API call
            console.log('SignUp:', {displayName, email, phoneNumber, password})
            message.success('Registration successful! Please login.')
        } catch (error) {
            console.error('Registration error:', error)
            message.error('Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Flex style={{width: '100%', height: '100%', padding: '1rem'}}>
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
                        {/* SignUp Form */}
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
                                    placeholder={t('displayName')}
                                    size="large"
                                    variant="filled"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                />

                                <Input
                                    placeholder={t('email')}
                                    size="large"
                                    variant="filled"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <Input
                                    placeholder={t('phoneNumber')}
                                    size="large"
                                    variant="filled"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />

                                <Input.Password
                                    placeholder={t('password')}
                                    size="large"
                                    variant="filled"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
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
                                    onClick={handleSignUp}
                                >
                                    {t('register')}
                                </Button>
                                <Flex align="center" justify="center" gap="small">
                                    <Typography.Text type="secondary">
                                        {t('alreadyHaveAccount')}
                                    </Typography.Text>
                                    <Link href="/auth/login">
                                        {t('login')}
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
                        <Typography.Title style={{color: "#01b582", fontWeight: 600, margin: 0}}>
                            {t('signUp')}
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
