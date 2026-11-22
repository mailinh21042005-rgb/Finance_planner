import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { requireUser } from "../../lib/dal";
import { formatVND } from "../../lib/finance";
import {
  createWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
} from "./actions";
import { SignOutButton } from "../transactions/sign-out-button";

export const metadata = {
  title: "Wishlist",
};

export default async function WishlistPage() {
  const user = await requireUser();
  const items = await prisma.wishlistItem.findMany({
    where: { userId: user.id },
    orderBy: { cost: "asc" },
  });

  return (
    <main className="grid max-w-xl gap-6 p-8">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-bold">Wishlist</h1>
        <SignOutButton />
      </div>
      <p>Xin chào {user.name} ({user.email})</p>
      <nav className="flex gap-3 text-sm underline">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/transactions">Giao dịch</Link>
        <Link href="/profile">Hồ sơ</Link>
      </nav>

      {/* Form thêm mới */}
      <form action={createWishlistItem} className="grid gap-2 border p-4 rounded">
        <input name="name" placeholder="Tên món đồ..." required className="border p-1.5" />
        <input name="cost" type="number" placeholder="Giá (VND)" required className="border p-1.5" />
        <select name="priority" defaultValue="MEDIUM" className="border p-1.5">
          <option value="LOW">Thấp (LOW)</option>
          <option value="MEDIUM">Trung bình (MEDIUM)</option>
          <option value="HIGH">Cao (HIGH)</option>
        </select>
        <button type="submit" className="bg-black text-white py-1.5 rounded">
          Thêm vào Wishlist
        </button>
      </form>

      {/* Danh sách & Sửa / Xóa */}
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item.id} className="border p-3 rounded grid gap-2">
            <div className="flex justify-between font-medium">
              <span>{item.name} ({item.priority})</span>
              <span>{formatVND(item.cost)}</span>
            </div>

            <div className="flex gap-2 items-center">
              <form action={updateWishlistItem} className="flex gap-1 flex-wrap">
                <input type="hidden" name="id" value={item.id} />
                <input name="name" defaultValue={item.name} className="border px-1 text-sm w-32" />
                <input name="cost" type="number" defaultValue={item.cost} className="border px-1 text-sm w-24" />
                <select name="priority" defaultValue={item.priority} className="border px-1 text-sm">
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
                <button type="submit" className="border px-2 py-0.5 text-sm">Lưu</button>
              </form>

              <form action={deleteWishlistItem}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="text-red-600 text-sm border px-2 py-0.5">
                  Xoá
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}