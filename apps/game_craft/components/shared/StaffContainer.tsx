'use client';

import { Col, Flex, Row, theme, Typography } from 'antd';
import { StaffCard } from './StaffCard';
import { useStaffs } from '@/config/staffs';
import { useTranslations } from 'next-intl';

const { useToken } = theme;

export function StaffContainer() {
  const { token } = useToken();
  const staffs = useStaffs();
  const t = useTranslations('app.staffs');

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: '100%',
        backgroundColor: token.colorBgBase,
        borderRadius: token.borderRadius,
        padding: '3rem 1rem',
      }}
    >
      <Typography.Title
        level={1}
        style={{
          fontWeight: 900,
          color: token.colorPrimary
        }}
      >
        {t('title')}
      </Typography.Title>
      <Flex vertical align="center" justify="center" style={{ width: '100%' }} gap={50}>
        {staffs.map((team, index) => (
          <Flex
            key={index}
            vertical
            align="center"
            justify="center"
            style={{ width: '100%' }}
            gap="small"
          >
            <Typography.Title
              level={2}
              style={{
                color: token.colorAction,
                fontWeight: 700,
              }}
            >
              {team.teamTitle}
            </Typography.Title>
            <Row
              align="middle"
              justify="center"
              gutter={[16, 16]}
              style={{
                width: '100%',
              }}
            >
              {team.teamMembers.map((staff, staffIndex) => (
                <Col key={staffIndex} span={24} sm={12} md={8} lg={6} xxl={4}>
                  <StaffCard staff={staff} />
                </Col>
              ))}
            </Row>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
