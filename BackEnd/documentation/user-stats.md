# User Endpoints Documentation

## Table of Contents

- [User Stats Endpoints Documentation](#stats-endpoins-documentation)
  - [Retrieve User Stats](#retrieve-user-stats)
    - [Url Parameters](#url-parameters-6)
    - [Example Response Body](#example-response-body-5)
  - [Update User Stats](#update-user-stats)
    - [Url Parameters](#url-parameters-7)
    - [Example Request Body](#example-request-body-3)
    - [Example Response Body](#example-response-body-6)


### Retrieve User Stats

| Endpoint              | Method | Description                                   |
|:----------------------|:-------|:----------------------------------------------|
| /api/users/@meh/stats | GET    | Retrieve the statistics of the specified user |


#### Example Response Body

##### Success

- Status Code: 200
- [UserStats](#userstats) resource that refers to the specified user

```json
{
    "stats": {
      "sauce": 2500,
      "trophies": 3000
    },
    "accessToken":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
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

### Update User Stats

| Endpoint              | Method         | Description                                 |
|:----------------------|:---------------|:--------------------------------------------|
| /api/users/@meh/stats | PUT            | Update the statistics of the specified user |

#### Example Request Body

A full [UserStats](#userstats) resource that will replace the existing one

```json
{
  "sauce": 2500,
  "trophies": 3000
}
```

#### Example Response Body

##### Success

- Status Code: 204
- The [UserStats](#userstats) resource that replaced the old one

```json
{
 
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
