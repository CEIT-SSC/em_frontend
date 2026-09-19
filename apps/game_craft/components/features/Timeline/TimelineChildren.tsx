import { Flex, Typography } from "antd";

interface TimelineChildrenProps {
  title: string;
  time: string;
  description?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5;
  compactText?: boolean;
}

export default function TimelineChildren({
  title,
  time,
  titleLevel = 2,
  compactText = false,
}: TimelineChildrenProps) {
  return (
    <Flex
      vertical
      align="center"
      justify="start"
      style={{ width: "100%", height: "auto", aspectRatio: "2/1" }}
      gap="small"
    >
      <Typography.Title
        level={titleLevel}
        style={{
          margin: 0,
          fontWeight: 800,
          textAlign: "center",
          fontSize: compactText ? "1.75rem" : undefined,
        }}
      >
        {title}
      </Typography.Title>
      <Typography.Title
        level={3}
        type="secondary"
        style={{
          margin: 0,
          fontFamily: "Vazirmatn",
          fontWeight: 400,
          fontSize: compactText ? "1.375rem" : undefined,
        }}
      >
        {time}
      </Typography.Title>
    </Flex>
  );
}
