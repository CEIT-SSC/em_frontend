import { ConfigProvider, Flex, Timeline, Typography } from "antd";
import { useLocale, useTranslations } from "next-intl";
import TimelineDot from "./TimelineDot";
import TimelineLabel from "./TimelineLabel";
import TimelineChildren from "./TimelineChildren";
import { useResponsive } from "../../../lib/hooks/useResponsive";

interface GameCraftTimelineProps {
  padding?: string | number;
  backgroundColor?: string;
  className?: string;
}

export default function GameCraftTimeline({
  padding = "2rem",
  backgroundColor = "transparent",
  className = "",
}: GameCraftTimelineProps) {
  const t = useTranslations("app.timeline");
  const locale = useLocale();
  const screens = useResponsive();

  const timelineIcons = [
    "/assets/images/hollwo-knight/timeline/01.png",
    "/assets/images/hollwo-knight/timeline/02.png",
    "/assets/images/hollwo-knight/timeline/03.png",
    "/assets/images/hollwo-knight/timeline/04.PNG",
    "/assets/images/hollwo-knight/timeline/05.PNG",
    "/assets/images/hollwo-knight/timeline/06.PNG",
    "/assets/images/hollwo-knight/timeline/07.png",
  ];

  const items = Array.from({ length: 7 }, (_, index) => {
    const step = `step${index + 1}`;

    return {
      dot: <TimelineDot />,
      children: (
        <TimelineChildren
          title={t(`${step}.title`)}
          time={t(`${step}.schedule`)}
          description={t(`${step}.description`)}
          compactText={locale === "en"}
        />
      ),
      ...(timelineIcons[index]
        ? {
            label: (
              <TimelineLabel
                logo={timelineIcons[index]}
                alt={t(`${step}.title`)}
              />
            ),
          }
        : {}),
    };
  });

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: "100%",
        padding: padding,
        backgroundColor: backgroundColor,
        position: "relative",
        zIndex: 10,
      }}
      gap="large"
      className={className}
    >
      <Typography.Title
        style={{
          marginBottom: "2rem",
          fontWeight: 900,
        }}
      >
        {t("title")}
      </Typography.Title>
      <ConfigProvider
        theme={{
          components: {
            Timeline: {
              itemPaddingBottom: 40,
            },
          },
        }}
      >
        <Timeline
          items={screens.md ? items : items.map(({ label, ...item }) => item)}
          mode={screens.md ? "alternate" : "left"}
          style={{
            width: "100%",
          }}
        />
      </ConfigProvider>
    </Flex>
  );
}
