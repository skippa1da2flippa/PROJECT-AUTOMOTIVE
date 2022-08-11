import {HttpClient} from "@angular/common/http";
import {AuthTestingSetupData, teardownDb, testSetup} from "./auth-api.test";
import {JwtProvider} from "../../src/app/core/api/jwt-auth/jwt-provider";
import {JwtStorage} from "../../src/app/core/api/jwt-auth/jwt-storage";
import {MongoDpApiCredentials} from "../fixtures/model/mongodb-api/mongodb-api";
import {UserSettingApi} from "../../src/app/core/api/handlers/setting-api";
import {UserApi} from "../../src/app/core/api/handlers/user-api";
import {User, UserStatus} from "../../src/app/core/model/response-data/user";
import {getUserApi} from "./user-api.test";
import {Setting} from "../../src/app/core/model/response-data/setting-data";

let httpClient: HttpClient;
let setupData: AuthTestingSetupData;
let jwtProvider: JwtProvider;
let jwtStorer: JwtStorage
let credentials: MongoDpApiCredentials


export const getSettingApi = (): UserSettingApi => {
    return new UserSettingApi (httpClient, jwtProvider);
};


describe('Get My Setting', () => {
    let userApi: UserSettingApi
    beforeEach(async () => {
        await testSetup(httpClient, setupData, jwtProvider);
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getSettingApi();

        userApi.getMySetting().subscribe({
            next: (value: Setting) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(
                    expect.objectContaining<Setting>({
                        theme: expect.any(String),
                        language: expect.any(String),
                        gamificationHide: expect.any(Boolean),
                    })
                );
            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getSettingApi();
        let email = 'AYO'
        jwtStorer.store("")
        userApi.getMySetting().subscribe({
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


describe('Get My Language', () => {
    let userApi: UserSettingApi
    beforeEach(async () => {
        await testSetup(httpClient, setupData, jwtProvider);
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getSettingApi();

        userApi.getMyLanguageSetting().subscribe({
            next: (value: string) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getSettingApi();
        let email = 'AYO'
        jwtStorer.store("")
        userApi.getMyLanguageSetting().subscribe({
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


describe('Get My Theme', () => {
    let userApi: UserSettingApi
    beforeEach(async () => {
        await testSetup(httpClient, setupData, jwtProvider);
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getSettingApi();

        userApi.getMyThemeSetting().subscribe({
            next: (value: string) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getSettingApi();
        let email = 'AYO'
        jwtStorer.store("")
        userApi.getMyThemeSetting().subscribe({
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

describe('Get My gamification', () => {
    let userApi: UserSettingApi
    beforeEach(async () => {
        await testSetup(httpClient, setupData, jwtProvider);
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getSettingApi();

        userApi.getMyGamificationSetting().subscribe({
            next: (value: boolean) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getSettingApi();
        let email = 'AYO'
        jwtStorer.store("")
        userApi.getMyGamificationSetting().subscribe({
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

describe('Update My Language', () => {
    let userApi: UserSettingApi
    let lang: string
    beforeEach(async () => {
        await testSetup(httpClient, setupData, jwtProvider);
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getSettingApi();

        userApi.updateLanguageSetting("IT").subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getSettingApi();
        jwtStorer.store("")
        userApi.updateLanguageSetting("IT").subscribe({
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
        userApi = getSettingApi();
        userApi.updateLanguageSetting(lang).subscribe({
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

describe('Update My theme', () => {
    let userApi: UserSettingApi
    let theme: string
    beforeEach(async () => {
        await testSetup(httpClient, setupData, jwtProvider);
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getSettingApi();

        userApi.updateThemeSetting("black").subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getSettingApi();
        jwtStorer.store("")
        userApi.updateThemeSetting("black").subscribe({
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
        userApi = getSettingApi();
        userApi.updateThemeSetting(theme).subscribe({
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


describe('Update My gamification', () => {
    let userApi: UserSettingApi
    let res: boolean
    beforeEach(async () => {
        await testSetup(httpClient, setupData, jwtProvider);
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getSettingApi();

        userApi.updateGamificationSetting(false).subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getSettingApi();
        jwtStorer.store("")
        userApi.updateGamificationSetting(false).subscribe({
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
        userApi = getSettingApi();
        userApi.updateGamificationSetting(res).subscribe({
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
