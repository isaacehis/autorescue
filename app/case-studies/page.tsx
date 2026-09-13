import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
export const metadata: Metadata = { title: "Roadside guide", description: "How to describe common vehicle problems when requesting roadside assistance.", alternates: { canonical: "/case-studies" } };
const guides = [
  ["The engine will not start", "Tell support whether the dashboard lights come on, if you hear a clicking sound, and when the vehicle last started.", "Battery Jumpstart"],
  ["A tyre is flat", "Share the tyre position and whether you have a usable spare. Mention your vehicle model and where it is parked.", "Tyre Replacement"],
  ["Your vehicle cannot continue", "Tell support about warning lights, unusual sounds, or a stalled engine. Confirm the pickup location and discuss whether towing is needed.", "Towing Support"],
];
export default function Page() {
  return <main id="main-content" className="page-shell"><section className="mx-auto max-w-5xl"><Breadcrumbs items={[{label:"Roadside guide"}]} /><p className="eyebrow">HELPFUL INFORMATION</p><h1 className="mt-5 text-4xl font-bold md:text-5xl">Help us understand<br />what happened.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">You do not need to diagnose the problem yourself. A few details can help support understand the assistance you need.</p><div className="mt-12 space-y-5">{guides.map(([title,text,service],index)=><article className="grid gap-6 border-t border-white/15 py-8 md:grid-cols-[60px_1fr]" key={title}><span className="text-orange-300">0{index+1}</span><div><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-4 max-w-2xl leading-8 text-gray-300">{text}</p><Link className="text-link mt-5" href={`/booking?service=${encodeURIComponent(service)}`}>Request help for this issue</Link></div></article>)}</div></section></main>;
}
