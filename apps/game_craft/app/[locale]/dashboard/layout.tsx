"use client";

import { theme, Grid } from "antd";
import { useDashboardNavigations } from "../../../lib/config/dashboard-navigation";
import { DashboardHeader } from "../../../components/layout/dashboard/DashboardHeader";
import { DashboardNavigationCard } from "../../../components/layout/dashboard/DashboardNavigationCard";
import LogoWithText from "../../../components/common/LogoWithText";
import { usePathname } from "lib/navigation";

const { useToken } = theme;
const { useBreakpoint } = Grid;

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const screens = useBreakpoint();
  const { token } = useToken();
  const dashboardNavigations = useDashboardNavigations();
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full h-screen">
      <DashboardHeader />
      <div
        className="flex flex-col flex-1 w-full items-center justify-start gap-6"
        style={{
          backgroundColor: token.colorPrimary,
          backgroundImage: `url(/svg/pattern.svg)`,
          padding: "1rem",
        }}
      >
        {screens.lg ? (
          <div className="flex items-center justify-center w-full">
            <LogoWithText variant="light" />
          </div>
        ) : null}

        <div className="flex items-start justify-center w-full gap-2">
          {screens.lg ? (
            <div className="flex flex-1 sticky top-2">
              <DashboardNavigationCard />
            </div>
          ) : null}

          <div
            className="flex flex-col flex-3 items-center justify-start w-3/4 h-full"
            style={{
              backgroundColor: token.colorBgBase,
              borderRadius: token.borderRadius,
            }}
          >
            <div className="flex flex-col items-center justify-start w-full h-full">
              <div
                className="flex flex-col items-center justify-center w-full pb-0"
                style={{
                  padding: token.padding,
                  paddingBottom: 0,
                  backgroundColor: token.colorBgBase,
                  borderRadius: token.borderRadius,
                }}
              >
                <h3
                  className="text-xl font-black m-0"
                  style={{
                    fontWeight: 950,
                    color: token.colorText,
                  }}
                >
                  {
                    dashboardNavigations.find((item) => item.route === pathname)
                      ?.name
                  }
                </h3>
                <div
                  className="w-full border-t border-dashed my-4"
                  style={{
                    borderColor: token.colorBorder,
                  }}
                />
              </div>
              <div className="flex flex-col flex-1 w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
