'use client'

import { Flex, Typography } from 'antd'
import { useTranslations } from 'next-intl'

interface LogoWithTextProps {
  variant?: 'dark' | 'light'
  size?: number
  className?: string
}

export default function LogoWithText({
  variant = 'dark',
  size = 100,
  className = ''
}: LogoWithTextProps) {
  const t = useTranslations('app')

  return (
    <Flex
      align="center"
      justify="center"
      className={className}
      vertical
    >
      <div style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          <circle cx="100" cy="100" r="80" fill={variant === 'dark' ? '#1890ff' : '#ffffff'} />
          <circle cx="100" cy="70" r="20" fill={variant === 'dark' ? '#ffffff' : '#1890ff'} />
          <rect x="85" y="110" width="30" height="40" fill={variant === 'dark' ? '#ffffff' : '#1890ff'} />
          <polygon points="100,160 85,180 115,180" fill={variant === 'dark' ? '#ffffff' : '#1890ff'} />
        </svg>
      </div>
      <Typography.Title
        level={3}
        style={{
          margin: 0,
          color: variant === 'dark' ? '#ffffff' : '#000000',
          textAlign: 'center'
        }}
      >
        {t('name')}
      </Typography.Title>
    </Flex>
  )
}
