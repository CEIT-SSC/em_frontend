'use client'

import { Button, Col, ConfigProvider, Divider, Flex, Layout, Row, theme, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinFilled,
  XOutlined,
  YoutubeFilled
} from '@ant-design/icons'

const { useToken } = theme

// Dark theme for footer
const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    fontFamily: "Estedad, Vazirmatn, sans-serif",
    borderRadius: 16,
    colorPrimary: "#3c3a7d",
    colorInfo: "#3c3a7d",
    colorAction: "#01B582",
    colorBgBase: "#1E1E1E",
  }
}

export default function AppFooter() {
  const { token } = useToken()
  const t = useTranslations('app.footer')

  return (
    <ConfigProvider theme={darkTheme}>
      <Layout.Footer
        style={{
          backgroundColor: token.colorPrimary,
          textAlign: 'center',
          width: '100%',
          padding: token.padding,
        }}
      >
        <Typography.Title level={2}>
          {t('autGameCraft')}
        </Typography.Title>
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <Row align="middle" justify="space-around" gutter={[16, 16]}>
            <Col span={24} md={12}>
              <Flex
                align="center"
                justify="center"
                flex={1}
                gap="large"
              >
                <Image
                  src="/svg/dark-3d.svg"
                  alt="GameCraft Logo"
                  width={80}
                  height={80}
                  style={{ width: '10%', height: 'auto' }}
                />
                <Image
                  src="/images/logo/ssc_white.png"
                  alt="AUT Computer Engineering Logo"
                  width={80}
                  height={80}
                  style={{ width: '10%', height: 'auto' }}
                />
                <Image
                  src="/images/logo/Asset 4.png"
                  alt="Tehran Art Logo"
                  width={80}
                  height={80}
                  style={{ width: '10%', height: 'auto' }}
                />
              </Flex>
            </Col>
            <Col span={24} md={12}>
              <Flex
                align="center"
                justify="center"
                flex={1}
                gap="small"
              >
                <Button type="text" shape="circle" size="large" icon={<YoutubeFilled />} />
                <Button type="text" shape="circle" size="large" icon={<XOutlined />} />
                <Button type="text" shape="circle" size="large" icon={<InstagramOutlined />} />
                <Button type="text" shape="circle" size="large" icon={<FacebookFilled />} />
                <Button type="text" shape="circle" size="large" icon={<LinkedinFilled />} />
              </Flex>
            </Col>
          </Row>
        </Flex>
        <Divider>
          <Typography.Text type="secondary">
            {t('copyRight')}
          </Typography.Text>
        </Divider>
      </Layout.Footer>
    </ConfigProvider>
  )
}
