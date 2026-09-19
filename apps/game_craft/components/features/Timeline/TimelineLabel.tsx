import { Flex } from "antd";
import Image from "next/image";

interface TimelineLabelProps {
  logo: string;
  alt?: string;
  width?: string;
}

export default function TimelineLabel({
  logo,
  alt = "Timeline step",
  width = "172px",
}: TimelineLabelProps) {
  return (
    <Flex
      vertical
      align="center"
      justify="start"
      style={{ width: "100%", height: "auto" }}
    >
      <Image
        className="gc-timeline-label-image"
        src={logo}
        alt={alt}
        width={1024}
        height={1024}
        sizes="(max-width: 768px) 0px, 152px"
        style={{ width, height: "auto", transform: "translateY(-50%)" }}
      />
    </Flex>
  );
}
