# datasharing

## Firebase authentication setup
Make sure you have .env file added to the root of the folder (under /datasharing) so that authentication is connected

## Developing

Installi dependencies with `npm install`, `npm i` (or `pnpm install` or `yarn`)

Install tailwind with `npm install -D tailwindcss postcss autoprefixer`


## Building

To create build assets:

```
npm run build
```

Finally, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```



You can preview the production build with `npm run preview`.

This authentication portion of this repo was created using a combination of [sveltekit-auth-firebase](https://github.com/JustinyAhin/okupter-repos/tree/5e9403e30a49ce5e314f311cffb057d922d2c737/apps/sveltekit-auth-firebase) and [sveltekit-firebase-auth-example](https://github.com/eraygundogmus/sveltekit-firebase-auth-example)


## Hosting
(The following steps will require that you have nvm installed)

Make sure your CLI has firebase installed, if not run 
`npm install -g firebase-tools`

Deploy to domain using
`firebase deploy --only hosting`


## Todo 

- [ ] Demographic form - storing individual user backgrounds to database

- [ ] Tailwind 

- [ ] Consider how to adapt for ios interface


## Outstanding questions 
-- Whether to have separate interfaces/apps for web and mobile
-- Whether to incorporate parts from existing webapp from UTAustin
