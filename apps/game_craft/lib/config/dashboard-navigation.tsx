import { useTranslations, useLocale } from "next-intl";
import { FaExternalLinkAlt } from "react-icons/fa";

export interface DashboardNavigationItem {
  name: string;
  route: string;
  icon?: React.ReactNode;
}

export const useDashboardNavigations = (): DashboardNavigationItem[] => {
  const t = useTranslations("app.dashboard");
  const locale = useLocale();

  return [
    {
      name: t("profile.label"),
      // route: `/${locale}/dashboard/events`,
      route: "https://ceit-ssc.ir/dashabord",
      icon: <FaExternalLinkAlt />,
    },
    {
      name: t("event"),
      route: `/dashboard/events`,
    },
    // {
    //   name: t("teamStatus.label"),
    //   route: `/${locale}/dashboard/team-status`,
    // },
    // {
    //   name: t("games.label"),
    //   route: `/${locale}/dashboard/games`,
    // },
    {
      name: t("shoppingBag"),
      route: `/dashboard/shopping-bag`,
    },
  ];
};
