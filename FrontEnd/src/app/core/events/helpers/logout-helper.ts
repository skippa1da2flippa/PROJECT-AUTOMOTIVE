import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { JwtStorage } from '../../api/jwt-auth/jwt-storage';
import {AuthenticationApi} from "../../api/handlers/auth-api";

/**
 * Class that helps to handle the logout procedure.
 */
@Injectable({
    providedIn: 'root',
})
export class LogoutHelper {
    constructor(
        private accessTokenStorage: JwtStorage,
        private authApi: AuthenticationApi,
        private router: Router
    ) {}

    public async logout(): Promise<void> {
        // Teardown all the match-join related listeners
        // Such listeners were set up right after the login

        // Call the logout endpoint
        this.authApi.logOut().subscribe({
            complete: async () => {
                // Invalidate the previous token in the storage
                this.accessTokenStorage.store('');

                // Finally, after logging out, redirect to the login screen
                await this.redirectToLoginScreen();
            },
        });
    }

    private async redirectToLoginScreen() {
        await this.router.navigate(['/authentication/login']);
    }
}
