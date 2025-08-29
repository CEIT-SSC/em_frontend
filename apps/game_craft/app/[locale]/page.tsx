import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import ThemeToggle from '@/components/ThemeToggle';

export default function HomePage() {
  const t = useTranslations('app');

  return (
    <>
      <ThemeToggle />
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold mb-4">
            {t('name')} 2024
          </h1>
          <p className="text-lg text-gray-600">
            Platform migration in progress...
          </p>
          <div className="space-x-4">
            <Button type="primary">
              {t('mainNavigation.home')}
            </Button>
            <Button>
              {t('mainNavigation.dashboard')}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
