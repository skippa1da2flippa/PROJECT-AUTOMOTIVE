import {AuthenticationApi} from "../../src/app/core/api/handlers/auth-api";
import {LogInData} from "../../src/app/core/model/response-data/auth-data";
import {AuthTestingSetupData, getAuthApi, preSetUp, teardownDb, testSetup} from "./auth-api.test";
import {HttpClient} from "@angular/common/http";
import {JwtProvider} from "../../src/app/core/api/jwt-auth/jwt-provider";
import {JwtStorage} from "../../src/app/core/api/jwt-auth/jwt-storage";
import {UserApi} from "../../src/app/core/api/handlers/user-api";
import {ProjectVehicleApi} from "../../src/app/core/api/handlers/project-vehicle-api";
import {ModelTypes, ProjectVehicle, VehicleStatus} from "../../src/app/core/model/response-data/project-vehicle";
import {User, UserStatus} from "../../src/app/core/model/response-data/user";
import {deleteMultipleVehicles, insertManyVehicles} from "../fixtures/model/vehicles";
import {getApiCredentials, MongoDpApiCredentials} from "../fixtures/model/mongodb-api/mongodb-api";
import {Schema, Types} from "mongoose";
import {InsertedUser, insertUser} from "../fixtures/model/users";
import {Socket} from "ngx-socket-io";
import {TestBed} from "@angular/core/testing";
import {ownerResponse, socketIoTestbedConfig} from "../fixtures/socket-io-client";
import {OwnerResponseEmitter} from "../../src/app/core/events/emitters/owner-response";
import {JwtStubProvider} from "../fixtures/model/token";



let httpClient: HttpClient;
let setupData: AuthTestingSetupData;
let jwtProvider: JwtProvider;
let jwtStorer: JwtStorage
let credentials: MongoDpApiCredentials

export const getVehicleApi = (): ProjectVehicleApi => {
    return new ProjectVehicleApi(httpClient, jwtProvider);
};


describe('Get vehicle', () => {
    let vehicleApi: ProjectVehicleApi
    let vehicles: Types.ObjectId[] = []
    let jwtStubProvider: JwtStubProvider
    beforeEach(async () => {
        setupData = await preSetUp()
        jwtStubProvider = new JwtStubProvider()
        httpClient = await testSetup(setupData, jwtStubProvider);
        jwtProvider = jwtStubProvider.getJwtProviderStub()
        credentials = await getApiCredentials()
        await insertManyVehicles(
            new Types.ObjectId(setupData.insertedData.user.userId),
            1,
            vehicles,
            credentials
        )
    });

    afterEach(async () => {
        await teardownDb(setupData);
        //await deleteMultipleVehicles(vehicles)
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        vehicleApi = getVehicleApi();

        vehicleApi.getVehicle(vehicles[0].toString()).subscribe({
            next: (value: ProjectVehicle) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(
                    expect.objectContaining<ProjectVehicle>({
                        vehicleId: expect.any(String),
                        owner: expect.any(User),
                        status: expect.any(String),
                        enjoyers: expect.any(Array<User>),
                        type: expect.any(String),
                        legalInfos: expect.any(Object),
                    })
                );
            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        vehicleApi = getVehicleApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
        vehicleApi.getVehicle(vehicles[0].toString()).subscribe({
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
        vehicleApi = getVehicleApi();
        vehicleApi.getVehicle("AYO").subscribe({
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

describe('Get vehicle owner', () => {
    let vehicleApi: ProjectVehicleApi
    let vehicles: Types.ObjectId[] = []
    let jwtStubProvider: JwtStubProvider
    beforeEach(async () => {
        setupData = await preSetUp()
        jwtStubProvider = new JwtStubProvider()
        httpClient = await testSetup(setupData, jwtStubProvider);
        jwtProvider = jwtStubProvider.getJwtProviderStub()
        credentials = await getApiCredentials()
        await insertManyVehicles(
            new Types.ObjectId(setupData.insertedData.user.userId),
            1,
            vehicles,
            credentials
        )
    });

    afterEach(async () => {
        await teardownDb(setupData);
        await deleteMultipleVehicles(vehicles)
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        vehicleApi = getVehicleApi();

        vehicleApi.getVehicleOwner(vehicles[0].toString()).subscribe({
            next: (value: User) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(
                    expect.objectContaining<User>({
                        userId: expect.any(String),
                        email: expect.any(String),
                        nickname: expect.any(String),
                        name: expect.any(String),
                        surname: expect.any(String),
                        status: expect.any(String)
                    })
                );
            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        vehicleApi = getVehicleApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
        vehicleApi.getVehicleOwner(vehicles[0].toString()).subscribe({
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
        vehicleApi = getVehicleApi();
        vehicleApi.getVehicleOwner("AYO").subscribe({
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


describe('Get vehicle enjoyers', () => {
    let vehicleApi: ProjectVehicleApi
    let vehicles: Types.ObjectId[] = []
    let jwtStubProvider: JwtStubProvider
    beforeEach(async () => {
        setupData = await preSetUp()
        jwtStubProvider = new JwtStubProvider()
        httpClient = await testSetup(setupData, jwtStubProvider);
        jwtProvider = jwtStubProvider.getJwtProviderStub();
        credentials = await getApiCredentials()
        await insertManyVehicles(
            new Types.ObjectId(setupData.insertedData.user.userId),
            1,
            vehicles,
            credentials
        )
    });

    afterEach(async () => {
        await teardownDb(setupData);
        await deleteMultipleVehicles(vehicles)
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        vehicleApi = getVehicleApi();

        vehicleApi.getVehicleEnjoyers(vehicles[0].toString()).subscribe({
            next: (value: User[]) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(expect.any(Array<User>))
                value.forEach((val) => {
                    expect.objectContaining<User>({
                        userId: expect.any(String),
                        email: expect.any(String),
                        nickname: expect.any(String),
                        name: expect.any(String),
                        surname: expect.any(String),
                        status: expect.any(UserStatus)
                    })
                })
            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        vehicleApi = getVehicleApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
        vehicleApi.getVehicleEnjoyers(vehicles[0].toString()).subscribe({
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
        vehicleApi = getVehicleApi();
        vehicleApi.getVehicleEnjoyers("AYO").subscribe({
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

describe('Remove vehicle enjoyer', () => {
    let vehicleApi: ProjectVehicleApi
    let vehicles: Types.ObjectId[] = []
    let enjoyer: InsertedUser
    let jwtStubProvider: JwtStubProvider
    beforeEach(async () => {
        setupData = await preSetUp()
        jwtStubProvider = new JwtStubProvider()
        httpClient = await testSetup(setupData, jwtStubProvider);
        jwtProvider = jwtStubProvider.getJwtProviderStub()
        credentials = await getApiCredentials()
        enjoyer = (await insertUser())
        await insertManyVehicles(
            new Types.ObjectId(setupData.insertedData.user.userId),
            1,
            vehicles,
            credentials,
            new Types.ObjectId(enjoyer.userId)
        )
    });

    afterEach(async () => {
        await teardownDb(setupData, enjoyer.userId);
        await deleteMultipleVehicles(vehicles)
    });

    test('Should Return Empty Response', (done) => {
        vehicleApi = getVehicleApi();

        vehicleApi.removeVehicleEnjoyer(vehicles[0].toString(), enjoyer.userId).subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        vehicleApi = getVehicleApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
        vehicleApi.removeVehicleEnjoyer(vehicles[0].toString(), enjoyer.userId).subscribe({
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
        vehicleApi = getVehicleApi();
        vehicleApi.removeVehicleEnjoyer(vehicles[0].toString(), "AYO").subscribe({
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
        vehicleApi = getVehicleApi();
        vehicleApi.removeVehicleEnjoyer("AYO", enjoyer.userId).subscribe({
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

let client: Socket;

describe('Add vehicle enjoyer', () => {
    let vehicleApi: ProjectVehicleApi
    let vehicles: Types.ObjectId[] = []
    let enjoyer: InsertedUser
    let jwtStubProvider: JwtStubProvider
    beforeEach(async () => {
        setupData = await preSetUp()
        jwtStubProvider = new JwtStubProvider()
        httpClient = await testSetup(setupData, jwtStubProvider);
        jwtProvider = jwtStubProvider.getJwtProviderStub()
        credentials = await getApiCredentials()
        enjoyer = (await insertUser())
        client = TestBed.inject(Socket);
        await insertManyVehicles(
            new Types.ObjectId(setupData.insertedData.user.userId),
            1,
            vehicles,
            credentials
        )
    });

    afterEach(async () => {
        await teardownDb(setupData, enjoyer.userId);
        await deleteMultipleVehicles(vehicles)
        client.disconnect()
    });

    test('Should Return Empty Response', (done) => {
        vehicleApi = getVehicleApi();
        vehicleApi.addVehicleEnjoyer(vehicles[0].toString(),
            enjoyer.userId,
            enjoyer.userData.name,
            enjoyer.userData.surname
        ).subscribe({
            next: () => {
                ownerResponse(
                    setupData.insertedData.user.userId,
                    setupData.insertedData.user.userData.name,
                    enjoyer.userId,
                    true,
                    client
                )
            },

            complete: () => {
                done();
            },
        });
    });


    test('Should Throw', (done) => {
        vehicleApi = getVehicleApi();
        jwtStorer = jwtStubProvider.getJwtStorageStub()
        jwtStorer.store("", "AYO")
        vehicleApi.removeVehicleEnjoyer(vehicles[0].toString(), enjoyer.userId).subscribe({
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
        vehicleApi = getVehicleApi();
        vehicleApi.removeVehicleEnjoyer(vehicles[0].toString(), "AYO").subscribe({
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
        vehicleApi = getVehicleApi();
        vehicleApi.removeVehicleEnjoyer("AYO", enjoyer.userId).subscribe({
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
