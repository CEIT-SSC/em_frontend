import React from 'react';
import { Card, Button, Tag, Badge, Space, Typography, Row, Col, message } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import { 
  usePresentations, 
  usePresentationRegistrations, 
  PresentationUtils,
  type Presentation 
} from '../index';

const { Title, Text, Paragraph } = Typography;

/**
 * Example component showing how to use the Presentation API
 */
export const PresentationList: React.FC = () => {
  const { presentations, loading, error, fetchPresentations } = usePresentations();
  const { registerForPresentation, unregisterFromPresentation } = usePresentationRegistrations();

  const handleRegister = async (presentationId: number) => {
    try {
      await registerForPresentation(presentationId);
      message.success('Successfully registered for presentation!');
      // Refresh presentations to update registration status
      fetchPresentations();
    } catch (error) {
      message.error('Failed to register for presentation');
    }
  };

  const handleUnregister = async (presentationId: number) => {
    try {
      await unregisterFromPresentation(presentationId);
      message.success('Successfully unregistered from presentation!');
      // Refresh presentations to update registration status
      fetchPresentations();
    } catch (error) {
      message.error('Failed to unregister from presentation');
    }
  };

  if (loading) return <div>Loading presentations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Title level={2}>Presentations</Title>
      <Row gutter={[16, 16]}>
        {presentations.map((presentation) => (
          <Col xs={24} sm={12} lg={8} key={presentation.id}>
            <PresentationCard 
              presentation={presentation}
              onRegister={handleRegister}
              onUnregister={handleUnregister}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

interface PresentationCardProps {
  presentation: Presentation;
  onRegister: (id: number) => void;
  onUnregister: (id: number) => void;
}

const PresentationCard: React.FC<PresentationCardProps> = ({ 
  presentation, 
  onRegister, 
  onUnregister 
}) => {
  const status = PresentationUtils.getStatus(presentation);
  const canRegister = PresentationUtils.canRegister(presentation);
  const availableSpots = PresentationUtils.getAvailableSpots(presentation);

  const getStatusBadge = () => {
    switch (status) {
      case 'live':
        return <Badge status="processing" text="Live Now" />;
      case 'upcoming':
        return <Badge status="default" text="Upcoming" />;
      case 'ended':
        return <Badge status="success" text="Ended" />;
    }
  };

  const getActionButton = () => {
    if (presentation.is_registered) {
      return (
        <Button 
          type="default" 
          danger
          onClick={() => onUnregister(presentation.id)}
          disabled={status === 'ended'}
        >
          Unregister
        </Button>
      );
    }

    if (canRegister) {
      return (
        <Button 
          type="primary"
          onClick={() => onRegister(presentation.id)}
        >
          Register
        </Button>
      );
    }

    if (PresentationUtils.isFull(presentation)) {
      return <Button disabled>Full</Button>;
    }

    return <Button disabled>Not Available</Button>;
  };

  return (
    <Card
      hoverable
      cover={
        presentation.presenters_details[0]?.presenter_picture && (
          <img 
            alt={presentation.presenters_details[0].name}
            src={presentation.presenters_details[0].presenter_picture}
            style={{ height: 200, objectFit: 'cover' }}
          />
        )
      }
      actions={[getActionButton()]}
    >
      <Card.Meta
        title={
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Title level={4} style={{ margin: 0 }}>
                {presentation.title}
              </Title>
              {getStatusBadge()}
            </div>
            
            {presentation.is_featured && (
              <Tag color="gold">Featured</Tag>
            )}
          </Space>
        }
        description={
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Paragraph ellipsis={{ rows: 2 }}>
              {presentation.description}
            </Paragraph>
            
            <Space wrap>
              <Tag color={PresentationUtils.getTypeColor(presentation.type)}>
                {presentation.type}
              </Tag>
              {presentation.level && (
                <Tag color={PresentationUtils.getLevelColor(presentation.level)}>
                  {presentation.level}
                </Tag>
              )}
              {presentation.language && (
                <Tag color="blue">
                  {presentation.language === 'fa' ? 'فارسی' : 'English'}
                </Tag>
              )}
            </Space>

            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Text type="secondary">
                <UserOutlined /> {PresentationUtils.getPresenterNames(presentation)}
              </Text>
              
              <Text type="secondary">
                <CalendarOutlined /> {PresentationUtils.formatDate(presentation)}
              </Text>
              
              <Text type="secondary">
                <ClockCircleOutlined /> {PresentationUtils.formatTimeRange(presentation)}
              </Text>
              
              <Text type="secondary">
                <EnvironmentOutlined /> {PresentationUtils.getLocationDisplay(presentation)}
              </Text>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <Text type="secondary">
                  Capacity: {presentation.registered_count || 0}/{presentation.capacity}
                </Text>
                <Text strong style={{ color: presentation.is_paid ? '#f50' : '#52c41a' }}>
                  {PresentationUtils.getPriceDisplay(presentation)}
                </Text>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <Text type={availableSpots > 0 ? 'success' : 'warning'}>
                  {availableSpots} spots left
                </Text>
                <Tag color="default">
                  {PresentationUtils.getFormat(presentation)}
                </Tag>
              </div>
            </Space>

            {presentation.tags && presentation.tags.length > 0 && (
              <div>
                {presentation.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
          </Space>
        }
      />
    </Card>
  );
};

export default PresentationList;
