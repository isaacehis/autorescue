import Link from "next/link";
import Image from "next/image";
import AuthForm, { type AuthMode } from "./AuthForm";
import { SUPPORT_PHONE_E164 } from "@/lib/site";
import { databaseConfigured } from "@/lib/supabase";

const authImage = "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1200";

const content = {
  login: ["Welcome back.", "Sign in to see your roadside requests and account details."],
  register: ["One account. Every journey.", "Keep your contact details and roadside requests together."],
  recover: ["Forgot your password?", "Enter your account email and we will send a reset link."],
  "update-password": ["Choose a new password.", "Set a strong password to protect your account."],
};

export default function AuthPage({ mode, next, initialError }: { mode: AuthMode; next?: string; initialError?: string }) {
  const [heading, description] = content[mode];
  const available = databaseConfigured();
  return <main id="main-content" className="page-shell">
    <div className="auth-layout">
      <aside className="auth-story">
        <div className="auth-story-photo"><Image src={authImage} alt="Mechanic repairing a vehicle outdoors with tools" fill loading="eager" sizes="(max-width: 900px) 1px, (max-width: 1106px) 50vw, 525px" className="object-cover" /></div>
        <div className="auth-story-copy"><p className="eyebrow">AUTORESCUE</p><h2>Less worry.<br />More road ahead.</h2><p>Battery trouble, a flat tyre, or a car that will not start. Keep help within reach.</p></div>
      </aside>
      <section className="auth-panel"><Link href="/" className="text-sm text-gray-400 hover:text-white">Back to home</Link><h1 className="mt-8 text-4xl font-bold tracking-tight">{heading}</h1><p className="mb-8 mt-4 leading-7 text-gray-400">{description}</p><AuthForm available={available} mode={mode} next={next} initialError={initialError} /><p className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-gray-400">Need help with your vehicle? <a className="text-white underline" href={`tel:${SUPPORT_PHONE_E164}`}>Call support</a></p></section>
    </div>
  </main>;
}
