"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { SignOutButton } from "@/app/transactions/sign-out-button";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/transactions", label: "Giao dịch" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/profile", label: "Hồ sơ" },
];

const PUBLIC_PATHS = ["/", "/login", "/register"];

export function Navbar() {
  const pathname = usePathname();
  const isPublicPage = PUBLIC_PATHS.includes(pathname);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 px-4 md:px-8">
        {/* Logo */}
        <Link
          href={isPublicPage ? "/" : "/dashboard"}
          className="flex items-center gap-2 font-bold tracking-tight"
        >
          <Wallet className="h-5 w-5 text-primary" aria-hidden="true" />
          <span>Finance Planner</span>
        </Link>

        {/* Menu desktop */}
        {!isPublicPage && (
          <nav
            aria-label="Điều hướng chính"
            className="hidden items-center gap-1 md:flex"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Nút đổi theme + Đăng xuất */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!isPublicPage && <SignOutButton />}
        </div>
      </div>

      {/* Menu mobile */}
      {!isPublicPage && (
        <nav
          aria-label="Điều hướng di động"
          className="flex items-center justify-around border-t px-2 py-1.5 md:hidden"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}