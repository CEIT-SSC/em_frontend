import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import HamburgerSidebar from "./components/HamburgerSidebar";
import { authOptions } from "~/lib/auth-options";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const { user } = session;

  return (
    <div className="ssc-dashboard flex min-h-dvh flex-col md:flex-row">
      <HamburgerSidebar user={user} />
      <main className="min-w-0 flex-1 px-5 pb-12 pt-24 md:p-10 lg:p-12">
        <div className="mx-auto max-w-5xl">
        {children}
        </div>
      </main>
    </div>
  );
}
