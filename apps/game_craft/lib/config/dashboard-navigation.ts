import { useTranslations, useLocale } from 'next-intl'

export interface DashboardNavigationItem {
  name: string
  route: string
  icon?: React.ReactNode
}

export const useDashboardNavigations = (): DashboardNavigationItem[] => {
  const t = useTranslations('app.dashboard')
  const locale = useLocale()

  return [
    {
      name: t('profile.label'),
      route: `/${locale}/dashboard/profile`,
    },
    {
      name: t('event'),
      route: `/${locale}/dashboard/events`,
    },
    {
      name: t('teamStatus.label'),
      route: `/${locale}/dashboard/team-status`,
    },
    {
      name: t('games.label'),
      route: `/${locale}/dashboard/games`,
    },
    {
      name: t('shoppingBag'),
      route: `/${locale}/dashboard/shopping-bag`,
    }
  ]
}
