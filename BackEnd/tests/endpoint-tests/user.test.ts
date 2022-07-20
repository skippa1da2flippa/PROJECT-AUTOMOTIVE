import mongoose, { Types } from "mongoose";
import { apiCredentials, MongoDbApi, MongoDbSingleInsertResponse } from "../utils/mongodb-api";
import { getUserData } from "../utils/user-helper";
import {User, UserModel, UserStatus} from "../../src/model/database/user";
import axios, { AxiosRequestConfig } from "axios";
import { JwtData } from "../../src/model/auth/jwt-data";
import { jsonWebToken} from "../../src/routes/auth-routes";
import { generateAccessToken } from "../../src/routes/auth-routes";
import { insertManyVehicles } from "../utils/my-vehicle-helper";
import {projectVehicleDocument} from "../../src/model/database/my-vehicle";



interface UserResponse {
    userId: string,
    nickname: string,
    name: string,
    surname: string,
    email: string,
}

interface UserMyVehiclesResponse {
    userId: string,
    myVehicles: projectVehicleDocument[]
}

interface UserEnjoyedVehiclesResponse {
    userId: string,
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
        const requestPath: string = baseUrl + "/api/users/@meh"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.get<UserResponse>(requestPath, {
            headers: header
        });

        expect(response.status).toBe(201);
        const userRes: UserResponse = response.data
        expect(userRes).toEqual(
            expect.objectContaining<UserResponse>({
                userId: expect.any(String),
                nickname: expect.any(String),
                name: expect.any(String),
                surname: expect.any(String),
                email: expect.any(String),
            })
        )
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh"
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


// TO DO sia su enjoyed vehicle che su my vehicle anche se carico in modo giusto le macchine e i rispettivi
// owner, essi avranno come enjoyed vehicle length e my vehicle length === 0 producendo quindi un 404


describe("Test: GET /api/users/@meh/myVehicles", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let udata: MongoDbSingleInsertResponse
    let vehiclesIds: Types.ObjectId[] = []

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        udata = await mongoDbApi.insertUser(user)
        let userId = (
            udata.insertedId instanceof Types.ObjectId 
                ? udata.insertedId 
                : new Types.ObjectId(udata.insertedId)
        )

        console.log("prima insert vehicles, userId " + userId)
        await insertManyVehicles(userId, 2, vehiclesIds)
        console.log("DOPO LA INSERT VEHICLES")
    }), 

    afterEach(async () => {
        await mongoDbApi.deleteUser(udata.insertedId)
        await mongoDbApi.deleteMultipleVehicles(vehiclesIds)
    }), 

    test("It should response the GET method", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/myVehicles"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        const response = await axios.get(requestPath, {
            headers: header
        });
        expect(response.status).toBe(201);
        const userRes = response.data
        expect(userRes).toEqual(
            expect.objectContaining<UserMyVehiclesResponse>({
                userId: expect.any(String),
                myVehicles: expect.any([Object])
            })
        )
    });

     // user with no vehicles
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/myVehicles"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        await mongoDbApi.deleteMultipleVehicles(vehiclesIds)
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

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/myVehicles"
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



describe("Test: GET /api/users/@meh/enjoyedVehicles", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let udata: MongoDbSingleInsertResponse
    let vehiclesIds: Types.ObjectId[] = []

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        udata = await mongoDbApi.insertUser(user)
        let userId = (
            udata.insertedId instanceof Types.ObjectId 
                ? udata.insertedId 
                : new Types.ObjectId(udata.insertedId)
        )

        await insertManyVehicles(userId, 2, vehiclesIds, userId)
    }), 

    afterEach(async () => {
        await mongoDbApi.deleteUser(udata.insertedId)
        await mongoDbApi.deleteMultipleVehicles(vehiclesIds)
    }), 

    test("It should response the GET method", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/enjoyedVehicles"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        const response = await axios.get(requestPath, {
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
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/enjoyedVehicles"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        await mongoDbApi.deleteMultipleVehicles(vehiclesIds)

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

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/enjoyedVehicles"
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


describe("Test: DELETE /api/users/@meh", () => {

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
        const requestPath: string = baseUrl + "/api/users/@meh"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        const response = await axios.delete(requestPath, {
            headers: header
        });
        expect(response.status).toBe(204);
        
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh"
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

});

describe("Test: PATCH /api/users/@meh/nickname", () => {

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
        const requestPath: string = baseUrl + "/api/users/@meh/nickname"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        const response = await axios.patch(
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
        const requestPath: string = baseUrl + "/api/users/@meh/nickname"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.patch(
                requestPath,
                {
                    nickname: "AYO"
                },
                {
                    headers: header
                }
            );
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

    // wrong nickname
    test("It should have response 400", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/nickname"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        try {
            await axios.patch(
                requestPath,
                {
                    nickname: undefined
                },
                {
                    headers: header
                }
            );
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

});



// TO DO primo test ritorna 500 (internal server error) come se spaccassimo qualche invariante del database
describe("Test: PATCH /api/users/@meh/email", () => {

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
        const requestPath: string = baseUrl + "/api/users/@meh/email"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        const response = await axios.patch(
            requestPath, 
            {
                email: "AY@ayo.com"
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
        const requestPath: string = baseUrl + "/api/users/@meh/email"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.patch(
                requestPath,
                {
                    email: "AYO@ayo.com"
                },
                {
                    headers: header
                }
            );
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

    // wrong email
    test("It should have response 400", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/email"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        try {
            await axios.patch(
                requestPath,
                {
                    email: undefined
                },
                {
                    headers: header
                }
            );
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

});


// TO DO primo test produce sto errore:
// 'Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer',
describe("Test: PATCH /api/users/@meh/password", () => {

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
        const requestPath: string = baseUrl + "/api/users/@meh/password"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        const response = await axios.patch(
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
        const requestPath: string = baseUrl + "/api/users/@meh/password"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.patch(
                requestPath,
                {
                    password: "ayo"
                },
                {
                    headers: header
                }
            );
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

    // wrong psw
    test("It should have response 400", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/password"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        try {
            await axios.patch(
                requestPath,
                {
                    password: undefined
                },
                {
                    headers: header
                }
            );
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
});

