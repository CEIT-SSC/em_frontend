'use client'

import { useState } from 'react'
import { Button, Form, Input, Card, message, Flex, Result } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const t = useTranslations('app.auth')

  const onFinish = async (values: { email: string }) => {
    try {
      setLoading(true)
      // Simulate API call for forgot password
      await new Promise(resolve => setTimeout(resolve, 2000))
      setEmailSent(true)
      message.success('Password reset email sent!')
    } catch (error) {
      console.error('Forgot password error:', error)
      message.error('Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <Flex
        align="center"
        justify="center"
        style={{
          minHeight: '80vh',
          padding: '2rem',
        }}
      >
        <Result
          status="success"
          title="Email Sent Successfully!"
          subTitle="Please check your email for password reset instructions."
          extra={[
            <Link key="login" href="/auth/login">
              <Button type="primary">Back to Login</Button>
            </Link>
          ]}
        />
      </Flex>
    )
  }

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        minHeight: '80vh',
        padding: '2rem',
      }}
    >
      <Card title="Forgot Password" className="w-full max-w-md">
        <Form
          name="forgot-password"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email address"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Send Reset Email
            </Button>
          </Form.Item>

          <Form.Item>
            <Flex justify="center">
              <Link href="/auth/login">
                <Button type="link">Back to Login</Button>
              </Link>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}
