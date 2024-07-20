import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/client2.js";
import "firebase/firestore";
import "../../../../../chunks/client.js";
import { p as page } from "../../../../../chunks/stores.js";
import { S as Sidebar_1 } from "../../../../../chunks/Sidebar.js";
import { L as Label } from "../../../../../chunks/Label.js";
import { N as NumberInput } from "../../../../../chunks/NumberInput.js";
import { S as Select } from "../../../../../chunks/Select.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let age = 0;
  let gender = "";
  let genders = [
    { value: "male", name: "Male" },
    { value: "female", name: "Female" },
    { value: "non-binary", name: "Non-Binary" },
    { value: "other", name: "Other" },
    {
      value: null,
      name: "Do not wish to share"
    }
  ];
  let race = "";
  let races = [
    {
      value: "american indian/alaska",
      name: "American Indian or Alaska Native"
    },
    { value: "asian", name: "Asian" },
    {
      value: "black/african american",
      name: "Black or African American"
    },
    {
      value: "hispanic/latino",
      name: "Hispanic or Latino"
    },
    //Question on whether to include?
    {
      value: "mena",
      name: "Middle Eastern or North African"
    },
    {
      value: "hawaiian/pi",
      name: "Native Hawaiian or Pacific Islander"
    },
    { value: "white", name: "White" },
    { value: "multi", name: "Multi-Racial" },
    { value: "other", name: "Other" },
    {
      value: null,
      name: "Do not wish to share"
    }
  ];
  let w2Hours = 0;
  let otherGigHours = 0;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-row">${validate_component(Sidebar_1, "Sidebar").$$render($$result, {}, {}, {})} <div class="p-8"> <h1 data-svelte-h="svelte-17biu6u">My Demographics</h1> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Age`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "border-2",
        type: "number",
        value: age
      },
      {
        value: ($$value) => {
          age = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Gender`;
      }
    })} ${validate_component(Select, "Select").$$render(
      $$result,
      { items: genders, value: gender },
      {
        value: ($$value) => {
          gender = $$value;
          $$settled = false;
        }
      },
      {}
    )} </div> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Race`;
      }
    })} ${validate_component(Select, "Select").$$render(
      $$result,
      { items: races, value: race },
      {
        value: ($$value) => {
          race = $$value;
          $$settled = false;
        }
      },
      {}
    )} </div> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Hours spent on a W2 job (per week)`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "border-2",
        type: "number",
        value: w2Hours
      },
      {
        value: ($$value) => {
          w2Hours = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Estimated hours spent on gigs not part of this platform`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "border-2",
        type: "number",
        value: otherGigHours
      },
      {
        value: ($$value) => {
          otherGigHours = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <button data-svelte-h="svelte-lbv59w">Submit</button></div></div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
