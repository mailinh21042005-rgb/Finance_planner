"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "../../lib/auth-client";
import { LoadingButton } from "../../components/loading-button";

export function ProfileNameForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    setMessage("");
    try {
      const { error } = await authClient.updateUser({ name });
      if (error) {
        setMessage(error.message ?? "Không thể đổi tên");
        return;
      }

      setMessage("Đã đổi tên");
      router.refresh();
    } catch (cause) {
      setMessage(
        cause instanceof Error ? cause.message : "Không thể đổi tên",
      );
    } finally {
      setIsSaving(false);
    }
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
      <LoadingButton
        type="submit"
        loading={isSaving}
        loadingText="Đang lưu..."
        className="border p-2"
      >
        Lưu tên
      </LoadingButton>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
