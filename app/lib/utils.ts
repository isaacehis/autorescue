export function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function validateBooking(data: Record<string, unknown>): string[] {
  const name = asString(data.name);
  const email = asString(data.email);
  const phone = asString(data.phone);
  const location = asString(data.location);
  const service = asString(data.service);
  const errors: string[] = [];

  if (name.trim().length < 2 || name.length > 100) {
    errors.push("Name must be at least 2 characters");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    errors.push("A valid email is required");
  }

  if (!/^\+?[\d\s\-()]{7,40}$/.test(phone) || phone.replace(/\D/g, "").length < 7) {
    errors.push("A valid phone number is required");
  }

  if (location.trim().length < 3) {
    errors.push("A valid location is required");
  }

  if (!service) {
    errors.push("Please select a service");
  }

  return errors;
}

export function validateInquiry(data: Record<string, unknown>): string[] {
  const name = asString(data.name);
  const email = asString(data.email);
  const subject = asString(data.subject);
  const message = asString(data.message);
  const errors: string[] = [];

  if (name.trim().length < 2 || name.length > 100) {
    errors.push("Name must be between 2 and 100 characters");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    errors.push("A valid email is required");
  }

  if (!subject) {
    errors.push("Please select a subject");
  }

  if (message.trim().length < 10 || message.length > 2000) {
    errors.push("Message must be between 10 and 2,000 characters");
  }

  if (asString(data.phone).length > 40) errors.push("Phone number must be no more than 40 characters");

  return errors;
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .slice(0, 2000)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
