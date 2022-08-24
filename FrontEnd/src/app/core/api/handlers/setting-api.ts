import {BaseAuthenticatedApi} from "./base/base-authenticated-api";
import {HttpClient} from "@angular/common/http";
import {JwtProvider} from "../jwt-auth/jwt-provider";
import {Setting} from "../../model/response-data/setting-data";
import {catchError, map, Observable, tap} from "rxjs";
import {accessTokenRefresher} from "../../model/response-data/user";
import {BaseResponse} from "./user-api";

interface UserSettingResponse extends BaseResponse {
    setting: Setting
}

interface LanguageSettingResponse extends BaseResponse {
    language: string
}

interface ThemeSettingResponse extends BaseResponse {
    theme: string
}

interface GamificationSettingResponse extends BaseResponse {
    gamificationHide: boolean
}

export class UserSettingApi extends BaseAuthenticatedApi {
    public constructor(httpClient: HttpClient, accessTokenProvider: JwtProvider) {
        super(httpClient, accessTokenProvider);
    }

    public getMySetting(): Observable<Setting> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/setting`
        return this.httpClient.get<UserSettingResponse>(reqPath, this.createRequestOptions()).pipe(
            catchError(this.handleError),
            tap(accessTokenRefresher),
            map<UserSettingResponse, Setting>(res => {
                return res.setting
            })
        )
    }

    public getMyLanguageSetting(): Observable<string> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/setting/language`
        return this.httpClient.get<LanguageSettingResponse>(reqPath, this.createRequestOptions()).pipe(
            catchError(this.handleError),
            tap(accessTokenRefresher),
            map<LanguageSettingResponse, string>(res => {
                return res.language
            })
        )
    }

    public getMyThemeSetting(): Observable<string> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/setting/theme`
        return this.httpClient.get<ThemeSettingResponse>(reqPath, this.createRequestOptions()).pipe(
            catchError(this.handleError),
            tap(accessTokenRefresher),
            map<ThemeSettingResponse, string>(res => {
                return res.theme
            })
        )
    }

    public getMyGamificationSetting(): Observable<boolean> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/setting/gamification`
        return this.httpClient.get<GamificationSettingResponse>(reqPath, this.createRequestOptions()).pipe(
            catchError(this.handleError),
            tap(accessTokenRefresher),
            map<GamificationSettingResponse, boolean>(res => {
                return !res.gamificationHide
            })
        )
    }

    public updateLanguageSetting(newLanguage: string): Observable<void> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/setting/language`
        return this.httpClient.patch<void>(reqPath, {
            language: newLanguage
        },this.createRequestOptions()).pipe(
            catchError(this.handleError),
        )
    }

    public updateThemeSetting(newTheme: string): Observable<void> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/setting/theme`
        return this.httpClient.patch<void>(reqPath, {
            theme: newTheme
        },this.createRequestOptions()).pipe(
            catchError(this.handleError),
        )
    }

    public updateGamificationSetting(newSetting: boolean): Observable<void> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/setting/gamification`
        console.log("new Setting;" + newSetting)
        return this.httpClient.patch<void>(reqPath, {
            gamification: newSetting
        },this.createRequestOptions()).pipe(
            catchError(this.handleError)
        )
    }
}
