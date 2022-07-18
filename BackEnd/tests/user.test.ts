import { router } from "../src/routes/user-routes";
import { app, dbUri } from "../src/index"
import mongoose, { Types } from "mongoose";
import * as request from "supertest"
import { apiCredentials, MongoDbApi, MongoDbSingleInsertResponse } from "./utils/mongodb-api";
import { getUserData } from "./utils/user-helper";
import { User, UserStatus } from "../src/model/database/user";


interface userResponse {
    userId: string,
    nickname: string,
    name: string,
    surname: string,
    email: string,
    status: string,
}

export interface ErrResponse {
    timestamp: number,
    errorMessage: string,
    requestPath: string,
}



describe("Test: /users/:userId", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let data: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        data = await mongoDbApi.insertUser(user)
    }), 

    afterEach(async () => {
        mongoDbApi.deleteUser(data.insertedId)
    }), 

    test("It should response the GET method", async () => {
      const response: request.Response = await request(app).get("/users/" + data.insertedId);
      const userRes: userResponse = response.body
      expect(response.statusCode).toBe(201);
      expect(userRes).toEqual(
        expect.objectContaining<userResponse>({
            userId: expect.any(String),
            nickname: expect.any(String),
            name: expect.any(String),
            surname: expect.any(String),
            email: expect.any(String),
            status: expect.any(String),
        })
      )
    });

    // bad userId
    test("It should have response 404", async () => {
        const response: request.Response = await request(app).get("/users/:userId");
        const errRes: ErrResponse = response.body
        expect(response.statusCode).toBe(404);
        expect(errRes).toEqual(
            expect(errRes).objectContaining<ErrResponse>({
                timestamp: expect.any(Number),
                errorMessage: expect.any(String),
                requestPath: expect.any(String),
            })
        )
    });

});

describe("Test: /users/:userId/myVehicles", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let udata: MongoDbSingleInsertResponse
    let vdata: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        udata = await mongoDbApi.insertUser(user)
        
    }), 

    afterEach(async () => {
        mongoDbApi.deleteUser(udata.insertedId)
    }), 

    test("It should response the GET method", async () => {
      const response: request.Response = await request(app).get("/users/" + udata.insertedId);
      const userRes: userResponse = response.body
      expect(response.statusCode).toBe(201);
      expect(userRes).toEqual(
        expect.objectContaining<userResponse>({
            userId: expect.any(String),
            nickname: expect.any(String),
            name: expect.any(String),
            surname: expect.any(String),
            email: expect.any(String),
            status: expect.any(String),
        })
      )
    });

    // bad userId
    test("It should have response 404", async () => {
        const response: request.Response = await request(app).get("/users/:userId");
        const errRes: ErrResponse = response.body
        expect(response.statusCode).toBe(404);
        expect(errRes).toEqual(
            expect(errRes).objectContaining<ErrResponse>({
                timestamp: expect.any(Number),
                errorMessage: expect.any(String),
                requestPath: expect.any(String),
            })
        )
    });

});





