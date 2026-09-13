import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import DownloadApp from "./components/DownloadApp";

export default function Home() {
  return <main id="main-content"><Hero /><HowItWorks /><Features /><FAQ /><CTASection /><DownloadApp /></main>;
}
