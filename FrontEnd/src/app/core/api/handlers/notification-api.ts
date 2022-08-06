import {Notification, NotTypes} from '../../model/response-data/notification-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, catchError, map, tap} from 'rxjs';

import { BaseAuthenticatedApi } from './base/base-authenticated-api';
import { JwtProvider } from '../jwt-auth/jwt-provider';
import {accessTokenRefresher} from "../../model/response-data/user";

interface GetNotificationsResponse {
    accessToken: string
    notifications: Notification[];
}

/**
 * Class that handles communication with notification-related endpoints
 */
@Injectable({
    providedIn: 'root',
})
export class NotificationApi extends BaseAuthenticatedApi {
    public constructor(httpClient: HttpClient, accessTokenProvider: JwtProvider) {
        super(httpClient, accessTokenProvider);
    }

    public getMyNotifications(): Observable<Notification[]> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/notifications`;

        return this.httpClient
            .get<GetNotificationsResponse>(reqPath, this.createRequestOptions())
            .pipe(
                catchError(this.handleError),
                tap(accessTokenRefresher),
                map<GetNotificationsResponse, Notification[]>((res: GetNotificationsResponse) => {
                    return res.notifications;
                })
            );
    }

    public addNotification(
        receiverId: string,
        notType: NotTypes
    ): Observable<Notification> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/notifications`;

        return this.httpClient
            .post<Notification>(reqPath, {
                receiver: receiverId,
                type: notType
            }, this.createRequestOptions())
            .pipe(catchError(this.handleError), tap(accessTokenRefresher));
    }

    public removeNotification(notType: NotTypes): Observable<void> {
        const reqPath: string = `${this.baseUrl}/api/users/@meh/notifications?${notType}`;

        return this.httpClient
            .delete<void>(reqPath, this.createRequestOptions())
            .pipe(catchError(this.handleError));
    }
}
