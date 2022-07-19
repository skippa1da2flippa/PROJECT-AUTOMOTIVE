import { router } from "../../src/routes/user-routes";
import {app, dbUri, httpServer} from "../../src/index"
import mongoose, { Types } from "mongoose";
import * as request from "supertest"
import { apiCredentials, MongoDbApi, MongoDbSingleInsertResponse } from "../utils/mongodb-api";
import { getUserData } from "../utils/user-helper";
import {User, UserModel, UserStatus} from "../../src/model/database/user";
import axios, { AxiosRequestConfig } from "axios";
import { JwtData } from "../../src/model/auth/jwt-data";
import { jsonWebToken} from "../../src/routes/auth-routes";
import { generateAccessToken } from "../../src/routes/auth-routes";
import { insertManyVehicles } from "../utils/my-vehicle-helper";
import {projectVehicleDocument, projectVehicle, VehicleModel} from "../../src/model/database/my-vehicle";
import chalk from "chalk";


interface UserResponse {
    userId: Types.ObjectId,
    nickname: string,
    name: string,
    surname: string,
    email: string,
    status: string,
}

interface UserMyVehiclesResponse {
    userId: Types.ObjectId,
    myVehicles: projectVehicleDocument[]
}

interface UserEnjoyedVehiclesResponse {
    userId: Types.ObjectId,
    enjoyedVehicles: projectVehicleDocument[]
}

export interface ErrResponse {
    timestamp: number,
    errorMessage: string,
    requestPath: string,
}

function setUpHeader(userId: string) {
    const tokensData: JwtData = {
        userId
    };

    const refreshToken = jsonWebToken.sign(tokensData, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: '2h',
    });

    const accessToken = generateAccessToken(tokensData.userId);

    return `${refreshToken},${accessToken}`;
}

const baseUrl: string = "http://" + process.env.HOST + ":" + process.env.PORT


describe("Test: GET /users/@meh", () => {

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
        const requestPath: string = baseUrl + "/users/@meh"
        console.log(requestPath)
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        const response = await axios.get<UserResponse>(requestPath, {
            headers: header
        });
        expect(response.status).toBe(200);
        const userRes: UserResponse = response.data
        expect(userRes).toEqual(
            expect.objectContaining<UserResponse>({
                userId: expect.any(Types.ObjectId),
                nickname: expect.any(String),
                name: expect.any(String),
                surname: expect.any(String),
                email: expect.any(String),
                status: expect.any(String),
            })
        )
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/users/@meh"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        const response = await axios.get<UserResponse>(requestPath, {
            headers: header
        });
        const errRes = response.data
        expect(response.status).toBe(404);
        expect(errRes).toEqual(
            expect.objectContaining<ErrResponse>({
                timestamp: expect.any(Number),
                errorMessage: expect.any(String),
                requestPath: expect.any(String),
            })
        )
    });

});





describe("Test: GET /users/@meh/myVehicles", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let brokeUserId: MongoDbSingleInsertResponse
    let udata: MongoDbSingleInsertResponse
    let vehiclesIds: Types.ObjectId[] = []

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        udata = await mongoDbApi.insertUser(user)
        brokeUserId = await mongoDbApi.insertUser(getUserData())
        let userId = (
            udata.insertedId instanceof Types.ObjectId 
                ? udata.insertedId 
                : new Types.ObjectId(udata.insertedId)
        )

        await insertManyVehicles(userId, 2, vehiclesIds)
    }), 

    afterEach(async () => {
        await mongoDbApi.deleteUser(udata.insertedId)
        await mongoDbApi.deleteMultipleVehicles(vehiclesIds)
    }), 

    test("It should response the GET method", async () => {
        const requestPath: string = baseUrl + "/users/@meh/myVehicles"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        const response = await axios.get<UserResponse>(requestPath, {
            headers: header
        });
        expect(response.status).toBe(201);
        const userRes = response.data
        expect(userRes).toEqual(
            expect.objectContaining<UserMyVehiclesResponse>({
                userId: expect.any(Types.ObjectId),
                myVehicles: expect.any([Object])
            })
        )
    });

     // user with no vehicles
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/users/@meh/myVehicles"
        const header = {
            "authorization" : setUpHeader(brokeUserId.insertedId.toString())
        }
        const response = await axios.get(requestPath, {
            headers: header
        });

        const errRes = response.data

        expect(response.status).toBe(404);
        expect(errRes).toEqual(
            expect.objectContaining<ErrResponse>({
                timestamp: expect.any(Number),
                errorMessage: expect.any(String),
                requestPath: expect.any(String),
            })
        )
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/users/@meh/myVehicles"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        const response = await axios.get(requestPath, {
            headers: header
        });
        const errRes = response.data
        expect(response.status).toBe(404);
        expect(errRes).toEqual(
            expect.objectContaining<ErrResponse>({
                timestamp: expect.any(Number),
                errorMessage: expect.any(String),
                requestPath: expect.any(String),
            })
        )
    });

});



describe("Test: GET /users/@meh/enjoyedVehicles", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let enjoyer: MongoDbSingleInsertResponse
    let udata: MongoDbSingleInsertResponse
    let vehiclesIds: Types.ObjectId[] = []

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        udata = await mongoDbApi.insertUser(user)
        enjoyer = await mongoDbApi.insertUser(getUserData())
        let userId = (
            udata.insertedId instanceof Types.ObjectId 
                ? udata.insertedId 
                : new Types.ObjectId(udata.insertedId)
        )
        
        let enjoyerId = (
            enjoyer.insertedId instanceof Types.ObjectId 
                ? enjoyer.insertedId 
                : new Types.ObjectId(enjoyer.insertedId)
        )

        await insertManyVehicles(userId, 2, vehiclesIds, enjoyerId)
    }), 

    afterEach(async () => {
        await mongoDbApi.deleteUser(udata.insertedId)
        await mongoDbApi.deleteMultipleVehicles(vehiclesIds)
    }), 

    test("It should response the GET method", async () => {
        const requestPath: string = baseUrl + "/users/@meh/enjoyedVehicles"
        const header = {
            "authorization" : setUpHeader(enjoyer.insertedId.toString())
        }
        const response = await axios.get<UserResponse>(requestPath, {
            headers: header
        });
        expect(response.status).toBe(201);
        const userRes = response.data
        expect(userRes).toEqual(
            expect.objectContaining<UserEnjoyedVehiclesResponse>({
                userId: expect.any(Types.ObjectId),
                enjoyedVehicles: expect.any([Object])
            })
        )
    });

    // user with no enjoyed vehicles
    test("It should response GET method", async () => {
        const requestPath: string = baseUrl + "/users/@meh/enjoyedVehicles"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        const response = await axios.get(requestPath, {
            headers: header
        });

        const userRes = response.data

        expect(response.status).toBe(201);
        
        expect(userRes).toEqual(
            expect.objectContaining<UserEnjoyedVehiclesResponse>({
                userId: expect.any(Types.ObjectId),
                enjoyedVehicles: expect.any([Object])
            })
        )
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/users/@meh/enjoyedVehicles"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        const response = await axios.get(requestPath, {
            headers: header
        });
        const errRes = response.data
        expect(response.status).toBe(404);
        expect(errRes).toEqual(
            expect.objectContaining<ErrResponse>({
                timestamp: expect.any(Number),
                errorMessage: expect.any(String),
                requestPath: expect.any(String),
            })
        )
    });

});


describe("Test: DELETE /users/@meh", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let data: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        data = await mongoDbApi.insertUser(user)
    }), 

    afterEach(async () => {
        
    }), 

    test("It should response the DELETE method", async () => {
        const requestPath: string = baseUrl + "/users/@meh"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        const response = await axios.delete<UserResponse>(requestPath, {
            headers: header
        });
        expect(response.status).toBe(204);
        
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/users/@meh"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        const response = await axios.delete(requestPath, {
            headers: header
        });
        const errRes = response.data
        expect(response.status).toBe(404);
        expect(errRes).toEqual(
            expect.objectContaining<ErrResponse>({
                timestamp: expect.any(Number),
                errorMessage: expect.any(String),
                requestPath: expect.any(String),
            })
        )
    });

});

describe("Test: PATCH /users/@meh/nickname", () => {

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
        const requestPath: string = baseUrl + "/users/@meh/nickname"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        const response = await axios.patch<UserResponse>(
            requestPath, 
            {
                nickname: "AYO"
            }, 
            {
                headers: header
            }
        );
        expect(response.status).toBe(200);
        const userRes: {nickname: string} = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{nickname: string}>({
                nickname: expect.any(String),
            })
        )
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/users/@meh/nickname"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        const response = await axios.patch<UserResponse>(
            requestPath, 
            {
                nickname: "AYO"
            }, 
            {
                headers: header
            }
        );
        const errRes = response.data
        expect(response.status).toBe(404);
        expect(errRes).toEqual(
            expect.objectContaining<ErrResponse>({
                timestamp: expect.any(Number),
                errorMessage: expect.any(String),
                requestPath: expect.any(String),
            })
        )
    });

    // wrong nickname
    test("It should have response 400", async () => {
        const requestPath: string = baseUrl + "/users/@meh/nickname"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        const response = await axios.patch<UserResponse>(
            requestPath, 
            {
                nickname: undefined
            }, 
            {
                headers: header
            }
        );
        const errRes = response.data
        expect(response.status).toBe(400);
        expect(errRes).toEqual(
            expect.objectContaining<ErrResponse>({
                timestamp: expect.any(Number),
                errorMessage: expect.any(String),
                requestPath: expect.any(String),
            })
        )
    });

});




describe("Test: PATCH /users/@meh/email", () => {

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
        const requestPath: string = baseUrl + "/users/@meh/email"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        const response = await axios.patch<UserResponse>(
            requestPath, 
            {
                email: "AYO@ayo.com"
            }, 
            {
                headers: header
            }
        );
        expect(response.status).toBe(204);
        const userRes: {email: string} = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{email: string}>({
                email: expect.any(String),
            })
        )
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/users/@meh/email"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        const response = await axios.patch<UserResponse>(
            requestPath, 
            {
                email: "AYO@ayo.com"
            }, 
            {
                headers: header
            }
        );
        const errRes = response.data
        expect(response.status).toBe(404);
        expect(errRes).toEqual(
            expect.objectContaining<ErrResponse>({
                timestamp: expect.any(Number),
                errorMessage: expect.any(String),
                requestPath: expect.any(String),
            })
        )
    });

    // wrong email
    test("It should have response 400", async () => {
        const requestPath: string = baseUrl + "/users/@meh/email"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        const response = await axios.patch<UserResponse>(
            requestPath, 
            {
                nickname: undefined
            }, 
            {
                headers: header
            }
        );
        const errRes = response.data
        expect(response.status).toBe(400);
        expect(errRes).toEqual(
            expect.objectContaining<ErrResponse>({
                timestamp: expect.any(Number),
                errorMessage: expect.any(String),
                requestPath: expect.any(String),
            })
        )
    });

});



describe("Test: PATCH /users/@meh/password", () => {

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
        const requestPath: string = baseUrl + "/users/@meh/password"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        const response = await axios.patch<UserResponse>(
            requestPath, 
            {
                password: "AYO"
            }, 
            {
                headers: header
            }
        );
        expect(response.status).toBe(204);
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/users/@meh/password"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        const response = await axios.patch<UserResponse>(
            requestPath, 
            {
                password: "AYO"
            }, 
            {
                headers: header
            }
        );
        const errRes = response.data
        expect(response.status).toBe(404);
        expect(errRes).toEqual(
            expect.objectContaining<ErrResponse>({
                timestamp: expect.any(Number),
                errorMessage: expect.any(String),
                requestPath: expect.any(String),
            })
        )
    });

    // wrong psw
    test("It should have response 400", async () => {
        const requestPath: string = baseUrl + "/users/@meh/password"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        const response = await axios.patch<UserResponse>(
            requestPath, 
            {
                password: undefined
            }, 
            {
                headers: header
            }
        );
        const errRes = response.data
        expect(response.status).toBe(400);
        expect(errRes).toEqual(
            expect.objectContaining<ErrResponse>({
                timestamp: expect.any(Number),
                errorMessage: expect.any(String),
                requestPath: expect.any(String),
            })
        )
    });

});

