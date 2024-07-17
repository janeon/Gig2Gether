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
npm exec firebase deploy
```

And see it live at [gigshare.web.app](https://gigshare.web.app/)

To see how long it takes, optionally use

```bash
time npm exec firebase deploy
```