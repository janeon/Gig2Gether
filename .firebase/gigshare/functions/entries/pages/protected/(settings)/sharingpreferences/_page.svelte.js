import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/client2.js";
import { S as Sidebar_1 } from "../../../../../chunks/Sidebar.js";
import "@firebase/util";
import "firebase/firestore";
import { C as Checkbox } from "../../../../../chunks/Checkbox.js";
import { L as Label } from "../../../../../chunks/Label.js";
import { S as Select } from "../../../../../chunks/Select.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let uploadData = {
    sharing: [],
    data_lifespan: "",
    location_granularity: ""
  };
  const sharingOptions = [
    { value: "me", label: "Me, myself, and I" },
    { value: "workers", label: "Other workers" },
    {
      value: "researchers",
      label: "Researchers"
    },
    {
      value: "policymakers",
      label: "Policymakers"
    }
  ];
  const lifespanOptions = [
    { value: "never", label: "Never" },
    { value: "1 week", label: "1 Week" },
    { value: "1 month", label: "1 Month" },
    { value: "6 months", label: "6 Months" },
    { value: "1 year", label: "1 Year" }
  ];
  const locationOptions = [
    { value: "1 mile", label: "1 Mile Radius" },
    {
      value: "neighborhood",
      label: "Neighborhood"
    },
    { value: "city", label: "City" },
    { value: "county", label: "County" }
  ];
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-row">${validate_component(Sidebar_1, "Sidebar").$$render($$result, {}, {}, {})} <div class="p-8 w-1/2"><div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Who Would You Like to Share Your Worker Data With?`;
      }
    })} ${validate_component(Checkbox, "Checkbox").$$render(
      $$result,
      {
        choices: sharingOptions,
        group: uploadData.sharing
      },
      {
        group: ($$value) => {
          uploadData.sharing = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <h1 data-svelte-h="svelte-wbg91i">Data Options</h1> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Data Lifespan`;
      }
    })} ${validate_component(Select, "Select").$$render(
      $$result,
      {
        choices: lifespanOptions,
        value: uploadData.data_lifespan
      },
      {
        value: ($$value) => {
          uploadData.data_lifespan = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div>${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Location Granularity`;
      }
    })} ${validate_component(Select, "Select").$$render(
      $$result,
      {
        choices: locationOptions,
        value: uploadData.location_granularity
      },
      {
        value: ($$value) => {
          uploadData.location_granularity = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <button class="py-5" data-svelte-h="svelte-19uljn6">Submit</button></div></div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
