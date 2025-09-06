import { useTranslations } from 'next-intl'

export interface NavigationItem {
  name: string
  route: string
  icon?: React.ReactNode
}

export const useMainNavigations = (): NavigationItem[] => {
  const t = useTranslations('app.mainNavigation')

  return [
    {
      name: t('home'),
      route: '/',
    },
    // {
    //   name: t('news'),
    //   route: '/news',
    // },
    {
      name: t('faq'),
      route: '/faq',
    },
    {
      name: t('staffs'),
      route: '/staffs',
    },
    {
      name: t('gallery'),
      route: '/gallery',
    },
    {
      name: t('sponsors'),
      route: '/sponsor',
    },
  ]
}
