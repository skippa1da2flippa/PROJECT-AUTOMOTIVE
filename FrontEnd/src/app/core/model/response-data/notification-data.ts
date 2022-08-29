/**
 * Enumeration that defines all the possible notification model receivable by a user
 */
import {BaseData} from "./base-data";
import {ErrorHandler} from "../errors/error-handler";
import {Router} from "@angular/router";
import {UserApi} from "../../api/handlers/user-api";
import {User} from "./user";

export interface WholeNotificationData {
    id: string
    name: string
    surname: string
    type: NotTypes
}

export enum NotTypes {
    carOccupied = 'carOccupied',
    destReached = 'destReached', // pop up not a real not
    fuelAlmostOut = 'fuelAlmostOut', // pop up not a real not
    friendRequest = 'friendRequest',
    placeHolder = 'placeHolder'
}

export class Notification extends BaseData {
    type: NotTypes
    sender: string

    constructor (type: NotTypes = NotTypes.placeHolder, sender: string = "") {
        super()
        this.type = type
        this.sender = sender
    }
}

export class InteractiveNotification extends ErrorHandler {

    private userApi: UserApi

    constructor(userApi: UserApi, router: Router) {
        super(router);
        this.userApi = userApi
    }

    public getWholeNotification(type: NotTypes, sender: string, human: boolean = true): WholeNotificationData {
        let not: WholeNotificationData = {
            id: sender,
            name: "",
            surname: "",
            type: type
        }

        if (human) {
            this.userApi.getOneUser(sender).subscribe({
                next: (data: User) => {
                    not.name = data.name
                    not.surname = data.surname
                }
            })
        }

        return not
    }
}
