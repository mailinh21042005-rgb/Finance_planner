import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Navbar } from "@/components/navbar";

let mockPathname = "/dashboard";

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: "light",
    setTheme: vi.fn(),
  }),
}));

vi.mock("@/app/transactions/sign-out-button", () => ({
  SignOutButton: () => <button type="button">Đăng xuất</button>,
}));

afterEach(() => {
  cleanup();
});

describe("Navbar", () => {
  it("hiển thị đủ menu, nút đăng xuất và highlight đúng tab /dashboard", () => {
    mockPathname = "/dashboard";
    render(<Navbar />);

    const desktopNav = screen.getByRole("navigation", {
      name: "Điều hướng chính",
    });
    const dashboardLink = within(desktopNav).getByRole("link", {
      name: "Dashboard",
    });
    const transactionsLink = within(desktopNav).getByRole("link", {
      name: "Giao dịch",
    });

    expect(dashboardLink).toHaveAttribute("aria-current", "page");
    expect(transactionsLink).not.toHaveAttribute("aria-current");
    expect(
      screen.getByRole("button", { name: "Đăng xuất" }),
    ).toBeInTheDocument();
  });

  it("ẩn menu nội bộ và nút đăng xuất khi đang ở trang /login", () => {
    mockPathname = "/login";
    render(<Navbar />);

    expect(
      screen.queryByRole("navigation", { name: "Điều hướng chính" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Đăng xuất" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Finance Planner" }),
    ).toHaveAttribute("href", "/");
  });
});