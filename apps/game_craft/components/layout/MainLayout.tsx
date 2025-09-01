'use client'

import { Layout } from 'antd'
import { AppHeader } from './AppHeader'
import { AppFooter } from './AppFooter'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
        hello
      <Layout.Content style={{backgroundColor: 'white'}}>
        {children}
      </Layout.Content>
      <AppFooter />
    </Layout>
  )
}
