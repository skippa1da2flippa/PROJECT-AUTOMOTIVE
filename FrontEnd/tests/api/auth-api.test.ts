import {deleteUser, getUserData, InsertedUser, insertUser} from "../fixtures/model/users";
import {injectHttpClient} from "../fixtures/model/mongodb-api/mongodb-api";
import {HttpClient} from "@angular/common/http";
import {JwtProvider} from "../../src/app/core/api/jwt-auth/jwt-provider";
import axios from "axios";
import {environment} from "../../src/environments/environment";
import {JwtStorage} from "../../src/app/core/api/jwt-auth/jwt-storage";
import {AuthenticationApi} from "../../src/app/core/api/handlers/auth-api";
import {LogInData} from "../../src/app/core/model/response-data/auth-data";
import {User, UserStatus} from "../../src/app/core/model/response-data/user"
import {JwtStubProvider} from "../fixtures/model/token";

export interface AuthTestingSetupData {
    insertedData: {
        user: InsertedUser;
    };
}

/**
 * Insert a user in the db, which will be used to authenticate with the api
 */
const setupDb = async (friendId?: string): Promise<AuthTestingSetupData> => {
    const userData = ! friendId
                     ? getUserData()
                     : getUserData([], UserStatus.Online, friendId)

    const insertedUser: InsertedUser = await insertUser(userData);

    return {
        insertedData: {
            user: insertedUser,
        },
    };
};

let httpClient: HttpClient;
let setupData: AuthTestingSetupData;
let jwtProvider: JwtProvider;
let jwtStorer: JwtStorage


export async function wrongTestSetUp() {
    httpClient = injectHttpClient();
    setupData = await setupDb();
    const reqPath = environment.serverBaseUrl + "/api/testing/getHeader/" + setupData.insertedData.user.userId
    const jwtStubProvider: JwtStubProvider = new JwtStubProvider();
    jwtStorer = jwtStubProvider.getJwtStorageStub()
    jwtProvider = jwtStubProvider.getJwtProviderStub();
    let res = await axios.get(reqPath)
    jwtStorer.store("", res.data.refreshToken)
    return res.data.header
}

/**
 * Deletes the user inserted in the setup
 * @param setupData
 */
export const teardownDb = async (setupData: AuthTestingSetupData, secondUser?: InsertedUser): Promise<void> => {
    await deleteUser(setupData.insertedData.user.userId);
    if (secondUser) await deleteUser(secondUser.userId);
};


export const testSetup = async (friendId?: string) => {
    httpClient = injectHttpClient();
    setupData = await setupDb(friendId);
    const reqPath = environment.serverBaseUrl + "/api/testing/getHeader/" + setupData.insertedData.user.userId
    const jwtStubProvider: JwtStubProvider = new JwtStubProvider();
    const jwtStorer = jwtStubProvider.getJwtStorageStub()
    jwtProvider = jwtStubProvider.getJwtProviderStub();
    let res = await axios.get(reqPath)
    jwtStorer.store(res.data.accessToken, res.data.refreshToken)
    return res.data.header
};

export const getAuthApi = (): AuthenticationApi => {
    return new AuthenticationApi (httpClient, jwtProvider);
};



describe('Login', () => {
    let authApi: AuthenticationApi
    beforeEach(async () => {
        await testSetup();
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        authApi = getAuthApi();

        authApi.logIn(setupData.insertedData.user.userData.email, "test").subscribe({
            next: (value: LogInData) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(
                    expect.objectContaining<LogInData>({
                        userId: expect.any(String),
                        accessToken: expect.any(String),
                        refreshToken: expect.any(String),
                    })
                );
            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        authApi = getAuthApi();
        let email = 'AYO'

        authApi.logIn("AYO", "ayo").subscribe({
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


describe('signUp', () => {
    let authApi: AuthenticationApi
    let email: string
    beforeEach(async () => {
        await testSetup();
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        authApi = getAuthApi();

        authApi.signUp(
            "name",
            "surnmae",
            "ayo.ayo",
            "test",
            "MR AYO"
        ).subscribe({
            next: (value: User) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(
                    expect.objectContaining<User>({
                        userId: expect.any(String),
                        accessToken: expect.any(String),
                        status: expect.any(String),
                        name: expect.any(String),
                        surname: expect.any(String),
                        email: expect.any(String),
                        nickName: expect.any(String),
                    })
                );
            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        authApi = getAuthApi();
        authApi.signUp(
            "name",
            "surnmae",
            email,
            "test",
            "MR AYO").subscribe({
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


describe('Sign out', () => {
    let authApi: AuthenticationApi
    beforeEach(async () => {
        await testSetup();
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        authApi = getAuthApi();

        authApi.logOut().subscribe({
            next: () => {

            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        jwtStorer.store("")
        authApi.logOut().subscribe({
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
