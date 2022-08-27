import { Types } from "mongoose";
import { apiCredentials, MongoDbApi, MongoDbSingleInsertResponse } from "../utils/mongodb-api";
import { getUserData } from "../utils/user-helper";
import {User} from "../../src/model/database/user";
import axios from "axios";
import { JwtData } from "../../src/model/auth/jwt-data";
import { jsonWebToken} from "../../src/routes/auth-routes";
import { generateAccessToken } from "../../src/routes/auth-routes";
import { insertManyVehicles } from "../utils/my-vehicle-helper";
import {projectVehicle} from "../../src/model/database/my-vehicle";
import {pool} from "../../src";
import {toUnixSeconds} from "../../src/routes/utils/date-utils";



interface UserResponse {
    userId: string,
    nickname: string,
    name: string,
    surname: string,
    email: string,
    accessToken: string
}

interface UserMyVehiclesResponse {
    userId: string,
    myVehicles: projectVehicle[]
    accessToken: string
}

interface UserEnjoyedVehiclesResponse {
    userId: string,
    enjoyedVehicles: projectVehicle[]
    accessToken: string
}

export interface ErrResponse {
    timestamp: number,
    errorMessage: string,
    requestPath: string,
}

export function setUpHeader(Id: string) {
    const tokensData: JwtData = {
        Id: Id
    };

    const refreshToken = jsonWebToken.sign(tokensData, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: '2h',
    });

    const accessToken = generateAccessToken(tokensData.Id);

    return `${refreshToken},${accessToken}`;
}

export const baseUrl: string = "http://" + process.env.HOST + ":" + process.env.PORT



describe("Test: GET /users/@meh", () => {

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
                accessToken: expect.any(String)
            })
        )
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh"
        const header = {
            "authorization" : setUpHeader("AYO") //new Types.ObjectId().toString())
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

    // banned token
    test("It should have response 403", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        let tedis = await pool.getTedis()

        await tedis.set(header.authorization.split(",")[0], toUnixSeconds(new Date()).toString())

        pool.putTedis(tedis)

        try {
            await axios.get<ErrResponse>(requestPath, {
                headers: header
            });
        } catch(err) {
            expect(err.response.status).toBe(403);
        }
    });

});

describe("Test: GET /users/@meh/friends", () => {

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
        const requestPath: string = baseUrl + "/api/users/@meh/friends"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.get(requestPath, {
            headers: header
        });

        expect(response.status).toBe(201);
        const userRes: { friends: User[], accessToken: string } = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{ friends: User[], accessToken: string }>({
                friends: expect.any(Array<User>),
                accessToken: expect.any(String)
            })
        )
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/friends"
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




describe("Test: GET /api/users/@meh/myVehicles", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let udata: MongoDbSingleInsertResponse
    let vehiclesIds: Types.ObjectId[] = []

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        udata = await mongoDbApi.insertUser(user)
        let userId =  new Types.ObjectId(udata.insertedId)
        await insertManyVehicles(userId, 2, vehiclesIds)
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
                  myVehicles: expect.any(Array),
                 accessToken: expect.any(String)
             })
        )

    });

     // user with no vehicles
    test("It should have response 404 (no vehicles)", async () => {
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
    test("It should have response 404 (wrong user)", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/myVehicles"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.get<ErrResponse>(requestPath, {
                headers: header,
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
        await insertManyVehicles(new Types.ObjectId(), 2, vehiclesIds)
        user = getUserData(vehiclesIds)
        udata = await mongoDbApi.insertUser(user)
    }),

    afterEach(async () => {
        await mongoDbApi.deleteUser(udata.insertedId)
        await mongoDbApi.deleteMultipleVehicles(vehiclesIds)
        vehiclesIds = []
    }),

    test("It should response the GET method", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/enjoyedVehicles"
        const header = {
            "authorization" : setUpHeader(udata.insertedId as string)
        }
        const response = await axios.get(requestPath, {
            headers: header
        });
        expect(response.status).toBe(201);
        const userRes = response.data
        expect(userRes).toEqual(
            expect.objectContaining<UserEnjoyedVehiclesResponse>({
                enjoyedVehicles: expect.any(Array),
                userId: expect.any(String),
                accessToken: expect.any(String)
            })
        )
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
        const userRes: {nickname: string, accessToken: string} = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{nickname: string, accessToken: string}>({
                nickname: expect.any(String),
                accessToken: expect.any(String)
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
        expect(response.status).toBe(200);
        const userRes: {email: string, accessToken: string} = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{email: string, accessToken: string}>({
                email: expect.any(String),
                accessToken: expect.any(String)
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



describe("Test: PATCH /api/users/@meh/enjoyedVehicles", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let udata: MongoDbSingleInsertResponse
    let vehiclesIds: Types.ObjectId[] = []

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        await insertManyVehicles(new Types.ObjectId(), 2, vehiclesIds)
        user = getUserData(vehiclesIds)
        udata = await mongoDbApi.insertUser(user)
    })

    afterEach(async () => {
        await mongoDbApi.deleteUser(udata.insertedId)
        await mongoDbApi.deleteMultipleVehicles(vehiclesIds)
        vehiclesIds = []
    })

    // ?action=remove
    test("It should response the PATCH method ?action=remove", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/enjoyedVehicles/remove"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }

        const response = await axios.patch(requestPath, {
            enjoyedVehicle:  vehiclesIds[0]
        },{
            headers: header,
        });
        expect(response.status).toBe(200);
        const userRes = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{removed: string, accessToken: string}>({
                removed: expect.any(String),
                accessToken: expect.any(String)
            })
        )
    });

    test("It should have response 404 (wrong userId)", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/enjoyedVehicles/remove"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            const param = {
                action: "remove"
            }

            await axios.patch(requestPath, {
                enjoyedVehicle:  vehiclesIds[0]
            },{
                headers: header,
                params: param
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

