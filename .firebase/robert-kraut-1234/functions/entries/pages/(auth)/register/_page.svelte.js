import { c as create_ssr_component } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` ${$$result.head += `<!-- HEAD_svelte-f1nrop_START -->${$$result.title = `<title>Register</title>`, ""}<!-- HEAD_svelte-f1nrop_END -->`, ""} <div class="flex flex-col items-center" data-svelte-h="svelte-iz6d7d"><form class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12" action="?/register" method="POST"><input type="email" placeholder="Email" id="email" name="email" class="px-4 py-2 border border-gray-300 rounded-md" required> <input type="password" id="password" name="password" placeholder="Password" class="px-4 py-2 border border-gray-300 rounded-md" required> <div><p>Role</p> <input id="policy" name="role" type="radio" value="policy" required> <label for="policy">Policymaker</label><br> <input id="worker" name="role" type="radio" value="worker" required> <label for="worker">Worker</label><br></div> <button type="submit" class="default-action">Register</button> </form></div>`;
});
export {
  Page as default
};
