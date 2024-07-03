import { c as create_ssr_component } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` ${$$result.head += `<!-- HEAD_svelte-1bel8ov_START -->${$$result.title = `<title>Login</title>`, ""}<!-- HEAD_svelte-1bel8ov_END -->`, ""} <div class="flex flex-col items-center" data-svelte-h="svelte-17ihgjw"><form class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12" action="?/login" method="post"><input type="email" placeholder="Email" id="email" name="email" class="px-4 py-2 border border-gray-300 rounded-md" required> <input type="password" id="password" name="password" placeholder="Password" class="px-4 py-2 border border-gray-300 rounded-md" required> <button type="submit" class="default-action">Login</button> </form></div>`;
});
export {
  Page as default
};
