import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";

import {EnjoyerMessage} from "../../model/events-data/enjoyer-message";


@Injectable({
    providedIn: 'root',
})

export class EnjoyerRequestDataProvider {
    constructor() {}

    /**
     * Retrieves the token used to authenticate requests to the backend.
     * Such token should be stored in the local storage.
     * If the token is not set, an error is thrown.
     * @returns jwt-auth token
     * @throws Error if the token has not yet been set
     */
    public getEnjoyerRequestData(): EnjoyerMessage {
        const enjoyerId: string = localStorage.getItem(environment.localStorageEnjoyerId) || ""
        const enjoyerName: string = localStorage.getItem(environment.localStorageEnjoyerName) || ""
        const enjoyerSurname: string = localStorage.getItem(environment.localStorageEnjoyerSurname) || ""
        const vehicleId: string = localStorage.getItem(environment.localStorageVehicleId) || ""
        const vehicleModel: string = localStorage.getItem(environment.localStorageVehicleModel) || ""

        return {
            enjoyerId,
            enjoyerName,
            enjoyerSurname,
            vehicleId,
            vehicleModel
        }
    }
}
