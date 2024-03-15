import { ReactNode } from "react";
import type { Metadata } from "next";
//  components
import { PageHeader, PageFooter, InstitutionProvider } from "./components";
// styles
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import "./styles/styles.scss";
// fonts
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "U.S. College Finder",
  description: "U.S. College Finder",
  authors: [{ name: "Coforma", url: "https://coforma.io/" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>U.S. College Finder</title>
      </head>
      <body className={inter.className}>
        <PageHeader />
        <InstitutionProvider>{children}</InstitutionProvider>
        <PageFooter />
      </body>
    </html>
  );
}
