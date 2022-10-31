# Getting Started with Vite

Then, run the following command (changing `MyApp` to the name of your app):

```
You can either clone the project to get started or use: https://github.com/Rich-Harris/degit
```

Then run to get the project running:

```
yarn dev
```

################################################################
HEROKU SETUP
################################################################
1) Setup buildpack for vite
    run `heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-nginx.git`

2) make sure `static.json` file exists