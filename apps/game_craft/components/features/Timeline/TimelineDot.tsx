import { Flex } from "antd";

interface TimelineDotProps {
  logoSrc?: string;
  size?: string;
}

export default function TimelineDot({
  logoSrc: _logoSrc = "/images/dark-3d.svg",
  size: _size = "5vw",
}: TimelineDotProps) {
  return (
    <Flex
      align="center"
      justify="center"
      className="w-[10vw] md:w-[5vw]"
      style={{
        aspectRatio: 1,
      }}
    >
      <span className="gc-timeline-node" aria-hidden="true" />
    </Flex>
  );
}
