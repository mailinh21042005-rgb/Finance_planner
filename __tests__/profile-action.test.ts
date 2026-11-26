import { afterEach, describe, expect, it, vi } from "vitest";

const { headersMock, requireUserMock, updateUserMock } = vi.hoisted(() => ({
  headersMock: vi.fn(async () => new Headers()),
  requireUserMock: vi.fn(),
  updateUserMock: vi.fn(),
}));

vi.mock("next/headers", () => ({ headers: headersMock }));
vi.mock("@/lib/dal", () => ({ requireUser: requireUserMock }));
vi.mock("@/lib/auth", () => ({
  auth: { api: { updateUser: updateUserMock } },
}));

import { updateProfileName } from "@/app/profile/actions";

afterEach(() => {
  vi.clearAllMocks();
});

describe("updateProfileName", () => {
  it("trims and updates a valid display name for the authenticated user", async () => {
    requireUserMock.mockResolvedValueOnce({ id: "user-1" });
    updateUserMock.mockResolvedValueOnce({});

    await expect(updateProfileName("  Mai Linh  ")).resolves.toEqual({
      ok: true,
    });
    expect(updateUserMock).toHaveBeenCalledWith({
      body: { name: "Mai Linh" },
      headers: expect.any(Headers),
    });
  });

  it("rejects empty names without calling the auth update endpoint", async () => {
    requireUserMock.mockResolvedValueOnce({ id: "user-1" });

    await expect(updateProfileName("   ")).resolves.toMatchObject({
      ok: false,
      message: "Tên hiển thị không được để trống",
    });
    expect(updateUserMock).not.toHaveBeenCalled();
  });

  it("requires authentication before validating the name", async () => {
    requireUserMock.mockRejectedValueOnce(new Error("Unauthenticated"));

    await expect(updateProfileName("Mai Linh")).rejects.toThrow(
      "Unauthenticated",
    );
    expect(updateUserMock).not.toHaveBeenCalled();
  });
});
