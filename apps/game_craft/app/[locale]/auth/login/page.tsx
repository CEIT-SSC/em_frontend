'use client'

import {Button, Col, Divider, Flex, Input, Row, theme, Typography} from 'antd'
import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {Link} from '@/lib/navigation'
import Image from 'next/image'
import { customColors } from '@/config/colors'
import { GoogleOutlined } from '@ant-design/icons'
import { useAuth } from '@/api'
import { useRouter } from '@/lib/navigation'
import { message } from 'antd'
import { GoogleOAuth } from '@/lib/utils/googleOAuth'

const {useToken} = theme

export default function LoginPage() {
    const {token} = useToken()
    const t = useTranslations('app.auth')
    const router = useRouter()
    const { login, loading: authLoading, error: authError } = useAuth()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [googleLoading, setGoogleLoading] = useState(false)

    const handleLogin = async () => {
        // Basic validation
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

        try {
            console.log('Attempting login with:', {
                username: email.trim()
            })
            
            const result = await login({
                username: email.trim(),
                password: password
            })

            message.success('Login successful!')
            console.log('Login successful:', result)
            
            // Clear form
            setEmail('')
            setPassword('')
            
            // Redirect to dashboard
            router.push('/dashboard')
            
        } catch (error) {
            console.error('Login error:', error)
            // Show the error message from the API if available
            if (authError && authError.includes('credentials')) {
                message.error('Invalid email or password. Please check your credentials and try again.')
            } else if (authError && authError.includes('email')) {
                message.error('Please verify your email address before logging in.')
            } else if (authError) {
                message.error(authError)
            } else {
                message.error('Login failed. Please check your credentials and try again.')
            }
        }
    }

    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true)
            
            // Validate Google OAuth configuration
            if (!GoogleOAuth.validateConfig()) {
                message.error('Google OAuth is not properly configured. Please contact support.')
                return
            }
            
            // Store redirect info
            GoogleOAuth.storeRedirectInfo('login')
            
            // Redirect to Google OAuth
            const googleOAuthURL = GoogleOAuth.buildAuthURL()
            console.log('Redirecting to Google OAuth:', googleOAuthURL)
            window.location.href = googleOAuthURL
            
        } catch (error) {
            console.error('Google login error:', error)
            message.error('Failed to initiate Google login. Please try again.')
            setGoogleLoading(false)
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
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onPressEnter={handleLogin}
                                />

                                <Input.Password
                                    placeholder={t('password')}
                                    size="large"
                                    variant="filled"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onPressEnter={handleLogin}
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
                                    style={{
                                        width: '100%',
                                        backgroundColor: customColors.colorAction,
                                        borderColor: customColors.colorAction,
                                        fontWeight: 600
                                    }}
                                    loading={authLoading}
                                    onClick={handleLogin}
                                >
                                    {t('login')}
                                </Button>

                                <Divider style={{margin: '10px 0'}}>
                                    <Typography.Text type="secondary">
                                        {t('or')}
                                    </Typography.Text>
                                </Divider>

                                {/* Google Login Button */}
                                <Button
                                    icon={<GoogleOutlined />}
                                    size="large"
                                    style={{
                                        width: '100%',
                                        borderColor: '#db4437',
                                        color: '#db4437',
                                        fontWeight: 500,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                    loading={googleLoading}
                                    onClick={handleGoogleLogin}
                                >
                                    {t('continueWithGoogle')}
                                </Button>
                                
                                <Flex align="center" justify="center" gap="small">
                                    <Typography.Text type="secondary">
                                        {t('doNotHaveAccount')}
                                    </Typography.Text>
                                    <Link 
                                        href="/auth/signup"
                                        style={{
                                            color: customColors.colorAction,
                                            textDecoration: 'none',
                                            fontWeight: 500
                                        }}
                                    >
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
                        <Typography.Title style={{color: customColors.colorAction, fontWeight: 600, margin: 0}}>
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
