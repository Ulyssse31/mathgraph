import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SessionProvider from "@/components/auth/SessionProvider";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MathGraph",
  description:
    "A non-linear, graph-based platform for learning mathematics from undergraduate to graduate level.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ThemeProvider>
          <SessionProvider>{children}</SessionProvider>
          <Toaster theme="dark" position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
