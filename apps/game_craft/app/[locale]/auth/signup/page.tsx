'use client'

import {Button, Col, Divider, Flex, Input, Row, theme, Typography, Space} from 'antd'
import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {Link} from '@/lib/navigation'
import Image from 'next/image'
import {message} from 'antd'
import { customColors } from '@/config/colors'
import { GoogleOutlined } from '@ant-design/icons'
import { useAuth } from '@/api'
import { useRouter } from '@/lib/navigation'

const {useToken} = theme

export default function SignUpPage() {
    const {token} = useToken()
    const t = useTranslations('app.auth')
    const router = useRouter()
    const { register, loading: authLoading, error: authError } = useAuth()
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email.trim())) {
            message.error('Please enter a valid email address')
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
            // Call the API to register the user
            console.log('Attempting registration with data:', {
                email: email.trim(),
                first_name: firstName.trim(),
                last_name: lastName.trim()
            })
            
            const result = await register({
                email: email.trim(),
                password: password,
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                phone_number: '' // Empty phone number - backend should handle this
            })

            message.success('Registration successful! Please check your email for verification.')
            console.log('Registration successful:', result)
            
            // Clear the form after successful registration
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            
            // Optionally redirect to email verification page or login page
            // router.push('/auth/verify-email')
            
        } catch (error) {
            console.error('Registration error:', error)
            // Show the error message from the API if available
            if (authError && authError.includes('email')) {
                message.error('This email is already registered. Please use a different email or try logging in.')
            } else if (authError && authError.includes('password')) {
                message.error('Password does not meet requirements. Please choose a stronger password.')
            } else if (authError) {
                message.error(authError)
            } else {
                message.error('Registration failed. Please check your information and try again.')
            }
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
                                <form 
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        handleSignUp()
                                    }}
                                    style={{width: '100%'}}
                                >
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
                                </form>

                                {/* Create Account Button */}
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    style={{
                                        width: '100%',
                                        height: '48px',
                                        backgroundColor: customColors.colorAction,
                                        borderColor: customColors.colorAction,
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        fontSize: '16px'
                                    }}
                                    loading={authLoading}
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
