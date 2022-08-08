# Project Vehicle Endpoints Documentation

## Table of Contents

- [Project Vehicle Endpoints Documentation](#projectVehicle-endpoints-documentation)
    - [Table of Contents](#table-of-contents)
    - [Resources](#resources)
        - [Error](#error)
        - [User](#user)
        - [Routine](#routine)
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
        - [Retrieve vehicle user routines](#retrieve-vehicle-user-routines)
            - [Url Parameters](#url-parameters)
            - [Example Response Body](#example-response-body)
        - [Add a routine to vehicle user routines](#add-routine-to-vehicle-user-routines)
            - [Url Parameters](#url-parameters)
            - [Example Response Body](#example-response-body)
        - [Update vehicle password](#update-vehicle-password)
            - [Url Parameters](#url-parameters)
            - [Example Response Body](#example-response-body)
        - [Vehicle Login](#vehicle-login)
            - [Example Request Body](#example-request-body-1)
            - [Example Response Body](#example-response-body-1)
        - [Vehicle Logout](#vehicle-logout)
            - [Example Request Body](#example-request-body-1)
            - [Example Response Body](#example-response-body-1)


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

### Routine

| Attribute   | Data Type | Description                |
|:------------|:----------|:---------------------------|
| name        | string    | name of the routine        |
| temperature | number    | temperature of the routine |
| lightsColor | string    | lightsColor of the routine |
| music       | string[]  | music of the routine       |
| path        | any       | path of the routine        |

# Endpoints 

### Retrieve it

| Endpoint       | Method | Description                                                         |
|:---------------|:-------|:--------------------------------------------------------------------|
| /myVehicle/@it | GET    | Retrieve the vehicle with the specified id (found inside the token) |


#### Example Response Body

##### Success

- Status Code: 201

```json
{
   "vehicleId": "some id",
    "type": "vehicle model",
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

### Retrieve the owner

| Endpoint             | Method | Description                                                               |
|:---------------------|:-------|:--------------------------------------------------------------------------|
| /myVehicle/@it/owner | GET    | Retrieve the vehicle owner with the specified id (found inside the token) |


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

### Retrieve the Enjoyers

| Endpoint                | Method | Description                                                                  |
|:------------------------|:-------|:-----------------------------------------------------------------------------|
| /myVehicle/@it/enjoyers | GET    | Retrieve the vehicle enjoyers with the specified id (found inside the token) |


#### Example Response Body

##### Success

- Status Code: 201
- enjoyers is an array of type [User]

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

### Retrieve routines of a user

| Endpoint                       | Method | Description                                                |
|:-------------------------------|:-------|:-----------------------------------------------------------|
| /myVehicle/@it/saucer/routines | PATCH  | Retrieve the routines of a vehicle user (owner or enjoyer) |

#### Example Request Body

```json
{
    "saucerId": "some id"
}
```

#### Example Response Body

##### Success

- Status Code: 201
- routines is an array of type [Routine]

```json
{
  "routines": [],
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

### Add routine to a user

| Endpoint                       | Method | Description             |
|:-------------------------------|:-------|:------------------------|
| /myVehicle/@it/saucer/routines | POST   | add a routine to a user |

#### Example Request Body

```json
{
    "saucerId": "some id",
    "name": "name",
    "temperature": 20,
    "path": "path",
    "lightsColor": "lightsColor",
    "music": [""]
}
```

#### Example Response Body

##### Success

- Status Code: 204


##### Error

- Status Codes: 400, 404, 500
- [Error](#error) resource

```json
{
    "timestamp": 1651881600,
    "errorMessage": "some error message",
    "requestPath": "error/request/path"
}
```

### Update vehicle password

| Endpoint                | Method | Description             |
|:------------------------|:-------|:------------------------|
| /myVehicle/@it/password | PATCH  | update vehicle password |

#### Example Request Body

```json
{
    "password": "some psw"
}
```

#### Example Response Body

##### Success

- Status Code: 204


##### Error

- Status Codes: 400, 404, 500
- [Error](#error) resource

```json
{
    "timestamp": 1651881600,
    "errorMessage": "some error message",
    "requestPath": "error/request/path"
}
```

### Vehicle Log in

| Endpoint                   | Method | Description                              |
|:---------------------------|:-------|:-----------------------------------------|
| /api/auth/myVehicle/signin | POST   | log in a vehicle using VehicleLogIn data |

#### Example Request Body

[VehicleLoginInfo](#Vehiclelogininfo) resource containing the information required to register to the system

```json
{
  "vehicleId": "vehicle-id",
  "password": "password"
}
```

#### Example Response Body

##### Success

- Status Code: 201
- [Vehicle](#vehicle) resource representing the vehicle that has just been registered

```json
{
  "vehicleId": "vehicleId",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refreshToken": "eyJhbGciOiJIUpfI1NiIsInR5cCI6Ikp7777J9.eyJzdWIiOiIxMjM0NTY3ODkwnyywibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

##### Error

- Status Code: 400, 500
- [Error](#error) resource

```json
{
    "timestamp": 1651881600,
    "errorMessage": "some error message",
    "requestPath": "error/request/path"
}
```


### Vehicle Log out

| Endpoint                    | Method | Description                                |
|:----------------------------|:-------|:-------------------------------------------|
| /api/auth/myVehicle/signout | GET    | vehicle log out, disconnection from socket |


#### Example Response Body

##### Success

- Status Code: 204

```json
{
  "vehicleId": "vehicleId",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refreshToken": "eyJhbGciOiJIUpfI1NiIsInR5cCI6Ikp7777J9.eyJzdWIiOiIxMjM0NTY3ODkwnyywibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

##### Error

- Status Code: 400, 500
- [Error](#error) resource

```json
{
    "timestamp": 1651881600,
    "errorMessage": "some error message",
    "requestPath": "error/request/path"
}
```