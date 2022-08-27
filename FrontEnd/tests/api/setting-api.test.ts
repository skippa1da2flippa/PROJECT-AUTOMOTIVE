import {HttpClient} from "@angular/common/http";
import {AuthTestingSetupData, preSetUp, teardownDb, testSetup} from "./auth-api.test";
import {JwtProvider} from "../../src/app/core/api/jwt-auth/jwt-provider";
import {JwtStorage} from "../../src/app/core/api/jwt-auth/jwt-storage";
import {MongoDpApiCredentials} from "../fixtures/model/mongodb-api/mongodb-api";
import {UserSettingApi} from "../../src/app/core/api/handlers/setting-api";
import {Setting} from "../../src/app/core/model/response-data/setting-data";
import {JwtStubProvider} from "../fixtures/model/token";

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
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
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
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
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
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
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
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
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
        userApi = getSettingApi();

        userApi.updateLanguageSetting("IT").subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getSettingApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
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
        userApi = getSettingApi();

        userApi.updateThemeSetting("black").subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getSettingApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
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
        userApi = getSettingApi();
        let bol = false
        userApi.updateGamificationSetting(bol).subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getSettingApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
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
