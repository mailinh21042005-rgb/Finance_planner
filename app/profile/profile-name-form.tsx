"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "../../lib/auth-client";

export function ProfileNameForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { error } = await authClient.updateUser({ name });
    if (error) {
      setMessage(error.message ?? "Không thể đổi tên");
      return;
    }

    setMessage("Đã đổi tên");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2">
      <label htmlFor="name">Tên hiển thị</label>
      <input
        id="name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="border p-2"
      />
      <button type="submit" className="border p-2">Lưu tên</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
