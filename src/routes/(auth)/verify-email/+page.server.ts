import { getFirebaseServer } from '$lib/firebase/adminServer';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, cookies }) => {
  // Extract URL parameters
  const token = url.searchParams.get('token');
  const email = url.searchParams.get('email');
  console.log("Email:", email);

  if (token) {
    const admin = getFirebaseServer();
    
    if (admin.error) {
      console.error("Error getting Firebase admin");
    }

    // Expires in 5 days
    const expiresIn = 60 * 60 * 24 * 5;
    let sessionCookie: string;

    try {
      const adminAuth = admin.data.auth(admin.app);
      // Permission to sign blob/create token must be granted on IAM
      sessionCookie = await adminAuth.createSessionCookie(token, { expiresIn: expiresIn * 1000 });
    } catch (error) {
      console.error("Error creating session cookie:", (error as Error).message);
    }

    // DO NOT RENAME COOKIE
    // Firebase functions allow only one cookie, it must be named __session
    cookies.set("__session", sessionCookie, {
      maxAge: expiresIn,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    redirect(303, '/protected');
  }

  return { token, email };
};
