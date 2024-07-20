import { r as redirect } from "../../../../chunks/index.js";
import { g as getFirebaseServer } from "../../../../chunks/adminServer.js";
import { log } from "firebase-functions/logger";
const load = async ({ locals }) => {
  if (locals.user) {
    redirect(302, "/");
  }
};
const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const token = formData.get("token");
    log("token acquired");
    const admin = getFirebaseServer();
    if (admin.error) {
      console.error("Error getting firebase admin");
      throw redirect(303, "/login");
    }
    const expiresIn = 60 * 60 * 24 * 5;
    let sessionCookie;
    try {
      const admin_auth = admin.data.auth(admin.app);
      sessionCookie = await admin_auth.createSessionCookie(token, { expiresIn: expiresIn * 1e3 });
    } catch (error) {
      console.error("Error creating session cookie");
      throw redirect(303, "/login");
    }
    cookies.set("__session", sessionCookie, {
      maxAge: expiresIn,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax"
    });
    log("Session cookie set: ", sessionCookie);
    throw redirect(303, "/protected");
  }
};
export {
  actions,
  load
};
