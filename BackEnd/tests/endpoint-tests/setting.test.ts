import {apiCredentials, MongoDbApi, MongoDbSingleInsertResponse} from "../utils/mongodb-api";
import {User} from "../../src/model/database/user";
import {getUserData} from "../utils/user-helper";
import axios from "axios";
import {baseUrl, ErrResponse, setUpHeader} from "./user.test";
import {Setting} from "../../src/model/database/setting";


describe("Test: GET /users/@meh/setting", () => {

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
        const requestPath: string = baseUrl + "/api/users/@meh/setting"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.get(requestPath, {
            headers: header
        });

        expect(response.status).toBe(201);
        const userRes: {setting: Setting} = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{setting: Setting}>({
                setting: expect.objectContaining<Setting>({
                    theme: expect.any(String),
                    size: expect.any(Number),
                    language: expect.any(String),
                    gamificationHide: expect.any(Boolean),
                }),
            })
        )
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting"
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

describe("Test: GET /users/@meh/setting/language", () => {

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
        const requestPath: string = baseUrl + "/api/users/@meh/setting/language"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.get(requestPath, {
            headers: header
        });

        expect(response.status).toBe(201);
        const userRes: {language: string} = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{language: string}>({
                language: expect.any(String)
            })
        )
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/language"
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

describe("Test: GET /users/@meh/setting/theme", () => {

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
            const requestPath: string = baseUrl + "/api/users/@meh/setting/theme"
            let response
            const header = {
                "authorization" : setUpHeader(data.insertedId.toString())
            }

            response = await axios.get(requestPath, {
                headers: header
            });

            expect(response.status).toBe(201);
            const userRes: {theme: string} = response.data
            expect(userRes).toEqual(
                expect.objectContaining<{theme: string}>({
                    theme: expect.any(String)
                })
            )
        });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/theme"
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


describe("Test: GET /users/@meh/setting/size", () => {

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
        const requestPath: string = baseUrl + "/api/users/@meh/setting/size"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.get(requestPath, {
            headers: header
        });

        expect(response.status).toBe(201);
        const userRes: {size: number} = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{size: number}>({
                size: expect.any(Number)
            })
        )
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/size"
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

describe("Test: GET /users/@meh/setting/gamification", () => {

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
        const requestPath: string = baseUrl + "/api/users/@meh/setting/gamification"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.get(requestPath, {
            headers: header
        });

        expect(response.status).toBe(201);
        const userRes: {gamificationHide: boolean} = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{gamificationHide: boolean}>({
                gamificationHide: expect.any(Boolean)
            })
        )
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/gamification"
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

describe("Test: PATCH /users/@meh/setting/language", () => {

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


    test("It should response the PATCH method", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/language"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.patch(requestPath, {
            language: "IT"
        },{
            headers: header
        });

        expect(response.status).toBe(204);
    });


    test("It should have response 400", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/language"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        try {
            await axios.patch(requestPath, {
                language: undefined
            },{
                headers: header
            });
        } catch(err) {
            const errRes = err.response.data
            expect(err.response.status).toBe(400);
            expect(errRes).toEqual(
                expect.objectContaining<ErrResponse>({
                    timestamp: expect.any(Number),
                    errorMessage: expect.any(String),
                    requestPath: expect.any(String),
                })
            )
        }
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/language"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.patch(requestPath, {
                language: "IT"
            },{
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


describe("Test: PATCH /users/@meh/setting/theme", () => {

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


    test("It should response the PATCH method", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/theme"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.patch(requestPath, {
            theme: "white"
        },{
            headers: header
        });

        expect(response.status).toBe(204);
    });


    test("It should have response 400", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/theme"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        try {
            await axios.patch(requestPath, {
                theme: undefined
            },{
                headers: header
            });
        } catch(err) {
            const errRes = err.response.data
            expect(err.response.status).toBe(400);
            expect(errRes).toEqual(
                expect.objectContaining<ErrResponse>({
                    timestamp: expect.any(Number),
                    errorMessage: expect.any(String),
                    requestPath: expect.any(String),
                })
            )
        }
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/theme"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.patch(requestPath, {
                theme: "white"
            },{
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


describe("Test: PATCH /users/@meh/setting/size", () => {

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


        test("It should response the PATCH method", async () => {
            const requestPath: string = baseUrl + "/api/users/@meh/setting/size"
            let response
            const header = {
                "authorization" : setUpHeader(data.insertedId.toString())
            }

            response = await axios.patch(requestPath, {
                size: 4
            },{
                headers: header
            });

            expect(response.status).toBe(204);
        });


    test("It should have response 400", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/size"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        try {
            await axios.patch(requestPath, {
                size: undefined
            },{
                headers: header
            });
        } catch(err) {
            const errRes = err.response.data
            expect(err.response.status).toBe(400);
            expect(errRes).toEqual(
                expect.objectContaining<ErrResponse>({
                    timestamp: expect.any(Number),
                    errorMessage: expect.any(String),
                    requestPath: expect.any(String),
                })
            )
        }
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/size"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.patch(requestPath, {
                size: 4
            },{
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


describe("Test: PATCH /users/@meh/setting/gamification", () => {

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


    test("It should response the PATCH method", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/gamification"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.patch(requestPath, {
            gamification: true
        },{
            headers: header
        });

        expect(response.status).toBe(204);
    });


    test("It should have response 400", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/gamification"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        try {
            await axios.patch(requestPath, {
                gamification: undefined
            },{
                headers: header
            });
        } catch(err) {
            const errRes = err.response.data
            expect(err.response.status).toBe(400);
            expect(errRes).toEqual(
                expect.objectContaining<ErrResponse>({
                    timestamp: expect.any(Number),
                    errorMessage: expect.any(String),
                    requestPath: expect.any(String),
                })
            )
        }
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/setting/gamification"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.patch(requestPath, {
                gamification: true
            },{
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