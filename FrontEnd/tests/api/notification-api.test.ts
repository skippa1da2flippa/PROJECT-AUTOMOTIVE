import {HttpClient} from "@angular/common/http";
import {AuthTestingSetupData, teardownDb, testSetup} from "./auth-api.test";
import {JwtProvider} from "../../src/app/core/api/jwt-auth/jwt-provider";
import {JwtStorage} from "../../src/app/core/api/jwt-auth/jwt-storage";
import {MongoDpApiCredentials} from "../fixtures/model/mongodb-api/mongodb-api";
import {NotificationApi} from "../../src/app/core/api/handlers/notification-api";
import {InsertedUser, insertUser} from "../fixtures/model/users";
import {Notification, NotTypes} from "../../src/app/core/model/response-data/notification-data"

let httpClient: HttpClient;
let setupData: AuthTestingSetupData;
let jwtProvider: JwtProvider;
let jwtStorer: JwtStorage
let credentials: MongoDpApiCredentials


export const getNotificationApi = (): NotificationApi => {
    return new NotificationApi (httpClient, jwtProvider);
};


describe('Get My Notification', () => {
    let notApi: NotificationApi
    beforeEach(async () => {
        await testSetup(httpClient, setupData, jwtProvider);
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        notApi = getNotificationApi();

        notApi.getMyNotifications().subscribe({
            next: (value: Notification[]) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(expect.any(Array<Notification>))
                value.forEach((val) => {
                    expect.objectContaining<Notification>({
                        type: expect.any(NotTypes),
                        sender: expect.any(String),
                    })
                })

            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        notApi = getNotificationApi();
        let email = 'AYO'
        jwtStorer.store("")
        notApi.getMyNotifications().subscribe({
            error: (err: Error) => {
                expect(err).toBeTruthy();

                done();
            },
            complete: () => {
                throw Error('Observable should not complete without throwing');
            },
        });
    });
});



describe('Add a Notification', () => {
    let notApi: NotificationApi
    let secondUser: InsertedUser
    beforeEach(async () => {
        secondUser = await insertUser()
        await testSetup(httpClient, setupData, jwtProvider);
    });

    afterEach(async () => {
        await teardownDb(setupData, secondUser);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        notApi = getNotificationApi();

        notApi.addNotification(secondUser.userId, NotTypes.placeHolder).subscribe({
            next: (value: Notification) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(
                    expect.objectContaining<Notification>({
                        type: expect.any(NotTypes),
                        sender: expect.any(String),
                    })
                )

            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        notApi = getNotificationApi();
        let email = 'AYO'
        jwtStorer.store("")
        notApi.getMyNotifications().subscribe({
            error: (err: Error) => {
                expect(err).toBeTruthy();

                done();
            },
            complete: () => {
                throw Error('Observable should not complete without throwing');
            },
        });
    });
});


describe('Remove a Notification', () => {
    let notApi: NotificationApi
    beforeEach(async () => {
        await testSetup(httpClient, setupData, jwtProvider);
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        notApi = getNotificationApi();

        notApi.removeNotification(NotTypes.placeHolder).subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        notApi = getNotificationApi();
        let email = 'AYO'
        jwtStorer.store("")
        notApi.getMyNotifications().subscribe({
            error: (err: Error) => {
                expect(err).toBeTruthy();

                done();
            },
            complete: () => {
                throw Error('Observable should not complete without throwing');
            },
        });
    });
});
