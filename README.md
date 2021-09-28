# Getting Started with Create React App

This project was bootstrapped with [Create React App + Typescript](https://github.com/facebook/create-react-app).

## Installation
First, add the following to your `.npmrc` file to allow npm to use the Codehesion package repo (more info on the `.npmrc` file can be found [here](https://docs.npmjs.com/files/npmrc)):
```
@codehesionza:registry=https://gitlab.com/api/v4/packages/npm/
```

For ease of use, you can run the following:
```
touch ~/.npmrc
echo "@codehesionza:registry=https://gitlab.com/api/v4/packages/npm/" >> ~/.npmrc
```

Then, run the following command (changing `MyApp` to the name of your app):
```
npx create-react-app MyApp --template @codehesionza/cra-template-codehesion
```
