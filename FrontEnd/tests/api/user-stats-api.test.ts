import {HttpClient} from "@angular/common/http";
import {AuthTestingSetupData, teardownDb, testSetup} from "./auth-api.test";
import {JwtProvider} from "../../src/app/core/api/jwt-auth/jwt-provider";
import {JwtStorage} from "../../src/app/core/api/jwt-auth/jwt-storage";
import {MongoDpApiCredentials} from "../fixtures/model/mongodb-api/mongodb-api";
import {UserStatsApi} from "../../src/app/core/api/handlers/stats-api";
import {UserApi} from "../../src/app/core/api/handlers/user-api";
import {User, UserStatus} from "../../src/app/core/model/response-data/user";
import {getUserApi} from "./user-api.test";
import {UserStats} from "../fixtures/model/users";

let httpClient: HttpClient;
let setupData: AuthTestingSetupData;
let jwtProvider: JwtProvider;
let jwtStorer: JwtStorage
let credentials: MongoDpApiCredentials

export const getUserStatsApi = (): UserStatsApi => {
    return new UserStatsApi (httpClient, jwtProvider);
};

describe('Get My stats', () => {
    let userApi: UserStatsApi
    beforeEach(async () => {
        await testSetup(httpClient, setupData, jwtProvider);
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getUserStatsApi();

        userApi.getMyStats().subscribe({
            next: (value: UserStats) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(
                    expect.objectContaining<UserStats>({
                        sauce: expect.any(Number),
                        trophies: expect.any(Number)
                    })
                );
            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getUserStatsApi();
        jwtStorer.store("")
        userApi.getMyStats().subscribe({
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


describe('Update My stats', () => {
    let userApi: UserStatsApi
    let fakeStats: UserStats
    beforeEach(async () => {
        await testSetup(httpClient, setupData, jwtProvider);
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getUserStatsApi();

        userApi.updateMyStats({
            sauce: 0,
            trophies: 0
        }).subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getUserStatsApi();
        jwtStorer.store("")
        userApi.updateMyStats({
            sauce: 0,
            trophies: 0
        }).subscribe({
            error: (err: Error) => {
                expect(err).toBeTruthy();

                done();
            },
            complete: () => {
                throw Error('Observable should not complete without throwing');
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getUserStatsApi();
        jwtStorer.store("")
        userApi.updateMyStats(fakeStats).subscribe({
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