import { c as create_ssr_component, e as escape } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1e1qow1_START -->${$$result.title = `<title>Protected route</title>`, ""}<!-- HEAD_svelte-1e1qow1_END -->`, ""} <h1 class="text-4xl font-bold" data-svelte-h="svelte-19ccron">Protected route</h1> ${data.user ? `<p>Welcome, ${escape(data.user.email)}</p> <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" data-svelte-h="svelte-15n6zt9">Edit My Demographics</button>` : ``}`;
});
export {
  Page as default
};
