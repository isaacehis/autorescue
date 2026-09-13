import Link from "next/link";
import { services } from "@/lib/data";
import Icon from "./Icon";
import styles from "./driver.module.css";

export const serviceIcons = ["battery", "tyre", "tow", "engine", "fuel", "key"];
export default function ServiceChoices() {
  return <section className={styles.panel}><div className={styles.panelHeading}><h2>What do you need help with?</h2></div><p className={styles.muted + " " + styles.choiceIntro}>Choose a service to start your request.</p><div className={styles.services}>{services.map((service, index) => <Link key={service.id} href={"/booking?service=" + encodeURIComponent(service.title)} className={styles.service}><Icon name={serviceIcons[index]} size={27} /><strong>{service.title}</strong></Link>)}</div></section>;
}
