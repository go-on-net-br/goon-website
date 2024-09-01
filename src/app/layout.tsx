import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.goon.net.br/'),
  title: { template: "%s | Go On", default: "Go On" },
  description:
    "A Go On tem em seu portfólio distribuidores exclusivos de um seleto grupo de marcas do mercado de automação residencial, áudio e vídeo. Trabalhamos com o que há de melhor no mercado, garantindo toda a segurança de uma importação legal.",
  keywords: [
    "automação",
    "automação residencial",
    "áudio",
    "vídeo",
    "áudio hifi",
  ],
  openGraph: {
    siteName: "Go On",
    images: {
      url: "/GoOnLogo.png",
      width: 500,
      height: 500,
    },
    locale: "pt_BR",
    type: "website",
    url: "https://www.goon.net.br/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#F5F5F5]">
      <body
        className={`${montserrat.variable} overflow-x-hidden font-montserrat`}
      >
        <Topbar>
          <main className="font-montserrat">{children}</main>
          <Footer />
        </Topbar>
      </body>
    </html>
  );
}
