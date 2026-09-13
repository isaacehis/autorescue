import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SUPPORT_EMAIL, SUPPORT_PHONE_E164 } from "@/lib/site";
export default function LocalBusinessSchema() {
  const schema = { "@context": "https://schema.org", "@type": "Organization", name: SITE_NAME, url: SITE_URL, description: SITE_DESCRIPTION, telephone: SUPPORT_PHONE_E164, email: SUPPORT_EMAIL, logo: `${SITE_URL}/icon.svg` };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
