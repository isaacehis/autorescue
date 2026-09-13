import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import { services } from "@/lib/data";
export const metadata: Metadata = { title: "Roadside services", description: "Request battery, tyre, towing, fuel, key, and engine diagnostic assistance.", alternates: { canonical: "/services" } };
const serviceImage = "https://images.pexels.com/photos/8985860/pexels-photo-8985860.jpeg?auto=compress&cs=tinysrgb&w=1200";
export default function ServicesPage() {
  return <main id="main-content" className="page-shell"><section className="mx-auto max-w-7xl"><Breadcrumbs items={[{label:"Services"}]} /><div className="grid items-center gap-10 lg:grid-cols-2"><div><p className="eyebrow">ROADSIDE SERVICES</p><h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">The right starting point for your car trouble.</h1><p className="mt-6 text-lg leading-8 text-gray-300">Choose the issue that best matches your vehicle. Share your location and confirm the service arrangements with support.</p><Link className="button-primary mt-7" href="/booking">Request assistance</Link></div><figure><div className="relative h-80 overflow-hidden rounded-lg"><Image src={serviceImage} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" alt="Mechanic working on an engine in a vehicle workshop" priority /></div></figure></div><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{services.map(service=><article key={service.id} className="rounded-lg border border-white/15 bg-[#111414] p-7"><Image src={service.image} alt="" width={32} height={32} /><h2 className="mt-5 text-2xl font-semibold">{service.title}</h2><p className="mt-4 leading-7 text-gray-300">{service.description}</p><Link className="text-link mt-6" href={`/booking?service=${encodeURIComponent(service.title)}`}>Request this service <span aria-hidden="true">↗</span></Link></article>)}</div></section></main>;
}
