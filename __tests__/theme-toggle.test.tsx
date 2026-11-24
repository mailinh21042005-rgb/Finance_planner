import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ThemeToggle } from "@/components/theme-toggle";

const setThemeMock = vi.fn();
let currentTheme = "light";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: currentTheme,
    setTheme: setThemeMock,
  }),
}));

afterEach(() => {
  cleanup();
  setThemeMock.mockClear();
});

describe("ThemeToggle", () => {
  it("chuyển sang dark mode khi đang ở light mode", () => {
    currentTheme = "light";
    render(<ThemeToggle />);

    const button = screen.getByRole("button", {
      name: "Chuyển đổi giao diện sáng tối",
    });
    fireEvent.click(button);

    expect(setThemeMock).toHaveBeenCalledTimes(1);
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  it("chuyển sang light mode khi đang ở dark mode", () => {
    currentTheme = "dark";
    render(<ThemeToggle />);

    const button = screen.getByRole("button", {
      name: "Chuyển đổi giao diện sáng tối",
    });
    fireEvent.click(button);

    expect(setThemeMock).toHaveBeenCalledTimes(1);
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });
});