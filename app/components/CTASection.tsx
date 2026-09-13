import Link from "next/link";
import { SUPPORT_PHONE_E164 } from "@/lib/site";
export default function CTASection() {
  return <section className="content-section"><div className="closing-cta"><div><p className="eyebrow">YOUR NEXT STEP</p><h2>Let us help you<br />get back on the road.</h2></div><div className="flex flex-col gap-3"><Link href="/booking" className="button-primary">Request roadside help</Link><a href={`tel:${SUPPORT_PHONE_E164}`} className="button-secondary">Speak to support</a></div></div></section>;
}
