import { c as create_ssr_component, a as subscribe, v as validate_component } from "./ssr.js";
import { p as page } from "./stores.js";
import { S as Sidebar, a as SidebarWrapper, b as SidebarGroup, c as SidebarItem } from "./SidebarWrapper.js";
const UploadSidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeUrl;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  activeUrl = $page.url.pathname;
  $$unsubscribe_page();
  return `${validate_component(Sidebar, "Sidebar").$$render($$result, { activeUrl }, {}, {
    default: () => {
      return `${validate_component(SidebarWrapper, "SidebarWrapper").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(SidebarGroup, "SidebarGroup").$$render($$result, {}, {}, {
            default: () => {
              return ` ${$page.data.user?.platform == "uber" ? `${validate_component(SidebarItem, "SidebarItem").$$render(
                $$result,
                {
                  label: "Quests",
                  href: "/protected/quests"
                },
                {},
                {}
              )} ${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "Trips", href: "/protected/trips" }, {}, {})}` : ``}  ${$page.data.user?.platform == "rover" ? `${validate_component(SidebarItem, "SidebarItem").$$render(
                $$result,
                {
                  label: "Screenshot",
                  href: "/protected/rover-upload"
                },
                {},
                {}
              )}` : ``}  ${$page.data.user?.platform == "upwork" ? `${validate_component(SidebarItem, "SidebarItem").$$render(
                $$result,
                {
                  label: "Jobs",
                  href: "/protected/upwork-job"
                },
                {},
                {}
              )} ${validate_component(SidebarItem, "SidebarItem").$$render(
                $$result,
                {
                  label: "Pofile",
                  href: "/protected/upwork-profile"
                },
                {},
                {}
              )}` : ``} ${validate_component(SidebarItem, "SidebarItem").$$render(
                $$result,
                {
                  label: "Manual",
                  href: "/protected/manual"
                },
                {},
                {}
              )} ${validate_component(SidebarItem, "SidebarItem").$$render(
                $$result,
                {
                  label: "Expenses",
                  href: "/protected/expenses"
                },
                {},
                {}
              )}`;
            }
          })}`;
        }
      })}`;
    }
  })} <div data-svelte-h="svelte-9srwoc"></div>`;
});
export {
  UploadSidebar as U
};
