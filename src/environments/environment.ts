// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDwfyjc2Z-vfhjCeqyIcuPhDQ0olKaxFoM',
    authDomain: 'pushserver-3fdce.firebaseapp.com',
    databaseURL: 'https://pushserver-3fdce.firebaseio.com',
    storageBucket: 'pushserver-3fdce.appspot.com',
    projectId: 'pushserver-3fdce' // <--- make sure project ID is here
  }
};
