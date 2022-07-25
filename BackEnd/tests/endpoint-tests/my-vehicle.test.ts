import {apiCredentials, MongoDbApi, MongoDbSingleInsertResponse} from "../utils/mongodb-api";
import {ModelTypes, projectVehicle} from "../../src/model/database/my-vehicle";
import {getVehicleData, insertManyVehicles} from "../utils/my-vehicle-helper";
import mongoose, { Types } from "mongoose";
import {baseUrl, ErrResponse, setUpHeader} from "./user.test";
import axios from "axios";
import {User} from "../../src/model/database/user";
import {getUserData} from "../utils/user-helper";

interface BaseVehicleResponse {
    vehicleId: string
    type: ModelTypes
}

interface GetVehicleResponse extends BaseVehicleResponse {
    owner: string
    enjoyers: string[]
    legalInfos: Object
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

describe("Test: PATCH /myVehicle/@it/saucer/routines", () => {
    let mongoDbApi: MongoDbApi
    let vehicle: projectVehicle
    let data: MongoDbSingleInsertResponse
    let udata: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        vehicle = getVehicleData(new Types.ObjectId())
        data = await mongoDbApi.insertVehicle(vehicle)
        udata = await mongoDbApi.insertUser(getUserData())
    })

    afterEach(async () => {
        await mongoDbApi.deleteVehicle(data.insertedId)
    })

    test("It should respond to the PATCH method", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/@it/saucer/routines"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        const response = await axios.patch(
            requestPath,
            {
                saucerId: udata.insertedId
            },
            {
                headers: header
            }
        );
        expect(response.status).toBe(201);
    })

    test("It should return 404 (wrong user)", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/@it/saucer/routines"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        try {
            await axios.patch(
                requestPath,
                {
                    saucerId: new Types.ObjectId()
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


    test("It should response the PATCH method", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId"
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
        const userRes: GetVehicleResponse = response.data
        expect(userRes).toEqual(
            expect.objectContaining<GetVehicleResponse>({
                vehicleId: expect.any(String),
                type: expect.any(String),
                owner: expect.any(String),
                enjoyers: expect.any(Array<string>),
                legalInfos: expect.any(Object)
            })
        )
    });

    // wrong userId
    test("It should have response 404 (wrong userId )", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId"
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
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId"
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

describe("Test: PATCH /myVehicle/vehicleId/owner", () => {

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


        test("It should response the PATCH method", async () => {
            const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/owner"
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
            const userRes: { owner: string } = response.data
            expect(userRes).toEqual(
                expect.objectContaining<{ owner: string }>({
                    owner: expect.any(String)
                })
            )
        });

    // wrong userId
    test("It should have response 404 (wrong userId )", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/owner"
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
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/owner"
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


describe("Test: PATCH /myVehicle/vehicleId/enjoyers", () => {

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


    test("It should response the PATCH method", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/enjoyers"
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
        const userRes: { enjoyers: string[] } = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{enjoyers: string[]}>({
                enjoyers: expect.any(Array<string>)
            })
        )
    });

    // wrong userId
    test("It should have response 404 (wrong userId )", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/enjoyers"
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
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/enjoyers"
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

describe("Test: DELETE /myVehicle/:vehicleId", () => {

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
        }),


        test("It should response the DELETE method", async () => {
            const requestPath: string = baseUrl + `/api/myVehicle/${ vdata.insertedId }`
            let response
            const header = {
                "authorization" : setUpHeader(data.insertedId.toString())
            }

            response = await axios.delete(requestPath, {
                headers: header
            });

            expect(response.status).toBe(204);
        });

    // wrong userId
    test("It should have response 404 (wrong userId)", async () => {
        const requestPath: string = baseUrl + `/api/myVehicle/${ vdata.insertedId }`
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

    test("It should have response 404 (wrong vehicle)", async () => {
        const requestPath: string = baseUrl + `/api/myVehicle/${ new Types.ObjectId() }`
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


describe("Test: POST /myVehicle/create", () => {

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
    }),

    afterEach(async () => {
        await mongoDbApi.deleteUser(data.insertedId)
    }),


    test("It should response the POST method", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/create"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.post(requestPath, {
            type: vehicle.type,
            owner: vehicle.owner,
            legalInfos: vehicle.legalInfos,
            password: "TEST"
        },{
            headers: header
        });

        expect(response.status).toBe(200);
        const userRes: { vehicleId: string } = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{ vehicleId: string }>({
                vehicleId: expect.any(String)
            })
        )
    });

    // wrong userId
    test("It should have response 404 (wrong userId )", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/create"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.post<ErrResponse>(requestPath, {
                type: vehicle.type,
                owner: vehicle.owner,
                legalInfos: vehicle.legalInfos,
                password: "TEST"
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

// TO DO finchè non fai qualcosa per i test di socket i primi due test non vanno
describe("Test: PUT /myVehicle/vehicleId/enjoyers", () => {

    let mongoDbApi: MongoDbApi
    let vehicle: projectVehicle
    let vdata: MongoDbSingleInsertResponse
    let udata: MongoDbSingleInsertResponse
    let user: User
    let enjoyerId: Types.ObjectId

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        enjoyerId = new Types.ObjectId()
        vehicle = getVehicleData(new Types.ObjectId(), enjoyerId)
        user = getUserData()
        vdata = await mongoDbApi.insertVehicle(vehicle)
        udata = await mongoDbApi.insertUser(getUserData())
    }),

    afterEach(async () => {
        await mongoDbApi.deleteVehicle(vdata.insertedId)
        await mongoDbApi.deleteUser(udata.insertedId)
    })

    // ?action=add
    test("It should response the PUT method ?action=add", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/enjoyers"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        const param = {
            action: "add"
        }

        const response = await axios.put(requestPath, {
            vehicleId: vdata.insertedId,
            enjoyerId: udata.insertedId,
            enjoyerName: user.name,
            enjoyerSurname: user.surname
        },{
            headers: header,
            params: param
        });
        expect(response.status).toBe(200);
        const vehicleRes = response.data
        expect(vehicleRes).toEqual(
            expect.objectContaining<{added: string}>({
                added: expect.any(String),
            })
        )
    });

    // ?action=remove
    test("It should response the PUT method ?action=remove", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/enjoyers"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        const param = {
            action: "remove"
        }

        const response = await axios.put(requestPath, {
            vehicleId: vdata.insertedId,
            enjoyerId: enjoyerId,
            enjoyerName: "name",
            enjoyerSurname: "surname"
        },{
            headers: header,
            params: param
        });
        expect(response.status).toBe(200);
        const vehicleRes = response.data
        expect(vehicleRes).toEqual(
            expect.objectContaining<{removed: string}>({
                removed: expect.any(String),
            })
        )
    });

    // ?action=add
    test("It should response 400", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/enjoyers"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        const param = {
            action: "add"
        }

        try {
            await axios.put(requestPath, {
                vehicleId: vdata.insertedId,
                enjoyerId: enjoyerId,
                enjoyerName: user.name,
                enjoyerSurname: user.surname
            },{
                headers: header,
                params: param
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

    test("It should have response 404 (wrong userId)", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/enjoyers"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            const param = {
                action: "remove"
            }

            await axios.patch(requestPath, {
                vehicleId: vdata.insertedId,
                enjoyerId: enjoyerId,
                enjoyerName: "name",
                enjoyerSurname: "surname"
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

    // ?action=remove
    test("It should have response 404 (enjoyer not included)", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/enjoyers"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        try {
            const param = {
                action: "remove"
            }

            await axios.patch(requestPath, {
                vehicleId: vdata.insertedId,
                enjoyerId: udata.insertedId,
                enjoyerName: "name",
                enjoyerSurname: "surname"
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



describe("Test: PUT /myVehicle/vehicleId/owner", () => {

    let mongoDbApi: MongoDbApi
    let vehicle: projectVehicle
    let vdata: MongoDbSingleInsertResponse
    let udata: MongoDbSingleInsertResponse
    let user: User
    let enjoyerId: Types.ObjectId

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        enjoyerId = new Types.ObjectId()
        vehicle = getVehicleData(enjoyerId)
        user = getUserData()
        vdata = await mongoDbApi.insertVehicle(vehicle)
        udata = await mongoDbApi.insertUser(getUserData())
    })

    afterEach(async () => {
        await mongoDbApi.deleteVehicle(vdata.insertedId)
        await mongoDbApi.deleteUser(udata.insertedId)
    })

    test("It should response the PUT method", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/owner"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }

        const response = await axios.put(requestPath, {
            vehicleId: vdata.insertedId,
            newOwner: udata.insertedId
        },{
            headers: header,
        });
        expect(response.status).toBe(204);
    });

    test("It should have response 400 (same owner)", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/owner"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        try {
            await axios.put(requestPath, {
                vehicleId: vdata.insertedId,
                newOwner: enjoyerId
            },{
                headers: header,
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

    test("It should have response 404 (non existing car)", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/owner"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        try {
            await axios.put(requestPath, {
                vehicleId: new Types.ObjectId(),
                newOwner: enjoyerId
            },{
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



    test("It should have response 404 (wrong userId)", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/owner"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.patch(requestPath, {
                vehicleId: vdata.insertedId,
                newOwner: udata.insertedId
            },{
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

    test("It should have response 404 (enjoyer not included)", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/vehicleId/enjoyers"
        const header = {
            "authorization" : setUpHeader(udata.insertedId.toString())
        }
        try {
            const param = {
                action: "remove"
            }

            await axios.patch(requestPath, {
                vehicleId: vdata.insertedId,
                enjoyerId: udata.insertedId,
                enjoyerName: "name",
                enjoyerSurname: "surname"
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








