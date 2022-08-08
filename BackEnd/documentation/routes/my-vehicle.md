# My Vehicle Endpoints Documentation

## Table of Contents


- [My Vehicle Endpoints Documentation](#myVehicle-endpoints-documentation)
    - [Table of Contents](#table-of-contents)
    - [Resources](#resources)
        - [Error](#error)
        - [User](#user)
        - [Vehicles](#vehicles)
    - [Endpoints](#endpoints)
        - [Retrieve a vehicle](#retrieve-vehicle)
            - [Url Parameters](#url-parameters)
            - [Example Response Body](#example-response-body)
        - [Retrieve vehicle owner](#retrieve-vehicle-owner)
            - [Url Parameters](#url-parameters)
            - [Example Response Body](#example-response-body)
        - [Retrieve vehicle enjoyers](#retrieve-vehicle-enjoyers)
            - [Url Parameters](#url-parameters)
            - [Example Response Body](#example-response-body)
        - [Create vehicle](#create-vehicle)
            - [Url Parameters](#url-parameters)
            - [Example Response Body](#example-response-body)
        - [Update vehicle enjoyers](#update-vehicle-enjoyers)
            - [Url Parameters](#url-parameters)
            - [Example Response Body](#example-response-body)
        - [Update vehicle owner](#update-vehicle-owner)
            - [Url Parameters](#url-parameters)
            - [Example Response Body](#example-response-body)
        - [Delete a vehicle](#delete-vehicle)
            - [Url Parameters](#url-parameters)
            - [Example Response Body](#example-response-body)
    

    
## Resources

### Error

| Attribute   | Data Type | Description                                       |
|:------------|:----------|:--------------------------------------------------|
| timestamp   | number    | Time (in Unix seconds) that the error occurred at |
| requestPath | string    | Path of the request that lead to this error       |
| errorMsg    | string    | Error message                                     |

### User

| Attribute | Data Type | Description          |
|:----------|:----------|:---------------------|
| userId    | string    | Id of the user       |
| name      | string    | name of the user     |
| surname   | string    | surname of the user  |
| email     | string    | email of the user    |
| nickname  | string    | nickname of the user |

### Vehicle

| Attribute  | Data Type | Description        |
|:-----------|:----------|:-------------------|
| vehicleId  | string    | Id of the vehicle  |
| owner      | User      | owner of the car   |
| status     | string    | vehicle status     |
| legalInfos | object    | vehicle legal info |
| enjoyers   | User[]    | vehicle enjoyers   |
| type       | string    | vehicle type       |


## Endpoints

### Retrieve a Vehicle

| Endpoint             | Method   | Description                                                          |
|:---------------------|:---------|:---------------------------------------------------------------------|
| /myVehicle/vehicleId | PATCH    | Retrieve the vehicle with the specified id (found inside the body)   |

#### Example Request Body

```json
{
    "vehicleId": "some id"
}
```

#### Example Response Body

##### Success

- Status Code: 201
- [Vehicle](#myVehicle) resource returned as the response has type Vehicle

```json
{
    "vehicleId": "vehicle._id",
    "type": "vehicle.type",
    "owner": {},
    "enjoyers": [],
    "legalInfos": {},
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

##### Error

- Status Codes: 404, 500
- [Error](#error) resource

```json
{
    "timestamp": 1651881600,
    "errorMessage": "some error message",
    "requestPath": "error/request/path"
}
```

### Retrieve a Vehicle owner

| Endpoint                   | Method   | Description                                                                      |
|:---------------------------|:---------|:---------------------------------------------------------------------------------|
| /myVehicle/vehicleId/owner | PATCH    | Retrieve the vehicle owner with the specified vehicle id (found inside the body) |

#### Example Request Body

```json
{
    "vehicleId": "some id"
}
```

#### Example Response Body

##### Success

- Status Code: 201

```json
{
  "userId": "user-id-1",
  "nickname": "nickname",
  "name": "nickname",
  "surname": "nickname",
  "status": "Online",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

##### Error

- Status Codes: 404, 500
- [Error](#error) resource

```json
{
    "timestamp": 1651881600,
    "errorMessage": "some error message",
    "requestPath": "error/request/path"
}
```

### Retrieve a Vehicle Enjoyers

| Endpoint                      | Method   | Description                                                                         |
|:------------------------------|:---------|:------------------------------------------------------------------------------------|
| /myVehicle/vehicleId/enjoyers | PATCH    | Retrieve the vehicle enjoyers with the specified vehicle id (found inside the body) |

#### Example Request Body

```json
{
    "vehicleId": "some id"
}
```

#### Example Response Body

##### Success

- Status Code: 201
- enjoyers Array of type [User]

```json
{
  "enjoyers": [],
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

##### Error

- Status Codes: 404, 500
- [Error](#error) resource

```json
{
    "timestamp": 1651881600,
    "errorMessage": "some error message",
    "requestPath": "error/request/path"
}
```


### Delete a Vehicle

| Endpoint                      | Method | Description                                                                  |
|:------------------------------|:-------|:-----------------------------------------------------------------------------|
| /myVehicle/:vehicleId         | DELETE | DELETE the vehicle with the specified vehicle id                             |

#### Url Parameters

| Name      | Data Type | Description |
|:----------|:----------|:------------|
| vehicleId | string    | vehicle id  |


#### Example Response Body

##### Success

- Status Code: 204

##### Error

- Status Codes: 404, 500
- [Error](#error) resource

```json
{
    "timestamp": 1651881600,
    "errorMessage": "some error message",
    "requestPath": "error/request/path"
}
```


### Create a Vehicle

| Endpoint            | Method | Description        |
|:--------------------|:-------|:-------------------|
| /myVehicle/create   | POST   | create new Vehicle |

#### Example Request Body

```json
{
  "type": "vehicle type",
  "owner": "ownerId",
  "legalInfos": {},
  "password": "some psw"
}
```

#### Example Response Body

##### Success

- Status Code: 200
- enjoyers Array of type [User]

```json
{
  "vehicleId": "some id",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

##### Error

- Status Codes: 500
- [Error](#error) resource

```json
{
    "timestamp": 1651881600,
    "errorMessage": "some error message",
    "requestPath": "error/request/path"
}
```

### Update Vehicle enjoyers

| Endpoint                              | Method | Description                                                                  |
|:--------------------------------------|:-------|:-----------------------------------------------------------------------------|
| /myVehicle/vehicleId/enjoyers?action= | PUT    | Update vehicle enjoyers array by adding or removing based on the query param |

#### Query Parameters

| Action | Effect                                                               |
|:-------|:---------------------------------------------------------------------|
| add    | add the user (found in the token) to the vehicle enjoyers array      |
| remove | remove the user (found in the token) from the vehicle enjoyers array |

#### Example Request Body

```json
{
    "vehicleId": "some id"
}
```
##### Success

#### Example Response Body

- If remove action would be requested:
- Status Code: 200

```json
{
  "removed": "enjoyerId",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

- If add action would be requested:
- Status Code: 204

##### Error

- Status Codes: 403, 404, 500
- [Error](#error) resource

```json
{
    "timestamp": 1651881600,
    "errorMessage": "some error message",
    "requestPath": "error/request/path"
}
```


### Update a Vehicle Owner

| Endpoint                   | Method | Description                                                                    |
|:---------------------------|:-------|:-------------------------------------------------------------------------------|
| /myVehicle/vehicleId/owner | PUT    | Change the vehicle owner with the specified vehicle id (found inside the body) |

#### Example Request Body

```json
{
    "vehicleId": "some id",
    "newOwner": "some id"
}
```

#### Example Response Body

##### Success

- Status Code: 204

##### Error

- Status Codes: 404, 500
- [Error](#error) resource

```json
{
    "timestamp": 1651881600,
    "errorMessage": "some error message",
    "requestPath": "error/request/path"
}
```