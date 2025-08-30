export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/pattern.svg')"
      }}
    >
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-600/10 to-blue-600/10">
        {children}
      </div>
    </div>
  );
}

