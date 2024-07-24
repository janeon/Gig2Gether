import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { getFirebaseServer } from "$lib/firebase/adminServer";
import { log } from 'firebase-functions/logger';

export const load: PageServerLoad = async ({locals}) => {
  if (locals.user) {
    console.log("User is already logged in");
    redirect(302, '/')
  }
}

export const actions = {
  default: async ({ request, cookies }) => {
  const data = await request.formData()
  const token = data.get("token") as string;

  const admin = getFirebaseServer();
  if (admin.error) {
      console.error("Error getting firebase admin");
      throw redirect(303, "/register_worker");
  }

  // Expires in 5 days
  const expiresIn = 60 * 60 * 24 * 5;
  let sessionCookie: string;
  try {
    const admin_auth = admin.data.auth(admin.app);
    // persmission to sign blob/create token must be granted on iam
    // https://stackoverflow.com/questions/57564505/unable-to-assign-iam-serviceaccounts-signblob-permission
    sessionCookie = await admin_auth.createSessionCookie(token, { expiresIn: expiresIn * 1000 });
    } catch (error) {
      console.error("Error creating session cookie", (error as Error).message); 
      throw redirect(303, "/register_worker");
    }

  // DO NOT RENAME COOKIE 
  // FIRBASE FUNCTIONS ALLOWS ONLY ONE COOKIE, IT MUST BE NAMED __session
  // https://stackoverflow.com/questions/76611381/how-to-forwarded-cookies-to-the-clound-function-when-deploying-sveltekit-to-fire
  cookies.set("__session", sessionCookie, {
    maxAge: expiresIn,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  redirect(303, '/protected')
  }
} satisfies Actions
  