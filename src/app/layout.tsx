import localFont from "next/font/local";
import "./globals.css";
import AppBar from "@/components/header/AppBar";
import React, { Suspense } from "react";
import type { Metadata } from "next";
import Loading from "./loading";
import ClientProvider from "@/HOC/ClientProviders";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "VTube",
  description: "youtube archive",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ClientProvider>
          <AppBar>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </AppBar>
        </ClientProvider>
      </body>
    </html>
  );
}
