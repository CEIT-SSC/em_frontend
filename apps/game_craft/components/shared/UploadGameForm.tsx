'use client';

import { Button, Flex, Input, theme, Typography, Upload, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { useToken } = theme;

export function UploadGameForm() {
  const { token } = useToken();

  return (
    <Flex
      vertical
      align="center"
      justify="space-between"
      style={{
        width: '100%',
      }}
      gap="small"
    >
      <Form
        layout="vertical"
        style={{ width: '100%', maxWidth: 400 }}
      >
        <Form.Item label="Game Title" name="title">
          <Input placeholder="Enter your game title" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea
            rows={4}
            placeholder="Describe your game"
          />
        </Form.Item>

        <Form.Item label="Game File" name="gameFile">
          <Upload.Dragger
            name="gameFile"
            multiple={false}
            style={{
              borderRadius: token.borderRadius,
            }}
          >
            <Flex
              vertical
              align="center"
              justify="center"
              style={{
                padding: token.padding,
              }}
              gap="small"
            >
              <PlusOutlined style={{ fontSize: 24 }} />
              <Typography.Text>
                Click or drag game file to upload
              </Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                Supports .zip, .rar files
              </Typography.Text>
            </Flex>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item label="Screenshots" name="screenshots">
          <Upload
            listType="picture-card"
            multiple
          >
            <Flex
              vertical
              align="center"
              justify="center"
              gap="small"
            >
              <PlusOutlined />
              <Typography.Text style={{ fontSize: 12 }}>
                Upload Screenshots
              </Typography.Text>
            </Flex>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
          >
            Submit Game
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
