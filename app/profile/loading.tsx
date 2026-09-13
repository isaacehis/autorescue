import styles from "../components/driver/driver.module.css";
export default function Loading() {
  return <section className={styles.panel + " " + styles.panelBody} role="status" aria-live="polite"><h1 className={styles.wizardTitle}>Loading your workspace...</h1><p className={styles.muted}>Getting your account and request details.</p></section>;
}
