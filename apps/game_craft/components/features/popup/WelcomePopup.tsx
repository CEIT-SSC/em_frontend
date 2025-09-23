import { useRouter } from "@bprogress/next";
import { useRouter as useNextIntlRouter } from "../../../lib/navigation";
import { Button, Flex, Typography, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { digitsToHindi } from "@ssc/utils";
import { toast } from "react-toastify";

const WelcomePopup = () => {
  const router = useRouter({
    customRouter: useNextIntlRouter,
  });
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if 24 hours have passed since last popup was shown
    const lastShownTimestamp = localStorage.getItem(
      "gamecraft-welcome-popup-last-shown"
    );
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (!lastShownTimestamp) {
      // First time visitor - show popup after delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      // Check if 24 hours have passed
      const lastShown = parseInt(lastShownTimestamp, 10);
      const timeDifference = now - lastShown;

      if (timeDifference >= twentyFourHours) {
        // More than 24 hours have passed - show popup
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1500);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Save current timestamp so popup shows again after 24 hours
    localStorage.setItem(
      "gamecraft-welcome-popup-last-shown",
      Date.now().toString()
    );
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText("LAST50");
      toast.success(
        locale === "fa"
          ? "کد تخفیف با موفقیت کپی شد!"
          : "Discount code copied successfully!"
      );
    } catch (err) {
      console.error("Failed to copy code:", err);
      toast.error(
        locale === "fa" ? "خطا در کپی کردن کد" : "Failed to copy code"
      );
    }
  };

  const handleClaimNow = () => {
    router.push("/#workshops");
    handleClose();
  };

  return (
    <Modal
      open={isVisible}
      onCancel={handleClose}
      footer={null}
      closeIcon={null}
      centered
      width={600}
      styles={{
        body: { padding: 0 },
        content: {
          padding: 0,
          overflow: "hidden",
          borderRadius: "16px",
          border: "3px solid #ffcc02",
        },
      }}
    >
      <div
        style={{
          position: "relative",
          background: "linear-gradient(135deg, #ff6b35, #f7931e, #ffcc02)",
          padding: "2rem",
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Game-style decorative elements */}
        <div
          style={{
            position: "absolute",
            left: "-20px",
            top: "-20px",
            width: "60px",
            height: "60px",
            backgroundColor: "#facc15",
            transform: "rotate(45deg)",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-20px",
            top: "-20px",
            width: "60px",
            height: "60px",
            backgroundColor: "#facc15",
            transform: "rotate(45deg)",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "30px",
            top: "30px",
            width: "12px",
            height: "12px",
            backgroundColor: "white",
            borderRadius: "50%",
            animation: "pulse 2s infinite",
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "30px",
            top: "30px",
            width: "12px",
            height: "12px",
            backgroundColor: "white",
            borderRadius: "50%",
            animation: "pulse 2s infinite 0.5s",
            opacity: 0.8,
          }}
        />

        {/* Close button */}
        <Button
          type="text"
          size="large"
          icon={<CloseOutlined />}
          onClick={handleClose}
          style={{
            position: "absolute",
            right: "16px",
            top: "16px",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            fontSize: "16px",
            zIndex: 10,
          }}
        />

        {/* Main content */}
        <Flex
          vertical
          align="center"
          gap="large"
          style={{
            textAlign: "center",
            zIndex: 5,
            maxWidth: "500px",
          }}
        >
          {/* Welcome title */}
          <div style={{ marginBottom: "1rem" }}>
            <span style={{ fontSize: "48px", animation: "bounce 2s infinite" }}>
              🎮
            </span>
            <Typography.Title
              level={2}
              style={{
                color: "white",
                margin: "0.5rem 0",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                fontSize: "28px",
              }}
            >
              {locale === "fa"
                ? "به Game Craft خوش آمدید!"
                : "Welcome to Game Craft!"}
            </Typography.Title>
          </div>

          {/* Offer text */}
          <Typography.Text
            style={{
              color: "white",
              fontWeight: "bold",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              fontSize: "18px",
              lineHeight: "1.6",
              marginBottom: "1rem",
            }}
          >
            {locale === "fa" ? (
              <>
                🔥 پیشنهاد ویژهٔ ثبت‌نام! {digitsToHindi("50")}٪ تخفیف برای
                کارگاه‌های ساخت بازی با کد{" "}
                <span
                  onClick={handleCopyCode}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    padding: "4px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border: "2px dashed rgba(255,255,255,0.7)",
                    transition: "all 0.2s ease",
                    fontFamily: "monospace",
                    fontSize: "20px",
                    fontWeight: "900",
                    display: "inline-block",
                    margin: "0 4px",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.backgroundColor = "rgba(255,255,255,0.5)";
                    target.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.backgroundColor = "rgba(255,255,255,0.3)";
                    target.style.transform = "scale(1)";
                  }}
                  title="کلیک کنید تا کپی شود"
                >
                  LAST50
                </span>
              </>
            ) : (
              <>
                🔥 Special Welcome Offer! Get 50% OFF on Game Development
                Workshops with code{" "}
                <span
                  onClick={handleCopyCode}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    padding: "4px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border: "2px dashed rgba(255,255,255,0.7)",
                    transition: "all 0.2s ease",
                    fontFamily: "monospace",
                    fontSize: "20px",
                    fontWeight: "900",
                    display: "inline-block",
                    margin: "0 4px",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.backgroundColor = "rgba(255,255,255,0.5)";
                    target.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.backgroundColor = "rgba(255,255,255,0.3)";
                    target.style.transform = "scale(1)";
                  }}
                  title="Click to copy"
                >
                  LAST50
                </span>
                !
              </>
            )}
          </Typography.Text>

          {/* Action buttons */}
          <Flex gap="middle" wrap>
            <Button
              type="default"
              size="large"
              style={{
                backgroundColor: "white",
                color: "#ea580c",
                border: "none",
                fontWeight: "bold",
                fontSize: "16px",
                height: "48px",
                padding: "0 2rem",
                borderRadius: "24px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = "#fef3c7";
                target.style.transform = "translateY(-2px) scale(1.05)";
                target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = "white";
                target.style.transform = "translateY(0) scale(1)";
                target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
              onClick={handleClaimNow}
            >
              <span style={{ marginRight: "8px" }}>⚡</span>
              {locale === "fa"
                ? "ثبت نام در کارگاه‌ها"
                : "Claim Now & Join Workshops"}
            </Button>

            <Button
              type="text"
              size="large"
              onClick={handleClose}
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
                height: "48px",
                padding: "0 1.5rem",
                border: "2px solid rgba(255,255,255,0.3)",
                borderRadius: "24px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = "rgba(255,255,255,0.1)";
                target.style.borderColor = "rgba(255,255,255,0.6)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = "transparent";
                target.style.borderColor = "rgba(255,255,255,0.3)";
              }}
            >
              {locale === "fa" ? "بعداً" : "Maybe Later"}
            </Button>
          </Flex>
        </Flex>

        {/* Animated background effects */}
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "-30px",
            width: "80px",
            height: "80px",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            animation: "pulse 3s infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "-40px",
            width: "100px",
            height: "100px",
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
            animation: "pulse 4s infinite 1s",
          }}
        />
      </div>
    </Modal>
  );
};

export default WelcomePopup;
