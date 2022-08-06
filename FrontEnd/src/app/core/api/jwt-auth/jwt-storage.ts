import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class JwtStorage {
    constructor() {}

    /**
     * Stores the provided tokens in the browser local storage.
     */
    public store(accessToken: string, refreshToken?: string): void {
        localStorage.setItem(environment.localStorageAccessTokenKey, accessToken);
        if (refreshToken) localStorage.setItem(environment.localStorageRefreshTokenKey, refreshToken);
    }

    public static drop() {
        localStorage.clear()
    }
}
