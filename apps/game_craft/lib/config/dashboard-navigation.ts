import { useTranslations } from 'next-intl'

export interface DashboardNavigationItem {
  name: string
  route: string
  icon?: React.ReactNode
}

export const useDashboardNavigations = (): DashboardNavigationItem[] => {
  const t = useTranslations('app.dashboard')

  return [
    {
      name: t('event'),
      route: '/dashboard/events',
    },
    {
      name: t('teamStatus.label'),
      route: '/dashboard/team-status',
    },
    {
      name: t('games'),
      route: '/dashboard/games',
    },
    {
      name: t('shoppingBag'),
      route: '/dashboard/shopping-bag',
    }
  ]
}
