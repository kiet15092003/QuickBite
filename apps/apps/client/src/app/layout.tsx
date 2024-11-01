import type { Metadata } from "next";
import '../../public/css/globals.css';
import { Toaster } from "react-hot-toast";
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
        <Providers>{children}</Providers>
        <Toaster position="top-center" reverseOrder={false}/>
      </body>
    </html>
  );
}
