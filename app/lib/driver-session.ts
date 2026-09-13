import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createDatabase } from "./supabase";
import { driverProfile } from "./driver-data";

export const requireDriver = cache(async () => {
  const database = await createDatabase();
  const user = database ? (await database.auth.getUser()).data.user : null;
  if (!database || !user) redirect("/sign-in?next=/profile");
  return { database, user, profile: driverProfile(user.user_metadata, user.email, Boolean(user.email_confirmed_at)) };
});
