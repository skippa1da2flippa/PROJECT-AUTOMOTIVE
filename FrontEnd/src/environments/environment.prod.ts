export const environment = {
    production: true,
    /**
     * Base url of the backend api
     */
    serverBaseUrl: 'http://localhost:4200',

    /**
     * Key by which the jwt-auth token is stored in the browser local storage
     */
    localStorageAccessTokenKey: 'accessToken',

    /**
     * Key by which the jwt-auth token is stored in the browser local storage
     */
    localStorageRefreshTokenKey: 'refreshToken',

    /**
     * Key by which the userId stored in the browser local storage
     */
    localStorageUserIdKey: 'userId',
};
