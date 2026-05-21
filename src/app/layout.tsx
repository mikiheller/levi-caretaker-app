import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ActivityLogsProvider } from "@/components/ActivityLogsProvider";
import { CaretakersProvider } from "@/components/CaretakersProvider";
import { HouseholdProvider } from "@/components/HouseholdProvider";
import { MoodLogsProvider } from "@/components/MoodLogsProvider";
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
  title: "Levi's App",
  description: "Tools and tracking for the people who love Levi.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Levi",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fff8ef",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <HouseholdProvider>
          <CaretakersProvider>
            <ActivityLogsProvider>
              <MoodLogsProvider>{children}</MoodLogsProvider>
            </ActivityLogsProvider>
          </CaretakersProvider>
        </HouseholdProvider>
      </body>
    </html>
  );
}
