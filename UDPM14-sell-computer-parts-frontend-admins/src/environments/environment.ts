// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const BASE_API = 'http://localhost:4200';
export const environment = {
  production: false,
  categoryApi: `${BASE_API}/categories`,
  GOOGLE_CLIENT_ID: "879888154859-hq0sasrjdnj9220uleton2ifluv7qtd0.apps.googleusercontent.com",
  firebase: {
    apiKey: 'AIzaSyCUdof8BHr8LfDIZIYDCvDv1e8mjmIpgGY',
    authDomain: 'my-app-7bb3f.firebaseapp.com',
    projectId: 'my-app-7bb3f',
    storageBucket: 'my-app-7bb3f.appspot.com',
    messagingSenderId: '927914054611',
    appId: '1:927914054611:web:910cce751ca44b58d05526',
    measurementId: 'G-6QP8PCWKHV',

  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
