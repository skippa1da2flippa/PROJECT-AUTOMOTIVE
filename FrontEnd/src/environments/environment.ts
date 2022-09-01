// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,

    /**
     * Base url of the backend api
     */
    serverBaseUrl: 'http://localhost:4200',

    /**
     * Key by which the jwt-auth access token is stored in the browser local storage
     */
    localStorageAccessTokenKey: 'accessToken',

    /**
     * Key by which the jwt-auth refresh token is stored in the browser local storage
     */
    localStorageRefreshTokenKey: 'refreshToken',

    /**
     * Keys by which the EnjoyerMessage properties are stored in the browser local storage
     */

    localStorageEnjoyerName: 'enjoyerName',

    localStorageEnjoyerSurname: 'enjoyerSurname',

    localStorageVehicleModel: 'vehicleModel',

    localStorageVehicleId: 'vehicleId',

    localStorageEnjoyerId: 'enjoyerId',

    localStorageUsersData: 'usersData'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
