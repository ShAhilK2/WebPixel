import { auth } from "@insforge/nextjs/server";
import { createClient } from "@insforge/sdk";

export async function getAuthenticatedClient() {
  const { token, user } = await auth();
  const insforge = createClient({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!,
    edgeFunctionToken: token || undefined,
  });

  console.log(insforge, user);

  return { insforge, user };
}
