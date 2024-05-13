import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/topbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#F5F5F5]">
      <body className={`${montserrat.variable} font-montserrat]`}>
        <Topbar />
        <main className="font-montserrat">{children}</main>
      </body>
    </html>
  );
}
