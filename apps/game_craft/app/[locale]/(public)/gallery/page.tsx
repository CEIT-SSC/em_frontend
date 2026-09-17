"use client";

import { Empty, Flex, theme, Typography, Image, Row, Col } from "antd";
import { useTranslations } from "next-intl";
import { useResponsive } from "../../../../lib/hooks/useResponsive";
import { galleryImages } from "../../../../config/galleryImages";

const { useToken } = theme;

export default function GalleryPage() {
  const { token } = useToken();
  const screens = useResponsive();
  const t = useTranslations("app");
  const galleryViewPadding = screens.lg ? "3rem 5rem" : "3rem 2rem";

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        flex: 1,
        width: "100%",
        minHeight: "100%",
      }}
    >
      <Flex
        className="gc-page gc-public-page gc-public-gallery"
        vertical
        align="center"
        justify="center"
        style={{
          width: "100%",
          padding: 0,
        }}
      >
        <Typography.Title className="gc-public-title">
          {t("mainNavigation.gallery")}
        </Typography.Title>
        <Flex
          className="gc-gallery-panel"
          vertical
          align="center"
          justify="center"
          style={{
            width: "100%",
            minHeight: "200px",
            backgroundColor: token.colorBgBase,
            borderRadius: token.borderRadius,
            padding: token.padding,
          }}
        >
          {galleryImages.length > 0 ? (
            <Image.PreviewGroup>
              <Row
                gutter={[16, 16]}
                style={{ width: "100%" }}
                align={"middle"}
                justify="center"
              >
                {galleryImages.map((image) => (
                  <Col key={image.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Flex
                      key={image.id}
                      align="center"
                      justify="center"
                      className="gc-gallery-image"
                      style={{
                        width: "100%",
                        borderRadius: token.borderRadius,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        preview={{
                          src: image.src,
                        }}
                      />
                    </Flex>
                  </Col>
                ))}
              </Row>
            </Image.PreviewGroup>
          ) : (
            <Empty description="No image yet" />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
