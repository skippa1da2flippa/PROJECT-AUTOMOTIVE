import {LogInData} from "../../src/app/core/model/response-data/auth-data";
import {AuthTestingSetupData, getAuthApi, teardownDb, testSetup} from "./auth-api.test";
import {HttpClient} from "@angular/common/http";
import {JwtProvider} from "../../src/app/core/api/jwt-auth/jwt-provider";
import {JwtStorage} from "../../src/app/core/api/jwt-auth/jwt-storage";
import {UserApi} from "../../src/app/core/api/handlers/user-api";
import {AuthenticationApi} from "../../src/app/core/api/handlers/auth-api";
import {User} from "../../src/app/core/model/response-data/user";
import {UserStatus} from "../../src/app/core/model/response-data/user";
import {InsertedUser, insertUser} from "../fixtures/model/users";
import {
    LegalInfos,
    ModelTypes,
    ProjectVehicle,
    VehicleStatus
} from "../../src/app/core/model/response-data/project-vehicle";

let httpClient: HttpClient;
let setupData: AuthTestingSetupData;
let jwtProvider: JwtProvider;
let jwtStorer: JwtStorage

export const getUserApi = (): UserApi => {
    return new UserApi (httpClient, jwtProvider);
};


describe('Get Meh', () => {
    let userApi: UserApi
    beforeEach(async () => {
        await testSetup();
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getUserApi();

        userApi.getMeh().subscribe({
            next: (value: User) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(
                    expect.objectContaining<User>({
                        userId: expect.any(String),
                        email: expect.any(String),
                        nickName: expect.any(String),
                        name: expect.any(String),
                        surname: expect.any(String),
                        status: expect.any(UserStatus)
                    })
                );
            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getUserApi();
        let email = 'AYO'
        jwtStorer.store("")
        userApi.getMeh().subscribe({
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


describe('Get My Friends', () => {
    let userApi: UserApi
    beforeEach(async () => {
        await testSetup()
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getUserApi();

        userApi.getFriends().subscribe({
            next: (value: User[]) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(expect.any(Array<User>))
                value.forEach((val) => {
                    expect.objectContaining<User>({
                        userId: expect.any(String),
                        email: expect.any(String),
                        nickName: expect.any(String),
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
        userApi = getUserApi();
        jwtStorer.store("")
        userApi.getFriends().subscribe({
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


describe('Get One Friend', () => {
    let userApi: UserApi
    let friend: InsertedUser
    beforeEach(async () => {
        friend = await insertUser()
        await testSetup(
            friend.userId
        );

    });

    afterEach(async () => {
        await teardownDb(setupData, friend);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getUserApi();

        userApi.getOneFriend(friend.userId).subscribe({
            next: (value: User) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(
                    expect.objectContaining<User>({
                        userId: expect.any(String),
                        email: expect.any(String),
                        nickName: expect.any(String),
                        name: expect.any(String),
                        surname: expect.any(String),
                        status: expect.any(UserStatus)
                    })
                );
            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getUserApi();
        jwtStorer.store("")
        userApi.getOneFriend(friend.userId).subscribe({
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
        userApi = getUserApi();
        userApi.getOneFriend("friend.userId").subscribe({
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

describe('Get My Vehicles', () => {
    let userApi: UserApi
    beforeEach(async () => {
        await testSetup()
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getUserApi();

        userApi.getMyVehicles().subscribe({
            next: (value: ProjectVehicle[]) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(expect.any(Array<ProjectVehicle>))
                value.forEach((val) => {
                    expect.objectContaining<ProjectVehicle>({
                        vehicleId: expect.any(String),
                        owner: expect.any(User),
                        status: expect.any(VehicleStatus),
                        enjoyers: expect.any(Array<User>),
                        type: expect.any(ModelTypes),
                        legalInfos: expect.any(Object),
                    })
                })
            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getUserApi();
        jwtStorer.store("")
        userApi.getMyVehicles().subscribe({
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


describe('Get Enjoyed Vehicles', () => {
    let userApi: UserApi
    beforeEach(async () => {
        await testSetup()
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getUserApi();

        userApi.getEnjoyedVehicles().subscribe({
            next: (value: ProjectVehicle[]) => {
                // Expect non-empty response
                expect(value).toBeTruthy();

                // Expect an object with the correct fields
                expect(value).toEqual(expect.any(Array<ProjectVehicle>))
                value.forEach((val) => {
                    expect.objectContaining<ProjectVehicle>({
                        vehicleId: expect.any(String),
                        owner: expect.any(User),
                        status: expect.any(VehicleStatus),
                        enjoyers: expect.any(Array<User>),
                        type: expect.any(ModelTypes),
                        legalInfos: expect.any(Object),
                    })
                })
            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getUserApi();
        jwtStorer.store("")
        userApi.getEnjoyedVehicles().subscribe({
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


describe('Delete Meh', () => {
    let userApi: UserApi
    beforeEach(async () => {
        await testSetup();
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getUserApi();

        userApi.deleteMeh().subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getUserApi();
        jwtStorer.store("")
        userApi.deleteMeh().subscribe({
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

let name: string

describe('Update nickName', () => {
    let userApi: UserApi
    beforeEach(async () => {
        await testSetup();
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getUserApi();

        userApi.updateNickName("AYO").subscribe({
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
        userApi = getUserApi();
        let email = 'AYO'
        userApi.updateNickName(name).subscribe({
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
        userApi = getUserApi();
        let email = 'AYO'
        jwtStorer.store("")
        userApi.updateNickName("AYO").subscribe({
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

describe('Update email', () => {
    let userApi: UserApi
    beforeEach(async () => {
        await testSetup();
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getUserApi();

        userApi.updateEmail("AYO@ayo.com").subscribe({
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
        userApi = getUserApi();
        let email = 'AYO'
        userApi.updateEmail(email).subscribe({
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
        userApi = getUserApi();
        userApi.updateEmail(name).subscribe({
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
        userApi = getUserApi();
        jwtStorer.store("")
        userApi.updateEmail("AYO@ayo.com").subscribe({
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

describe('Update psw', () => {
    let userApi: UserApi
    beforeEach(async () => {
        await testSetup();
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getUserApi();

        userApi.updatePassword("AYO").subscribe({
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        userApi = getUserApi();
        userApi.updatePassword(name).subscribe({
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
        userApi = getUserApi();
        jwtStorer.store("")
        userApi.updatePassword("AYO").subscribe({
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


describe('Remove me from enjoyers', () => {
    let userApi: UserApi
    beforeEach(async () => {
        // TODO set up a vehicle and a user
        await testSetup();
    });

    afterEach(async () => {
        await teardownDb(setupData);
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        userApi = getUserApi();

        userApi.removeMehFromEnjoyers("AYO").subscribe({
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
        userApi = getUserApi();
        let email = 'AYO'
        userApi.removeMehFromEnjoyers(name).subscribe({
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
        userApi = getUserApi();
        let email = 'AYO'
        jwtStorer.store("")
        userApi.removeMehFromEnjoyers("AYO").subscribe({
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
