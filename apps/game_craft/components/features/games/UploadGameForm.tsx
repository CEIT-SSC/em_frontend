"use client";

import React from "react";
import { Button, Flex, Input, theme, Typography, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

const { useToken } = theme;

export const UploadGameForm: React.FC = () => {
  const { token } = useToken();
  const t = useTranslations("app.dashboard.games");

  return (
    <Flex
      vertical
      align="center"
      justify="space-between"
      style={{
        width: "100%",
      }}
      gap="small"
    >
      <Upload
        type="drag"
        listType="text"
        style={{
          height: "100px",
          width: "100px",
          borderRadius: token.borderRadius,
        }}
      >
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            width: "100%",
            height: "100%",
          }}
          gap="small"
        >
          <PlusOutlined />
          <Typography.Text>{t("upload")}</Typography.Text>
        </Flex>
      </Upload>
      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          width: "100%",
        }}
        gap="small"
      >
        <Flex
          style={{
            width: "100%",
          }}
          gap="small"
        >
          <Input
            variant="filled"
            placeholder={t("gameName")}
            size="large"
            allowClear
          />
          <Input
            variant="filled"
            placeholder={t("gameLink")}
            size="large"
            allowClear
          />
        </Flex>

        <Input.TextArea
          variant="filled"
          placeholder={t("gameDescription")}
          autoSize={{ minRows: 4, maxRows: 4 }}
          allowClear
        />
      </Flex>

      <Button block type="primary" size="large">
        {t("submitGame")}
      </Button>
    </Flex>
  );
};
