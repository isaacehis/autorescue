"use client";

import RatingStars from "./RatingStars";
import Link from "next/link";

interface MechanicCardProps {
  mechanic: {
    id: number;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    services: string[];
    avatar: string;
    verified: boolean;
    responseTime: string;
    priceRange: string;
  };
}

export default function MechanicCard({ mechanic }: MechanicCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-orange-500/50 hover:bg-white/[0.06]">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-xl font-black text-white shadow-[0_0_20px_rgba(249,115,22,.3)]">
          {mechanic.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-black text-white">{mechanic.name}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
            <RatingStars rating={mechanic.rating} size={12} />
            <span>{mechanic.rating}</span>
            <span className="text-gray-600">({mechanic.reviews})</span>
          </div>
        </div>
        {mechanic.verified && (
          <div className="flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-400">
            Verified
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {mechanic.services.map((service) => (
          <span key={service} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300">
            {service}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-gray-400">
        <span>{mechanic.responseTime} avg</span>
        <span>{mechanic.priceRange}</span>
      </div>

      <Link href="/booking" className="mt-5 block rounded-xl bg-orange-500/20 px-4 py-3 text-center text-sm font-semibold text-orange-400 transition hover:bg-orange-500/30">
        Hire This Mechanic
      </Link>
    </div>
  );
}