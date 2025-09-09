"use client";

import { Card, Typography, Avatar, Button, Flex, theme, Badge } from "antd";
import {
  ClockCircleOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";

const { useToken } = theme;

interface WorkshopCardProps {
  onAddToCart?: () => void; // Made optional since we're not using it for now
  workshopImage?: string; // Add optional image prop
}

export function WorkshopCard({}: WorkshopCardProps) {
  const { token } = useToken();
  const t = useTranslations();

  // Color palette based on theme
  const cardBg = token.colorBgElevated;
  const colorStripes = ["#4CAF50", "#2196F3", "#FFC107", "#F44336"];
  const textPrimary = token.colorText;
  const textSecondary = token.colorTextSecondary;
  const borderColor = token.colorBorder;

  // Format date and time
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return null;

  // return (
  //   <Card
  //     style={{
  //       width: "100%",
  //       minWidth: "250px",
  //       maxWidth: "100%",
  //       borderRadius: token.borderRadiusLG,
  //       overflow: "hidden",
  //       border: "none",
  //       backgroundColor: cardBg,
  //       boxShadow: token.boxShadow,
  //       height: "100%",
  //       display: "flex",
  //       flexDirection: "column",
  //     }}
  //     styles={{
  //       body: {
  //         padding: 0,
  //         flex: 1,
  //         display: "flex",
  //         flexDirection: "column",
  //       },
  //     }}
  //   >
  //     {/* Header Image with Stripes */}
  //     <div
  //       style={{
  //         position: "relative",
  //         paddingTop: "56.25%", // 16:9 aspect ratio
  //       }}
  //     >
  //       {/* Workshop Image */}
  //       <Image
  //         src={getWorkshopImage()}
  //         alt={presentation.is_online ? "Online Workshop" : "Offline Workshop"}
  //         fill
  //         style={{
  //           objectFit: "cover",
  //         }}
  //         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  //       />

  //       {/* Colored Stripes */}
  //       <div
  //         style={{
  //           position: "absolute",
  //           top: 0,
  //           left: 0,
  //           right: 0,
  //           display: "flex",
  //           zIndex: 1,
  //         }}
  //       >
  //         {colorStripes.map((color, index) => (
  //           <div
  //             key={index}
  //             style={{ height: "4px", flex: 1, backgroundColor: color }}
  //           />
  //         ))}
  //       </div>
  //     </div>

  //     {/* Content */}
  //     <Flex
  //       vertical
  //       style={{
  //         padding: "16px",
  //         flex: 1,
  //         gap: "12px",
  //       }}
  //     >
  //       {/* Title and Badge */}
  //       <Flex vertical gap="small">
  //         <Typography.Title
  //           level={4}
  //           style={{
  //             margin: 0,
  //             fontSize: "18px",
  //             lineHeight: 1.4,
  //           }}
  //           ellipsis={{ rows: 2 }}
  //         >
  //           {presentation.title}
  //         </Typography.Title>
  //         <Flex gap="small">
  //           {!presentation.is_online && (
  //             <Badge
  //               style={{
  //                 backgroundColor: "transparent",
  //                 color: token.colorPrimary,
  //                 border: `1px solid ${token.colorPrimary}`,
  //                 borderRadius: "4px",
  //                 padding: "0 8px",
  //               }}
  //               count={t("workshop.inPerson")}
  //             />
  //           )}
  //           {presentation.is_online && (
  //             <Badge
  //               style={{
  //                 backgroundColor: "transparent",
  //                 color: token.colorSuccess,
  //                 border: `1px solid ${token.colorSuccess}`,
  //                 borderRadius: "4px",
  //                 padding: "0 8px",
  //               }}
  //               count={t("workshop.online")}
  //             />
  //           )}
  //           <Badge
  //             style={{
  //               backgroundColor: "transparent",
  //               color: token.colorInfo,
  //               border: `1px solid ${token.colorInfo}`,
  //               borderRadius: "4px",
  //               padding: "0 8px",
  //             }}
  //             count={t(`workshop.type.${presentation.type}`)}
  //           />
  //         </Flex>
  //       </Flex>

  //       {/* Description */}
  //       <Typography.Paragraph
  //         style={{
  //           color: textSecondary,
  //           margin: 0,
  //           fontSize: "14px",
  //           lineHeight: 1.6,
  //         }}
  //         ellipsis={{ rows: 3 }}
  //       >
  //         {presentation.description}
  //       </Typography.Paragraph>

  //       {/* Date and Time */}
  //       <Flex align="center" gap="small">
  //         <ClockCircleOutlined style={{ color: token.colorPrimary }} />
  //         <Typography.Text style={{ color: textSecondary, fontSize: "14px" }}>
  //           {formatDateTime(presentation.start_time)}
  //         </Typography.Text>
  //       </Flex>

  //       {/* Location/Link */}
  //       {presentation.location && !presentation.is_online && (
  //         <Typography.Text style={{ color: textSecondary, fontSize: "14px" }}>
  //           📍 {presentation.location}
  //         </Typography.Text>
  //       )}
  //       {presentation.online_link && presentation.is_online && (
  //         <Typography.Text style={{ color: textSecondary, fontSize: "14px" }}>
  //           🔗 {t("workshop.onlineLink")}
  //         </Typography.Text>
  //       )}

  //       {/* Presenters Label */}
  //       <Typography.Text
  //         style={{
  //           color: textSecondary,
  //           fontSize: "14px",
  //           opacity: 0.7,
  //         }}
  //       >
  //         {t("workshop.presenters")}:
  //       </Typography.Text>

  //       {/* Instructor */}
  //       <Flex gap="small" align="center">
  //         <Avatar
  //           src={getPresenterImage()}
  //           icon={!getPresenterImage() && <UserOutlined />}
  //           size={32}
  //         />
  //         <Typography.Text
  //           style={{
  //             color: textPrimary,
  //             fontSize: "14px",
  //           }}
  //           ellipsis
  //         >
  //           {getMainPresenter()}
  //         </Typography.Text>
  //       </Flex>

  //       {/* Price and Add to Cart */}
  //       <Flex
  //         justify="space-between"
  //         align="center"
  //         style={{
  //           marginTop: "auto",
  //           paddingTop: "12px",
  //           borderTop: `1px solid ${borderColor}`,
  //         }}
  //       >
  //         <Typography.Title
  //           level={5}
  //           style={{
  //             margin: 0,
  //             fontSize: "16px",
  //           }}
  //         >
  //           {formatPrice()} {presentation.is_paid && t("common.currency")}
  //         </Typography.Title>
  //         <Button
  //           type="primary"
  //           icon={<ShoppingCartOutlined />}
  //           onClick={() => {
  //             // TODO: Implement registration/cart functionality
  //             console.log(`Action for presentation: ${presentation.title}`);
  //           }}
  //           style={{
  //             borderRadius: "8px",
  //             height: "36px",
  //           }}
  //           disabled={!presentation.is_active}
  //         >
  //           {presentation.is_paid
  //             ? t("workshop.addToCart")
  //             : t("workshop.enroll")}
  //         </Button>
  //       </Flex>
  //     </Flex>
  //   </Card>
  // );
}
