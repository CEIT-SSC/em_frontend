"use client";

import { Row, Col } from "antd";
import { WorkshopCard } from "./WorkshopCard";
import { PresentationOverview } from "@ssc/core";

interface WorkshopGridProps {
  presentations?: PresentationOverview[];
  onAddToCart?: (presentation: PresentationOverview) => void; // Made optional
  workshopImage?: string; // Add optional image prop
}

export function WorkshopGrid({
  presentations = [],
  onAddToCart,
  workshopImage,
}: WorkshopGridProps) {
  return (
    <Row
      gutter={[
        { xs: 16, sm: 20, md: 24, lg: 24 },
        { xs: 16, sm: 20, md: 24, lg: 24 },
      ]}
      style={{
        marginTop: "0",
        marginBottom: "0",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "1200px",
        width: "100%",
        padding: "16px 0",
      }}
    >
      {presentations.map((presentation) => (
        <Col
          key={presentation.id}
          xs={24} // 1 card per row on mobile (<576px)
          sm={24} // 1 card per row on small screens (≥576px)
          md={12} // 2 cards per row on medium screens (≥768px)
          lg={8} // 3 cards per row on large and extra large screens (≥992px)
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <WorkshopCard
            id={presentation.id}
            workshopImage={workshopImage} // Pass the image prop to WorkshopCard
          />
        </Col>
      ))}
    </Row>
  );
}
