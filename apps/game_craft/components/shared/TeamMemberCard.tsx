'use client';

import { Avatar, Card, Flex, theme, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CrownBadge from './CrownBadge';

const { useToken } = theme;

interface TeamMemberCardProps {
  isHead?: boolean;
  member?: {
    name: string;
    role: string;
    avatar?: string;
  };
}

export function TeamMemberCard({ isHead = false, member }: TeamMemberCardProps) {
  const { token } = useToken();

  const defaultMember = {
    name: 'نام عضو تیم',
    role: isHead ? 'سرپرست تیم' : 'عضو تیم',
    avatar: undefined
  };

  const memberData = member || defaultMember;

  return (
    <Card
      style={{
        width: '100%',
        borderRadius: token.borderRadius,
        position: 'relative',
      }}
      bodyStyle={{ padding: token.padding }}
    >
      {isHead && <CrownBadge />}

      <Flex
        vertical
        align="center"
        justify="center"
        gap="small"
      >
        <Avatar
          size={64}
          icon={<UserOutlined />}
          src={memberData.avatar}
          style={{
            backgroundColor: token.colorPrimary,
          }}
        />

        <Flex
          vertical
          align="center"
          justify="center"
          style={{ textAlign: 'center' }}
        >
          <Typography.Title
            level={5}
            style={{
              margin: 0,
              fontWeight: 700,
              color: isHead ? token.colorWarning : token.colorText
            }}
          >
            {memberData.name}
          </Typography.Title>

          <Typography.Text
            type="secondary"
            style={{ fontSize: 12 }}
          >
            {memberData.role}
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
}
