import {BaseAuthenticatedApi} from "./base/base-authenticated-api";
import {HttpClient} from "@angular/common/http";
import {JwtProvider} from "../jwt-auth/jwt-provider";
import {accessTokenRefresher, UserStats} from "../../model/response-data/user";
import {catchError, map, Observable, tap} from "rxjs";
import {Routine} from "../../model/response-data/routine-data";
import {BaseResponse} from "./user-api";
import {Injectable} from "@angular/core";

interface UserSingleRoutineResponse extends BaseResponse {
    routine: Routine
}

interface UserRoutinesResponse extends BaseResponse{
    routines: Routine[]
}

@Injectable({
    providedIn: 'root',
})
export class UserRoutineApi extends BaseAuthenticatedApi {
    public constructor(httpClient: HttpClient, accessTokenProvider: JwtProvider) {
        super(httpClient, accessTokenProvider);
    }

    public getMyRoutines(): Observable<Routine[]>{
        const reqPath: string = `${this.baseUrl}/api/users/@meh/routines`;
        return this.httpClient.get<UserRoutinesResponse>(reqPath, this.createRequestOptions()).pipe(
            catchError(this.handleError),
            tap(accessTokenRefresher),
            map<UserRoutinesResponse, Routine[]>(res => {
                return res.routines
            })
        );
    }

    public getMyRoutine(routineName: string): Observable<Routine> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/routines/${routineName}`;
        return this.httpClient.get<UserSingleRoutineResponse>(reqPath, this.createRequestOptions()).pipe(
            catchError(this.handleError),
            tap(accessTokenRefresher),
            map<UserSingleRoutineResponse, Routine>(res => {
                return res.routine
            })
        );
    }

    public addRoutine(routineData: Routine): Observable<void> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/routines`;
        return this.httpClient.post<void>(reqPath, {
            name: routineData.name,
            temperature: routineData.temperature,
            lightsColor: routineData.lightsColor,
            music: routineData.music,
            path: routineData.path
        },this.createRequestOptions()).pipe(
            catchError(this.handleError),
        );
    }

    public deleteRoutine(routineName: string): Observable<void> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/routines/${routineName}`;
        return this.httpClient.delete<void>(reqPath, this.createRequestOptions()).pipe(
            catchError(this.handleError),
        );
    }

    public updateRoutine(
        routineName: string,
        temperature: number,
        lights: string,
        musicToAdd: string[] = [],
        musicToRemove: string[] = [],
        newName?: string
    ): Observable<void>{
        const reqPath: string = `${this.baseUrl}/api/users/@meh/routines/${routineName}`;
        return this.httpClient.put<void>(reqPath, {
            temperature,
            lights,
            musicToAdd,
            musicToRemove,
            newName
        }, this.createRequestOptions()).pipe(
            catchError(this.handleError),
        );
    }
}
