import { Card, Flex } from 'antd'
import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        minHeight: '80vh',
        padding: '2rem',
      }}
    >
      <LoginForm />
    </Flex>
  )
}
