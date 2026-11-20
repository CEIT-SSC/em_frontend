import Image from "next/image";
import Link from "next/link";
import portal from "~/assets/portal.png";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="ssc-container grid min-h-dvh items-center gap-12 py-8 lg:grid-cols-2 lg:py-12">
      <section className="ssc-auth-panel mx-auto w-full max-w-lg rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <Link href="/" aria-label="صفحه اصلی انجمن علمی" className="mb-6 inline-flex items-center gap-3"><Image src="/logo.png" alt="" width={32} height={40} /><span className="text-sm text-muted">انجمن علمی مهندسی کامپیوتر</span></Link>
        {children}
      </section>
      <div className="hidden lg:block" aria-hidden="true">
        <Image src={portal} alt="" className="mx-auto h-auto w-full max-w-lg" />
        <p className="mt-6 text-center text-2xl font-semibold">از یک آشنایی شروع می‌شه</p>
      </div>
    </main>
  );
}
