"use client";

import { Avatar, Button, Flex, theme, Typography } from "antd";
import { GithubFilled, LinkedinFilled, UserOutlined } from "@ant-design/icons";
import { StaffMember } from "../../../config/staffs";
import Image from "next/image";
import { TelegramIcon } from "../../../components/common/TelegramIcon";

const { useToken } = theme;

interface StaffCardProps {
  staff: StaffMember;
}

export function StaffCard({ staff }: StaffCardProps) {
  const { token } = useToken();

  return (
    <Flex
      align="center"
      justify="center"
      vertical
      style={{
        width: "100%",
        height: "300px",
         backgroundColor: "var(--gc-navy)",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "2rem",
        padding: token.padding,
        position: "relative",
      }}
      gap="small"
    >
      <Flex vertical align="center" justify="center" gap="middle">
        {
          staff.imageUrl ? (
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
          )
        }

        <Flex
          vertical
          align="center"
          justify="center"
          style={{ width: "100%" }}
        >
          <Typography.Title
            level={4}
            style={{ margin: 0, fontWeight: 700, color: "var(--gc-ivory)" }}
          >
            {staff.name}
          </Typography.Title>
          <Typography.Text style={{ color: "rgba(241, 236, 223, 0.72)" }}>
            {staff.role}
          </Typography.Text>
        </Flex>
      </Flex>
      <Flex
        justify="space-around"
        align="center"
        style={{
          width: "100%",
          padding: token.padding,
        }}
      >
        <Button
          disabled={!staff.telegramUrl}
          type="text"
          shape="circle"
          size={"large"}
          href={staff.telegramUrl}
          target="_blank"
        >
          <TelegramIcon size={"1.5rem"} />
        </Button>
        <Button
          disabled={!staff.githubUrl}
          type="text"
          shape="circle"
          href={staff.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubFilled style={{ fontSize: "1rem" }} />
        </Button>
        <Button
          disabled={!staff.linkedinUrl}
          type="text"
          shape="circle"
          href={staff.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinFilled style={{ fontSize: "1rem" }} />
        </Button>
      </Flex>
    </Flex>
  );
}
