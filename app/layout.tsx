import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import AuthProvider from "./_providers/auth";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BarberShop",
  description: "Encontre a barbearia ideal para você",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} dark`}>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
