import {apiCredentials, MongoDbApi, MongoDbSingleInsertResponse} from "../utils/mongodb-api";
import {User} from "../../src/model/database/user";
import {getUserData} from "../utils/user-helper";
import axios from "axios";
import {baseUrl, ErrResponse, setUpHeader} from "./user.test";
import {Routine} from "../../src/model/database/routine";

interface UserRoutines {
    routines: Routine[]
}

interface UserRoutine {
    routine: Routine
}

describe("Test: GET /users/@meh/routines", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let data: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        data = await mongoDbApi.insertUser(user)
    }),

        afterEach(async () => {
            await mongoDbApi.deleteUser(data.insertedId)
        }),


        test("It should response the GET method", async () => {
            const requestPath: string = baseUrl + "/api/users/@meh/routines"
            let response
            const header = {
                "authorization" : setUpHeader(data.insertedId.toString())
            }

            response = await axios.get<UserRoutines>(requestPath, {
                headers: header
            });

            expect(response.status).toBe(201);
            const userRes: UserRoutines = response.data
            expect(userRes).toEqual(
                expect.objectContaining<UserRoutines>({
                    routines: expect.any(Array<Routine>),
                })
            )
        });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/routines"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.get<ErrResponse>(requestPath, {
                headers: header
            });
        } catch(err) {
            const errRes = err.response.data
            expect(err.response.status).toBe(404);
            expect(errRes).toEqual(
                expect.objectContaining<ErrResponse>({
                    timestamp: expect.any(Number),
                    errorMessage: expect.any(String),
                    requestPath: expect.any(String),
                })
            )
        }
    });

});


describe("Test: GET /users/@meh/routines/:name", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let data: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        data = await mongoDbApi.insertUser(user)
    }),

    afterEach(async () => {
        await mongoDbApi.deleteUser(data.insertedId)
    }),


    test("It should response the GET method", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/routines/" + user.routines[0].name
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.get<UserRoutine>(requestPath, {
            headers: header
        });

        expect(response.status).toBe(201);
        const userRes: UserRoutine = response.data
        expect(userRes).toEqual(
            expect.objectContaining<UserRoutine>({
                routine: expect.any(Object),
            })
        )
    });

    // wrong userId
    test("It should have response 404 (wrong id)", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/routines" + user.routines[0].name
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.get<ErrResponse>(requestPath, {
                headers: header
            });
        } catch(err) {
            const errRes = err.response.data
            expect(err.response.status).toBe(404);
            expect(errRes).toEqual(
                expect.objectContaining<ErrResponse>({
                    timestamp: expect.any(Number),
                    errorMessage: expect.any(String),
                    requestPath: expect.any(String),
                })
            )
        }
    });

    test("It should have response 404 (wrong name)", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/routines/AYO"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        try {
            await axios.get<ErrResponse>(requestPath, {
                headers: header
            });
        } catch(err) {
            const errRes = err.response.data
            expect(err.response.status).toBe(404);
            expect(errRes).toEqual(
                expect.objectContaining<ErrResponse>({
                    timestamp: expect.any(Number),
                    errorMessage: expect.any(String),
                    requestPath: expect.any(String),
                })
            )
        }
    });

});

describe("Test: GET /users/@meh/routines/:name", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let data: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        data = await mongoDbApi.insertUser(user)
    }),

    afterEach(async () => {
        await mongoDbApi.deleteUser(data.insertedId)
    }),


    test("It should response the DELETE method", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/routines/" + user.routines[0].name
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.delete(requestPath, {
            headers: header
        });

        expect(response.status).toBe(201);
    });

    // wrong userId
    test("It should have response 404 (wrong id)", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/routines" + user.routines[0].name
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.delete<ErrResponse>(requestPath, {
                headers: header
            });
        } catch(err) {
            const errRes = err.response.data
            expect(err.response.status).toBe(404);
            expect(errRes).toEqual(
                expect.objectContaining<ErrResponse>({
                    timestamp: expect.any(Number),
                    errorMessage: expect.any(String),
                    requestPath: expect.any(String),
                })
            )
        }
    });

    test("It should have response 404 (wrong name)", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/routines/AYO"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        try {
            await axios.delete<ErrResponse>(requestPath, {
                headers: header
            });
        } catch(err) {
            const errRes = err.response.data
            expect(err.response.status).toBe(404);
            expect(errRes).toEqual(
                expect.objectContaining<ErrResponse>({
                    timestamp: expect.any(Number),
                    errorMessage: expect.any(String),
                    requestPath: expect.any(String),
                })
            )
        }
    });

});



describe("Test: PUT /users/@meh/routines/:name", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let data: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        data = await mongoDbApi.insertUser(user)
    }),

    afterEach(async () => {
        await mongoDbApi.deleteUser(data.insertedId)
    }),


    test("It should response the PUT method", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/routines/" + user.routines[0].name
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.put<UserRoutine>(requestPath, {
            newName: "AYO",
            temperature: 5,
            lights: "#FFFFQQ",
            musicToAdd: ["rap"],
            musicToRemove: ["punk"]
        },{
            headers: header
        });

        expect(response.status).toBe(204);
    });

    // wrong userId
    test("It should have response 404 (wrong id)", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/routines" + user.routines[0].name
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.put<ErrResponse>(requestPath, {
                headers: header
            });
        } catch(err) {
            const errRes = err.response.data
            expect(err.response.status).toBe(404);
            expect(errRes).toEqual(
                expect.objectContaining<ErrResponse>({
                    timestamp: expect.any(Number),
                    errorMessage: expect.any(String),
                    requestPath: expect.any(String),
                })
            )
        }
    });

    test("It should have response 404 (wrong name)", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/routines/AYO"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        try {
            await axios.put<ErrResponse>(requestPath, {
                headers: header
            });
        } catch(err) {
            const errRes = err.response.data
            expect(err.response.status).toBe(404);
            expect(errRes).toEqual(
                expect.objectContaining<ErrResponse>({
                    timestamp: expect.any(Number),
                    errorMessage: expect.any(String),
                    requestPath: expect.any(String),
                })
            )
        }
    });


    test("It should have response 400 (wrong param)", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/routines/" + user.routines[0].name
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.put<UserRoutine>(requestPath, {
            newName: "AYO",
            temperature: undefined,
            lights: "#FFFFQQ",
            musicToAdd: ["rap"],
            musicToRemove: ["punk"]
        },{
            headers: header
        });

        expect(response.status).toBe(204);
    });
});
