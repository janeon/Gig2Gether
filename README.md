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

This authentication portion of this repo was created using a combination of [sveltekit-auth-firebase](https://github.com/JustinyAhin/okupter-repos/tree/5e9403e30a49ce5e314f311cffb057d922d2c737/apps/sveltekit-auth-firebase) and [sveltekit-firebase-auth-example](https://github.com/eraygundogmus/sveltekit-firebase-auth-example)


## Hosting
(The following steps will require that you have nvm installed)

Make sure your CLI has firebase installed, if not run 

```bash
npm install -g firebase-tools
```

To initialize hosting, may need to use local instead of global binary
```bash
npm exec firebase init hosting
```


Sign in to firebase via the cli, and the following project id 'robert-kraut-1234' should become available

```bash
npm exec firebase projects:list
``` 

If so, add it as the active project via

```bash
npm exec firebase use --add
```

Next, target gigshare as hosting target

```bash
npm exec firebase target:apply hosting datasharing gigshare
```

Deploy to domain using
```bash
npm exec  firebase deploy
```

And see it live at [gigshare.web.app](https://gigshare.web.app/)


## Todo 

- [ ] Fix auth so that login doesn't expire at each reload

- [ ] How to store different types of workers' data, across different apps and work types (what if someone used both Uber and Rover?)

- [ ] Tailwind

- [X] Demographic form - storing individual user backgrounds to database

- [ ] Consider how to adapt for ios interface

## Outstanding questions 
-- Whether to have separate interfaces/apps for web and mobile
-- Whether to incorporate parts from existing webapp from UTAustin
