import { Flex, theme } from "antd";
import { StaffContainer } from "./StaffContainer";

export function StaffView() {
  const staffViewPadding = "!py-12 !px-4 md:!px-12 lg:!px-20";

  return (
    <Flex
      align="center"
      justify="center"
      className={staffViewPadding}
      style={{
        flex: 1,
        width: "100%",
      }}
    >
      <StaffContainer />
    </Flex>
  );
}
