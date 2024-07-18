import { r as redirect } from "../../../../chunks/index.js";
import { g as getFirebaseServer } from "../../../../chunks/adminServer.js";
const load = async ({ locals }) => {
  if (locals.user) {
    redirect(302, "/");
  }
};
const register = async ({ request, cookies }) => {
  const data = await request.formData();
  const token = data.get("token");
  const admin = getFirebaseServer();
  if (admin.error) {
    console.error("Error getting firebase admin");
    throw redirect(303, "/register");
  }
  const expiresIn = 60 * 60 * 24 * 5;
  let sessionCookie;
  try {
    const admin_auth = admin.data.auth(admin.app);
    sessionCookie = await admin_auth.createSessionCookie(token, { expiresIn: expiresIn * 1e3 });
  } catch (error) {
    console.error("Error creating session cookie", error.message);
    throw redirect(303, "/register");
  }
  cookies.set("__session", sessionCookie, {
    maxAge: expiresIn,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax"
  });
  redirect(303, "/protected");
};
const actions = { register };
export {
  actions,
  load
};
