import { s as subscribe } from "../../chunks/utils.js";
import { c as create_ssr_component } from "../../chunks/ssr.js";
import "../../chunks/client.js";
import "firebase/auth";
import "firebase/app";
import { a as authUser } from "../../chunks/authstore.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_authUser;
  $$unsubscribe_authUser = subscribe(authUser, (value) => value);
  $$unsubscribe_authUser();
  return ``;
});
export {
  Page as default
};
