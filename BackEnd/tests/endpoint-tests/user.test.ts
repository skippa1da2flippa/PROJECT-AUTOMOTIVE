import mongoose, { Types } from "mongoose";
import { apiCredentials, MongoDbApi, MongoDbSingleInsertResponse } from "../utils/mongodb-api";
import { getUserData } from "../utils/user-helper";
import {createUser, User, UserDocument, UserModel, UserStatus} from "../../src/model/database/user";
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

export function setUpHeader(userId: string) {
    const tokensData: JwtData = {
        userId
    };

    const refreshToken = jsonWebToken.sign(tokensData, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: '2h',
    });

    const accessToken = generateAccessToken(tokensData.userId);

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


// TO DO in my vehicle anche se carico in modo giusto le macchine e i rispettivi
// owner, essi avranno come  my vehicle length === 0 producendo quindi un 404
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


// sarebbe giusto tutto solo che se provi a runnare le rispote sono giuste ma ti lancia un errore strano sulla to string all'interno
// dei node modules
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
                userId: expect.any(Types.ObjectId),
                enjoyedVehicles: expect.any([Object])
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
// "Cannot create field 'types' in element {docs: []}",
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


// return 500 (per colpa della save) come dio porco se spaccassi qualcosa, nel primo test quando provo ad addare mi da stom errore:
// "Cannot create field 'types' in element {docs: []}",

// nel secondo test sempre 500 (per colpa della save) mi da lo stesso problema di qua sopra e in più sembra che non trovi vehicleId
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
    }),

    afterEach(async () => {
        await mongoDbApi.deleteUser(udata.insertedId)
        await mongoDbApi.deleteMultipleVehicles(vehiclesIds)
        vehiclesIds = []
    }),

    // ?action=add
    test("It should response the PATCH method ?action=add", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/enjoyedVehicles"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        const param = {
            action: "add"
        }

        const response = await axios.patch(requestPath, {
            enjoyedVehicle:  vehiclesIds[0]
        },{
            headers: header,
            params: param
        });
        expect(response.status).toBe(204);
        const userRes = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{added: string}>({
                added: expect.any(String),
            })
        )
    });

    // ?action=remove
    test("It should response the PATCH method ?action=remove", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/enjoyedVehicles"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        const param = {
            action: "remove"
        }

        const response = await axios.patch(requestPath, {
            enjoyedVehicle:  vehiclesIds[0]
        },{
            headers: header,
            params: param
        });
        expect(response.status).toBe(204);
        const userRes = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{removed: string}>({
                removed: expect.any(String),
            })
        )
    });



    test("It should have response 404 (wrong userId)", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/enjoyedVehicles"
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

// RICORDA CHE LA .save() SE NON SONO STATE FATTE MODFIFICHE RITORNA UNA ECCEZIONI CHE PER NOI è UN INTERNAL SERVER ERROR (500)