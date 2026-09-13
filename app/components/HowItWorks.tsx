const steps = [
  ["01", "Tell us the problem", "Choose a service and describe what happened to your vehicle."],
  ["02", "Share your location", "Add your street, a nearby landmark, and a number we can reach."],
  ["03", "Confirm the plan", "Speak to support about availability, cost, and expected arrival."],
  ["04", "Get moving again", "Agree on the work before repairs begin. Keep your request in your account."],
];
export default function HowItWorks() {
  return <section id="how-it-works" className="content-section"><div className="section-heading"><p className="eyebrow">FROM BREAKDOWN TO NEXT STEP</p><h2>A little less stress.<br />A clear way forward.</h2></div><ol className="process-grid">{steps.map(([number,title,description]) => <li key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></section>;
}
