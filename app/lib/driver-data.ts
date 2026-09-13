export type SavedVehicle = { id: string; make: string; model: string; year: string; plate: string };
export type DriverProfile = { name: string; phone: string; email: string; emailVerified: boolean; vehicles: SavedVehicle[]; revision: string };
export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const phoneValid = (value: string) => /^\+?[\d\s()\-]{7,40}$/.test(value) && value.replace(/\D/g, "").length >= 7;
export const cleanText = (value: unknown, length = 100) => typeof value === "string" ? value.replace(/[\u0000-\u001f]/g, "").trim().slice(0, length) : "";
export function parseVehicle(value: unknown): SavedVehicle | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  const vehicle = { id: cleanText(data.id, 36), make: cleanText(data.make, 40), model: cleanText(data.model, 60), year: cleanText(data.year, 4), plate: cleanText(data.plate, 20).toUpperCase() };
  if (!UUID_PATTERN.test(vehicle.id) || vehicle.make.length < 2 || vehicle.model.length < 1) return null;
  if (vehicle.year && (!/^\d{4}$/.test(vehicle.year) || Number(vehicle.year) < 1900 || Number(vehicle.year) > new Date().getFullYear() + 1)) return null;
  return vehicle;
}
export function driverProfile(metadata: Record<string, unknown>, email = "", emailVerified = false): DriverProfile {
  const candidates = Array.isArray(metadata.ar_vehicles) ? metadata.ar_vehicles.slice(0, 5).map(parseVehicle).filter((vehicle): vehicle is SavedVehicle => Boolean(vehicle)) : [];
  const vehicles = candidates.filter((vehicle, index) => candidates.findIndex(item => item.id === vehicle.id) === index);
  return { name: cleanText(metadata.full_name) || "Driver", phone: cleanText(metadata.contact_phone, 40), email, emailVerified, vehicles, revision: cleanText(metadata.ar_preferences_revision, 36) };
}
export const vehicleLabel = (vehicle: SavedVehicle) => [vehicle.make, vehicle.model, vehicle.year].filter(Boolean).join(" ");
export const requestLabels: Record<string, string> = { pending: "Submitted", confirmed: "Confirmed", completed: "Completed", cancelled: "Cancelled" };
export const requestActive = (status: string) => status === "pending" || status === "confirmed";
export function requestDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Lagos" }).format(date);
}
