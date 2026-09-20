"use client";

import { Avatar, Button, Flex, theme, Typography } from "antd";
import { GithubFilled, LinkedinFilled, UserOutlined } from "@ant-design/icons";
import { StaffMember } from "../../../config/staffs";
import Image from "next/image";
import { TelegramIcon } from "../../../components/common/TelegramIcon";

const { useToken } = theme;

interface StaffCardProps {
  staff: StaffMember;
  showSocialLinks?: boolean;
}

export function StaffCard({ staff, showSocialLinks = true }: StaffCardProps) {
  const { token } = useToken();
  const hasSocialLinks = Boolean(
    staff.telegramUrl || staff.githubUrl || staff.linkedinUrl
  );

  return (
    <Flex
      className="gc-staff-card"
      align="center"
      justify="center"
      vertical
      style={{
        width: "100%",
        minHeight: "300px",
        backgroundColor: "var(--gc-navy)",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "2rem",
        padding: token.padding,
        position: "relative",
      }}
      gap="small"
    >
      <Flex
        vertical
        align="center"
        justify="center"
        gap="middle"
        style={{ width: "100%" }}
      >
        {staff.imageUrl ? (
          <Avatar size={140} icon={<UserOutlined />} src={staff.imageUrl} />
        ) : (
          <Flex
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: token.colorBgContainer,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/logo/default_prof_2026.jpg"
              alt="Default staff profile"
              width={240}
              height={240}
            />
          </Flex>
        )}

        <Flex
          vertical
          align="center"
          justify="center"
          style={{ width: "100%" }}
        >
          <Typography.Title
            level={4}
            style={{ margin: 0, fontWeight: 700, color: "var(--gc-ivory)" }}
            className="text-center"
          >
            {staff.name}
          </Typography.Title>
          <Typography.Paragraph
            className="gc-staff-role"
            style={{
              width: "100%",
              margin: 0,
              color: "rgba(241, 236, 223, 0.72)",
              textAlign: "center",
              whiteSpace: "pre-line",
              overflowWrap: "anywhere",
            }}
          >
            {staff.role}
          </Typography.Paragraph>
        </Flex>
      </Flex>
      {showSocialLinks && hasSocialLinks && (
        <Flex
          justify="space-around"
          align="center"
          style={{
            width: "100%",
            padding: token.padding,
          }}
        >
          {staff.telegramUrl && (
            <Button
              type="text"
              shape="circle"
              size="large"
              href={staff.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramIcon size="1.5rem" />
            </Button>
          )}
          {staff.githubUrl && (
            <Button
              type="text"
              shape="circle"
              href={staff.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubFilled style={{ fontSize: "1rem" }} />
            </Button>
          )}
          {staff.linkedinUrl && (
            <Button
              type="text"
              shape="circle"
              href={staff.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinFilled style={{ fontSize: "1rem" }} />
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  );
}
