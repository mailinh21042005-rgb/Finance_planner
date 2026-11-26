import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import LoginPage from "@/app/login/page";

const signInEmailMock = vi.fn();
const signUpEmailMock = vi.fn();
const signInSocialMock = vi.fn();
let mockSearchParams = "";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(mockSearchParams),
}));

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: {
      email: (...args: unknown[]) => signInEmailMock(...args),
      social: (...args: unknown[]) => signInSocialMock(...args),
    },
    signUp: {
      email: (...args: unknown[]) => signUpEmailMock(...args),
    },
  },
}));

afterEach(() => {
  cleanup();
  mockSearchParams = "";
  vi.clearAllMocks();
});

describe("LoginPage", () => {
  it("đăng nhập bằng email thành công với dữ liệu form", async () => {
    signInEmailMock.mockResolvedValueOnce({ error: null });

    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mật khẩu (≥ 8 ký tự)"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Đăng nhập" }));

    await waitFor(() => {
      expect(signInEmailMock).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "12345678",
        name: "",
      });
    });
  });

  it("hiện thông báo lỗi và giữ nguyên trang khi đăng nhập thất bại", async () => {
    signInEmailMock.mockResolvedValueOnce({
      error: { message: "Sai email hoặc mật khẩu" },
    });

    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mật khẩu (≥ 8 ký tự)"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Đăng nhập" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Sai email hoặc mật khẩu",
    );
  });

  it("đăng ký bằng email thành công với dữ liệu form", async () => {
    signUpEmailMock.mockResolvedValueOnce({ error: null });

    render(<LoginPage />);
    fireEvent.click(screen.getByRole("button", { name: "Tạo tài khoản" }));

    expect(
      screen.getByRole("heading", { name: "Tạo tài khoản mới" }),
    ).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Họ và tên"), {
      target: { value: "Mai Linh" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mật khẩu (≥ 8 ký tự)"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Đăng ký" }));

    await waitFor(() => {
      expect(signUpEmailMock).toHaveBeenCalledWith({
        name: "Mai Linh",
        email: "new@example.com",
        password: "12345678",
      });
    });
  });

  it("mở sẵn chế độ đăng ký khi URL có ?mode=signup", () => {
    mockSearchParams = "mode=signup";

    render(<LoginPage />);

    expect(
      screen.getByRole("heading", { name: "Tạo tài khoản mới" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Họ và tên")).toBeInTheDocument();
  });

  it("gọi đăng nhập GitHub đúng provider và callbackURL", async () => {
    signInSocialMock.mockResolvedValueOnce({ error: null });

    render(<LoginPage />);
    fireEvent.click(
      screen.getByRole("button", { name: "Đăng nhập với GitHub" }),
    );

    await waitFor(() => {
      expect(signInSocialMock).toHaveBeenCalledWith({
        provider: "github",
        callbackURL: "/dashboard",
      });
    });
  });

  it("báo lỗi khi đăng nhập GitHub thất bại", async () => {
    signInSocialMock.mockResolvedValueOnce({
      error: { message: "Không thể kết nối GitHub" },
    });

    render(<LoginPage />);
    fireEvent.click(
      screen.getByRole("button", { name: "Đăng nhập với GitHub" }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Không thể kết nối GitHub",
    );
  });
});