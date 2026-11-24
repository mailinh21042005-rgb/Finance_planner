import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

export const metadata = {
  title: 'Finance Planner',
  description: 'Quản lý tài chính cá nhân',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
