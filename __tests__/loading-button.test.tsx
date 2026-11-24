import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { LoadingButton } from "@/components/loading-button";

const useFormStatusMock = vi.fn(() => ({ pending: false }));

vi.mock("react-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-dom")>();
  return {
    ...actual,
    useFormStatus: () => useFormStatusMock(),
  };
});

afterEach(() => {
  cleanup();
  useFormStatusMock.mockReset();
  useFormStatusMock.mockReturnValue({ pending: false });
});

describe("LoadingButton", () => {
  it("hiển thị trạng thái mặc định khi không loading", () => {
    const { container } = render(
      <LoadingButton loadingText="Đang lưu...">Lưu</LoadingButton>,
    );

    const button = screen.getByRole("button", { name: "Lưu" });
    expect(button).toBeEnabled();
    expect(button).toHaveAttribute("aria-busy", "false");
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("khoá nút, bật aria-busy và hiện spinner + loadingText khi loading=true", () => {
    const { container } = render(
      <LoadingButton loading loadingText="Đang lưu...">
        Lưu
      </LoadingButton>,
    );

    const button = screen.getByRole("button", { name: "Đang lưu..." });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("tự chuyển sang trạng thái đang xử lý khi useFormStatus trả pending=true", () => {
    useFormStatusMock.mockReturnValue({ pending: true });

    const { container } = render(
      <LoadingButton loadingText="Đang gửi...">Gửi</LoadingButton>,
    );

    const button = screen.getByRole("button", { name: "Đang gửi..." });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});