import type { Mechanic, Review, Service } from "./types";

export const services: Service[] = [
  {
    id: 1,
    title: "Battery Jumpstart",
    description: "Roadside support for dead batteries and safe restart checks.",
    icon: "BatteryCharging",
    image: "/images/battery.svg",
    startingPrice: 0,
    priceUnit: "Quote before dispatch",
    features: ["Battery check", "Safe restart", "Replacement guidance"],
  },
  {
    id: 2,
    title: "Tyre Replacement",
    description: "Help for flat tyres, spare fitting, and roadside tyre checks.",
    icon: "CircleDot",
    image: "/images/tyre.svg",
    startingPrice: 0,
    priceUnit: "Quote before dispatch",
    features: ["Spare fitting", "Tyre inspection", "Roadside support"],
  },
  {
    id: 3,
    title: "Towing Support",
    description: "Arrange towing when your vehicle cannot continue safely.",
    icon: "Car",
    image: "/images/car-icon.svg",
    startingPrice: 0,
    priceUnit: "Quote before dispatch",
    features: ["Breakdown support", "Tow decision", "Status updates"],
  },
  {
    id: 4,
    title: "Engine Diagnostic",
    description: "Get help understanding warning lights and engine problems.",
    icon: "ScanSearch",
    image: "/images/engine.svg",
    startingPrice: 0,
    priceUnit: "Quote before dispatch",
    features: ["Issue description", "Diagnostic notes", "Repair guidance"],
  },
  {
    id: 5,
    title: "Fuel Support",
    description: "Support for drivers who run out of petrol or diesel.",
    icon: "Fuel",
    image: "/images/phone-support.svg",
    startingPrice: 0,
    priceUnit: "Quote before dispatch",
    features: ["Location capture", "Fuel type", "Support call"],
  },
  {
    id: 6,
    title: "Key Assistance",
    description: "Ask for assistance with vehicle lockouts or a key problem.",
    icon: "KeyRound",
    image: "/images/wrench.svg",
    startingPrice: 0,
    priceUnit: "Quote before dispatch",
    features: ["Lockout support", "Key issue notes", "Mechanic referral"],
  },
];

export const mechanics: Mechanic[] = [];

export const reviews: Review[] = [];
