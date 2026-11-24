"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  crossedMilestones,
  formatVND,
  wishlistProgress,
} from "../../lib/finance";
import { LoadingButton } from "../../components/loading-button";
import {
  createWishlistItem,
  deleteWishlistItem,
  updateWishlistItem,
  type WishlistFormState,
} from "./actions";

export type WishlistItemDTO = {
  id: string;
  name: string;
  cost: number;
  priority: "LOW" | "MEDIUM" | "HIGH";
};

const PRIORITY_LABEL: Record<WishlistItemDTO["priority"], { text: string; badge: string }> = {
  HIGH: { text: "Cao", badge: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" },
  MEDIUM: { text: "Trung bình", badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
  LOW: { text: "Thấp", badge: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
};

type SavedProgressStore = {
  lastPercent: Record<string, number>;
  notified: Record<string, number[]>;
};

export function WishlistClient({
  userId,
  balance,
  items,
}: {
  userId: string;
  balance: number;
  items: WishlistItemDTO[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [createState, createAction, isCreating] = useActionState<WishlistFormState, FormData>(
    createWishlistItem,
    {},
  );

  // Phản hồi toast khi thêm mới
  useEffect(() => {
    if (!createState.message) return;
    if (createState.ok) {
      toast.success(createState.message);
      formRef.current?.reset();
    } else {
      toast.error(createState.message);
    }
  }, [createState]);

  // Kiểm tra mốc tiết kiệm 50%, 75%, 100% (không lặp lại)
  useEffect(() => {
    const storageKey = `fp_wishlist_milestones_${userId}`;
    let store: SavedProgressStore = { lastPercent: {}, notified: {} };

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) store = JSON.parse(raw);
    } catch {
      // Bỏ qua nếu localStorage bị chặn
    }

    let changed = false;

    for (const item of items) {
      const currentPercent = wishlistProgress(balance, item.cost);
      const prevPercent = store.lastPercent[item.id] ?? 0;
      const alreadyNotified = store.notified[item.id] ?? [];

      const newlyCrossed = crossedMilestones(prevPercent, currentPercent).filter(
        (m) => !alreadyNotified.includes(m),
      );

      if (newlyCrossed.length > 0) {
        for (const milestone of newlyCrossed) {
          toast.success(
            `Bạn đã tiết kiệm được ${milestone}% cho ${item.name}!`,
          );
        }
        store.notified[item.id] = [...alreadyNotified, ...newlyCrossed];
        changed = true;
      }

      if (store.lastPercent[item.id] !== currentPercent) {
        store.lastPercent[item.id] = currentPercent;
        changed = true;
      }
    }

    if (changed) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(store));
      } catch {
        // Bỏ qua lỗi quota
      }
    }
  }, [balance, items, userId]);

  return (
    <div className="grid gap-6">
      {/* Thẻ hiển thị số dư hiện tại dùng để tính tiến độ */}
      <div className="rounded-xl border p-4 shadow-sm">
        <p className="text-sm text-muted-foreground">Số dư hiện tại dùng để tiết kiệm</p>
        <p className={`text-2xl font-bold ${balance < 0 ? "text-red-600" : "text-emerald-600"}`}>
          {formatVND(balance)}
        </p>
        {balance < 0 && (
          <p className="mt-1 text-xs text-muted-foreground">
            Số dư đang âm nên tiến độ các món đồ được tính là 0%.
          </p>
        )}
      </div>

      {/* Form thêm mới */}
      <form ref={formRef} action={createAction} className="grid gap-3 rounded-xl border p-4 shadow-sm">
        <h2 className="font-semibold">Thêm món đồ mơ ước</h2>

        <div>
          <label htmlFor="wish-name" className="mb-1 block text-sm font-medium">
            Tên món đồ
          </label>
          <input
            id="wish-name"
            name="name"
            required
            maxLength={100}
            placeholder="Ví dụ: Laptop mới, Tai nghe..."
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
          {createState.errors?.name && (
            <p className="mt-1 text-xs text-red-600">{createState.errors.name[0]}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="wish-cost" className="mb-1 block text-sm font-medium">
              Giá mục tiêu (VND)
            </label>
            <input
              id="wish-cost"
              name="cost"
              type="number"
              min={1}
              step={1}
              placeholder="15000000"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
            {createState.errors?.cost && (
              <p className="mt-1 text-xs text-red-600">{createState.errors.cost[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="wish-priority" className="mb-1 block text-sm font-medium">
              Mức ưu tiên
            </label>
            <select
              id="wish-priority"
              name="priority"
              defaultValue="MEDIUM"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="LOW">Thấp</option>
              <option value="MEDIUM">Trung bình</option>
              <option value="HIGH">Cao</option>
            </select>
            {createState.errors?.priority && (
              <p className="mt-1 text-xs text-red-600">{createState.errors.priority[0]}</p>
            )}
          </div>
        </div>

        <LoadingButton
          type="submit"
          loading={isCreating}
          loadingText="Đang thêm..."
          className="rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          Thêm vào Wishlist
        </LoadingButton>
      </form>

      {/* Danh sách Wishlist */}
      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Chưa có món đồ nào trong Wishlist. Hãy thêm mục tiêu đầu tiên của bạn!
        </p>
      ) : (
        <ul className="grid gap-4">
          {items.map((item) => (
            <WishlistRow key={item.id} item={item} balance={balance} />
          ))}
        </ul>
      )}
    </div>
  );
}

function WishlistRow({ item, balance }: { item: WishlistItemDTO; balance: number }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, startDelete] = useTransition();
  const [editState, editAction, isUpdating] = useActionState<WishlistFormState, FormData>(
    updateWishlistItem,
    {},
  );

  const percent = wishlistProgress(balance, item.cost);
  const priorityInfo = PRIORITY_LABEL[item.priority];

  useEffect(() => {
    if (!editState.message) return;
    if (editState.ok) {
      toast.success(editState.message);
      setIsEditing(false);
    } else {
      toast.error(editState.message);
    }
  }, [editState]);

  function handleDelete() {
    startDelete(async () => {
      const res = await deleteWishlistItem(item.id);
      if (res.ok) toast.success(res.message);
      else toast.error(res.message || "Xoá thất bại");
    });
  }

  return (
    <li className="rounded-xl border p-4 shadow-sm">
      {!isEditing ? (
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{item.name}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityInfo.badge}`}>
                {priorityInfo.text}
              </span>
            </div>
            <span className="font-semibold">{formatVND(item.cost)}</span>
          </div>

          {/* Thanh tiến độ */}
          <div className="grid gap-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Tiến độ tiết kiệm</span>
              <span className="font-medium text-foreground">{percent}%</span>
            </div>
            <div
              role="progressbar"
              aria-label={`Tiến độ tiết kiệm cho ${item.name}`}
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-2.5 w-full overflow-hidden rounded-full bg-secondary"
            >
              <div
                className={`h-full transition-all duration-300 ${
                  percent >= 100 ? "bg-emerald-500" : "bg-primary"
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-md border px-3 py-1 text-xs font-medium hover:bg-accent"
            >
              Sửa
            </button>
            <LoadingButton
              type="button"
              loading={isDeleting}
              loadingText="Đang xoá..."
              onClick={handleDelete}
              className="rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:hover:bg-red-950"
            >
              Xoá
            </LoadingButton>
          </div>
        </div>
      ) : (
        <form action={editAction} className="grid gap-3">
          <input type="hidden" name="id" value={item.id} />

          <div>
            <label className="mb-1 block text-xs font-medium">Tên món đồ</label>
            <input
              name="name"
              defaultValue={item.name}
              required
              maxLength={100}
              className="w-full rounded-md border bg-background px-2.5 py-1.5 text-sm"
            />
            {editState.errors?.name && (
              <p className="mt-1 text-xs text-red-600">{editState.errors.name[0]}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-xs font-medium">Giá (VND)</label>
              <input
                name="cost"
                type="number"
                min={1}
                step={1}
                required
                defaultValue={item.cost}
                className="w-full rounded-md border bg-background px-2.5 py-1.5 text-sm"
              />
              {editState.errors?.cost && (
                <p className="mt-1 text-xs text-red-600">{editState.errors.cost[0]}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium">Mức ưu tiên</label>
              <select
                name="priority"
                defaultValue={item.priority}
                className="w-full rounded-md border bg-background px-2.5 py-1.5 text-sm"
              >
                <option value="LOW">Thấp</option>
                <option value="MEDIUM">Trung bình</option>
                <option value="HIGH">Cao</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-md border px-3 py-1 text-xs hover:bg-accent"
            >
              Huỷ
            </button>
            <LoadingButton
              type="submit"
              loading={isUpdating}
              loadingText="Đang lưu..."
              className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              Lưu thay đổi
            </LoadingButton>
          </div>
        </form>
      )}
    </li>
  );
}