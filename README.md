# datasharing

## Firebase authentication setup
Make sure you have .env file added to the root of the folder (under /datasharing) so that authentication is connected

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```


## Building

To create a production version of your app:

```
npm run build
```

You can preview the production build with `npm run preview`.

This authentication portion of this repo was created using a combination of [sveltekit-auth-firebase](https://github.com/JustinyAhin/okupter-repos/tree/5e9403e30a49ce5e314f311cffb057d922d2c737/apps/sveltekit-auth-firebase) and [sveltekit-firebase-auth-example](https://github.com/eraygundogmus/sveltekit-firebase-auth-example)


## Todo 

[ ] Demographic form - storing individual user backgrounds to database
[ ] Tailwind 
[ ] Fixing routing on ios for login


## Outstanding questions 
-- Whether to have separate interfaces/apps for web and mobile
-- Whether to incorporate parts from existing webapp from UTAustin
