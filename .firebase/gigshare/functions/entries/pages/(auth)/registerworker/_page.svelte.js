import { c as create_ssr_component } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` ${$$result.head += `<!-- HEAD_svelte-8m9rpa_START -->${$$result.title = `<title>Register as a Worker</title>`, ""}<!-- HEAD_svelte-8m9rpa_END -->`, ""} <div class="flex content-evenly justify-center flex-row" data-svelte-h="svelte-hqwmjd"><form class="flex flex-col gap-4 p-8 space-y-4 bg-white" action="?/register" method="POST"><input type="email" placeholder="Email" id="email" name="email" class="px-4 py-2 border border-gray-300 rounded-md" required> <input type="password" id="password" name="password" placeholder="Password" class="px-4 py-2 border border-gray-300 rounded-md" required> <div class="flex flex-row space-x-2"><input id="rover" name="platform" type="radio" value="rover" required> <label for="rover">Rover</label><br> <input id="uber" name="platform" type="radio" value="uber" required> <label for="uber">Uber</label><br> <input id="upwork" name="platform" type="radio" value="upwork" required> <label for="upwork">UpWork</label><br></div> <button type="submit" class="default-action">Register</button> </form></div>`;
});
export {
  Page as default
};
