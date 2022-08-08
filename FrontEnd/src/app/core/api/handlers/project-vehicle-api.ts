import {BaseAuthenticatedApi} from "./base/base-authenticated-api";
import {HttpClient} from "@angular/common/http";
import {JwtProvider} from "../jwt-auth/jwt-provider";
import {catchError, map, Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {ProjectVehicle} from "../../model/response-data/project-vehicle";
import {accessTokenRefresher, User} from "../../model/response-data/user";
import {BaseResponse} from "./user-api";


interface VehicleEnjoyerResponse extends BaseResponse {
    enjoyers: User[]
}

interface RemoveVehicleEnjoyerResponse extends BaseResponse {
    removed: string
}


/**
 * Class that handles communication with vehicle-related endpoints
 */
@Injectable({
    providedIn: 'root',
})
export class ProjectVehicleApi extends BaseAuthenticatedApi {
    public constructor(httpClient: HttpClient, accessTokenProvider: JwtProvider) {
        super(httpClient, accessTokenProvider);
    }

    public getVehicle(vehicleId: string) : Observable<ProjectVehicle> {
        const reqPath: string = `${this.baseUrl}/api/myVehicle/vehicleId`
        return this.httpClient
            .patch<ProjectVehicle>(reqPath, {
                vehicleId
            }, this.createRequestOptions())
            .pipe(catchError(this.handleError), tap(accessTokenRefresher));
    }

    public getVehicleOwner(vehicleId: string): Observable<User> {
        const reqPath: string = `${this.baseUrl}/api/myVehicle/vehicleId/owner`
        return this.httpClient
            .patch<User>(reqPath, {
                vehicleId
            }, this.createRequestOptions())
            .pipe(catchError(this.handleError), tap(accessTokenRefresher));
    }

    public getVehicleEnjoyers(vehicleId: string): Observable<User[]> {
        const reqPath: string = `${this.baseUrl}/api/myVehicle/vehicleId/enjoyers`
        return this.httpClient
            .patch<VehicleEnjoyerResponse>(reqPath, {
                vehicleId
            }, this.createRequestOptions())
            .pipe(
                catchError(this.handleError),
                tap(accessTokenRefresher),
                map<VehicleEnjoyerResponse, User[]>(res => {
                    return res.enjoyers
                })
            );
    }

    public removeVehicleEnjoyer(vehicleId: string, enjoyerId: string): Observable<void> {
        const queryParams: string = `action=remove`
        const reqPath: string = `${this.baseUrl}/api/myVehicle/vehicleId/enjoyers?${queryParams}`
        return this.httpClient
            .put<RemoveVehicleEnjoyerResponse>(reqPath, {
                vehicleId,
                enjoyerId
            }, this.createRequestOptions())
            .pipe(catchError(this.handleError), tap(accessTokenRefresher));
    }

    public addVehicleEnjoyer(vehicleId: string, enjoyerId: string, enjoyerName: string, enjoyerSurname: string)
        : Observable<void> {
        const queryParams: string = `action=add`
        const reqPath: string = `${this.baseUrl}/api/myVehicle/vehicleId/enjoyers?${queryParams}`
        return this.httpClient
            .put<void>(reqPath, {
                vehicleId,
                enjoyerId,
                enjoyerName,
                enjoyerSurname
            }, this.createRequestOptions())
            .pipe(catchError(this.handleError));
    }
}