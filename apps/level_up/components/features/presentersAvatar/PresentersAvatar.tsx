import React from "react";
import { Avatar, Flex, Typography, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

const { useToken } = theme;

interface PresenterDetail {
  id: number;
  name: string;
  email: string;
  bio: string;
  presenter_picture: string | null;
  created_at: string;
}

interface PresentersAvatarProps {
  presenters: PresenterDetail[];
  maxDisplay?: number;
}

const PresentersAvatar: React.FC<PresentersAvatarProps> = ({
  presenters = [],
  maxDisplay = 3,
}) => {
  const { token } = useToken();
  const t = useTranslations("workshop");

  if (!presenters || presenters.length === 0) {
    return (
      <Flex gap="small" align="center">
        <Avatar icon={<UserOutlined />} size={32} />
        <Typography.Text
          style={{
            color: token.colorText,
            fontSize: "14px",
          }}
          ellipsis
        >
          {t("noPresenters")}
        </Typography.Text>
      </Flex>
    );
  }

  const displayPresenters = presenters.slice(0, maxDisplay);
  const remainingCount = presenters.length - maxDisplay;

  if (presenters.length === 1) {
    const presenter = presenters[0];
    return (
      <Flex gap="small" align="center">
        <Avatar
          src={presenter.presenter_picture}
          icon={!presenter.presenter_picture && <UserOutlined />}
          size={32}
        />
        <Typography.Text
          style={{
            color: token.colorText,
            fontSize: "14px",
          }}
          ellipsis
        >
          {presenter.name}
        </Typography.Text>
      </Flex>
    );
  }

  return (
    <Flex gap="small" align="center">
      {/* Avatar Stack */}
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        {displayPresenters.map((presenter, index) => (
          <Avatar
            key={presenter.id}
            src={presenter.presenter_picture}
            icon={!presenter.presenter_picture && <UserOutlined />}
            size={32}
            style={{
              marginLeft: index > 0 ? -8 : 0,
              border: `2px solid ${token.colorBgContainer}`,
              zIndex: maxDisplay - index,
            }}
          />
        ))}
        {remainingCount > 0 && (
          <Avatar
            size={32}
            style={{
              marginLeft: -8,
              backgroundColor: token.colorPrimary,
              border: `2px solid ${token.colorBgContainer}`,
              zIndex: 0,
            }}
          >
            <Typography.Text
              style={{
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              +{remainingCount}
            </Typography.Text>
          </Avatar>
        )}
      </div>

      {/* Names Display */}
      <Typography.Text
        style={{
          color: token.colorText,
          fontSize: "14px",
        }}
        ellipsis
      >
        {remainingCount > 0
          ? `${displayPresenters.map((p) => p.name).join(", ")} ${t("andMore", {
              count: remainingCount,
            })}`
          : displayPresenters.map((p) => p.name).join(", ")}
      </Typography.Text>
    </Flex>
  );
};

export default PresentersAvatar;
