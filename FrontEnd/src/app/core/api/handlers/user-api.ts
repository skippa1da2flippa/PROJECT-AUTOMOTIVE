import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {JwtProvider} from "../jwt-auth/jwt-provider";
import {BaseAuthenticatedApi} from "./base/base-authenticated-api";
import {catchError, map, Observable, tap} from "rxjs";
import {accessTokenRefresher, User} from "../../model/response-data/user";
import {ProjectVehicle} from "../../model/response-data/project-vehicle";


export interface BaseResponse {
    accessToken: string
}

export interface BaseVehicleResponse extends BaseResponse {
    userId: string
}

export interface UserVehicleResponse extends BaseVehicleResponse {
    myVehicles: ProjectVehicle[]
}

export interface UserEnjoyedVehicleResponse extends BaseVehicleResponse {
    enjoyedVehicles: ProjectVehicle[]
}

export interface FriendsResponse extends BaseResponse {
    friends: User[]
}

interface UpdateNickNameResponse extends BaseResponse {
    nickname: string
}

interface UpdateEmailResponse extends BaseResponse {
    email: string
}

interface RemoveEnjoyerResponse extends BaseResponse {
    removed: string
}

/**
 * Class that handles communication with user-related endpoints
 */
@Injectable({
    providedIn: 'root',
})
export class UserApi extends BaseAuthenticatedApi {
    public constructor(httpClient: HttpClient, accessTokenProvider: JwtProvider) {
        super(httpClient, accessTokenProvider);
    }

    public getMeh(): Observable<User> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh`;
        return this.httpClient
            .get<User>(reqPath, this.createRequestOptions())
            .pipe(catchError(this.handleError), tap(accessTokenRefresher));
    }

    public getFriends(): Observable<User[]> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/friends`;
        return this.httpClient
            .get<FriendsResponse>(reqPath, this.createRequestOptions())
            .pipe(
                catchError(this.handleError),
                tap(accessTokenRefresher),
                map<FriendsResponse, User[]>((res) => {
                    return res.friends
                })
            );
    }

    public getOneFriend(friendId: string): Observable<User> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/friends/friendId`;
        return this.httpClient
            .patch<User>(reqPath, {
                friendId
            },this.createRequestOptions())
            .pipe(
                catchError(this.handleError),
                tap(accessTokenRefresher)
            );
    }

    public getMyVehicles(): Observable<ProjectVehicle[]> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/myVehicles`;
        return this.httpClient
            .get<UserVehicleResponse>(reqPath, this.createRequestOptions())
            .pipe(
                catchError(this.handleError),
                tap(accessTokenRefresher),
                map<UserVehicleResponse, ProjectVehicle[]>(res => {
                    return res.myVehicles
                })
            );
    }

    public getEnjoyedVehicles(): Observable<ProjectVehicle[]> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/enjoyedVehicles`;
        return this.httpClient
            .get<UserEnjoyedVehicleResponse>(reqPath, this.createRequestOptions())
            .pipe(
                catchError(this.handleError),
                tap(accessTokenRefresher),
                map<UserEnjoyedVehicleResponse, ProjectVehicle[]>(res => {
                    return res.enjoyedVehicles
                })
            );
    }

    public deleteMeh(): Observable<void> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh`;
        return this.httpClient
            .delete<void>(reqPath, this.createRequestOptions())
            .pipe(catchError(this.handleError));
    }

    public updateNickName(newNickName: string): Observable<string>{
        const reqPath: string = `${this.baseUrl}/api/users/@meh/nickname`
        return this.httpClient
            .patch<UpdateNickNameResponse>(reqPath, {
                nickname: newNickName
            }, this.createRequestOptions())
            .pipe(
                catchError(this.handleError),
                tap(accessTokenRefresher),
                map<UpdateNickNameResponse, string>(res => {
                    return res.nickname
                })
            );
    }

    public updatePassword(newPsw: string): Observable<void>{
        const reqPath: string = `${this.baseUrl}/api/users/@meh/password`
        return this.httpClient
            .patch<void>(reqPath, {
                password: newPsw
            }, this.createRequestOptions())
            .pipe(catchError(this.handleError));
    }

    public updateEmail(newEmail: string): Observable<string>{
        const reqPath: string = `${this.baseUrl}/api/users/@meh/email`
        return this.httpClient
            .patch<UpdateEmailResponse>(reqPath, {
                email: newEmail
            }, this.createRequestOptions())
            .pipe(
                catchError(this.handleError),
                tap(accessTokenRefresher),
                map<UpdateEmailResponse, string>(res => {
                    return res.email
                })
            );
    }

    public removeMehFromEnjoyers(vehicleId: string): Observable<string> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/enjoyedVehicles/remove`
        return this.httpClient
            .patch<RemoveEnjoyerResponse>(reqPath, {
                enjoyedVehicle: vehicleId
            }, this.createRequestOptions())
            .pipe(
                catchError(this.handleError),
                tap(accessTokenRefresher),
                map<RemoveEnjoyerResponse, string>(res => {
                    return res.removed
                })
            );
    }
}
