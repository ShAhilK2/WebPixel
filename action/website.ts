"use server";
import { getAuthenticatedClient } from "@/lib/insforge-server";

import { nanoid } from "nanoid";
import { success } from "zod";

export async function addWebsite(domain: string) {
  const { insforge, user } = await getAuthenticatedClient();

  if (!user) {
    return { error: "Unauthenticated" };
  }

  if (!domain) {
    return { error: "Domain is required" };
  }

  const userId = user?.id;

  //   Check for domain already exists

  const { data: exsitingData } = await insforge.database
    .from("websites")
    .select("id")
    .eq("domain", domain)
    .single();

  if (exsitingData) {
    return { error: "Domain already registered" };
  }

  const sideId = `P-${nanoid().toUpperCase()}`;
  const { data: website, error } = await insforge.database
    .from("websites")
    .insert({
      domain,
      user_id: userId,
      site_id: sideId,
    })
    .select()
    .single();

  if (error) {
    return { error: "Failed to add website" };
  }

  return { success: true, website };
}
