import {JwtStorage} from "../../api/jwt-auth/jwt-storage";
import {BaseData} from "./base-data";
import {BaseResponse} from "../../api/handlers/user-api";

export enum UserStatus {
    Offline = 'Offline',
    Online = 'Online',
    InTheCar = 'Swerving'
}

    export const accessTokenRefresher = (res: any) => {
    if ((res?.accessToken) && res.accessToken !== "") {
        const jwtStorage = new JwtStorage()
        jwtStorage.store(res.accessToken)
    }
}

export class User extends BaseData {
    public  userId: string
    public  email: string
    public  nickname: string
    public  name: string
    public surname: string
    public status?: UserStatus

    constructor(
        userId: string = "",
        email: string = "",
        nickname: string = "",
        name: string = "",
        surname: string = "",
        status: UserStatus = UserStatus.Online
    ) {
        super()
        this.userId = userId
        this.email = email
        this.nickname = nickname
        this.name = name
        this.surname = surname
        this.status = status
    }
}

export interface UserStats {
    sauce: number;
    trophies: number; // create a thropies collection representing what to do to win it and its rules, and its state for unlocking it
    //many others
}
