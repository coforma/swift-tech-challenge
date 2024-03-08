import { ReactNode } from "react";
import type { Metadata } from "next";
// styles
import "./globals.css";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift Tech Challenge",
  description: "Swift Tech Challenge ",
  authors: [{ name: "Coforma", url: "https://coforma.io/" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
