'use client'

import { Button, Col, Flex, Grid, Row, theme, Typography } from 'antd'
import Image from 'next/image'
import { useRouter } from '@/lib/navigation'
import { useTranslations } from 'next-intl'

const { useToken } = theme;

interface AboutUsProps {
  padding?: string;
  backgroundColor?: string;
}

export function AboutUs({ padding = '3rem 2rem', backgroundColor }: AboutUsProps) {
  const { token } = useToken();
  const router = useRouter();
  const t = useTranslations('app');

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width: '100%',
        padding: padding,
        backgroundColor: backgroundColor,
      }}
    >
      <Row align="middle" justify="space-around" style={{ width: '100%' }}>
        <Col span={24} lg={12}>
          <Flex vertical align="center" justify="center" style={{ width: '100%' }} gap="small">
            <Flex vertical align="start" justify="center" style={{ width: '100%' }}>
              <Typography.Title
                level={1}
                style={{
                  fontWeight: 900
                }}
              >
                {t('aboutUs.title')}
              </Typography.Title>
              <Typography.Paragraph>
                {t('aboutUs.description')}
              </Typography.Paragraph>
            </Flex>
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: token.colorAction}} // Using colorAction from theme
              onClick={() => router.push('/staffs')}
            >
              {t('buttons.staffs')}
            </Button>
          </Flex>
        </Col>
        <Col span={24} lg={12}>
          <Flex align="center" justify="center" style={{ width: '100%' }}>
            <Image
              src="/assets/images/folan.png"
              alt="gamecraft-logo"
              width={300}
              height={200}
              style={{ width: '50%', height: 'auto' }}
            />
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
}
