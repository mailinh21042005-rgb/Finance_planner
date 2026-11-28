import { describe, expect, it } from "vitest";
import {
  analyzeSpendingTrend,
  buildMonthlyReport,
  calculateBalance,
  formatCompactVND,
  type MonthlySummary,
  crossedMilestones,
  formatVND,
  getDateRange,
  wishlistProgress,
} from "../lib/finance";
import {
  transactionFilterSchema,
  transactionSchema,
} from "../lib/validation";

describe("calculateBalance", () => {
  it("tính thu trừ chi", () => {
    expect(calculateBalance([
      { type: "INCOME", amount: 1_500_000 },
      { type: "EXPENSE", amount: 400_000 },
      { type: "EXPENSE", amount: 100_000 },
    ])).toBe(1_000_000);
  });

  it("trả về số âm khi chi nhiều hơn thu", () => {
    expect(calculateBalance([
      { type: "INCOME", amount: 200_000 },
      { type: "EXPENSE", amount: 500_000 },
    ])).toBe(-300_000);
  });
});

describe("wishlistProgress", () => {
  it("tính phần trăm và làm tròn xuống", () => {
    expect(wishlistProgress(2_999_999, 4_000_000)).toBe(74);
  });

  it("giới hạn kết quả trong khoảng 0 đến 100", () => {
    expect(wishlistProgress(-500_000, 1_000_000)).toBe(0);
    expect(wishlistProgress(9_000_000, 1_000_000)).toBe(100);
  });

  it("trả về 100% khi giá món đồ không dương", () => {
    expect(wishlistProgress(100_000, 0)).toBe(100);
  });
});

describe("crossedMilestones (thông báo mốc tiết kiệm)", () => {
  it("phát hiện đúng các mốc vừa vượt qua", () => {
    expect(crossedMilestones(49, 50)).toEqual([50]);
    expect(crossedMilestones(40, 80)).toEqual([50, 75]);
    expect(crossedMilestones(75, 100)).toEqual([100]);
  });

  it("không lặp lại mốc đã đạt hoặc khi số dư giảm", () => {
    expect(crossedMilestones(50, 74)).toEqual([]);
    expect(crossedMilestones(100, 100)).toEqual([]);
    expect(crossedMilestones(80, 30)).toEqual([]);
  });
});

describe("getDateRange & formatVND", () => {
  it("tính khoảng thời gian lọc tháng này, tháng trước và tất cả", () => {
    const mockNow = new Date(2026, 0, 15); // 15/01/2026
    expect(getDateRange("all", mockNow)).toBeUndefined();

    const thisMonth = getDateRange("this-month", mockNow);
    expect(thisMonth?.gte).toEqual(new Date(2026, 0, 1));
    expect(thisMonth?.lt).toEqual(new Date(2026, 1, 1));

    const lastMonth = getDateRange("last-month", mockNow);
    expect(lastMonth?.gte).toEqual(new Date(2025, 11, 1)); // Tháng 12/2025
    expect(lastMonth?.lt).toEqual(new Date(2026, 0, 1));
  });

  it("định dạng tiền tệ VND không có phần thập phân", () => {
    const formatted = formatVND(1500000);
    expect(formatted).toContain("1.500.000");
    expect(formatted).toContain("₫");
  });
});

describe("Schema xác thực", () => {
  it("chấp nhận giao dịch hợp lệ và ép kiểu số tiền", () => {
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

  it("từ chối số tiền âm, số thập phân, mô tả rỗng/quá dài hoặc ngày tương lai", () => {
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

  it("phân tích bộ lọc URL và gán giá trị mặc định", () => {
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

describe("buildMonthlyReport", () => {
  const fixedNow = new Date(2026, 10, 15); // 15/11/2026 (cố định ngày để test không bị lệch theo tháng chạy)

  it("tạo đủ khung N tháng với giá trị 0 khi chưa có giao dịch", () => {
    const result = buildMonthlyReport([], 3, fixedNow);

    expect(result).toEqual([
      { monthKey: "2026-09", label: "09/26", income: 0, expense: 0, net: 0 },
      { monthKey: "2026-10", label: "10/26", income: 0, expense: 0, net: 0 },
      { monthKey: "2026-11", label: "11/26", income: 0, expense: 0, net: 0 },
    ]);
  });

  it("cộng đúng thu, chi, số dư ròng và bỏ qua giao dịch ngoài khoảng thời gian", () => {
    const txs = [
      { type: "INCOME", amount: 10_000_000, date: new Date(2026, 9, 5) },  // Tháng 10
      { type: "EXPENSE", amount: 2_000_000, date: new Date(2026, 9, 12) }, // Tháng 10
      { type: "EXPENSE", amount: 1_500_000, date: new Date(2026, 9, 20) }, // Tháng 10
      { type: "EXPENSE", amount: 500_000, date: new Date(2026, 10, 2) },   // Tháng 11
      { type: "EXPENSE", amount: 9_000_000, date: new Date(2026, 5, 1) },  // Tháng 6 (ngoài khung 3 tháng)
    ];

    const result = buildMonthlyReport(txs, 3, fixedNow);

    expect(result[0]).toMatchObject({ monthKey: "2026-09", income: 0, expense: 0, net: 0 });
    expect(result[1]).toMatchObject({
      monthKey: "2026-10",
      income: 10_000_000,
      expense: 3_500_000,
      net: 6_500_000,
    });
    expect(result[2]).toMatchObject({
      monthKey: "2026-11",
      income: 0,
      expense: 500_000,
      net: -500_000,
    });
  });

  it("xử lý đúng khi khoảng tháng vắt qua giao thừa (năm cũ sang năm mới)", () => {
    const feb2026 = new Date(2026, 1, 10); // 10/02/2026
    const result = buildMonthlyReport([], 3, feb2026);

    expect(result.map((m) => m.label)).toEqual(["12/25", "01/26", "02/26"]);
  });
});

describe("analyzeSpendingTrend", () => {
  it("nhận diện xu hướng tăng chi tiêu và chọn đúng tháng cao điểm", () => {
    const monthly: MonthlySummary[] = [
      { monthKey: "2026-09", label: "09/26", income: 0, expense: 1_000_000, net: -1_000_000 },
      { monthKey: "2026-10", label: "10/26", income: 0, expense: 2_000_000, net: -2_000_000 },
      { monthKey: "2026-11", label: "11/26", income: 0, expense: 3_000_000, net: -3_000_000 },
    ];

    const trend = analyzeSpendingTrend(monthly);

    expect(trend.direction).toBe("up");
    expect(trend.diff).toBe(1_000_000);
    expect(trend.percentChange).toBe(50);
    expect(trend.averageExpense).toBe(2_000_000);
    expect(trend.peakMonth?.monthKey).toBe("2026-11");
  });

  it("nhận diện xu hướng giảm chi tiêu", () => {
    const monthly: MonthlySummary[] = [
      { monthKey: "2026-10", label: "10/26", income: 0, expense: 4_000_000, net: -4_000_000 },
      { monthKey: "2026-11", label: "11/26", income: 0, expense: 1_000_000, net: -1_000_000 },
    ];

    const trend = analyzeSpendingTrend(monthly);

    expect(trend.direction).toBe("down");
    expect(trend.diff).toBe(-3_000_000);
    expect(trend.percentChange).toBe(-75);
    expect(trend.averageExpense).toBe(2_500_000);
    expect(trend.peakMonth?.monthKey).toBe("2026-10");
  });

  it("trả về percentChange = null khi tháng trước chi 0đ nhưng tháng này có chi tiêu", () => {
    const monthly: MonthlySummary[] = [
      { monthKey: "2026-10", label: "10/26", income: 0, expense: 0, net: 0 },
      { monthKey: "2026-11", label: "11/26", income: 0, expense: 500_000, net: -500_000 },
    ];

    const trend = analyzeSpendingTrend(monthly);

    expect(trend.direction).toBe("up");
    expect(trend.percentChange).toBeNull();
  });

  it("trả về flat và peakMonth = null khi tất cả các tháng đều bằng 0", () => {
    const monthly: MonthlySummary[] = [
      { monthKey: "2026-10", label: "10/26", income: 0, expense: 0, net: 0 },
      { monthKey: "2026-11", label: "11/26", income: 0, expense: 0, net: 0 },
    ];

    const trend = analyzeSpendingTrend(monthly);

    expect(trend.direction).toBe("flat");
    expect(trend.diff).toBe(0);
    expect(trend.percentChange).toBe(0);
    expect(trend.averageExpense).toBe(0);
    expect(trend.peakMonth).toBeNull();
  });
});

describe("formatCompactVND", () => {
  it("rút gọn đúng đơn vị nghìn (k), triệu (tr) và số âm", () => {
    expect(formatCompactVND(500)).toBe("500");
    expect(formatCompactVND(50_000)).toBe("50k");
    expect(formatCompactVND(1_500_000)).toBe("1.5tr");
    expect(formatCompactVND(2_000_000)).toBe("2tr");
    expect(formatCompactVND(-1_200_000)).toBe("-1.2tr");
  });
});