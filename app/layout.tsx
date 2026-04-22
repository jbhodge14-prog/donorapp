import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vibe Giving Platform",
  description: "Donation platform starter with donor portal and admin dashboard."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="page-shell">
          <header className="topbar">
            <Link className="brand" href="/">
              Vibe Giving
            </Link>
            <nav className="nav">
              <Link href="/donate">Donate</Link>
              <Link href="/portal">Donor Portal</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
