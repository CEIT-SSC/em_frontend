'use client'

import { Flex, Layout, theme } from 'antd'

const { useToken } = theme

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { token } = useToken()

  return (
    <Flex style={{ width: '100vw', height: '100vh' }}>
      <Layout
        style={{
          height: '100%',
          width: '100%',
          backgroundImage: "url('/images/pattern.svg')",
          backgroundColor: token.colorPrimary
        }}
      >
        {children}
      </Layout>
    </Flex>
  );
}
