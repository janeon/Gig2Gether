import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/client2.js";
import "firebase/firestore";
import "../../../../chunks/client.js";
import { p as page } from "../../../../chunks/stores.js";
import { C as Checkbox } from "../../../../chunks/Checkbox.js";
import { L as Label } from "../../../../chunks/Label.js";
import { N as NumberInput } from "../../../../chunks/NumberInput.js";
import { S as Select } from "../../../../chunks/Select.js";
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
    $$rendered = `<h1 data-svelte-h="svelte-1e5wwab">Welcome to the GigUnity data-sharing platform!</h1> <h2 data-svelte-h="svelte-11k74yl">Before you get started, update your demographics and sharing preferences. You can change these at any time!</h2> <div class="flex flex-col w-1/2"><div><div class="p-8"> <h1 data-svelte-h="svelte-17biu6u">My Demographics</h1> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
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
    )}</div> <button data-svelte-h="svelte-lbv59w">Submit</button></div></div> <div><div class="p-8"><h1 data-svelte-h="svelte-snkj84">My Sharing Preferences</h1> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
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
    )}</div> <button class="py-5" data-svelte-h="svelte-19uljn6">Submit</button></div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
