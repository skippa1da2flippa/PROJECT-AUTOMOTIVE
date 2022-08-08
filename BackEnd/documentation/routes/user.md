# User Endpoints Documentation

## Table of Contents

- [User Endpoints Documentation](#user-endpoints-documentation)
    - [Table of Contents](#table-of-contents)
    - [Resources](#resources)
        - [Error](#error)
        - [User](#user)
        - [Vehicles](#vehicles)
    - [Endpoints](#endpoints)
        - [Retrieve User](#retrieve-user)
            - [Url Parameters](#url-parameters)
            - [Example Response Body](#example-response-body)
        - [Retrieve User friends](#retrieve-user-friends)
            - [Url Parameters](#url-parameters-1)
            - [Example Response Body Current Match](#example-response-body-friends)
        - [Retrieve User one friend](#retrieve-user-one-friend)
            - [Url Parameters](#url-parameters-2)
            - [Query Parameters](#query-parameters)
            - [Example Response Body Current Match](#example-response-body-current-match-1)
        - [Retrieve User Vehicles](#retrieve-user-vehicles)
            - [Query Parameters](#query-parameters-1)
            - [Example Request Body](#example-request-body)
            - [Example Response Body](#example-response-body-1)
        - [Retrieve User Enjoyed Vehicles](#retrieve-user-enjoyed-vehicles)
            - [Query Parameters](#query-parameters-1)
            - [Example Request Body](#example-request-body)
            - [Example Response Body](#example-response-body-1)
        - [Remove the User from one Vehicle Enjoyer array](#remove-enjoyer)
          - [Query Parameters](#query-parameters-1)
          - [Example Request Body](#example-request-body)
          - [Example Response Body](#example-response-body-1)
        - [Update Password](#update-password)
            - [Url Parameters](#url-parameters-3)
            - [Example Request Body](#example-request-body-1)
            - [Example Response Body](#example-response-body-2)
        - [Update email](#update-email)
            - [Url Parameters](#url-parameters-4)
            - [Example Request Body](#example-request-body-2)
            - [Example Response Body](#example-response-body-3)
        - [Update nickname](#update-nickname)
            - [Url Parameters](#url-parameters-4)
            - [Example Request Body](#example-request-body-2)
            - [Example Response Body](#example-response-body-3)
        - [Delete User](#delete-user)
            - [Url Parameters](#url-parameters-5)
            - [Example Response Body](#example-response-body-4)


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

### Retrieve User

| Endpoint        | Method  | Description                                                      |
|:----------------|:--------|:-----------------------------------------------------------------|
| /api/users/@meh | GET     | Retrieve the user with the specified id (found inside the token) |


#### Example Response Body

##### Success

- Status Code: 201
- [User](#user) resource with the specified id

```json
{
    "userId": "user-id-1",
    "nickname": "nickname",
    "name": "nickname",
    "surname": "nickname",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

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


### Retrieve User Friends

| Endpoint                | Method  | Description               |
|:------------------------|:--------|:--------------------------|
| /api/users/@meh/friends | GET     | Retrieve the user friends |


#### Example Response Body

##### Success

- Status Code: 201

```json
{
    "friends": [],
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

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



### Retrieve User One Friend

| Endpoint                         | Method | Description                        |
|:---------------------------------|:-------|:-----------------------------------|
| /api/users/@meh/friends/friendId | PATCH  | Retrieve the user specific friends |

#### Example Request Body

```json
{
    "friendId": "some id"
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

- Status Codes: 400, 404, 500
- [Error](#error) resource

```json
{
    "timestamp": 1651881600,
    "errorMessage": "some error message",
    "requestPath": "error/request/path"
}
```


### Retrieve User Vehicles

| Endpoint                   | Method  | Description                |
|:---------------------------|:--------|:---------------------------|
| /api/users/@meh/myVehicles | GET     | Retrieve the user vehicles |


#### Example Response Body

##### Success

- Status Code: 201
- myVehicles is an array with type Vehicle[]

```json
{
    "userId": "some id",
    "myVehicles": [],
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

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

### Retrieve User Enjoyed Vehicles

| Endpoint                        | Method  | Description                        |
|:--------------------------------|:--------|:-----------------------------------|
| /api/users/@meh/enjoyedVehicles | GET     | Retrieve the user enjoyed vehicles |


#### Example Response Body

##### Success

- Status Code: 201
- enjoyedVehicles is an array with type Vehicle[]

```json
{
    "userId": "some id",
    "enjoyedVehicles": [],
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

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

### Remove meh from an enjoyed Vehicle

| Endpoint                               | Method | Description                                    |
|:---------------------------------------|:-------|:-----------------------------------------------|
| /api/users/@meh/enjoyedVehicles/remove | PATCH  | remove the user from one vehicle enjoyer array |


#### Example Request Body
```json
{
    "enjoyedVehicle": "some id"
}
```

#### Example Response Body

##### Success

- Status Code: 200

```json
{
    "removed": "some id",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

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

### Update email

| Endpoint              | Method | Description           |
|:----------------------|:-------|:----------------------|
| /api/users/@meh/email | PATCH  | Update the user email |



#### Example Request Body

Object containing the new username to set

```json
{
    "email": "email"
}
```

#### Example Response Body

##### Success

- Status Code: 200
- Resource containing the updated username

```json
{
  "email": "email",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

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

### Update nickname

| Endpoint                 | Method     | Description              |
|:-------------------------|:-----------|:-------------------------|
| /api/users/@meh/nickname | PATCH      | Update the user nickname |



#### Example Request Body

Object containing the new username to set

```json
{
    "nickname": "nickname"
}
```

#### Example Response Body

##### Success

- Status Code: 200
- Resource containing the updated username

```json
{
  "nickname": "nickname",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

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

### Update password

| Endpoint                 | Method     | Description              |
|:-------------------------|:-----------|:-------------------------|
| /api/users/@meh/password | PATCH      | Update the user password |



#### Example Request Body

Object containing the new username to set

```json
{
    "password": "some psw"
}
```

#### Example Response Body

##### Success

- Status Code: 204
- Resource containing the updated username

```json
{
  "nickname": "nickname",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

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

### Delete User

| Endpoint        | Method | Description                                             |
|:----------------|:-------|:--------------------------------------------------------|
| /api/users/@meh | DELETE | Delete the user with the provided id (inside the token) |


#### Example Response Body

##### Success

- Status Code: 204
- Empty response

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