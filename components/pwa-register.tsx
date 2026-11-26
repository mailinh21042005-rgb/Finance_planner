"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker
        .getRegistration()
        .then((registration) => registration?.unregister())
        .catch((error: unknown) => {
          console.error("Không thể gỡ service worker trong development:", error);
        });
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch((error: unknown) => {
      console.error("Không thể đăng ký service worker:", error);
    });
  }, []);

  return null;
}