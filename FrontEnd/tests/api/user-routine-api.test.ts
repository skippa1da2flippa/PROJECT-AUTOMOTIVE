import {HttpClient} from "@angular/common/http";
import {AuthTestingSetupData, preSetUp, teardownDb, testSetup} from "./auth-api.test";
import {JwtProvider} from "../../src/app/core/api/jwt-auth/jwt-provider";
import {JwtStorage} from "../../src/app/core/api/jwt-auth/jwt-storage";
import {MongoDpApiCredentials} from "../fixtures/model/mongodb-api/mongodb-api";
import {UserRoutineApi} from "../../src/app/core/api/handlers/routine-api";
import {Routine} from "../fixtures/model/users";
import {JwtStubProvider} from "../fixtures/model/token";

let httpClient: HttpClient;
let setupData: AuthTestingSetupData;
let jwtProvider: JwtProvider;
let jwtStorer: JwtStorage
let credentials: MongoDpApiCredentials

export const getRoutineApi = (): UserRoutineApi => {
    return new UserRoutineApi (httpClient, jwtProvider);
};

describe('Get My Routines', () => {
    let userApi: UserRoutineApi
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
        userApi = getRoutineApi();

        userApi.getMyRoutines().subscribe({
            next: (value: Routine[]) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(expect.any(Array<Routine>))
                value.forEach(val => {
                    expect.objectContaining<Routine>({
                        name: expect.any(String),
                        temperature: expect.any(Number),
                        lightsColor: expect.any(String),
                        music: expect.any(Array<String>),
                        path: expect.any(Object),
                    })
                })
            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getRoutineApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
        userApi.getMyRoutines().subscribe({
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


describe('Get My Routine', () => {
    let userApi: UserRoutineApi
    let name: string
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
        userApi = getRoutineApi();

        userApi.getMyRoutine(`lilBoat`).subscribe({
            next: (value: Routine) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                expect.objectContaining<Routine>({
                    name: expect.any(String),
                    temperature: expect.any(Number),
                    lightsColor: expect.any(String),
                    music: expect.any(Array<String>),
                    path: expect.any(Object),
                })

            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getRoutineApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
        userApi.getMyRoutine(`lilBoat`).subscribe({
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
        userApi = getRoutineApi();
        userApi.getMyRoutine(name).subscribe({
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

describe('Add a Routine', () => {
    let userApi: UserRoutineApi
    let name: string
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
        userApi = getRoutineApi();
        userApi.addRoutine({
            name: `lilBot`,
            temperature: 3,
            lightsColor: "#FFFFF",
            music: ["punk"],
            path: "AYO"
        }).subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getRoutineApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
        userApi.addRoutine({
            name: `lilBoat`,
            temperature: 3,
            lightsColor: "#FFFFF",
            music: ["punk"],
            path: "AYO"
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
        userApi = getRoutineApi();
        userApi.addRoutine({
            name,
            temperature: 3,
            lightsColor: "#FFFFF",
            music: ["punk"],
            path: "AYO"
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
});

describe('Delete My Routine', () => {
    let userApi: UserRoutineApi
    let name: string
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
        userApi = getRoutineApi();

        userApi.deleteRoutine(`lilBoat`).subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getRoutineApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
        userApi.deleteRoutine(`lilBoat`).subscribe({
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
        userApi = getRoutineApi();
        userApi.deleteRoutine(name).subscribe({
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

describe('Update a Routine', () => {
    let userApi: UserRoutineApi
    let name: string
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
        userApi = getRoutineApi();
        userApi.updateRoutine(
            `lilBoat`,
            3,
            "#FFFFF"
        ).subscribe({
            complete: () => {
                done();
            }
        });
    });

    test('Should Throw', (done) => {
        userApi = getRoutineApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
        userApi.updateRoutine(
            `lilBoat`,
            3,
            "#FFFFF"
        ).subscribe({
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
        userApi = getRoutineApi();
        userApi.updateRoutine(
            name,
            3,
            "#FFFFF"
        ).subscribe({
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
