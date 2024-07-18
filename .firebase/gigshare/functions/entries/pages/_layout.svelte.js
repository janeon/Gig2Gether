import { c as create_ssr_component, a as subscribe, e as escape } from "../../chunks/ssr.js";
/* empty css               */
import "../../chunks/client.js";
import { p as page } from "../../chunks/stores.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let title = $page.url.pathname === "/" ? "GigUnity" : $page.url.pathname.split("/").filter(Boolean).pop();
  title = $page.url.pathname === "/" ? "GigUnity" : $page.url.pathname.split("/").filter(Boolean).pop();
  {
    console.log(title);
  }
  $$unsubscribe_page();
  return `<main><header class="flex justify-between items-center p-4 bg-gray-100"><div><h1 class="text-lg font-bold">${escape(title)}</h1></div> ${title === "register" || title === "GigUnity" ? `<button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" data-svelte-h="svelte-eqok1h"><a href="/login" class="hover:underline">Login</a></button>` : `${title === "registerworker" || title === "registerpolicymaker" ? `<button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" data-svelte-h="svelte-eqok1h"><a href="/login" class="hover:underline">Login</a></button>` : `${title === "login" ? `<div class="flex justify-end space-x-4"><button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" data-svelte-h="svelte-164y400"><a href="/registerworker" class="hover:underline">Worker Register</a></button> <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" data-svelte-h="svelte-qhmz02"><a href="/registerpolicymaker" class="hover:underline">Policymaker Register</a></button></div>` : `<form action="/logout" method="POST" data-svelte-h="svelte-1op20zz"><button type="submit">Log out</button></form>`}`}`}</header> ${slots.default ? slots.default({}) : ``}</main>`;
});
export {
  Layout as default
};
