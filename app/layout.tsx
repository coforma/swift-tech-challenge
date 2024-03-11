import React, { ReactNode } from "react";
import type { Metadata } from "next";
//  components
import { PageHeader } from "./components/PageHeader";
// styles
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import "../styles/styles.scss";
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
      <body className={inter.className}>
        <PageHeader />
        {children}
      </body>
    </html>
  );
}