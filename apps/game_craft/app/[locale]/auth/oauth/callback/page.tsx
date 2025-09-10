'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { message, Spin, Typography } from 'antd'
import { GoogleOAuth } from '@/lib/utils/googleOAuth'

const { Title, Text } = Typography

export default function OAuthCallbackPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const handleOAuthCallback = async () => {
            try {
                // Get the authorization code from URL parameters
                const code = searchParams.get('code')
                const error = searchParams.get('error')
                
                if (error) {
                    throw new Error(`OAuth error: ${error}`)
                }
                
                if (!code) {
                    throw new Error('No authorization code received')
                }

                console.log('OAuth authorization code received:', code)
                
                // Exchange code for access token
                const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://aut-ssc.ir'}/api/o/token/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        code: code,
                        client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID || '',
                        redirect_uri: `${window.location.origin}/auth/oauth/callback`,
                    })
                })
                
                if (!tokenResponse.ok) {
                    const errorData = await tokenResponse.text()
                    throw new Error(`Token exchange failed: ${errorData}`)
                }
                
                const tokens = await tokenResponse.json()
                console.log('Tokens received:', tokens)
                
                // Store tokens in localStorage
                localStorage.setItem('gamecraft_access_token', tokens.access_token)
                localStorage.setItem('gamecraft_refresh_token', tokens.refresh_token)
                localStorage.setItem('gamecraft_token_type', tokens.token_type || 'Bearer')
                
                if (tokens.expires_in) {
                    const expiresAt = Date.now() + (tokens.expires_in * 1000)
                    localStorage.setItem('gamecraft_expires_in', expiresAt.toString())
                }
                
                setStatus('success')
                message.success('Successfully authenticated with Google!')
                
                // Clear Google auth flag
                GoogleOAuth.clearRedirectInfo()
                
                // Redirect to dashboard
                setTimeout(() => {
                    router.push('/dashboard')
                }, 2000)
                
            } catch (error) {
                console.error('OAuth callback error:', error)
                setStatus('error')
                const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred'
                setErrorMessage(errorMsg)
                message.error(`Authentication failed: ${errorMsg}`)
                
                // Clear any stored auth state
                GoogleOAuth.clearRedirectInfo()
                
                // Redirect to signup page after error
                setTimeout(() => {
                    router.push('/auth/signup')
                }, 3000)
            }
        }

        handleOAuthCallback()
    }, [searchParams, router])

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
                    <Title level={4}>Completing Authentication...</Title>
                    <Text type="secondary">Please wait while we finalize your login</Text>
                </>
            )}
            
            {status === 'success' && (
                <>
                    <Title level={4} style={{ color: '#52c41a' }}>Welcome!</Title>
                    <Text type="secondary">Authentication successful. Redirecting to dashboard...</Text>
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
