# datasharing

## Firebase authentication setup
Make sure you have .env file added to the root of the folder (under /datasharing) so that authentication is connected

## Developing

Installi dependencies with `npm install`, `npm i` (or `pnpm install` or `yarn`)

Install tailwind with `npm install -D tailwindcss postcss autoprefixer`

## Local dev

Finally, start a development server locally:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

You can preview the production build with `npm run preview`.

This authentication portion of this repo was created using a combination of [sveltekit-auth-firebase](https://github.com/JustinyAhin/okupter-repos/tree/5e9403e30a49ce5e314f311cffb057d922d2c737/apps/sveltekit-auth-firebase), [sveltekit-firebase-auth-example](https://github.com/eraygundogmus/sveltekit-firebase-auth-example), [svelte-examples](https://github.com/JavoByte/svelte-examples/tree/firebase-auth-ssr) for Admin server

A few other relevant repos: https://github.com/jthegedus/svelte-adapter-firebase, https://github.com/consultingninja/authTalk/tree/main, https://github.com/huntabyte/shadcn-svelte, https://github.com/partner0831/sveltekit-shadcn-auth

## Logging ✨✨✨
[Reasons to log](https://firebase.google.com/docs/hosting/web-request-logs-and-metrics?hl=en&authuser=0), if not only to debug

And [logger viewer](https://console.cloud.google.com/logs/query;query=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22ssrgigshare%22;) filtered by our project

To host and test, use 
```bash
npm exec firebase deploy
```
optionally preceded with `time` to see how long it takes to host

Hosting setup instructions can be found in src/lib/firebase/Firebase.md

## Todo 

- [ ] Debug login page with upload on deploy 

- [X] Fix auth so that login doesn't expire at each reload

- [X] Phone authentication

- [ ] Consider how to adapt for ios interface

- [ ] How to store different types of workers' data, across different apps and work types (what if someone used both Uber and Rover?)

- [ ] Tailwind

- [X] Demographic form - storing individual user backgrounds to database


## Outstanding questions 
-- Whether to have separate interfaces/apps for web and mobile
-- Whether to incorporate parts from existing webapp from UTAustin
