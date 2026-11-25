import { requireUser } from "../../lib/dal";
import { ProfileNameForm } from "./profile-name-form";

export const metadata = {
  title: "Hồ sơ",
};

export default async function ProfilePage() {
  const user = await requireUser();
  return (
    <main className="mx-auto grid w-full max-w-md gap-4 p-4 sm:p-8">
      <h1 className="text-2xl font-bold">Hồ sơ</h1>
      <p>Email: {user.email}</p>
      <ProfileNameForm initialName={user.name ?? ""} />
    </main>
  );
}
