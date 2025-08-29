import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import ThemeToggle from '@/components/ThemeToggle';
import LoginForm from '@/components/LoginForm';

export default function HomePage() {
  const t = useTranslations('app');

  return (
    <>
      <ThemeToggle />
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              {t('name')} 2024
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              API & Services Integration Complete
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Features Migrated:</h2>
              <ul className="space-y-2 text-left">
                <li>✅ API Configuration with Axios</li>
                <li>✅ Authentication Services</li>
                <li>✅ Workshop Services</li>
                <li>✅ User Management</li>
                <li>✅ Storage Utilities</li>
                <li>✅ Custom Hooks (useFetch)</li>
                <li>✅ Error Handling</li>
                <li>✅ TypeScript Integration</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
