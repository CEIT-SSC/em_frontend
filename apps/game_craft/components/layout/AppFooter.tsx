"use client";

import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Row,
  theme,
  Typography,
} from "antd";
import { useTranslations } from "next-intl";
import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinFilled,
  XOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import Image from "next/image";
import { darkTheme } from "../../components/providers/AntDesignProvider";
import { gameCraftSocialLinks, sscSocialLinks } from "../../config/socialLinks";
import { TelegramIcon } from "../../components/common/TelegramIcon";

const { useToken } = theme;

export function AppFooter() {
  const { token } = useToken();
  const t = useTranslations("app");

  return (
    <ConfigProvider theme={darkTheme}>
      <Layout.Footer
        style={{
          backgroundColor: token.colorPrimary,
          textAlign: "center",
          width: "100%",
          padding: token.padding,
        }}
      >
        <Typography.Title level={2} style={{ color: "white" }}>
          {t("footer.autGameCraft")}
        </Typography.Title>
        <Flex align="center" justify="space-between" style={{ width: "100%" }}>
          <Row
            align="middle"
            justify="space-around"
            gutter={[16, 16]}
            style={{ width: "100%" }}
          >
            <Col span={24} md={12}>
              <Flex align="center" justify="center" flex={1} gap="large">
                <a
                  href={gameCraftSocialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/svg/dark-3d.svg"
                    alt="logo"
                    width={60}
                    height={60}
                  />
                </a>
                <a
                  href={sscSocialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/images/ssc_white.png"
                    alt="aut-computer-engineering-logo"
                    width={60}
                    height={60}
                  />
                </a>
                <a
                  href={gameCraftSocialLinks.illustrationTehranUniInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/images/Asset4.png"
                    alt="tehran-art-logo"
                    width={60}
                    height={60}
                  />
                </a>
              </Flex>
            </Col>
            <Col span={24} md={12}>
              <Flex align="center" justify="center" flex={1} gap="small">
                <Button
                  type="text"
                  shape="circle"
                  size="large"
                  icon={<InstagramOutlined style={{ color: "white" }} />}
                  href={gameCraftSocialLinks.instagram}
                />
                {/*<Button*/}
                {/*    type="text"*/}
                {/*    shape="circle"*/}
                {/*    size="large"*/}
                {/*    icon={<YoutubeFilled style={{color: 'white'}}/>}*/}
                {/*    href={gameCraftSocialLinks.youtube}*/}
                {/*/>*/}
                <Button
                  type="text"
                  shape="circle"
                  size="large"
                  icon={<XOutlined style={{ color: "white" }} />}
                  href={gameCraftSocialLinks.twitter}
                />
                <Button
                  type="text"
                  shape="circle"
                  size="large"
                  icon={<TelegramIcon color={"white"} />}
                  href={gameCraftSocialLinks.telegram}
                />
                <Button
                  type="text"
                  shape="circle"
                  size="large"
                  icon={<LinkedinFilled style={{ color: "white" }} />}
                  href={gameCraftSocialLinks.linkedin}
                />
              </Flex>
            </Col>
          </Row>
        </Flex>
        <Divider>
          <Typography.Text
            type="secondary"
            style={{ color: "rgba(255, 255, 255, 0.65)" }}
          >
            {t("footer.copyRight")}
          </Typography.Text>
        </Divider>
      </Layout.Footer>
    </ConfigProvider>
  );
}
