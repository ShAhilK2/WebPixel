import { auth } from "@insforge/nextjs";
import { createClient } from "@insforge/sdk";

export async function getAuthenticatedClient() {
  const { token } = await auth();
  return createClient({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!,
    edgeFunctionToken: token || undefined,
  });
}
