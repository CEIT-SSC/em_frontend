"use client";

import { theme } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { WorkshopGrid } from "components/features/workshops/WorkshopGrid";
import { PresentationOverview } from "@ssc/core";
import { useRouter } from "@bprogress/next";
import { useRouter as nextIntlNavigation } from "../../../../lib/navigation";

const { useToken } = theme;

// Simple icons as React components to replace Ant Design icons
const ShopIcon = ({
  token,
}: {
  token: ReturnType<typeof useToken>["token"];
}) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke={token.colorPrimary}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const BookIcon = ({
  token,
}: {
  token: ReturnType<typeof useToken>["token"];
}) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke={token.colorPrimary}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const RocketIcon = ({
  token,
}: {
  token: ReturnType<typeof useToken>["token"];
}) => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke={token.colorBgBase}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const LoadingSpinner = ({
  size = "default",
  token,
}: {
  size?: "small" | "default" | "large";
  token: ReturnType<typeof useToken>["token"];
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-6 h-6",
    large: "w-8 h-8",
  };

  return (
    <div className="animate-spin">
      <svg className={sizeClasses[size]} fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={token.colorText}
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill={token.colorPrimary}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export default function EventsPage() {
  const { token } = useToken();
  const { data: session, status } = useSession();
  const router = useRouter({ customRouter: nextIntlNavigation });
  const t = useTranslations();

  const [workshopsLoading, setWorkshopsLoading] = useState(true);
  const [presentationsLoading, setPresentationsLoading] = useState(true);
  const [userWorkshops, setUserWorkshops] = useState<PresentationOverview[]>(
    []
  );
  const [userPresentations, setUserPresentations] = useState<
    PresentationOverview[]
  >([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWorkshopsLoading(false);
      setPresentationsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (status === "loading") {
    return (
      <div
        className="h-full flex justify-center items-center"
        style={{ backgroundColor: token.colorBgBase }}
      >
        <div className="flex items-center space-x-2">
          <LoadingSpinner size="large" token={token} />
          <span style={{ color: token.colorTextSecondary }}>Loading...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const LoadingCard = ({ message }: { message: string }) => (
    <div
      className="rounded-lg shadow-sm border p-8 text-center"
      style={{
        backgroundColor: token.colorBgContainer,
        borderColor: token.colorBorder,
        borderRadius: token.borderRadiusLG,
      }}
    >
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="large" token={token} />
        <span style={{ color: token.colorTextSecondary }}>{message}</span>
      </div>
    </div>
  );

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ backgroundColor: token.colorBgBase }}
    >
      <div
        className="w-full max-w-6xl mx-auto h-full overflow-auto"
        style={{
          backgroundColor: token.colorBgBase,
          padding: token.padding,
        }}
      >
        {/* Page Header */}
        <div style={{ marginBottom: token.marginLG }}>
          <h2
            className="text-2xl font-bold mb-2"
            style={{
              color: token.colorText,
              marginBottom: token.marginXS,
            }}
          >
            {t("app.dashboard.events.title")}
          </h2>
          <p style={{ color: token.colorTextSecondary }}>
            {t("app.dashboard.event")}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: token.marginLG,
          }}
        >
          {/* Workshops Section */}
          <div className="w-full">
            <div style={{ marginBottom: token.marginMD }}>
              <h3
                className="text-xl font-semibold flex items-center"
                style={{
                  color: token.colorText,
                  marginBottom: token.marginSM,
                  gap: token.marginXS,
                }}
              >
                <ShopIcon token={token} />
                {t("app.dashboard.events.workshops.title")}
              </h3>
            </div>

            {workshopsLoading ? (
              <LoadingCard
                message={t("app.dashboard.events.workshops.loading")}
              />
            ) : userWorkshops.length === 0 ? (
              <EmptyWorkshopsCard />
            ) : (
              <WorkshopGrid presentations={userWorkshops} />
            )}
          </div>

          {/* Presentations Section */}
          <div className="w-full">
            <div style={{ marginBottom: token.marginMD }}>
              <h3
                className="text-xl font-semibold flex items-center"
                style={{
                  color: token.colorText,
                  marginBottom: token.marginSM,
                  gap: token.marginXS,
                }}
              >
                <BookIcon token={token} />
                {t("app.dashboard.events.presentations.title")}
              </h3>
            </div>

            {presentationsLoading ? (
              <LoadingCard
                message={t("app.dashboard.events.presentations.loading")}
              />
            ) : userPresentations.length === 0 ? (
              <EmptyPresentationsCard />
            ) : (
              <WorkshopGrid presentations={userPresentations} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const EmptyWorkshopsCard = () => {
  const { token } = useToken();
  const t = useTranslations();
  const router = useRouter({ customRouter: nextIntlNavigation });

  return (
    <div
      className="border-2 border-dashed rounded-lg p-8 text-center"
      style={{
        backgroundColor: token.colorBgContainer,
        borderColor: token.colorBorder,
        borderRadius: token.borderRadiusLG,
        padding: token.paddingLG,
      }}
    >
      <div className="flex flex-col items-center" style={{ gap: token.margin }}>
        <div>
          <ShopIcon token={token} />
        </div>
        <div>
          <h4
            className="text-lg font-semibold mb-2"
            style={{
              color: token.colorText,
              marginBottom: token.marginXS,
            }}
          >
            {t("app.dashboard.events.workshops.empty")}
          </h4>
          <p
            className="mb-6"
            style={{
              color: token.colorTextSecondary,
              marginBottom: token.marginMD,
            }}
          >
            {t("app.dashboard.events.workshops.emptyDescription")}
          </p>
        </div>
        <button
          onClick={() => router.push("/workshops")}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
          style={{
            backgroundColor: token.colorPrimary,
            color: token.colorBgBase,
            borderRadius: token.borderRadius,
            padding: `${token.paddingSM}px ${token.padding}px`,
          }}
        >
          <RocketIcon token={token} />
          <span className="ml-2">
            {t("app.dashboard.events.workshops.browseWorkshops")}
          </span>
        </button>
      </div>
    </div>
  );
};

const EmptyPresentationsCard = () => {
  const { token } = useToken();
  const t = useTranslations();
  const router = useRouter({ customRouter: nextIntlNavigation });

  return (
    <div
      className="border-2 border-dashed rounded-lg p-8 text-center"
      style={{
        backgroundColor: token.colorBgContainer,
        borderColor: token.colorBorder,
        borderRadius: token.borderRadiusLG,
        padding: token.paddingLG,
      }}
    >
      <div className="flex flex-col items-center" style={{ gap: token.margin }}>
        <div>
          <BookIcon token={token} />
        </div>
        <div>
          <h4
            className="text-lg font-semibold mb-2"
            style={{
              color: token.colorText,
              marginBottom: token.marginXS,
            }}
          >
            {t("app.dashboard.events.presentations.empty")}
          </h4>
          <p
            className="mb-6"
            style={{
              color: token.colorTextSecondary,
              marginBottom: token.marginMD,
            }}
          >
            {t("app.dashboard.events.presentations.emptyDescription")}
          </p>
        </div>
        <button
          onClick={() => router.push("/presentations")}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
          style={{
            backgroundColor: token.colorPrimary,
            color: token.colorBgBase,
            borderRadius: token.borderRadius,
            padding: `${token.paddingSM}px ${token.padding}px`,
          }}
        >
          <RocketIcon token={token} />
          <span className="ml-2">
            {t("app.dashboard.events.presentations.browsePresentations")}
          </span>
        </button>
      </div>
    </div>
  );
};
