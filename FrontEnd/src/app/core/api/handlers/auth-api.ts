import {BaseAuthenticatedApi} from "./base/base-authenticated-api";
import {HttpClient} from "@angular/common/http";
import {JwtProvider} from "../jwt-auth/jwt-provider";
import {Injectable} from "@angular/core";
import {catchError, Observable, tap} from "rxjs";
import {dropTokens, LogInData, tokensStorer} from "../../model/response-data/auth-data";
import {User} from "../../model/response-data/user";

/**
 * Class that handles communication with auth-related endpoints
 */
@Injectable({
    providedIn: 'root',
})
export class AuthenticationApi extends BaseAuthenticatedApi {
    public constructor(httpClient: HttpClient, accessTokenProvider: JwtProvider) {
        super(httpClient, accessTokenProvider);
    }

    public logIn(email: string, password: string): Observable<LogInData> {
        const reqPath: string = `${this.baseUrl}/api/auth/signin`
        return this.httpClient.post<LogInData>(reqPath, {
            email,
            password
        })
        .pipe(catchError(this.handleError), tap(tokensStorer));
    }

    public signUp(name: string, surname: string, email: string, password: string, nickName?: string) {
        const reqPath: string = `${this.baseUrl}/api/auth/signup`
        return this.httpClient
            .post<User>(reqPath, {
                name,
                surname,
                nickName,
                email,
                password
            })
            .pipe(catchError(this.handleError));
    }

    public logOut() {
        const reqPath: string = `${this.baseUrl}/api/auth/signout`
        return this.httpClient
            .get<void>(reqPath, this.createRequestOptions())
            .pipe(catchError(this.handleError), tap(dropTokens));
    }
}
