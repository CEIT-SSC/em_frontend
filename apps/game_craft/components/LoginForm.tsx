'use client'

import { useState } from 'react'
import { Button, Form, Input, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '@/components/providers/AuthProvider'
import { useTranslations } from 'next-intl'

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated, user } = useAuth()
  const t = useTranslations('app')

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true)
      await login(values.email, values.password)
      message.success('Login successful!')
    } catch (error) {
      console.error('Login error:', error)
      message.error('Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated && user) {
    return (
      <Card className="w-full max-w-md">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Welcome, {user.username}!</h3>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <Button type="primary" danger>
            Logout
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card title="Login" className="w-full max-w-md">
      <Form
        name="login"
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
            prefix={<UserOutlined />}
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            {t('mainNavigation.login') || 'Login'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
