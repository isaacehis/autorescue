"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { SUPPORT_PHONE_E164 } from "@/lib/site";

export default function WaButton({ variant = "fixed" }: { variant?: "fixed" | "inline" }) {
  const phoneNumber = SUPPORT_PHONE_E164.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello%2C%20I%20need%20roadside%20assistance%20from%20AutoRescue`;

  if (variant === "fixed") {
    return (
      <>
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,.4)] transition hover:bg-green-600"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-8 w-8" />
        </motion.a>

        <motion.a
          href={`tel:${SUPPORT_PHONE_E164}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-24 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-[0_0_25px_rgba(249,115,22,.4)] transition hover:bg-orange-600"
          aria-label="Call AutoRescue"
        >
          <Phone className="h-6 w-6" />
        </motion.a>
      </>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
    >
      <MessageCircle className="h-5 w-5" />
      Chat on WhatsApp
    </a>
  );
}
