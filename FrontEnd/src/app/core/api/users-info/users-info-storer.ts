import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class UserInfoStorage {
    constructor() {}

    /**
     * Stores the provided UsersInfo in the browser local storage.
     */
    public store(vehicleId: string): void {
        localStorage.setItem(environment.localStorageUsersData, vehicleId)
    }

    public static drop() {
        localStorage.removeItem(environment.localStorageUsersData)
    }
}
