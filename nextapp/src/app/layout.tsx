import type { Metadata } from "next";
import "../styles/globals.scss";
import "../styles/colors.scss";
import "../styles/fadeIn.scss";

export const metadata: Metadata = {
  title: "Employee List",
  description:
    "Page Where You Can Search And Filter Employees To See Their Details",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
