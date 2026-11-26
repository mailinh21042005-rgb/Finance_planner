import { requireUser } from "../../lib/dal";
import { ProfileNameForm } from "./profile-name-form";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata = {
  title: "Hồ sơ",
};

export default async function ProfilePage() {
  const user = await requireUser();
  return (
    <main className="mx-auto grid w-full max-w-md gap-4 p-4 sm:p-8">
      <ScrollReveal>
        <h1 className="text-2xl font-bold">Hồ sơ</h1>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <p>Email: {user.email}</p>
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <ProfileNameForm initialName={user.name ?? ""} />
      </ScrollReveal>
    </main>
  );
}
