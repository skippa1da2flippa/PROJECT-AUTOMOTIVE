import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {EnjoyerMessage} from "../../model/events-data/enjoyer-message";

@Injectable({
    providedIn: 'root',
})
export class EnjoyerRequestStorage {
    constructor() {}

    /**
     * Stores the provided enjoyerRequest in the browser local storage.
     */
    public store(enjoyerSurname: string, enjoyerName: string, enjoyerId: string, vehicleId: string, vehicleModel: string): void {
        localStorage.setItem(environment.localStorageEnjoyerName, enjoyerName)
        localStorage.setItem(environment.localStorageEnjoyerSurname, enjoyerSurname)
        localStorage.setItem(environment.localStorageVehicleId, vehicleId)
        localStorage.setItem(environment.localStorageVehicleModel, vehicleModel)
        localStorage.setItem(environment.localStorageEnjoyerId, enjoyerId)
    }

    public static drop() {
        localStorage.removeItem(environment.localStorageEnjoyerName)
        localStorage.removeItem(environment.localStorageEnjoyerSurname)
        localStorage.removeItem(environment.localStorageVehicleId)
        localStorage.removeItem(environment.localStorageVehicleModel)
        localStorage.removeItem(environment.localStorageEnjoyerId)
    }
}
