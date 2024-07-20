import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { U as UploadSidebar } from "../../../../chunks/UploadSidebar.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(UploadSidebar, "UploadSidebar").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
