"use client";
import Link from "next/link";
import styles from "../components/driver/driver.module.css";
export default function AccountError({ reset }: { reset: () => void }) {
  return <section className={styles.panel + " " + styles.panelBody}><h1 className={styles.wizardTitle}>We couldn’t load this page.</h1><p className={styles.muted}>Please try again. Your account details have not been removed.</p><div className={styles.actions}><button className={styles.primary} onClick={reset}>Try again</button><Link className={styles.secondary} href="/profile/support">Contact support</Link></div></section>;
}
