import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class EnjoyerRequestStorage {
    constructor() {}

    /**
     * Stores the provided enjoyerRequest in the browser local storage.
     */
    public store(surname: string, name: string, enjoyerId: string, vehicleId: string, vehicleModel: string): void {
        localStorage.setItem(environment.localStorageEnjoyerName, name)
        localStorage.setItem(environment.localStorageEnjoyerSurname, surname)
        localStorage.setItem(environment.localStorageVehicleId, vehicleId)
        localStorage.setItem(environment.localStorageVehicleModel, vehicleModel)
        localStorage.setItem(environment.localStorageEnjoyerId, enjoyerId)
    }

    public static drop() {
        localStorage.clear()
    }
}
