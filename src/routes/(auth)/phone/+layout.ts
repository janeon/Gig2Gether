import type { LayoutLoad } from "./$types";

export const load = (async () => {
  const auth = await import("$lib/firebase/phoneAuth");

  return {
    auth,
  };
}) satisfies LayoutLoad;
