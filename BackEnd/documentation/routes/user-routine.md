# Routine Endpoints Documentation

## Table of Contents

- [Routine Endpoints Documentation](#routine-endpoints-documentation)
    - [Table of Contents](#table-of-contents)
    - [Resources](#resources)
        - [Error](#error)
        - [Routine](#routine)
        - [Retrieve Routines](#retrieve-routines)
            - [Url Parameters](#url-parameters)
            - [Query Parameters](#query-parameters)
            - [Example Response Body](#example-response-body)
        - [Retrieve a Routine](#retrieve-one-routine)
            - [Url Parameters](#url-parameters)
            - [Query Parameters](#query-parameters)
            - [Example Response Body](#example-response-body)
        - [Update a Routine](#update-one-routine)
            - [Url Parameters](#url-parameters)
            - [Query Parameters](#query-parameters)
            - [Example Response Body](#example-response-body)
        - [Add a Routine](#add-routine)
            - [Url Parameters](#url-parameters-1)
            - [Example Request Body](#example-request-body)
            - [Example Response Body](#example-response-body-1)
        - [Remove a Routine](#remove-routine)
            - [Url Parameters](#url-parameters-2)
            - [Query Parameters](#query-parameters-1)
            - [Example Response Body](#example-response-body-2)


## Resources

### Error

| Attribute   | Data Type   | Description                                       |
|:------------|:------------|:--------------------------------------------------|
| timestamp   | number      | Time (in Unix seconds) that the error occurred at |
| requestPath | string      | Path of the request that lead to this error       |
| errorMsg    | string      | Error message                                     |

### Routine

| Attribute   | Data Type | Description                |
|:------------|:----------|:---------------------------|
| name        | string    | name of the routine        |
| temperature | number    | temperature of the routine |
| lightsColor | string    | lightsColor of the routine |
| music       | string[]  | music of the routine       |
| path        | any       | path of the routine        |


### Retrieve Routines

| Endpoint                 | Method                   | Description                                                         |
|:-------------------------|:-------------------------|:--------------------------------------------------------------------|
| /api/users/@meh/routines | GET                      | Retrieve the routines of the specified user                         |


#### Example Response Body

##### Success

- Status Code: 201
- Array of [Routine](#routine) 

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

### Retrieve one Routine

| Endpoint                       | Method                   | Description                                  |
|:-------------------------------|:-------------------------|:---------------------------------------------|
| /api/users/@meh/routines/:name | GET                      | Retrieve the routine with the specified name |

#### Url Parameters

| Name | Data Type | Description                 |
|:-----|:----------|:----------------------------|
| name | string    | name of the routine to find |

#### Example Response Body

##### Success

- Status Code: 201
- routine is an object of type [Routine]

```json
{
  "routine": {},
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

### Add one Routine

| Endpoint                   | Method | Description                           |
|:---------------------------|:-------|:--------------------------------------|
| /api/users/@meh/routines   | POST   | add a routine with the specified body |

#### Example Request Body 

```json
{
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

- Status Codes: 404, 500
- [Error](#error) resource

```json
{
    "timestamp": 1651881600,
    "errorMessage": "some error message",
    "requestPath": "error/request/path"
}
```

### Update one Routine

| Endpoint                       | Method | Description                                |
|:-------------------------------|:-------|:-------------------------------------------|
| /api/users/@meh/routines/:name | PUT    | update the routine with the specified name |

#### Url Parameters

| Name | Data Type | Description                   |
|:-----|:----------|:------------------------------|
| name | string    | name of the routine to update |


#### Example Request Body

- newName is not mandatory for a successful server response

```json
{
  "newName": "name", 
  "temperature": 20,
  "path": "path",
  "lights": "lightsColor",
  "musicToAdd": [""],
  "musicToRemove": [""]
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


### Delete one Routine

| Endpoint                       | Method | Description                                |
|:-------------------------------|:-------|:-------------------------------------------|
| /api/users/@meh/routines/:name | DELETE | Delete the routine with the specified name |

#### Url Parameters

| Name | Data Type | Description                   |
|:-----|:----------|:------------------------------|
| name | string    | name of the routine to delete |

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