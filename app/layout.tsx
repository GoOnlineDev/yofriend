import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import localFont from 'next/font/local';
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const blackmud = localFont({
  src: [
    {
      path: '../font/blackmudbrush-font/Blackmud-VGoOx.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-blackmud',
});

export const metadata: Metadata = {
  title: "Yo Friend - Digital Marketing Partner",
  description: "We help businesses grow their online presence through innovative strategies and data-driven results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${blackmud.variable} font-sans`}>
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
