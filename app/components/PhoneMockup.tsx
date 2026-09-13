"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { SUPPORT_PHONE_E164 } from "@/lib/site";
import {
  BatteryCharging,
  Car,
  Clock,
  MessageCircle,
  Navigation,
  Phone,
  Satellite,
  ShieldCheck,
  Signal,
  Star,
  Wrench,
} from "lucide-react";

const servicePins = [
  { className: "left-10 top-24", tone: "bg-emerald-400" },
  { className: "right-12 top-36", tone: "bg-sky-400" },
  { className: "left-28 bottom-32", tone: "bg-orange-400" },
  { className: "right-24 bottom-24", tone: "bg-rose-400" },
];

export default function PhoneMockup() {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex min-w-0 justify-center" aria-label="AutoRescue app interface illustration"
    >
      <div className="absolute top-8 h-[620px] w-full max-w-[520px] rounded-full bg-orange-500/20 blur-[170px]" />

      <motion.div
        animate={reducedMotion ? { y: 0, rotate: 0 } : { y: [-5, 5, -5], rotate: [-0.5, 0.5, -0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-[360px] rounded-[58px] border-[8px] border-neutral-700 bg-black p-[10px] shadow-[0_42px_120px_rgba(0,0,0,.7)]"
      >
        <div className="relative h-full overflow-hidden rounded-[46px] border border-white/10 bg-[#101010]">
          <div className="absolute left-1/2 top-5 z-50 h-10 w-40 -translate-x-1/2 rounded-full border border-neutral-800 bg-black shadow-xl" />

          <div className="relative h-[330px] overflow-hidden bg-[radial-gradient(circle_at_25%_20%,rgba(249,115,22,.22),transparent_32%),linear-gradient(135deg,#171717,#262626_45%,#111)]">
            <div className="absolute left-14 top-0 h-full w-[2px] rotate-6 bg-white/10" />
            <div className="absolute left-40 top-0 h-full w-[2px] -rotate-12 bg-white/10" />
            <div className="absolute right-14 top-0 h-full w-[2px] rotate-12 bg-white/10" />
            <div className="absolute left-0 top-24 h-[2px] w-full -rotate-3 bg-white/10" />
            <div className="absolute left-0 top-56 h-[2px] w-full rotate-6 bg-white/10" />
            <div className="absolute left-0 top-80 h-[2px] w-full -rotate-6 bg-white/10" />

            {servicePins.map((pin) => (
              <span
                key={pin.className}
                className={`absolute h-3 w-3 rounded-full ${pin.className} ${pin.tone} shadow-[0_0_18px_rgba(255,255,255,.35)]`}
              />
            ))}

            <div className="absolute left-5 top-16 flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 text-xs text-white backdrop-blur-xl">
              <Satellite className="h-4 w-4 text-orange-400" />
              GPS active
            </div>

            <motion.div
              animate={{ scale: reducedMotion ? 1 : [1, 1.16, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="absolute left-[15%] top-28"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 shadow-[0_0_32px_rgba(249,115,22,.75)]">
                <Navigation className="h-5 w-5 text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ width: reducedMotion ? "62%" : ["15%", "62%", "15%"] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute left-[22%] top-[134px] h-[4px] rounded-full bg-gradient-to-r from-orange-500 via-amber-300 to-emerald-300 shadow-[0_0_22px_rgba(249,115,22,.55)]"
            />

            <motion.div
              animate={{ left: reducedMotion ? "50%" : ["22%", "72%", "22%"] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[22%] top-[110px]"
            >
              <div className="shrink-0 rounded-2xl bg-orange-500 p-3 shadow-[0_0_30px_rgba(249,115,22,.55)]">
                <Car className="h-6 w-6 text-white" />
              </div>
            </motion.div>

            <div className="absolute bottom-5 left-1/2 w-[92%] -translate-x-1/2 rounded-3xl border border-white/10 bg-black/75 p-3 sm:p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 font-black text-white shadow-[0_0_24px_rgba(249,115,22,.35)]">
                    DS
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">Daniel Smith</h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                      <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                      <span>4.9 rating</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`tel:${SUPPORT_PHONE_E164}`}
                  aria-label="Call AutoRescue support"
                  className="rounded-2xl bg-orange-500 p-3 transition hover:scale-105 hover:bg-orange-600"
                >
                  <Phone className="h-5 w-5 text-white" />
                </a>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-300">ETA 2 mins</span>
                </div>

                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-[linear-gradient(180deg,#121212,#0a0a0a)] p-5">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">
                    Live tracking
                  </p>
                  <h2 className="mt-3 text-3xl font-black text-white">
                    AutoRescue
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 text-gray-400">
                  <Signal className="h-4 w-4" />
                  <BatteryCharging className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Stay calm. Your verified mechanic is moving toward your
                location with live arrival updates.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <Wrench className="h-5 w-5 text-orange-400" />
                <p className="mt-2 text-xs text-gray-400">Service</p>
                <p className="text-sm font-semibold text-white">Battery</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <Clock className="h-5 w-5 text-emerald-400" />
                <p className="mt-2 text-xs text-gray-400">Arrival</p>
                <p className="text-sm font-semibold text-white">2 minutes</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/profile" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3 font-semibold text-white shadow-[0_0_28px_rgba(249,115,22,.35)] transition hover:scale-[1.02] hover:bg-orange-600">
                <Navigation className="h-5 w-5" />
                Track Mechanic
              </Link>

              <Link href="/contact" className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 py-3 font-semibold text-white transition hover:border-orange-500 hover:bg-white/[0.03]">
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </Link>
            </div>

            <div className="mx-auto h-1.5 w-32 rounded-full bg-white/30" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
