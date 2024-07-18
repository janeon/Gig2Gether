import { c as create_ssr_component, a as subscribe, v as validate_component } from "./ssr.js";
import { p as page } from "./stores.js";
import { S as Sidebar, a as SidebarWrapper, b as SidebarGroup, c as SidebarItem } from "./SidebarWrapper.js";
const Sidebar_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
              return `${validate_component(SidebarItem, "SidebarItem").$$render(
                $$result,
                {
                  label: "My Account",
                  href: "/protected/account"
                },
                {},
                {}
              )} ${validate_component(SidebarItem, "SidebarItem").$$render(
                $$result,
                {
                  label: "My Worker Profile",
                  href: "/protected/profile"
                },
                {},
                {}
              )} ${validate_component(SidebarItem, "SidebarItem").$$render(
                $$result,
                {
                  label: "Demographics",
                  href: "/protected/demographics"
                },
                {},
                {}
              )} ${validate_component(SidebarItem, "SidebarItem").$$render(
                $$result,
                {
                  label: "Sharing Preferences",
                  href: "/protected/sharingpreferences"
                },
                {},
                {}
              )} ${validate_component(SidebarItem, "SidebarItem").$$render(
                $$result,
                {
                  label: "Worker Test",
                  href: "/protected/upwork-profile"
                },
                {},
                {}
              )} ${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "Withdraw Data" }, {}, {})} ${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "Notification" }, {}, {})}`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
export {
  Sidebar_1 as S
};
