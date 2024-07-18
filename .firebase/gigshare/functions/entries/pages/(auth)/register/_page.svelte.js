import { c as create_ssr_component, b as add_attribute, e as escape } from "../../../../chunks/ssr.js";
import "devalue";
import "../../../../chunks/client.js";
import "firebase/auth";
import "../../../../chunks/client2.js";
import "firebase/firestore";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let token;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  {
    console.log("token", token);
  }
  return `<div class="flex flex-col items-center"><form class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12" action="?/register" method="POST"${add_attribute("this", form, 0)}><input type="email" placeholder="email" name="email" class="px-4 py-2 border border-gray-300 rounded-md" required> <input type="password" placeholder="password" name="password" class="px-4 py-2 border border-gray-300 rounded-md" required> <div data-svelte-h="svelte-1d1xxpq"><p>Role</p> <input id="policy" name="role" type="radio" value="policy" required> <label for="policy">Policymaker</label><br> <input id="worker" name="role" type="radio" value="worker" required> <label for="worker">Worker</label><br></div> ${form?.formErrors ? `<article><div style="color: red;">${escape(form.formErrors)}</div></article>` : ``} <button type="submit" class="default-action" data-svelte-h="svelte-3dy3v2">Register</button></form></div>`;
});
export {
  Page as default
};
