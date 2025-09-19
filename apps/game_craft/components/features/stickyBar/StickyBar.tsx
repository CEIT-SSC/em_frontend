import { useRouter } from "@bprogress/next";
import { useRouter as useNextIntlRouter } from "../../../lib/navigation";
import { Button, Flex, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useLocale } from "next-intl";
import { digitsToHindi } from "@ssc/utils";
import { toast, ToastContainer } from "react-toastify";

const StickyBar = () => {
  const router = useRouter({
    customRouter: useNextIntlRouter,
  });
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText("FIRST30");
      toast.info("با موفقیت کپی شد");
      // You could add a toast notification here if desired
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="w-full h-10 flex items-center justify-center relative overflow-hidden"
      style={{
        width: "100%",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(90deg, #ff6b35, #f7931e, #ffcc02)",
        boxShadow: "0 2px 8px rgba(255, 107, 53, 0.3)",
      }}
    >
      <ToastContainer />
      {/* Game-style decorative elements */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "32px",
          height: "32px",
          backgroundColor: "#facc15",
          transform: "rotate(45deg) translate(-16px, -16px)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "32px",
          height: "32px",
          backgroundColor: "#facc15",
          transform: "rotate(45deg) translate(16px, -16px)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          left: "32px",
          top: "4px",
          width: "8px",
          height: "8px",
          backgroundColor: "white",
          borderRadius: "50%",
          animation: "pulse 2s infinite",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          right: "32px",
          top: "4px",
          width: "8px",
          height: "8px",
          backgroundColor: "white",
          borderRadius: "50%",
          animation: "pulse 2s infinite 0.5s",
        }}
      ></div>

      {/* Main coupon content */}
      <Flex
        align="center"
        gap="small"
        style={{ color: "white", fontWeight: "bold", fontSize: "14px" }}
      >
        <span style={{ animation: "bounce 1s infinite" }}>🎮</span>
        <Typography.Text
          style={{
            color: "white",
            fontWeight: "bold",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            fontSize: "14px",
          }}
        >
          {locale === "fa" ? (
            <>
              🔥 تخفیف ویژهٔ ثبت‌نام! {digitsToHindi("30")}٪ تخفیف برای
              کارگاه‌های ساخت بازی با کد{" "}
              <span
                onClick={handleCopyCode}
                className="cursor-pointer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  border: "1px dashed rgba(255,255,255,0.5)",
                  transition: "all 0.2s ease",
                  fontFamily: "monospace",
                  zIndex: 1000,
                }}
                title="کلیک کنید تا کپی شود"
              >
                FIRST30
              </span>
            </>
          ) : (
            <>
              🔥 Special Game Craft Offer — 30% OFF on Game Development
              Workshops with code{" "}
              <span
                onClick={handleCopyCode}
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  border: "1px dashed rgba(255,255,255,0.5)",
                  transition: "all 0.2s ease",
                  fontFamily: "monospace",
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.backgroundColor = "rgba(255,255,255,0.3)";
                  target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.backgroundColor = "rgba(255,255,255,0.2)";
                  target.style.transform = "scale(1)";
                }}
                title="Click to copy"
              >
                FIRST30
              </span>
              !
            </>
          )}
        </Typography.Text>
        <span style={{ animation: "bounce 1s infinite 0.3s" }}>⚡</span>
        <Button
          size="small"
          type="default"
          style={{
            backgroundColor: "white",
            color: "#ea580c",
            border: "none",
            fontWeight: "bold",
            fontSize: "12px",
            height: "24px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.backgroundColor = "#fef3c7";
            target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.backgroundColor = "white";
            target.style.transform = "scale(1)";
          }}
          onClick={() => router.push("#workshops")}
        >
          {locale === "fa" ? "ثبت نام" : "Claim Now!"}
        </Button>
      </Flex>

      {/* Close button */}
      <Button
        type="text"
        size="small"
        icon={<CloseOutlined />}
        onClick={handleClose}
        style={{
          position: "absolute",
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
          border: "none",
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.backgroundColor = "rgba(0,0,0,0.4)";
          target.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.backgroundColor = "rgba(0,0,0,0.2)";
          target.style.transform = "translateY(-50%) scale(1)";
        }}
      />
    </div>
  );
};

export default StickyBar;
