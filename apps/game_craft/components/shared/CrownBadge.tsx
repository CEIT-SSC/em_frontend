"use client";

import React from "react";
import Image from "next/image";

interface CrownBadgeProps {
  children: React.ReactNode;
}

const CrownBadge: React.FC<CrownBadgeProps> = ({ children }) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.crownContainer}>
        <Image
          src="/images/logo/crown.png"
          alt="Crown"
          width={40}
          height={40}
          style={styles.crownIcon}
        />
      </div>
      {children}
    </div>
  );
};

const styles = {
  wrapper: {
    position: "relative" as const,
    display: "inline-block",
    width: "100%",
    height: "100%",
  },
  crownContainer: {
    position: "absolute" as const,
    top: 0,
    right: 0,
    transform: "translate(50%, -50%)",
    zIndex: 1,
  },
  crownIcon: {
    width: "40px",
    height: "40px",
    transform: "rotate(35deg)",
  },
};

export default CrownBadge;
