'use client'

import { useTranslations } from 'next-intl'
import { Flex, Typography, Card, List, Button, Space, Empty, Badge, InputNumber } from 'antd'
import { ShoppingCartOutlined, DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'

export default function ShoppingBagPage() {
  const t = useTranslations('app.dashboard')

  // Mock shopping cart data
  const cartItems = [
    {
      id: 1,
      title: 'Unity Game Development Workshop',
      price: 150000,
      quantity: 1,
      instructor: 'John Doe'
    },
    {
      id: 2,
      title: 'Advanced C# Programming',
      price: 200000,
      quantity: 1,
      instructor: 'Jane Smith'
    }
  ]

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <Flex
      vertical
      style={{
        width: '100%',
        height: '100%',
        padding: '1rem',
      }}
      gap="large"
    >
      <Card>
        <Typography.Title level={2}>
          <ShoppingCartOutlined /> {t('shoppingBag')}
        </Typography.Title>
        <Typography.Paragraph>
          Review your selected workshops and complete your registration.
        </Typography.Paragraph>

        {cartItems.length > 0 ? (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <List
              itemLayout="horizontal"
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Space key="quantity">
                      <Button size="small" icon={<MinusOutlined />} />
                      <InputNumber
                        min={1}
                        max={10}
                        value={item.quantity}
                        size="small"
                        style={{ width: '60px' }}
                      />
                      <Button size="small" icon={<PlusOutlined />} />
                    </Space>,
                    <Button key="delete" danger type="text" icon={<DeleteOutlined />} />
                  ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={`Instructor: ${item.instructor} • ${item.price.toLocaleString()} Toman`}
                  />
                </List.Item>
              )}
            />

            <Card type="inner">
              <Flex justify="space-between" align="center">
                <Typography.Title level={4} style={{ margin: 0 }}>
                  Total Amount:
                </Typography.Title>
                <Typography.Title level={3} style={{ margin: 0, color: '#1890ff' }}>
                  {totalPrice.toLocaleString()} Toman
                </Typography.Title>
              </Flex>
              <Button
                type="primary"
                size="large"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                Proceed to Payment
              </Button>
            </Card>
          </Space>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Your shopping bag is empty"
          >
            <Button type="primary">Browse Workshops</Button>
          </Empty>
        )}
      </Card>
    </Flex>
  )
}
