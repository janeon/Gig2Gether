import { c as create_ssr_component, a as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import "firebase/auth";
import "firebase/app";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-f1nrop_START -->${$$result.title = `<title>Register</title>`, ""}<!-- HEAD_svelte-f1nrop_END -->`, ""} <h1 class="text-4xl font-bold" data-svelte-h="svelte-xga3p5">Register</h1> <form class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-10/12"><input type="email" placeholder="Email" class="px-4 py-2 border border-gray-300 rounded-md" required${add_attribute()}> <input type="password" placeholder="Password" class="px-4 py-2 border border-gray-300 rounded-md" required${add_attribute()}> <button type="submit" class="default-action" data-svelte-h="svelte-r6twxh">Register</button> ${``}</form>`;
});
export {
  Page as default
};
