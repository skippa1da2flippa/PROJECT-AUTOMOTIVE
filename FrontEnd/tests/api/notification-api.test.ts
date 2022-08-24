import {HttpClient} from "@angular/common/http";
import {AuthTestingSetupData, preSetUp, teardownDb, testSetup} from "./auth-api.test";
import {JwtProvider} from "../../src/app/core/api/jwt-auth/jwt-provider";
import {JwtStorage} from "../../src/app/core/api/jwt-auth/jwt-storage";
import {MongoDpApiCredentials} from "../fixtures/model/mongodb-api/mongodb-api";
import {NotificationApi} from "../../src/app/core/api/handlers/notification-api";
import {InsertedUser, insertUser} from "../fixtures/model/users";
import {Notification, NotTypes} from "../../src/app/core/model/response-data/notification-data"
import {JwtStubProvider} from "../fixtures/model/token";
import {Types} from "mongoose";

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
    let jwtStubProvider: JwtStubProvider
    beforeEach(async () => {
        setupData = await preSetUp()
        jwtStubProvider = new JwtStubProvider()
        httpClient = await testSetup(setupData, jwtStubProvider);
        jwtProvider = jwtStubProvider.getJwtProviderStub()
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
        jwtStorer = jwtStubProvider.getJwtStorageStub()
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
    let jwtStubProvider: JwtStubProvider
    beforeEach(async () => {
        setupData = await preSetUp()
        jwtStubProvider = new JwtStubProvider()
        httpClient = await testSetup(setupData, jwtStubProvider);
        jwtProvider = jwtStubProvider.getJwtProviderStub()
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        notApi = getNotificationApi();

        notApi.addNotification(setupData.insertedData.user.userId, NotTypes.carOccupied).subscribe({
            next: (value: Notification) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(
                    expect.objectContaining<Notification>({
                        type: expect.any(String),
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
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("")
        notApi.addNotification("", NotTypes.placeHolder).subscribe({
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
    let jwtStubProvider: JwtStubProvider
    beforeEach(async () => {
        setupData = await preSetUp()
        jwtStubProvider = new JwtStubProvider()
        httpClient = await testSetup(setupData, jwtStubProvider);
        jwtProvider = jwtStubProvider.getJwtProviderStub()
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        notApi = getNotificationApi();

        notApi.removeNotification(NotTypes.carOccupied).subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        notApi = getNotificationApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
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
