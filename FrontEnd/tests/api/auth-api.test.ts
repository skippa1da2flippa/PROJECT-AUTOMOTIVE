import {deleteUser, getUserData, InsertedUser, insertUser} from "../fixtures/model/users";
import {injectHttpClient} from "../fixtures/model/mongodb-api/mongodb-api";
import {HttpClient} from "@angular/common/http";
import {JwtProvider} from "../../src/app/core/api/jwt-auth/jwt-provider";
import axios from "axios";
import {environment} from "../../src/environments/environment";
import {JwtStorage} from "../../src/app/core/api/jwt-auth/jwt-storage";
import {AuthenticationApi} from "../../src/app/core/api/handlers/auth-api";
import {LogInData} from "../../src/app/core/model/response-data/auth-data";
import {User} from "../../src/app/core/model/response-data/user"

interface AuthTestingSetupData {
    insertedData: {
        user: InsertedUser;
    };
}

/**
 * Insert a user in the db, which will be used to authenticate with the api
 */
const setupDb = async (): Promise<AuthTestingSetupData> => {
    const userData = getUserData()
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


/**
 * Deletes the user inserted in the setup
 * @param setupData
 */
const teardownDb = async (setupData: AuthTestingSetupData): Promise<void> => {
    await deleteUser(setupData.insertedData.user.userId);
};


const testSetup = async () => {
    httpClient = injectHttpClient();
    setupData = await setupDb();
    const reqPath = environment.serverBaseUrl + "/api/" + setupData.insertedData.user.userId

    let res = await axios.get(reqPath)

    jwtStorer.store(
        res.data.header.authorization.split(",")[1],
        res.data.header.authorization.split(",")[0]
    )

    return res.data.header
};

const getAuthApi = (): AuthenticationApi => {
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
});
