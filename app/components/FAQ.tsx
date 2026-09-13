const faqs = [
  ["How soon can someone reach me?", "Arrival depends on your location, traffic, and available mechanics. Call support to confirm availability and an estimated arrival time."],
  ["What if I do not know what is wrong?", "Choose Other in the request form and describe what you noticed, such as a clicking sound, a warning light, or a flat tyre. You can also call support."],
  ["Can I request help without an account?", "Yes. Call support or send a WhatsApp message. Sign in if you want to submit and keep track of a request through the website."],
  ["How much will the service cost?", "The cost depends on your location and the work required. Ask for the call-out fee and agree on the repair cost before work begins."],
  ["Can I get help for a company vehicle?", "Yes. Include the vehicle and driver details when contacting support. For an ongoing fleet arrangement, use the contact page and select Fleet account."],
  ["What details should I share?", "Give your location, a nearby landmark, vehicle model, the issue, and a contact number. Do not send passwords, bank PINs, or card details."],
];
export default function FAQ() {
  return <section id="faq" className="content-section faq-layout"><div className="section-heading"><p className="eyebrow">BEFORE YOU REQUEST</p><h2>A few useful<br />answers.</h2><p>Still unsure? Our contact details are always one tap away.</p></div><div>{faqs.map(([question,answer])=><details className="faq-item" key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>;
}
