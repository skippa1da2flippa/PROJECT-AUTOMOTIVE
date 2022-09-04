import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";


@Injectable({
    providedIn: 'root',
})

export class UsersInfoProvider {
    constructor() {}

    /**
     * Retrieves the token used to authenticate requests to the backend.
     * Such token should be stored in the local storage.
     * If the token is not set, an error is thrown.
     * @returns jwt-auth token
     * @throws Error if the token has not yet been set
     */
    public getUsersInfo(): string {
        return localStorage.getItem(environment.localStorageUsersData) || ""
    }
}
