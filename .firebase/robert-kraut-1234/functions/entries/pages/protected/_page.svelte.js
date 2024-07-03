import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import { a as authUser } from "../../../chunks/authstore.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authUser, $$unsubscribe_authUser;
  let $page, $$unsubscribe_page;
  $$unsubscribe_authUser = subscribe(authUser, (value) => $authUser = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_authUser();
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1e1qow1_START -->${$$result.title = `<title>Protected route</title>`, ""}<!-- HEAD_svelte-1e1qow1_END -->`, ""} <h1 class="text-4xl font-bold" data-svelte-h="svelte-19ccron">Protected route</h1> ${$authUser && $authUser.role == "worker" ? `<a href="/protected/demographics" class="${[
    "hover:underline",
    $page.url.pathname === "/protected/demographics" ? "active" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-15n4024">Change My Demographics</a>` : ``}`;
});
export {
  Page as default
};
