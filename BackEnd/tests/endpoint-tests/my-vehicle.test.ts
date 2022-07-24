import {apiCredentials, MongoDbApi, MongoDbSingleInsertResponse} from "../utils/mongodb-api";
import {ModelTypes, projectVehicle} from "../../src/model/database/my-vehicle";
import {getVehicleData} from "../utils/my-vehicle-helper";
import mongoose, { Types } from "mongoose";
import {baseUrl, ErrResponse, setUpHeader} from "./user.test";
import axios from "axios";
import {User} from "../../src/model/database/user";
import {getUserData} from "../utils/user-helper";

interface BaseVehicleResponse {
    vehicleId: string
    type: ModelTypes
}

describe("Test: GET /myVehicle/@it", () => {
    let mongoDbApi: MongoDbApi
    let vehicle: projectVehicle
    let data: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        vehicle = getVehicleData(new Types.ObjectId())
        data = await mongoDbApi.insertVehicle(vehicle)
    })

    afterEach(async () => {
        await mongoDbApi.deleteVehicle(data.insertedId)
    })

    test("It should respond to the GET method", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/@it"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        let response = await axios.get<BaseVehicleResponse>(requestPath, {
            headers: header
        });

        expect(response.status).toBe(201);
        const vehicleRes: BaseVehicleResponse = response.data
        expect(vehicleRes).toEqual(
            expect.objectContaining<BaseVehicleResponse>({
                vehicleId: expect.any(String),
                type: expect.any(String), // TO DO check if the type is correct
            })
        )
    })

    test("It should return 404", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/@it"
        const header = {
            "authorization" : setUpHeader("AYO")
        }

        try {
            await axios.get<ErrResponse>(requestPath, {
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


describe("Test: GET /myVehicle/@it/owner", () => {
    let mongoDbApi: MongoDbApi
    let vehicle: projectVehicle
    let data: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        vehicle = getVehicleData(new Types.ObjectId())
        data = await mongoDbApi.insertVehicle(vehicle)
    })

    afterEach(async () => {
        await mongoDbApi.deleteVehicle(data.insertedId)
    })

    test("It should respond to the GET method", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/@it/owner"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        let response = await axios.get(requestPath, {
            headers: header
        });

        expect(response.status).toBe(201);
        const vehicleRes: { owner: string } = response.data
        expect(vehicleRes).toEqual(
            expect.objectContaining<{ owner: string }>({
                owner: expect.any(String),
            })
        )
    })

    test("It should return 404", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/@it/owner"
        const header = {
            "authorization" : setUpHeader("AYO")
        }

        try {
            await axios.get<ErrResponse>(requestPath, {
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


describe("Test: GET /myVehicle/@it/enjoyers", () => {
    let mongoDbApi: MongoDbApi
    let vehicle: projectVehicle
    let data: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        vehicle = getVehicleData(new Types.ObjectId(), new Types.ObjectId())
        data = await mongoDbApi.insertVehicle(vehicle)
    })

    afterEach(async () => {
        await mongoDbApi.deleteVehicle(data.insertedId)
    })

    test("It should respond to the GET method", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/@it/enjoyers"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        let response = await axios.get(requestPath, {
            headers: header
        });

        expect(response.status).toBe(201);
        const vehicleRes: { enjoyers: string[] } = response.data
        expect(vehicleRes).toEqual(
            expect.objectContaining<{ enjoyers: string[] }>({
                enjoyers: expect.any(Array),
            })
        )
    })

    test("It should return 404", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/@it/enjoyers"
        const header = {
            "authorization" : setUpHeader("AYO")
        }

        try {
            await axios.get<ErrResponse>(requestPath, {
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

describe("Test: PATCH /myVehicle/@it/password", () => {
    let mongoDbApi: MongoDbApi
    let vehicle: projectVehicle
    let data: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        vehicle = getVehicleData(new Types.ObjectId())
        data = await mongoDbApi.insertVehicle(vehicle)
    })

    afterEach(async () => {
        await mongoDbApi.deleteVehicle(data.insertedId)
    })

    test("It should respond to the PATCH method", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/@it/password"
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
    })

    test("It should return 404 (wrong user)", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/@it/password"
        const header = {
            "authorization" : setUpHeader("AYO")
        }

        try {
            await axios.patch(
                requestPath,
                {
                    password: "AYO"
                },
                {
                    headers: header
                }
            );
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

    test("It should have response 400", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/@it/password"
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

describe("Test: PATCH /myVehicle/vehicleId", () => {

    let mongoDbApi: MongoDbApi
    let user: User
    let data: MongoDbSingleInsertResponse
    let vdata: MongoDbSingleInsertResponse
    let vehicle: projectVehicle

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        user = getUserData()
        data = await mongoDbApi.insertUser(user)
        vehicle = getVehicleData(new Types.ObjectId())
        vdata = await mongoDbApi.insertVehicle(vehicle)
    }),

    afterEach(async () => {
        await mongoDbApi.deleteUser(data.insertedId)
        await mongoDbApi.deleteVehicle(vdata.insertedId)
    }),


    test("It should response the GET method", async () => {
        const requestPath: string = baseUrl + "/myVehicle/vehicleId"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.patch(requestPath, {
            vehicleId: vdata.insertedId
        },{
            headers: header
        });

        expect(response.status).toBe(201);
        const userRes: { vehicleId: string } = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{ vehicleId: string }>({
                vehicleId: expect.any(String)
            })
        )
    });

    // wrong userId
    test("It should have response 404 (wrong userId )", async () => {
        const requestPath: string = baseUrl + "/myVehicle/vehicleId"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.patch<ErrResponse>(requestPath, {
                vehicleId: vdata.insertedId
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

    test("It should have response 404 (wrong vehicle)", async () => {
        const requestPath: string = baseUrl + "/myVehicle/vehicleId"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }
        try {
            await axios.patch<ErrResponse>(requestPath, {
                vehicleId: new Types.ObjectId()
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

