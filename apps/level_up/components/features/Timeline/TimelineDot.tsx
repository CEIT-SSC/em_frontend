import { Avatar, Flex, theme } from "antd";

interface TimelineDotProps {
  logoSrc?: string;
  size?: string;
}

const { useToken } = theme;

export default function TimelineDot({
  logoSrc = "/mario/giphy-11.gif",
  size = "5vw",
}: TimelineDotProps) {
  const { token } = useToken();
  return (
    <Flex
      align="center"
      justify="center"
      className="w-[10vw] md:w-[5vw]"
      style={{
        aspectRatio: 1,
      }}
    >
      <Flex
        align="center"
        justify="center"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          backgroundColor: "#01B582",
        }}
      >
        <Flex
          align="center"
          justify="center"
          style={{
            width: "90%",
            aspectRatio: 1,
            borderRadius: "50%",
            backgroundColor: token.colorBgBase,
            overflow: "hidden",
          }}
        >
          <Avatar
            src={logoSrc}
            shape="circle"
            style={{ width: "100%", height: "100%" }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
