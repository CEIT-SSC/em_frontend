'use client'

import { Button, Col, Divider, Flex, Input, Row, theme, Typography } from 'antd'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import Image from 'next/image'
import { message } from 'antd'

const { useToken } = theme

export default function ForgotPasswordPage() {
  const { token } = useToken()
  const t = useTranslations('app.auth')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const handleResetPassword = async () => {
    try {
      setLoading(true)
      // TODO: Implement forgot password API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setResetSent(true)
      message.success('Reset link sent to your email!')
    } catch (e) {
      console.error(e)
      message.error('Failed to send reset link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex style={{ padding: '1rem', width: '100%', height: '100%' }}>
      <Row style={{ height: '100%', width: '100%' }}>
        <Col
          span={24}
          order={2}
          md={{ span: 12, order: 1 }}
        >
          <Flex
            align="center"
            justify="center"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Forgot Password Form */}
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
                style={{ width: '100%' }}
              >
                <Divider type="horizontal" variant="solid" style={{ margin: 0 }}>
                  <Image
                    src="/images/light-3d-bulb.svg"
                    alt="logo"
                    width={50}
                    height={50}
                  />
                </Divider>

                <Typography.Title level={4} style={{ margin: '1rem 0', textAlign: 'center' }}>
                  {t('resetPassword')}
                </Typography.Title>

                <Typography.Paragraph style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  {t('resetPasswordInstructions')}
                </Typography.Paragraph>

                {!resetSent ? (
                  <Input
                    placeholder={t('email')}
                    size="large"
                    variant="filled"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <Typography.Text type="success" style={{ textAlign: 'center' }}>
                    {t('resetLinkSent')}
                  </Typography.Text>
                )}
              </Flex>

              <Flex
                vertical
                align="center"
                justify="center"
                style={{ width: '100%' }}
                gap="small"
              >
                {!resetSent ? (
                  <Button
                    type="primary"
                    size="large"
                    style={{ width: '100%' }}
                    loading={loading}
                    onClick={handleResetPassword}
                    disabled={!email}
                  >
                    {t('sendResetLink')}
                  </Button>
                ) : (
                  <Button
                    type="default"
                    size="large"
                    style={{ width: '100%' }}
                    onClick={() => setResetSent(false)}
                  >
                    {t('sendAnotherLink')}
                  </Button>
                )}

                <Flex align="center" justify="center" gap="small">
                  <Typography.Text type="secondary">
                    {t('rememberPassword')}
                  </Typography.Text>
                  <Link href="/auth/login">
                    {t('backToLogin')}
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Col>
        <Col
          span={0}
          order={1}
          md={{ span: 12, order: 2 }}
        >
          <Flex
            vertical
            align="center"
            justify="center"
            style={{ height: '100%', width: '100%' }}
            gap={1}
          >
            <Typography.Title style={{ color: token.colorBgBase, fontWeight: 'bolder' }}>
              {t('resetPassword')}
            </Typography.Title>
            <Image
              src="/images/dark-3d.svg"
              alt="logo"
              width={100}
              height={100}
            />
          </Flex>
        </Col>
      </Row>
    </Flex>
  )
}
