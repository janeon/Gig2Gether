import { c as create_ssr_component, a as add_attribute, e as escape, b as each } from "../../../../chunks/ssr.js";
import "../../../../chunks/firebase.js";
import "firebase/firestore";
import "firebase/auth";
import "../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let age = 0;
  let gender = "";
  let genders = ["Male", "Female", "Non-Binary", "Other", "Do not wish to share"];
  let race = "";
  let races = [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Hispanic or Latino",
    //Question on whether to include?
    "Middle Eastern or North African",
    "Native Hawaiian or Pacific Islander",
    "White",
    "Multi-Racial",
    "Other",
    "Do not wish to share"
  ];
  let w2Hours = 0;
  let otherGigHours = 0;
  return `<div class="flex space-x-4"><h2 data-svelte-h="svelte-todr4b">Age</h2> <input class="border-2" type="number"${add_attribute("value", age, 0)}> <p>${escape(age)}</p></div> <div class="flex space-x-4"><h2 data-svelte-h="svelte-1lugiyb">Gender</h2> <select class="border-2">${each(genders, (g) => {
    return `<option${add_attribute("value", g, 0)}>${escape(g)} </option>`;
  })}</select> <p>${escape(gender)}</p></div> <div class="flex space-x-4"><h2 data-svelte-h="svelte-oqkwdf">Race</h2> <select class="border-2" placeholder="Please Select">${each(races, (r) => {
    return `<option${add_attribute("value", r, 0)}>${escape(r)} </option>`;
  })}</select> <p>${escape(race)}</p></div> <div class="flex space-x-4"><h2 data-svelte-h="svelte-1688mt3">Hours spent on a W2 job (per week)</h2> <input class="border-2" type="number"${add_attribute("value", w2Hours, 0)}> <p>${escape(w2Hours)}</p></div> <div class="flex space-x-4"><h2 data-svelte-h="svelte-9mo3va">Estimated hours spent on gigs not part of this platform</h2> <input class="border-2" type="number"${add_attribute("value", otherGigHours, 0)}> <p>${escape(otherGigHours)}</p></div> <button data-svelte-h="svelte-lbv59w">Submit</button>`;
});
export {
  Page as default
};
