import {apiCredentials, MongoDbApi, MongoDbSingleInsertResponse} from "../utils/mongodb-api";
import {User} from "../../src/model/database/user";
import {getUserData} from "../utils/user-helper";
import axios from "axios";
import {baseUrl, ErrResponse, setUpHeader} from "./user.test";
import {Notification} from "../../src/model/database/notification"
import {NotificationData} from "../../src/model/events/notification-data";
import {projectVehicle} from "../../src/model/database/my-vehicle";
import {getVehicleData} from "../utils/my-vehicle-helper";
import {Types} from "mongoose";


describe("Test: GET /users/@meh/notifications", () => {

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
        const requestPath: string = baseUrl + "/api/users/@meh/notifications"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.get(requestPath, {
            headers: header
        });

        expect(response.status).toBe(201);
        const userRes: {notifications:Notification[], accessToken: string} = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{notifications:Notification[], accessToken: string}>({
                notifications: expect.any(Array<Notification>),
                accessToken: expect.any(String)
            })
        )
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/notifications"
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


describe("Test: POST /users/@meh/notifications", () => {

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


    test("It should response the POST method", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/notifications"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.post(requestPath, {
            type: "friendRequest",
            receiver: data.insertedId
        },{
            headers: header
        });

        expect(response.status).toBe(201);
        const userRes = response.data
        expect(userRes).toEqual(
            expect.objectContaining<{ notificationData:NotificationData, accessToken: string }>({
                notificationData: expect.any(Object),
                accessToken: expect.any(String)
            })
        )
    });

    // wrong userId
    test("It should have response 400", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/notifications"
        const header = {
            "authorization": setUpHeader(data.insertedId.toString())
        }
        try {
            await axios.post<ErrResponse>(requestPath, {
                type: undefined,
                receiver: data.insertedId
            }, {
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

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/notifications"
        const header = {
            "authorization" : setUpHeader("AYO")
        }
        try {
            await axios.post<ErrResponse>(requestPath, {
                type: "friendRequest",
                receiver: data.insertedId
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


describe("Test: DELETE /users/@meh/notifications", () => {

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
    })


    test("It should response the DELETE method", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/notifications/" + "friendRequest"
        let response
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        response = await axios.delete(requestPath, {
            headers: header
        });

        expect(response.status).toBe(204);
        const userRes: {notifications:Notification[]} = response.data
    });

    // wrong userId
    test("It should have response 404", async () => {
        const requestPath: string = baseUrl + "/api/users/@meh/notifications/" + "friendRequest"
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


describe("Test: POST /myVehicle/@it/user/notifications", () => {
    let mongoDbApi: MongoDbApi
    let vehicle: projectVehicle
    let data: MongoDbSingleInsertResponse
    let user: User
    let udata: MongoDbSingleInsertResponse

    beforeEach(async () => {
        mongoDbApi = new MongoDbApi(apiCredentials)
        vehicle = getVehicleData(new Types.ObjectId())
        data = await mongoDbApi.insertVehicle(vehicle)
        user = getUserData()
        udata = await mongoDbApi.insertUser(user)
    })

    afterEach(async () => {
        await mongoDbApi.deleteVehicle(data.insertedId)
        await mongoDbApi.deleteUser(udata.insertedId)
    })

    test("It should respond to the POST method", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/@it/user/notifications"
        const header = {
            "authorization" : setUpHeader(data.insertedId.toString())
        }

        let response = await axios.post(requestPath, {
            type: "friendRequest",
            receiver: udata.insertedId
        },{
            headers: header
        });

        expect(response.status).toBe(201);
        const vehicleRes: NotificationData = response.data
        expect(vehicleRes).toEqual(
            expect.objectContaining<NotificationData>({
                type: expect.any(String), // TO DO check if the type is correct
                sender: expect.any(String)
            })
        )
    })

    test("It should return 404", async () => {
        const requestPath: string = baseUrl + "/api/myVehicle/@it/user/notifications"
        const header = {
            "authorization" : setUpHeader("AYO")
        }

        try {
            await axios.post(requestPath, {
                type: "friendRequest",
                receiver: udata.insertedId
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
})







