import {apiCredentials, MongoDbApi, MongoDbSingleInsertResponse} from "../utils/mongodb-api";
import {User} from "../../src/model/database/user";
import {getUserData} from "../utils/user-helper";
import axios from "axios";
import {baseUrl, ErrResponse, setUpHeader} from "./user.test";
import {UserStats} from "../../src/model/database/user-stats";

describe("Test: GET /users/@meh/stats", () => {

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
            const requestPath: string = baseUrl + "/api/users/@meh/stats"
            let response
            const header = {
                "authorization" : setUpHeader(data.insertedId.toString())
            }

            response = await axios.get(requestPath, {
                headers: header
            });

            expect(response.status).toBe(201);
            const userRes: { stats: UserStats } = response.data
            expect(userRes).toEqual(
                expect.objectContaining<{ stats: UserStats }>({
                    stats: expect.any(Object),
                })
            )
        });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/stats"
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

describe("Test: PUT /users/@meh/stats", () => {

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
        const requestPath: string = baseUrl + "/api/users/@meh/stats"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.put(requestPath, {
            sauce: 10,
            trophies: 15
        },{
            headers: header
        });

        expect(response.status).toBe(204);
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/stats"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.put(requestPath, {
                sauce: 10,
                trophies: 15
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