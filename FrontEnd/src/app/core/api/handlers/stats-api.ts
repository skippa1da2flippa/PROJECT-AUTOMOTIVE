import {Injectable} from "@angular/core";
import {BaseAuthenticatedApi} from "./base/base-authenticated-api";
import {HttpClient} from "@angular/common/http";
import {JwtProvider} from "../jwt-auth/jwt-provider";
import {accessTokenRefresher, UserStats} from "../../model/response-data/user";
import {catchError, map, Observable, tap} from "rxjs";


interface ApiUserStats {
    stats: UserStats,
    accessToken: string
}

@Injectable({
    providedIn: 'root',
})

export class UserStatsApi extends BaseAuthenticatedApi {
    public constructor(httpClient: HttpClient, accessTokenProvider: JwtProvider) {
        super(httpClient, accessTokenProvider);
    }

    public getMyStats(): Observable<UserStats> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/stats`;

        return this.httpClient.get<UserStats>(reqPath, this.createRequestOptions()).pipe(
            catchError(this.handleError),
            tap(accessTokenRefresher),
            map<ApiUserStats, UserStats>((apiStats: ApiUserStats) => {
                return apiStats.stats
            })
        );
    }

    public updateMyStats(userId: string, statsUpdate: UserStats): Observable<void> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/stats`;

        return this.httpClient
            .put<void>(reqPath, statsUpdate, this.createRequestOptions())
            .pipe(catchError(this.handleError));
    }
}
