import {BaseData} from "./base-data";
import {JwtStorage} from "../api/jwt-auth/jwt-storage";

export class LogInData extends BaseData {
    userId: string
    refreshToken: string

    constructor(userId: string = "", refreshToken: string = "") {
        super();
        this.userId = userId
        this.refreshToken = refreshToken
    }
}

export const tokensStorer = (res: LogInData) => {
    const jwtStorage = new JwtStorage()
    jwtStorage.store(res.accessToken, res.refreshToken)
}

export const dropTokens = () => {
    JwtStorage.drop()
}
