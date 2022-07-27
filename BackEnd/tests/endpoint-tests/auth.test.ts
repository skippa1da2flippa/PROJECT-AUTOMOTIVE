import {apiCredentials, MongoDbApi, MongoDbSingleInsertResponse} from "../utils/mongodb-api";
import {getUserData} from "../utils/user-helper";
import {User} from "../../src/model/database/user";
import axios from "axios";
import {baseUrl, ErrResponse, setUpHeader} from "./user.test";

interface UserLogIn {
    userId: string
    authToken: string
    refreshToken: string
}

interface UserSignUp {
    userId: string
    name: string
    surname: string
    email: string
    nickname: string
    roles: string[]
    status: string
}


// Non entra nemmeno nella route
describe("Test: POST /auth/signin ", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let data: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        data = await mongoDbApi.insertUser(user)
    })

    afterEach(async () => {
        await mongoDbApi.deleteUser(data.insertedId)
    })

    test("Should return a UserLogIn response", async () => {
        const requestPath: string = baseUrl + "/api/auth/signin"
        let response
        const header = {
            "authorization": ""
        }

        response = await axios.post<UserLogIn>(requestPath, {
            email: user.email,
            password: "test"
        }, {
            headers: header
        });

        expect(response.status).toBe(200)
        const userRes: UserLogIn = response.data
        expect(userRes).toEqual(
            expect.objectContaining<UserLogIn>({
                userId: expect.any(String),
                authToken: expect.any(String),
                refreshToken: expect.any(String),
            })
        )
    })

    test("Should return 404", async () => {
        const requestPath: string = baseUrl + "/api/auth/signin"
        const header = {}
        try {
            await axios.post<UserLogIn>(requestPath, {
                email: "AYO@ayo.com",
                password: "test"
            },{
                headers: header
            });
        } catch (err) {
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
    })

    test("Should return 401", async () => {
        const requestPath: string = baseUrl + "/api/auth/signin"
        const header = {}

        await axios.post<UserLogIn>(requestPath, {
            email: user.email,
            password: "test"
        },{
            headers: header
        });

        try {
            // LOG IN again to make the server throw
            await axios.post<UserLogIn>(requestPath, {
                email: user.email,
                password: "test"
            },{
                headers: header
            });
        } catch (err) {
            const errRes = err.response.data
            expect(err.response.status).toBe(401);
            expect(errRes).toEqual(
                expect.objectContaining<ErrResponse>({
                    timestamp: expect.any(Number),
                    errorMessage: expect.any(String),
                    requestPath: expect.any(String),
                })
            )
        }
    })
})

// Non entra nemmeno nella route
describe("Test: POST /auth/signup ", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let data: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
    })

    afterEach(async () => {
        await mongoDbApi.deleteUser(data.insertedId)
    })

    test("Should return a UserLogIn response", async () => {
        const requestPath: string = baseUrl + "/api/auth/signup"
        let response
        const header = {}

        response = await axios.post<UserSignUp>(requestPath, {
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: "test"
        },{
            headers: header
        });

        expect(response.status).toBe(201)
        const userRes: UserSignUp = response.data
        expect(userRes).toEqual(
            expect.objectContaining<UserSignUp>({
                userId: expect.any(String),
                name: expect.any(String),
                surname: expect.any(String),
                email: expect.any(String),
                nickname: expect.any(String),
                roles: expect.any([String]),
                status: expect.any(String)
            })
        )
    })

    test("Should return 400", async () => {
        const requestPath: string = baseUrl + "/api/auth/signin"
        const header = {}
        try {
            await axios.post<UserSignUp>(requestPath, {
                email: user.email,
                password: undefined
            },{
                headers: header
            });
        } catch (err) {
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
    })
})

// Non entra nemmeno nella route
describe("Test: POST /auth/signout ", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let data: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        data = await mongoDbApi.insertUser(user)
    })

    afterEach(async () => {
        await mongoDbApi.deleteUser(data.insertedId)
    })

    test("Should return a UserLogIn response", async () => {
        const requestPath: string = baseUrl + "/api/auth/signout"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.get(requestPath,{
            headers: header
        });

        expect(response.status).toBe(204)
    })

    test("Should return 404 (non existing user)", async () => {
        const requestPath: string = baseUrl + "/api/auth/signout"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.get(requestPath, {
                headers: header
            });
        } catch (err) {
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
    })
})