import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import AuthProvider from "./_providers/auth";
import { Toaster } from "./_components/ui/sonner";

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
          <div className="flex-1">{children}</div>
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
