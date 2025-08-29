import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import { GameCraftTimeline } from '@/components/shared/Timeline';
import LogoWithText from '@/components/shared/LogoWithText';
import Wave from '@/components/shared/Wave';
import ThemeToggle from '@/components/ThemeToggle';

export default function HomePage() {
  const t = useTranslations('app');

  return (
    <>
      <ThemeToggle />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white relative overflow-hidden">
          <div className="text-center z-10">
            <LogoWithText size={150} />
            <h1 className="text-6xl font-bold mb-4 mt-8">
              {t('name')} 2024
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join the ultimate game development competition and showcase your creativity with fellow developers
            </p>
            <div className="space-x-4">
              <Button type="primary" size="large" href="/auth/signup">
                Register Now
              </Button>
              <Button size="large" href="/dashboard">
                Dashboard
              </Button>
            </div>
          </div>
          <Wave
            fill="rgba(255,255,255,0.1)"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1
            }}
          />
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <GameCraftTimeline />
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Phase 5 Complete: Layout & Pages</h2>
              <p className="text-xl text-gray-600">
                Full Next.js app structure with layouts and pages
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">✅ Main Layout</h3>
                <p className="text-gray-600">Complete layout with header, footer, and content area</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">✅ Dashboard Layout</h3>
                <p className="text-gray-600">Advanced dashboard with navigation and responsive design</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">✅ Public Pages</h3>
                <p className="text-gray-600">FAQ, Blog, Staff, History, Sponsors pages</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">✅ Dashboard Pages</h3>
                <p className="text-gray-600">Events, Team Status, Games, Shopping Bag</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">✅ Authentication</h3>
                <p className="text-gray-600">Login, Signup, Forgot Password pages</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">✅ App Router</h3>
                <p className="text-gray-600">Next.js 15 app router with nested layouts</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
