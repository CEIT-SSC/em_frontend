'use client'

import { useState } from 'react'
import { Button, Form, Input, Card, message, Flex } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from '@/lib/navigation'
import { register } from '@/lib/api/services/auth'

export default function SignUpPage() {
  const [loading, setLoading] = useState(false)
  const t = useTranslations('app.auth')
  const router = useRouter()

  const onFinish = async (values: {
    username: string
    email: string
    phoneNumber: string
    password: string
    confirmPassword: string
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match!')
      return
    }

    try {
      setLoading(true)
      await register(values.username, values.email, values.phoneNumber, values.password)
      message.success('Registration successful! Please login.')
      router.push('/auth/login')
    } catch (error) {
      console.error('Registration error:', error)
      message.error('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
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
      <Card title="Sign Up" className="w-full max-w-md">
        <Form
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { min: 3, message: 'Username must be at least 3 characters!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
            />
          </Form.Item>

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
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please input your phone number!' }
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Enter your phone number"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[
              { required: true, message: 'Please confirm your password!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}
