import { HttpClient } from '@angular/common/http';


import { JwtProvider } from '../../src/app/core/api/jwt-auth/jwt-provider';
import { JwtStorage } from '../../src/app/core/api/jwt-auth/jwt-storage';




describe('Login', () => {
    beforeEach(async () => {

    });

    afterEach(async () => {

    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {


        authApi.login(credentials).subscribe({
            next: (authRes: AuthResult) => {
                // Expect non-empty response
                expect(authRes).toBeTruthy();

                // Expect an object with the correct fields
                expect(authRes).toEqual(
                    expect.objectContaining<AuthResult>({
                        userId: expect.any(String),
                        token: expect.any(String),
                    })
                );
            },
            complete: () => {
                done();
            },
        });
    });

    test('Should Throw', (done) => {
        const authApi: AuthApi = getAuthApi();
        const wrongCredentials: LoginInfo = {
            username: 'wrong-username',
            password: 'wrong-password',
        };

        authApi.login(wrongCredentials).subscribe({
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

describe('Signup', () => {
    beforeEach(async () => {
        await testSetup();
    });

    afterEach(async () => {
        await testTeardown();
    });

    test('Should Return Non-Empty Response With Correct Fields', (done) => {
        const authApi: AuthApi = getAuthApi();
        const newCredentials: LoginInfo = {
            username: 'any-username',
            password: 'any-password',
        };
        let newUser: User;

        authApi.register(newCredentials).subscribe({
            next: (user: User) => {
                // Save for teardown
                newUser = user;

                // Expect non-empty response
                expect(user).toBeTruthy();

                // Expect an object with the correct fields
                expect(user).toEqual(
                    expect.objectContaining<User>({
                        userId: expect.any(String),
                        username: expect.any(String),
                        roles: expect.any(Array),
                        status: expect.any(String),
                        elo: expect.any(Number),
                    })
                );
            },
            complete: async () => {
                // Teardown the registered user
                await deleteUser(newUser.userId);

                done();
            },
        });
    });

    test('Should Throw', (done) => {
        const authApi: AuthApi = getAuthApi();

        const insertedUser: InsertedUser = setupData.insertedData.user;
        const duplicateCredentials: LoginInfo = {
            username: insertedUser.userData.username,
            password: 'any-password',
        };

        authApi.login(duplicateCredentials).subscribe({
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
