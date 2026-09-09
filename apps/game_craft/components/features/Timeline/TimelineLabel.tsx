import { Flex } from "antd";

interface TimelineLabelProps {
  logo: string;
  alt?: string;
  width?: string;
}

export default function TimelineLabel({
  logo: _logo,
  alt = "Timeline step",
  width: _width = "30%",
}: TimelineLabelProps) {
  return (
    <Flex
      vertical
      align="center"
      justify="start"
      style={{ width: "100%", height: "auto" }}
    >
      <div className="gc-timeline-waymark" role="img" aria-label={alt}>
        <span className="gc-timeline-waymark__core" />
      </div>
    </Flex>
  );
}
