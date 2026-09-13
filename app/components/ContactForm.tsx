"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SUPPORT_EMAIL } from "@/lib/site";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type InquiryResponse = {
  success: boolean;
  error?: string;
  errors?: string[];
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm({ initialSubject = "", available = true }: { initialSubject?: string; available?: boolean }) {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>({ ...initialFormData, subject: ["support", "mechanic", "fleet", "partnership"].includes(initialSubject) ? initialSubject : "" });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as InquiryResponse;

      if (!response.ok || !result.success) {
        setErrors(
          result.errors ?? [result.error ?? "We could not send your message."],
        );
        return;
      }

      router.push("/thank-you?type=inquiry");
    } catch {
      setErrors(["Network error. Please try again or call support."]);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!available) return <section className="rounded-xl border border-white/15 bg-[#101112] p-8"><h2 className="text-2xl font-semibold">Email our team</h2><p className="mt-4 leading-7 text-gray-300">Include your name, contact number, and how we can help. For a mechanic partnership, tell us your skills and service area.</p><a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(initialSubject || "AutoRescue inquiry")}`} className="button-primary mt-6">Write an email</a></section>;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 md:p-8"
    >
      <h2 className="text-2xl font-black text-white">Send an inquiry</h2>
      <p className="mt-3 text-sm leading-6 text-gray-400">
        Use this for partnership, fleet, mechanic onboarding, and support
        questions. For roadside emergencies, call instead.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-300">
            Full name
          </span>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={updateField}
            required
            minLength={2}
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-orange-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-300">
            Email
          </span>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={updateField}
            required
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-orange-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-300">
            Phone number
          </span>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={updateField}
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-orange-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-300">
            Subject
          </span>
          <select
            name="subject"
            value={formData.subject}
            onChange={updateField}
            required
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-orange-500"
          >
            <option value="">Select a subject</option>
            <option value="support">Support</option>
            <option value="mechanic">Become a mechanic</option>
            <option value="fleet">Fleet account</option>
            <option value="partnership">Partnership</option>
          </select>
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-gray-300">
            Message
          </span>
          <textarea
            name="message"
            rows={6}
            value={formData.message}
            onChange={updateField}
            required
            minLength={10}
            maxLength={2000}
            className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-orange-500"
          />
        </label>
      </div>

      {errors.length > 0 && (
        <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-xl bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
