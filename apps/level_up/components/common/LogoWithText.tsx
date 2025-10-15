'use client'

import { Flex, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

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

  const logoSrc = variant === 'dark' ? '/images/logo/ssc_white.png' : '/images/logo/ssc_white.png'

  return (
    <Flex
      align="center"
      justify="center"
      className={className}
    >
      <Typography.Title
        level={3}
        style={{
          margin: '-5px',
          fontWeight: 1000,
          opacity: '0.2',
          color: 'white',
        }}
      >
        {t('logo.game')}
      </Typography.Title>

      <Image
        src={logoSrc}
        alt="ssc Logo"
        width={size}
        height={size}
        style={{ zIndex: 10 }}
        priority
      />

      <Typography.Title
        level={3}
        style={{
          margin: '-5px',
          fontWeight: 1000,
          opacity: '0.2',
          color: 'white',
        }}
      >
        {t('logo.craft')}
      </Typography.Title>
    </Flex>
  )
}
