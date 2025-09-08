'use client'

import {Button, Col, Divider, Flex, Input, Row, theme, Typography, Space} from 'antd'
import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {Link} from '@/lib/navigation'
import Image from 'next/image'
import {message} from 'antd'
import { customColors } from '@/config/colors'
import { GoogleOutlined } from '@ant-design/icons'

const {useToken} = theme

export default function SignUpPage() {
    const {token} = useToken()
    const t = useTranslations('app.auth')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)

    const handleSignUp = async () => {
        // Basic validation
        if (!firstName.trim()) {
            message.error('Please enter your first name')
            return
        }
        if (!lastName.trim()) {
            message.error('Please enter your last name')
            return
        }
        if (!email.trim()) {
            message.error('Please enter your email')
            return
        }
        if (!password.trim()) {
            message.error('Please enter your password')
            return
        }
        if (password.length < 6) {
            message.error('Password must be at least 6 characters long')
            return
        }

        try {
            setLoading(true)
            // TODO: Implement manual signup API call
            console.log('Manual SignUp:', {firstName, lastName, email, password})
            message.success('Registration successful! Please check your email for verification.')
        } catch (error) {
            console.error('Registration error:', error)
            message.error('Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignUp = async () => {
        try {
            setGoogleLoading(true)
            // TODO: Implement Google signup
            console.log('Google SignUp initiated')
            message.info('Google signup will be implemented soon.')
        } catch (error) {
            console.error('Google signup error:', error)
            message.error('Google signup failed. Please try again.')
        } finally {
            setGoogleLoading(false)
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
                                padding: '2rem',
                                borderRadius: token.borderRadius,
                                minWidth: '350px',
                                backgroundColor: token.colorBgBase,
                                width: '30vw',
                                minHeight: '500px'
                            }}
                        >
                            <Flex
                                vertical
                                align="center"
                                justify="center"
                                gap="middle"
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

                                {/* Manual Registration Form */}
                                <Space direction="vertical" size="middle" style={{width: '100%'}}>
                                    <Row gutter={12}>
                                        <Col span={12}>
                                            <Input
                                                placeholder={t('firstName')}
                                                size="large"
                                                variant="filled"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                style={{
                                                    height: '48px',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <Input
                                                placeholder={t('lastName')}
                                                size="large"
                                                variant="filled"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                style={{
                                                    height: '48px',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Input
                                        placeholder={t('email')}
                                        size="large"
                                        variant="filled"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            height: '48px',
                                            borderRadius: '8px'
                                        }}
                                    />

                                    <Input.Password
                                        placeholder={t('password')}
                                        size="large"
                                        variant="filled"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{
                                            height: '48px',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </Space>

                                {/* Create Account Button */}
                                <Button
                                    type="primary"
                                    size="large"
                                    style={{
                                        width: '100%',
                                        height: '48px',
                                        backgroundColor: customColors.colorAction,
                                        borderColor: customColors.colorAction,
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        fontSize: '16px'
                                    }}
                                    loading={loading}
                                    onClick={handleSignUp}
                                >
                                    {t('createAccount')}
                                </Button>

                                <Divider style={{margin: '1rem 0'}}>
                                    <Typography.Text type="secondary">
                                        {t('or')}
                                    </Typography.Text>
                                </Divider>

                                {/* Google Sign Up Button */}
                                <Button
                                    icon={<GoogleOutlined />}
                                    size="large"
                                    style={{
                                        width: '100%',
                                        height: '48px',
                                        borderColor: '#db4437',
                                        color: '#db4437',
                                        fontWeight: 500,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                    loading={googleLoading}
                                    onClick={handleGoogleSignUp}
                                >
                                    {t('continueWithGoogle')}
                                </Button>
                            </Flex>

                            <Flex
                                align="center"
                                justify="center"
                                style={{width: '100%'}}
                                gap="small"
                            >
                                <Typography.Text type="secondary">
                                    {t('alreadyHaveAccount')}
                                </Typography.Text>
                                <Link 
                                    href="/auth/login"
                                    style={{
                                        color: customColors.colorAction,
                                        textDecoration: 'none',
                                        fontWeight: 500
                                    }}
                                >
                                    {t('login')}
                                </Link>
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
                        <Typography.Title style={{color: customColors.colorAction, fontWeight: 600, margin: 0}}>
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
