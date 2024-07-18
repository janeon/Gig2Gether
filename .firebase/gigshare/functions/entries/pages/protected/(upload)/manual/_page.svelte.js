import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/client2.js";
import { U as UploadSidebar } from "../../../../../chunks/UploadSidebar.js";
import "firebase/firestore";
import { L as Label } from "../../../../../chunks/Label.js";
import { I as Input } from "../../../../../chunks/Input.js";
import { M as MultiSelect } from "../../../../../chunks/MultiSelect.js";
import { N as NumberInput } from "../../../../../chunks/NumberInput.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let uberData = {
    date: "",
    income: 0,
    tips: 0,
    expenses: 0,
    hoursSpent: 0,
    withholdings: 0,
    schedule: []
  };
  let roverData = {
    date: "",
    income: 0,
    tips: 0,
    expenses: 0,
    timeSpent: 0,
    platfromCut: 0,
    services: [],
    travelTime: 0
  };
  let upworkData = {
    jobCategory: "",
    hourlyCharge: 0,
    hoursPerWeek: 0,
    clientHistory: "",
    experience: [],
    jobDuration: "",
    clientLocation: ""
  };
  const uberSchedule = [
    { value: "M", name: "Monday" },
    { value: "T", name: "Tuesday" },
    { value: "W", name: "Wednesday" },
    { value: "TH", name: "Thursday" },
    { value: "F", name: "Friday" },
    { value: "Sat", name: "Saturday" },
    { value: "Sun", name: "Sunday" }
  ];
  const roverServices = [
    { value: "boarding", name: "Boarding" },
    {
      value: "house sitting",
      name: "House Sitting"
    },
    { value: "drop-in", name: "Drop-In Visits" },
    {
      value: "day care",
      name: "Doggy Day Care"
    },
    {
      value: "dog walking",
      name: "Dog Walking"
    }
  ];
  const upworkExperience = [
    {
      value: "entry level",
      name: "Entry-Level"
    },
    {
      value: "intermediate level",
      name: "Intermediate-Level"
    },
    {
      value: "expert level",
      name: "Expert Level"
    }
  ];
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-row">${validate_component(UploadSidebar, "UploadSidebar").$$render($$result, {}, {}, {})} <div class="p-8 flex flex-col items-center w-full"><h1 class="text-2xl font-bold mb-6" data-svelte-h="svelte-1gp5sx1">Manual Upload</h1> ${$page.data.user?.platform == "uber" ? `<h2 class="text-xl font-semibold mb-4" data-svelte-h="svelte-c9wdf0">Uber</h2> <div class="w-full max-w-md space-y-5"><div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Date`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: uberData.date
      },
      {
        value: ($$value) => {
          uberData.date = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Income`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: uberData.income },
      {
        value: ($$value) => {
          uberData.income = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Tips`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: uberData.tips },
      {
        value: ($$value) => {
          uberData.tips = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Expenses`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: uberData.expenses },
      {
        value: ($$value) => {
          uberData.expenses = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Hours Spent`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: uberData.hoursSpent
      },
      {
        value: ($$value) => {
          uberData.hoursSpent = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Withholdings`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: uberData.withholdings
      },
      {
        value: ($$value) => {
          uberData.withholdings = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Weekly Driving Schedule`;
      }
    })} ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        items: uberSchedule,
        class: "mt-1",
        value: uberData.schedule
      },
      {
        value: ($$value) => {
          uberData.schedule = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>` : `${$page.data.user?.platform == "rover" ? `<h2 class="text-xl font-semibold mb-4" data-svelte-h="svelte-6yhki0">Rover</h2> <div class="w-full max-w-md space-y-5"><div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Date`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: roverData.date
      },
      {
        value: ($$value) => {
          roverData.date = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Income`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: roverData.income },
      {
        value: ($$value) => {
          roverData.income = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Expenses`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: roverData.expenses },
      {
        value: ($$value) => {
          roverData.expenses = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Time Spent`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: roverData.timeSpent
      },
      {
        value: ($$value) => {
          roverData.timeSpent = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Tips`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: roverData.tips },
      {
        value: ($$value) => {
          roverData.tips = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Platform Cut`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: roverData.platfromCut
      },
      {
        value: ($$value) => {
          roverData.platfromCut = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Services Offered`;
      }
    })} ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        items: roverServices,
        class: "mt-1",
        value: roverData.services
      },
      {
        value: ($$value) => {
          roverData.services = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Time spent traveling to gig in minutes`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: roverData.travelTime
      },
      {
        value: ($$value) => {
          roverData.travelTime = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>` : `${$page.data.user?.platform == "upwork" ? `<h2 class="text-xl font-semibold mb-4" data-svelte-h="svelte-1p6v8s0">UpWork</h2> <div class="w-full max-w-md space-y-5"><div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Job Category`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: upworkData.jobCategory
      },
      {
        value: ($$value) => {
          upworkData.jobCategory = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Hourly Charge/ Fixed price`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: upworkData.hourlyCharge
      },
      {
        value: ($$value) => {
          upworkData.hourlyCharge = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Hours Per Week`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: upworkData.hoursPerWeek
      },
      {
        value: ($$value) => {
          upworkData.hoursPerWeek = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Client History`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: upworkData.clientHistory
      },
      {
        value: ($$value) => {
          upworkData.clientHistory = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Experience Level`;
      }
    })} ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        items: upworkExperience,
        class: "mt-1",
        value: upworkData.experience
      },
      {
        value: ($$value) => {
          upworkData.experience = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Job Duration`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: upworkData.jobDuration
      },
      {
        value: ($$value) => {
          upworkData.jobDuration = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Client Location`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: upworkData.clientLocation
      },
      {
        value: ($$value) => {
          upworkData.clientLocation = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>` : ``}`}`} <div class="flex justify-center mt-6"><button class="bg-black text-white py-2 px-4 rounded" data-svelte-h="svelte-1nz27rl">Submit</button></div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
