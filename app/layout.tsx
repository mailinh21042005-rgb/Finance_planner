import type { Metadata, Viewport } from "next";
import { Geist, Great_Vibes, Oswald, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { PwaRegister } from "@/components/pwa-register";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { NeonBackground } from "@/components/neon-background";
import { LightFireworksBackground } from "@/components/light-fireworks-background";

const geist = Geist({
  subsets: ["latin", "vietnamese"],
  variable: "--font-geist-sans",
});
const oswald = Oswald({
  subsets: ["latin", "vietnamese"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
});
const greatVibes = Great_Vibes({
  subsets: ["latin", "vietnamese"],
  variable: "--font-great-vibes",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Finance Planner",
    template: "%s | Finance Planner",
  },
  description: "Quản lý tài chính cá nhân",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Finance Planner",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={cn(
        "font-sans",
        geist.variable,
        oswald.variable,
        playfairDisplay.variable,
        greatVibes.variable,
      )}
    >
      <body className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative isolate min-h-screen">
            <NeonBackground />
            <LightFireworksBackground />
            <Navbar />
            <div className="pb-20 md:pb-0">{children}</div>
            <MobileBottomNav />
          </div>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        <PwaRegister />
      </body>
    </html>
  );
}