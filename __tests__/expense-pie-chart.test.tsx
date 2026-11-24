// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  ExpensePieChart,
  type CategoryExpenseItem,
} from "../app/dashboard/expense-pie-chart";
import { formatVND } from "../lib/finance";

// Recharts cần ResizeObserver khi render trong môi trường jsdom
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverMock;

const normalizeSpace = (text: string) => text.replace(/\s+/g, " ").trim();

afterEach(() => {
  cleanup();
});

describe("ExpensePieChart", () => {
  it("hiển thị thông báo rỗng khi tháng này chưa có chi tiêu", () => {
    render(<ExpensePieChart data={[]} />);

    expect(
      screen.getByText(
        "Tháng này bạn chưa có khoản chi tiêu nào để vẽ biểu đồ.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("hiển thị bảng số liệu chuẩn accessibility với danh mục, tiền VND và tỉ lệ %", () => {
    const sampleData: CategoryExpenseItem[] = [
      { category: "FOOD", label: "Ăn uống", amount: 1500000, percent: 75 },
      { category: "TRANSPORT", label: "Di chuyển", amount: 500000, percent: 25 },
    ];

    render(<ExpensePieChart data={sampleData} />);

    const table = screen.getByRole("table", {
      name: "Bảng chi tiêu theo danh mục trong tháng hiện tại",
    });
    expect(table).toBeInTheDocument();

    expect(screen.getByText("Ăn uống")).toBeInTheDocument();
    expect(screen.getByText("Di chuyển")).toBeInTheDocument();
    expect(
      screen.getByText(normalizeSpace(formatVND(1500000))),
    ).toBeInTheDocument();
    expect(
      screen.getByText(normalizeSpace(formatVND(500000))),
    ).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
  });
});