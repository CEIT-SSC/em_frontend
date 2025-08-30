'use client'

import { Button, Col, ConfigProvider, Flex, Grid, Row, theme, Typography } from 'antd';
import { InstagramOutlined, XOutlined, YoutubeFilled } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const { useToken } = theme;
const { useBreakpoint } = Grid;

// Dark theme configuration to match React project
const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    fontFamily: "Estedad, Vazirmatn, sans-serif",
    borderRadius: 16,
    colorPrimary: "#3c3a7d",
    colorInfo: "#3c3a7d",
    colorAction: "#01B582",
    colorBgBase: "#1E1E1E",
  },
  components: {
    Timeline: {
      dotBg: 'transparent',
      tailColor: '#01B582',
      tailWidth: 10,
    },
  },
};

interface GameCraftIntroProps {
  padding?: string;
  backgroundColor?: string;
}

export function GameCraftIntro({ padding = '3rem 2rem', backgroundColor }: GameCraftIntroProps) {
  const { token } = useToken();
  const t = useTranslations('app');
  const screens = useBreakpoint();

  return (
    <ConfigProvider theme={darkTheme}>
      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          width: '100%',
          padding: padding,
          backgroundColor: backgroundColor,
        }}
      >
        <Row align="middle" justify="space-around" gutter={[16, 16]} style={{ width: '100%' }}>
          <Col span={24} lg={12}>
            <Flex
              vertical
              align="start"
              justify="start"
              style={{
                width: '100%',
                position: 'relative',
                zIndex: 10
              }}
              gap="small"
            >
              {/* Bubble Background - using the actual SVG from React project */}
              <Flex align="center" justify="center" style={{
                width: '100%',
                height: '100%',
                position: "absolute",
                zIndex: -1,
              }}>
                <Image
                  src="/assets/svg/bubble-purple.svg"
                  alt="bubble-image"
                  width={500}
                  height={500}
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: 'scaleX(-1)',
                  }}
                />
              </Flex>

              <Typography.Title level={1} style={{
                color: '#01B582', // colorAction from theme
                fontWeight: 1000,
                fontSize: screens.lg ? '5rem' : screens.md ? '4rem' : '3rem',
                marginBottom: '1rem'
              }}>
                {t('intro.title')}
              </Typography.Title>

              <Typography.Title
                level={3}
                style={{
                  fontWeight: 900,
                  margin: 0,
                  color: 'white'
                }}
              >
                {t('intro.subtitle')}
              </Typography.Title>

              <Typography.Paragraph style={{ color: 'white', fontSize: '1rem' }}>
                {t('intro.description')}
              </Typography.Paragraph>

              <Flex align="center" justify="start" style={{ width: '100%' }} gap="small" wrap>
                <Button
                  type="primary"
                  size="large"
                  shape="circle"
                  icon={<XOutlined style={{ fontSize: '2rem' }} />}
                  style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    background: '#01B582'
                  }}
                />
                <Button
                  type="primary"
                  size="large"
                  shape="circle"
                  icon={<InstagramOutlined style={{ fontSize: '2rem' }} />}
                  style={{
                    width: '4rem',
                    height: '4rem',
                    background: '#01B582'
                  }}
                />
                <Button
                  type="primary"
                  size="large"
                  shape="circle"
                  icon={<YoutubeFilled style={{ fontSize: '2rem' }} />}
                  style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    background: '#01B582'
                  }}
                />
              </Flex>
            </Flex>
          </Col>

          <Col span={24} lg={12}>
            <Flex align="center" justify="center" style={{ width: '100%' }}>
              <Image
                src="/assets/svg/dark-3d-bulb.svg"
                alt="logo"
                width={300}
                height={300}
                style={{ width: '50%', height: 'auto' }}
              />
            </Flex>
          </Col>
        </Row>
      </Flex>
    </ConfigProvider>
  );
}
