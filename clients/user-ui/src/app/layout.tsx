import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers/NextUIProvider";

export const metadata: Metadata = {
  title: "QuickBite",
  description: "QuickBite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
