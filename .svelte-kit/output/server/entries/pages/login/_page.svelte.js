import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, a as add_attribute, b as each, e as escape } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import "firebase/auth";
import "firebase/app";
import "firebase/firestore";
import { a as authUser } from "../../../chunks/authstore.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_authUser;
  $$unsubscribe_authUser = subscribe(authUser, (value) => value);
  const roles = ["worker", "policymaker"];
  let email;
  let password;
  $$unsubscribe_authUser();
  return `${$$result.head += `<!-- HEAD_svelte-1bel8ov_START -->${$$result.title = `<title>Login</title>`, ""}<!-- HEAD_svelte-1bel8ov_END -->`, ""} <div class="flex flex-col items-center"><form class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12"><input type="email" placeholder="Email" class="px-4 py-2 border border-gray-300 rounded-md" required${add_attribute("value", email, 0)}> <input type="password" placeholder="Password" class="px-4 py-2 border border-gray-300 rounded-md" required${add_attribute("value", password, 0)}> <select placeholder="Sign in as" required>${each(roles, (r) => {
    return `<option${add_attribute("value", r, 0)}>${escape(r)} </option>`;
  })}</select> <button type="submit" class="default-action" data-svelte-h="svelte-107onqb">Login</button> ${``}</form></div>`;
});
export {
  Page as default
};
