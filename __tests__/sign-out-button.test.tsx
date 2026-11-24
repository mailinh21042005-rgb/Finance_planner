import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { SignOutButton } from "@/app/transactions/sign-out-button";

const pushMock = vi.fn();
const refreshMock = vi.fn();
const signOutMock = vi.fn();
const toastErrorMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}));

vi.mock("sonner", () => ({
  toast: {
    error: (...args: unknown[]) => toastErrorMock(...args),
  },
}));

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signOut: (...args: unknown[]) => signOutMock(...args),
  },
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("SignOutButton", () => {
  it("gọi signOut, chuyển về /login và refresh khi đăng xuất thành công", async () => {
    signOutMock.mockResolvedValueOnce({ error: null });

    render(<SignOutButton />);
    fireEvent.click(screen.getByRole("button", { name: "Đăng xuất" }));

    await waitFor(() => {
      expect(signOutMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/login");
      expect(refreshMock).toHaveBeenCalledTimes(1);
    });
    expect(toastErrorMock).not.toHaveBeenCalled();
  });

  it("hiển thị toast lỗi và không chuyển trang khi signOut trả error", async () => {
    signOutMock.mockResolvedValueOnce({
      error: { message: "Phiên đăng nhập không hợp lệ" },
    });

    render(<SignOutButton />);
    fireEvent.click(screen.getByRole("button", { name: "Đăng xuất" }));

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Phiên đăng nhập không hợp lệ");
    });
    expect(pushMock).not.toHaveBeenCalled();
    expect(refreshMock).not.toHaveBeenCalled();
  });

  it("hiển thị toast lỗi khi signOut ném ngoại lệ", async () => {
    signOutMock.mockRejectedValueOnce(new Error("Mất kết nối mạng"));

    render(<SignOutButton />);
    fireEvent.click(screen.getByRole("button", { name: "Đăng xuất" }));

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Mất kết nối mạng");
    });
    expect(pushMock).not.toHaveBeenCalled();
  });
});