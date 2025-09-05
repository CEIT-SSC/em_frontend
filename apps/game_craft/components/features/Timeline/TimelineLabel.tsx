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
  width = "30%",
}: TimelineLabelProps) {
  return (
    <Flex
      vertical
      align="center"
      justify="start"
      style={{ width: "100%", height: "auto" }}
    >
      <Image
        src={logo}
        alt={alt}
        width={100}
        height={100}
        className="w-[65%] md:w-[30%]"
        style={{ height: "auto" }}
      />
    </Flex>
  );
}
