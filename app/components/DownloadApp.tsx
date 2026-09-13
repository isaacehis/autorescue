"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  BellRing,
  CreditCard,
  MapPin,
  MessageCircle,
  Navigation,
  ShieldCheck,
  Smartphone,
  Star,
  Wrench,
} from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const appFeatures = [
  {
    icon: Navigation,
    label: "Live ETA",
    value: "2 min",
  },
  {
    icon: ShieldCheck,
    label: "Mechanic",
    value: "Verified",
  },
  {
    icon: CreditCard,
    label: "Payment",
    value: "Secure",
  },
];

export default function DownloadApp() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="download-app" className="px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(249,115,22,.18),rgba(10,10,10,.98)_45%,rgba(0,0,0,1))] px-5 py-10 sm:px-8 md:px-12 lg:px-14"
        >
          <div className="absolute right-0 top-0 h-full w-px bg-orange-500/30" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">
                <Smartphone className="h-4 w-4" />
                Download our app
              </div>

              <h2 className="mt-7 max-w-3xl text-4xl font-black leading-tight text-white md:text-5xl">
                Roadside assistance in your pocket.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                Request a verified mechanic, follow their route in real time,
                message support, and pay securely from one calm mobile
                experience.
              </p>

              <div className="mt-9 grid max-w-2xl gap-4 sm:grid-cols-3">
                {appFeatures.map((feature) => (
                  <div
                    key={feature.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <feature.icon className="h-5 w-5 text-orange-400" />
                    <p className="mt-3 text-sm text-gray-400">
                      {feature.label}
                    </p>
                    <p className="mt-1 font-semibold text-white">
                      {feature.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/booking" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black px-7 py-4 font-semibold text-white transition hover:border-orange-500 hover:bg-white/[0.03]">
                  <FaApple className="h-6 w-6" />
                  App Store
                </Link>

                <Link href="/booking" className="flex items-center gap-3 rounded-2xl bg-orange-500 px-7 py-4 font-semibold text-white shadow-[0_0_28px_rgba(249,115,22,.35)] transition hover:scale-[1.02] hover:bg-orange-600">
                  <FaGooglePlay className="h-5 w-5" />
                  Google Play
                </Link>
              </div>
            </div>

            <div className="relative flex min-w-0 justify-center">
              <div className="absolute top-10 h-[560px] w-full max-w-[360px] rounded-full bg-orange-500/20 blur-[150px]" />

              <motion.div
                animate={{ y: reducedMotion ? 0 : [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-[330px] rounded-[52px] border-[7px] border-neutral-700 bg-black p-[9px] shadow-[0_36px_110px_rgba(0,0,0,.7)]"
              >
                <div className="relative h-full overflow-hidden rounded-[40px] border border-white/10 bg-[#101010]">
                  <div className="absolute left-1/2 top-4 z-50 h-9 w-36 -translate-x-1/2 rounded-full bg-black" />

                  <div className="relative h-[345px] bg-[radial-gradient(circle_at_35%_25%,rgba(249,115,22,.24),transparent_34%),linear-gradient(135deg,#1b1b1b,#262626_48%,#111)]">
                    <div className="absolute left-12 top-0 h-full w-[2px] rotate-6 bg-white/10" />
                    <div className="absolute left-36 top-0 h-full w-[2px] -rotate-12 bg-white/10" />
                    <div className="absolute right-12 top-0 h-full w-[2px] rotate-12 bg-white/10" />
                    <div className="absolute left-0 top-24 h-[2px] w-full -rotate-3 bg-white/10" />
                    <div className="absolute left-0 top-52 h-[2px] w-full rotate-5 bg-white/10" />

                    <div className="absolute left-5 top-16 flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 text-xs text-white backdrop-blur-xl">
                      <MapPin className="h-4 w-4 text-orange-400" />
                      Lekki Phase 1
                    </div>

                    <motion.div
                      animate={{ scale: reducedMotion ? 1 : [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute left-10 top-28 flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 shadow-[0_0_28px_rgba(249,115,22,.7)]"
                    >
                      <Navigation className="h-5 w-5 text-white" />
                    </motion.div>

                    <motion.div
                      initial={false}
                      animate={{ width: reducedMotion ? "55%" : ["15%", "55%", "15%"] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                      className="absolute left-[22%] top-[130px] h-[4px] rounded-full bg-gradient-to-r from-orange-500 via-amber-300 to-emerald-300"
                    />

                    <motion.div
                      animate={{ left: reducedMotion ? "50%" : ["22%", "72%", "22%"] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-[22%] top-[108px] rounded-2xl bg-orange-500 p-3 shadow-[0_0_26px_rgba(249,115,22,.55)]"
                    >
                      <Wrench className="h-5 w-5 text-white" />
                    </motion.div>

                    <div className="absolute bottom-5 left-1/2 w-[86%] -translate-x-1/2 rounded-3xl border border-white/10 bg-black/75 p-4 backdrop-blur-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-white">
                            Mechanic assigned
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                            <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                            4.9 rating
                          </div>
                        </div>

                        <div className="rounded-2xl bg-orange-500 p-3">
                          <MessageCircle className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 bg-[#0b0b0b] p-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
                        Request active
                      </p>
                      <h3 className="mt-3 text-3xl font-black text-white">
                        Battery jumpstart
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-gray-400">
                        Daniel is arriving with verified equipment and live
                        route updates.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <BellRing className="h-5 w-5 text-orange-400" />
                        <p className="mt-2 text-xs text-gray-400">ETA</p>
                        <p className="text-sm font-semibold text-white">
                          2 min
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <ShieldCheck className="h-5 w-5 text-emerald-400" />
                        <p className="mt-2 text-xs text-gray-400">Safety</p>
                        <p className="text-sm font-semibold text-white">
                          Verified
                        </p>
                      </div>
                    </div>

                    <Link href="/profile" className="rounded-2xl bg-orange-500 py-4 text-center font-semibold text-white shadow-[0_0_24px_rgba(249,115,22,.35)]">
                      Open live tracking
                    </Link>

                    <div className="mx-auto h-1.5 w-28 rounded-full bg-white/30" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
