import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, a as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import "firebase/auth";
import "firebase/app";
import { a as authUser } from "../../../chunks/authstore.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_authUser;
  $$unsubscribe_authUser = subscribe(authUser, (value) => value);
  $$unsubscribe_authUser();
  return `${$$result.head += `<!-- HEAD_svelte-1bel8ov_START -->${$$result.title = `<title>Login</title>`, ""}<!-- HEAD_svelte-1bel8ov_END -->`, ""} <h1 class="text-4xl font-bold" data-svelte-h="svelte-1kkq8mp">Login</h1> <form class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-10/12"><input type="email" placeholder="Email" class="px-4 py-2 border border-gray-300 rounded-md" required${add_attribute()}> <input type="password" placeholder="Password" class="px-4 py-2 border border-gray-300 rounded-md" required${add_attribute()}> <button type="submit" class="default-action" data-svelte-h="svelte-107onqb">Login</button> ${``}</form>`;
});
export {
  Page as default
};
