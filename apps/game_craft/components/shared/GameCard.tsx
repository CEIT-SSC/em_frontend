'use client';

import { Card, Flex, Image, theme, Typography, Button, Tag } from 'antd';
import { PlayCircleOutlined, DownloadOutlined } from '@ant-design/icons';

const { useToken } = theme;

export function GameCard() {
  const { token } = useToken();

  // Sample game data for preview
  const gameData = {
    title: "Space Explorer",
    description: "An exciting space adventure game where you explore distant galaxies and fight alien enemies.",
    screenshots: [
      "/images/game-screenshot-1.jpg",
      "/images/game-screenshot-2.jpg"
    ],
    developer: "Your Team Name",
    status: "In Development"
  };

  return (
    <Card
      style={{
        width: '100%',
        maxWidth: 400,
      }}
      cover={
        <div style={{ position: 'relative' }}>
          <Image
            alt="Game Screenshot"
            src="/images/game-placeholder.jpg"
            style={{
              width: '100%',
              height: 200,
              objectFit: 'cover'
            }}
            fallback="/images/game-placeholder.jpg"
          />
          <Flex
            align="center"
            justify="center"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              opacity: 0,
              transition: 'opacity 0.3s',
            }}
            className="game-overlay"
          >
            <PlayCircleOutlined
              style={{
                fontSize: 48,
                color: 'white',
                cursor: 'pointer'
              }}
            />
          </Flex>
        </div>
      }
      actions={[
        <Button key="play" type="text" icon={<PlayCircleOutlined />}>
          Play Demo
        </Button>,
        <Button key="download" type="text" icon={<DownloadOutlined />}>
          Download
        </Button>
      ]}
    >
      <Card.Meta
        title={
          <Flex justify="space-between" align="center">
            <Typography.Title level={4} style={{ margin: 0 }}>
              {gameData.title}
            </Typography.Title>
            <Tag color="blue">{gameData.status}</Tag>
          </Flex>
        }
        description={
          <Flex vertical gap="small">
            <Typography.Text>{gameData.description}</Typography.Text>
            <Typography.Text type="secondary">
              Developer: {gameData.developer}
            </Typography.Text>
          </Flex>
        }
      />
    </Card>
  );
}
