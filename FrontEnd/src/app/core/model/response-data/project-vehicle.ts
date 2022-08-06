import {User} from "./user";
import {BaseData} from "./base-data"

export enum VehicleStatus {
    Offline = 'Offline',
    Online = 'Online'
}

export interface LegalInfos {
    // TODO
}

export enum ModelTypes {
    projectZ = 'projectZ'
    // cars names
}

export class ProjectVehicle extends BaseData {
    public readonly vehicleId: string
    public readonly owner: User
    public readonly status: VehicleStatus
    public readonly enjoyers: User[]
    public readonly type: ModelTypes
    public readonly legalInfos: LegalInfos

    constructor(
        vehicleId: string = "",
        owner: User = new User(),
        status: VehicleStatus = VehicleStatus.Offline,
        enjoyers: User[] = [],
        type: ModelTypes = ModelTypes.projectZ,
        legalInfos: LegalInfos = {}
    ) {
       super();
       this.vehicleId = vehicleId
       this.owner = owner
       this.status = status
       this.enjoyers = enjoyers
       this.type = type
       this.legalInfos = legalInfos
    }
}


