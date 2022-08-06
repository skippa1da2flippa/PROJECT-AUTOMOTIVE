/**
 * Enumeration that defines all the possible notification model receivable by a user
 */
import {BaseData} from "./base-data";

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
        this.type = type
        this.sender = sender
    }
}
