import ActiveLink from "../../(landings)/components/Navbar/ActiveLink";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="text-5xl font-bold">تیم های من</h2>
      <div className="flex flex-col gap-2.5 py-6 px-9">
        <div className="flex justify-center gap-3 pb-2 border-b border-[#C7C7C71A]">
          <ActiveLink href="/dashboard/teams">تیم ها</ActiveLink>
          <ActiveLink href="/dashboard/teams/requests">درخواست ها</ActiveLink>
        </div>
        {children}
      </div>
    </div>
  );
}
