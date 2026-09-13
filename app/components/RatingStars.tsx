"use client";

import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
}

export default function RatingStars({ rating, size = 16 }: RatingStarsProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-${size / 4} w-${size / 4} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}