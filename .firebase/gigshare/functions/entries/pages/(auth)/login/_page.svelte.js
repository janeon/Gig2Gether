import { c as create_ssr_component, b as add_attribute, e as escape } from "../../../../chunks/ssr.js";
import "devalue";
import "../../../../chunks/client.js";
import "firebase/auth";
import "../../../../chunks/client2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `<div class="flex flex-col items-center"><form method="POST" class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12"${add_attribute("this", form, 0)}><input type="email" placeholder="email" name="email" class="px-4 py-2 border border-gray-300 rounded-md" required> <input type="password" placeholder="password" name="password" class="px-4 py-2 border border-gray-300 rounded-md" required> ${form?.formErrors ? `<article><div style="color: red;">${escape(form.formErrors)}</div></article>` : ``} <button type="submit" class="default-action" data-svelte-h="svelte-bbrd2e">Login</button></form></div>`;
});
export {
  Page as default
};
