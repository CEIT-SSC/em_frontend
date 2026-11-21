import AuthIdentity from "./AuthIdentity";
import "./auth.css";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="ssc-container ssc-auth-layout">
      <AuthIdentity />
      <section className="ssc-auth-panel">
        {children}
      </section>
    </main>
  );
}
