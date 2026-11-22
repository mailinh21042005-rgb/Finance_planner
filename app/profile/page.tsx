import Link from "next/link";
import { requireUser } from "../../lib/dal";
import { SignOutButton } from "../transactions/sign-out-button";
import { ProfileNameForm } from "./profile-name-form";

export const metadata = {
  title: "Hồ sơ",
};

export default async function ProfilePage() {
  const user = await requireUser();
  return (
    <main className="grid max-w-md gap-4 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hồ sơ</h1>
        <SignOutButton />
      </div>
      <nav className="flex gap-4 text-sm underline">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/transactions">Giao dịch</Link>
        <Link href="/wishlist">Wishlist</Link>
      </nav>
      <p>Email: {user.email}</p>
      <ProfileNameForm initialName={user.name ?? ""} />
    </main>
  );
}
