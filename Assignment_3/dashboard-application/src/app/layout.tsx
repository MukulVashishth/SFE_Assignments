import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Inventory Dashboard",
  description: "50k records virtualized dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="p-6 font-sans">{children}</body>
    </html>
  );
}
