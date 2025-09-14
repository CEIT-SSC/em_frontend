"use client";

import { Button, Typography, Flex } from "antd";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;

export default function NotFound() {
  const t = useTranslations("notFound");
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoHome = () => {
    // Extract the locale from the current pathname
    const locale = pathname.split("/")[1] || "fa";
    router.push(`/${locale}`);
  };

  const handleGoBack = () => {
    router.back();
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-lightyellow via-yellow-50 to-orange-50 dark:from-antd-dark-bg-base dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <Flex vertical align="center" gap={32} className="animate-fadeIn">
          {/* Mario Character */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-action/20 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-white dark:bg-antd-dark-bg-container rounded-full p-8 shadow-2xl border-4 border-primary/20">
              <Image
                src="/images/SuperMario.jpg"
                alt="Mario Character"
                width={200}
                height={200}
                className="rounded-full"
                priority
              />
            </div>
          </div>

          {/* Error Code */}
          <div className="relative">
            <Title
              level={1}
              className="!text-8xl !font-bold !text-primary dark:!text-white !mb-0 relative z-10"
              style={{
                fontFamily:
                  "var(--font-estedad), var(--font-vazirmatn), sans-serif",
                textShadow: "4px 4px 8px rgba(60, 58, 125, 0.3)",
              }}
            >
              404
            </Title>
            <div className="absolute inset-0 text-8xl font-bold text-action/20 dark:text-action/10 transform translate-x-2 translate-y-2 -z-10">
              404
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <Title
              level={2}
              className="!text-primary dark:!text-white !mb-4"
              style={{
                fontFamily:
                  "var(--font-estedad), var(--font-vazirmatn), sans-serif",
              }}
            >
              {t("title") || "Oops! Page Not Found"}
            </Title>

            <Paragraph
              className="!text-lg !text-gray-600 dark:!text-gray-300 max-w-md mx-auto"
              style={{
                fontFamily:
                  "var(--font-estedad), var(--font-vazirmatn), sans-serif",
              }}
            >
              {t("description") ||
                "It looks like the page you&apos;re looking for doesn&apos;t exist. Mario couldn&apos;t find it in any of the castle levels!"}
            </Paragraph>
          </div>

          {/* Action Buttons */}
          <Flex gap={16} wrap="wrap" justify="center" className="mt-8">
            <Button
              type="primary"
              size="large"
              icon={<HomeOutlined />}
              onClick={handleGoHome}
              className="h-12 px-8 text-lg font-semibold rounded-lg border-2 border-primary bg-primary hover:!bg-primary/90 hover:!border-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{
                fontFamily:
                  "var(--font-estedad), var(--font-vazirmatn), sans-serif",
              }}
            >
              {t("goHome") || "Go Home"}
            </Button>

            <Button
              size="large"
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
              className="h-12 px-8 text-lg font-semibold rounded-lg border-2 border-action text-action hover:!bg-action hover:!text-white hover:!border-action shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{
                fontFamily:
                  "var(--font-estedad), var(--font-vazirmatn), sans-serif",
              }}
            >
              {t("goBack") || "Go Back"}
            </Button>
          </Flex>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-16 h-16 bg-action/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float-delayed"></div>
          <div className="absolute top-1/3 right-20 w-8 h-8 bg-yellow-400/20 rounded-full blur-md animate-bounce"></div>
          <div className="absolute bottom-1/3 left-20 w-6 h-6 bg-red-400/20 rounded-full blur-md animate-bounce-delayed"></div>
        </Flex>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes bounce-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-bounce-delayed {
          animation: bounce-delayed 2s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}
