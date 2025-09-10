'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { message, Spin, Typography } from 'antd'
import { useAuth } from '@/api'
import { GoogleOAuth } from '@/lib/utils/googleOAuth'

const { Title, Text } = Typography

export default function GoogleCallbackPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { socialGoogleLogin } = useAuth()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Get the authorization code from URL parameters
                const code = searchParams.get('code')
                const error = searchParams.get('error')
                
                if (error) {
                    throw new Error(`Google OAuth error: ${error}`)
                }
                
                if (!code) {
                    throw new Error('No authorization code received from Google')
                }

                console.log('Google OAuth code received:', code)
                
                // Step 1: Send code to our backend to get handshake token
                const handshakeResponse = await socialGoogleLogin({ code })
                console.log('Handshake token received:', handshakeResponse)
                
                // Step 2: Complete OAuth2 authorization flow
                // The handshake token should be used to complete the auth
                // This might involve redirecting to the authorize endpoint
                const authParams = {
                    client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID || '',
                    redirect_uri: `${window.location.origin}/auth/oauth/callback`,
                    response_type: 'code',
                    handshake_token: handshakeResponse.handshake_token,
                }
                
                // Build authorize URL
                const authorizeURL = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://aut-ssc.ir'}/api/o/authorize/`)
                Object.entries(authParams).forEach(([key, value]) => {
                    if (value) authorizeURL.searchParams.append(key, value)
                })
                
                console.log('Redirecting to authorize URL:', authorizeURL.toString())
                
                // Store that this is coming from Google auth
                localStorage.setItem('google_auth_in_progress', 'true')
                
                // Redirect to complete OAuth2 flow
                window.location.href = authorizeURL.toString()
                
            } catch (error) {
                console.error('Google callback error:', error)
                setStatus('error')
                const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred'
                setErrorMessage(errorMsg)
                message.error(`Google authentication failed: ${errorMsg}`)
                
                // Redirect to signup page after error
                setTimeout(() => {
                    router.push('/auth/signup')
                }, 3000)
            }
        }

        handleCallback()
    }, [searchParams, socialGoogleLogin, router])

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh',
            gap: '20px'
        }}>
            {status === 'loading' && (
                <>
                    <Spin size="large" />
                    <Title level={4}>Processing Google Authentication...</Title>
                    <Text type="secondary">Please wait while we complete your login</Text>
                </>
            )}
            
            {status === 'success' && (
                <>
                    <Title level={4} style={{ color: '#52c41a' }}>Authentication Successful!</Title>
                    <Text type="secondary">Redirecting you to the dashboard...</Text>
                </>
            )}
            
            {status === 'error' && (
                <>
                    <Title level={4} style={{ color: '#ff4d4f' }}>Authentication Failed</Title>
                    <Text type="secondary">{errorMessage}</Text>
                    <Text type="secondary">Redirecting back to signup page...</Text>
                </>
            )}
        </div>
    )
}
