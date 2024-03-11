import { ReactNode } from "react";
import type { Metadata } from "next";
//  components
import { PageHeader, PageFooter } from "./components";
// styles
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import "./styles/styles.scss";
// fonts
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
        <div className="wrapper">
          <PageHeader />
          {children}
          <PageFooter />
        </div>
      </body>
    </html>
  );
}
