import Link from "next/link";
import { services } from "@/lib/data";
export default function Features() {
  return <section className="service-section"><div className="content-section"><div className="section-heading split-heading"><div><p className="eyebrow">ROADSIDE SERVICES</p><h2>Whatever stopped you,<br />let us know.</h2></div><Link href="/services" className="text-link">Explore all services <span aria-hidden="true">↗</span></Link></div><div className="service-list">{services.map((service,index) => <Link href={`/booking?service=${encodeURIComponent(service.title)}`} key={service.id}><span className="service-index">0{index+1}</span><div><h3>{service.title}</h3><p>{service.description}</p></div><span className="service-arrow" aria-hidden="true">↗</span></Link>)}</div></div></section>;
}
