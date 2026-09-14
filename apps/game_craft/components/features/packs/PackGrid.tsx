"use client";

import { Col, Row } from "antd";
import { Pack } from "@ssc/core";
import { PackCard } from "./PackCard";

export function PackGrid({ packs }: { packs: Pack[] }) {
  return (
    <Row gutter={[24, 24]} style={{ maxWidth: 1200, width: "100%", padding: "16px 0" }}>
      {packs.map((pack) => (
        <Col key={pack.id} xs={24} sm={24} md={12} lg={8} style={{ display: "flex" }}>
          <PackCard pack={pack} />
        </Col>
      ))}
    </Row>
  );
}
