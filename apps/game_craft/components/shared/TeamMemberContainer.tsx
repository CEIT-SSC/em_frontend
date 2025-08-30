'use client';

import { Button, Col, Flex, Row, theme, Typography } from 'antd';
import { TeamMemberCard } from './TeamMemberCard';
import { UserAddOutlined } from '@ant-design/icons';

const { useToken } = theme;

export function TeamMemberContainer() {
  const { token } = useToken();

  // Sample team members data
  const teamMembers = [
    { name: 'احمد رضایی', role: 'سرپرست تیم', avatar: undefined },
    { name: 'مریم احمدی', role: 'برنامه‌نویس', avatar: undefined },
    { name: 'علی حسینی', role: 'طراح گرافیک', avatar: undefined },
    { name: 'فاطمه کریمی', role: 'طراح بازی', avatar: undefined },
  ];

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: '100%',
      }}
      gap="small"
    >
      <Row
        align="middle"
        justify="center"
        style={{ width: '100%' }}
        gutter={[16, 16]}
      >
        <Col span={24}>
          <Typography.Title level={4} style={{ marginBottom: '1.5rem' }}>
            افراد تیم
          </Typography.Title>
        </Col>

        {teamMembers.map((member, index) => (
          <Col key={index} span={24} sm={12} lg={8}>
            <TeamMemberCard
              isHead={index === 0}
              member={member}
            />
          </Col>
        ))}

        {/* Add empty slots for remaining team members */}
        {Array.from({ length: 4 - teamMembers.length }).map((_, index) => (
          <Col key={`empty-${index}`} span={24} sm={12} lg={8}>
            <TeamMemberCard />
          </Col>
        ))}

        <Col span={24} sm={12} lg={8}>
          <Button
            type="text"
            style={{
              width: '100%',
              height: '120px',
              borderRadius: token.borderRadius,
              border: `2px dashed ${token.colorBorder}`,
            }}
            icon={
              <UserAddOutlined style={{ fontSize: 24 }} />
            }
          >
            <Typography.Text style={{ marginTop: 8 }}>
              افزودن هم تیمی
            </Typography.Text>
          </Button>
        </Col>
      </Row>
    </Flex>
  );
}
