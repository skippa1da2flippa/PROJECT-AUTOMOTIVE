import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';


export interface jwtCollector {
    accessToken: string
    refreshToken: string
}

@Injectable({
    providedIn: 'root',
})

export class JwtProvider {
    constructor() {}

    /**
     * Retrieves the token used to authenticate requests to the backend.
     * Such token should be stored in the local storage.
     * If the token is not set, an error is thrown.
     * @returns jwt-auth token
     * @throws Error if the token has not yet been set
     */
    public getTokens(): jwtCollector {
        const accessToken: string = localStorage.getItem(environment.localStorageAccessTokenKey) || "";
        const refreshToken: string = localStorage.getItem(environment.localStorageRefreshTokenKey) || "";

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    }
}
