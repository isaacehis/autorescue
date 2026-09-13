"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import styles from "./driver.module.css";
export default function RefreshButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return <button type="button" className={styles.secondary} disabled={pending} onClick={() => startTransition(() => router.refresh())}>{pending ? "Refreshing..." : "Refresh"}</button>;
}
