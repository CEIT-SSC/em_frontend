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
    <div className="flex flex-col md:flex-row min-h-[100vh]">
      <HamburgerSidebar user={user} />
      <div className="w-full px-4 pt-20 pb-100 md:pt-12 md:p-12 md:pb-12">
        {children}
      </div>
    </div>
  );
}
