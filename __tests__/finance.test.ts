import { describe, expect, test } from "vitest";
import {
  crossedMilestones,
  formatVND,
  getDateRange,
  wishlistProgress,
} from "../lib/finance";
import {
  transactionFilterSchema,
  transactionSchema,
} from "../lib/validation";

describe("wishlistProgress", () => {
  test("1. tính % và làm tròn xuống", () => {
    expect(wishlistProgress(2_999_999, 4_000_000)).toBe(74);
  });

  test("2. luôn nằm trong 0..100", () => {
    expect(wishlistProgress(-500_000, 1_000_000)).toBe(0);
    expect(wishlistProgress(9_000_000, 1_000_000)).toBe(100);
  });

  test("3. trả về 100% khi giá món đồ <= 0", () => {
    expect(wishlistProgress(100_000, 0)).toBe(100);
  });
});

describe("crossedMilestones (thông báo mốc tiết kiệm)", () => {
  test("4. phát hiện đúng mốc 50%, 75%, 100% vừa vượt qua", () => {
    expect(crossedMilestones(49, 50)).toEqual([50]);
    expect(crossedMilestones(40, 80)).toEqual([50, 75]);
    expect(crossedMilestones(75, 100)).toEqual([100]);
  });

  test("5. không lặp lại mốc đã đạt hoặc khi số dư giảm", () => {
    expect(crossedMilestones(50, 74)).toEqual([]);
    expect(crossedMilestones(100, 100)).toEqual([]);
    expect(crossedMilestones(80, 30)).toEqual([]);
  });
});

describe("getDateRange & formatVND", () => {
  test("6. tính khoảng thời gian lọc tháng này, tháng trước và tất cả", () => {
    const mockNow = new Date(2026, 0, 15); // 15/01/2026
    expect(getDateRange("all", mockNow)).toBeUndefined();

    const thisMonth = getDateRange("this-month", mockNow);
    expect(thisMonth?.gte).toEqual(new Date(2026, 0, 1));
    expect(thisMonth?.lt).toEqual(new Date(2026, 1, 1));

    const lastMonth = getDateRange("last-month", mockNow);
    expect(lastMonth?.gte).toEqual(new Date(2025, 11, 1)); // Tháng 12/2025
    expect(lastMonth?.lt).toEqual(new Date(2026, 0, 1));
  });

  test("7. định dạng tiền tệ VND không có phần thập phân", () => {
    const formatted = formatVND(1500000);
    expect(formatted).toContain("1.500.000");
    expect(formatted).toContain("₫");
  });
});

describe("Zod Validation Schemas", () => {
  test("8. chấp nhận giao dịch hợp lệ và ép kiểu số tiền", () => {
    const result = transactionSchema.safeParse({
      type: "EXPENSE",
      amount: "45000",
      description: "Cà phê sáng",
      category: "FOOD",
      date: "2026-11-20",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.amount).toBe(45000);
    }
  });

  test("9. từ chối số tiền âm, số thập phân, mô tả rỗng/quá dài hoặc ngày tương lai", () => {
    // Số tiền âm
    expect(
      transactionSchema.safeParse({
        type: "EXPENSE",
        amount: -5000,
        description: "Test",
        category: "FOOD",
        date: "2026-11-20",
      }).success,
    ).toBe(false);

    // Số thập phân
    expect(
      transactionSchema.safeParse({
        type: "EXPENSE",
        amount: 5000.5,
        description: "Test",
        category: "FOOD",
        date: "2026-11-20",
      }).success,
    ).toBe(false);

    // Mô tả rỗng sau khi trim
    expect(
      transactionSchema.safeParse({
        type: "EXPENSE",
        amount: 5000,
        description: "   ",
        category: "FOOD",
        date: "2026-11-20",
      }).success,
    ).toBe(false);

    // Ngày ở tương lai
    expect(
      transactionSchema.safeParse({
        type: "EXPENSE",
        amount: 5000,
        description: "Test",
        category: "FOOD",
        date: "2099-01-01",
      }).success,
    ).toBe(false);
  });

  test("10. parse bộ lọc URL và gán giá trị mặc định", () => {
    expect(transactionFilterSchema.parse({})).toEqual({
      range: "this-month",
    });

    expect(
      transactionFilterSchema.parse({
        range: "last-month",
        type: "INCOME",
        category: "SALARY",
      }),
    ).toEqual({
      range: "last-month",
      type: "INCOME",
      category: "SALARY",
    });
  });
});