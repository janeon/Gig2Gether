import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1e1qow1_START -->${$$result.title = `<title>Protected route</title>`, ""}<!-- HEAD_svelte-1e1qow1_END -->`, ""} <h1 class="text-4xl font-bold" data-svelte-h="svelte-19ccron">Protected route</h1>`;
});
export {
  Page as default
};
