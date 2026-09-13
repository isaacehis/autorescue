import Link from "next/link";
export default function CaseStudies() {
  return <section className="content-section"><h2 className="text-3xl font-bold">Know your next step.</h2><p className="mt-4 text-gray-300">Read our guide to requesting help for common roadside problems.</p><Link href="/case-studies" className="text-link mt-6">Read the roadside guide</Link></section>;
}
