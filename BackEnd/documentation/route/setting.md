# Setting Endpoints Documentation

## Table of Contents

- [Setting Endpoints Documentation](#setting-endpoints-documentation)
    - [Table of Contents](#table-of-contents)
    - [Resources](#resources)
        - [Error](#error)
        - [Setting](#setting)
        - [Retrieve Setting](#retrieve-setting)
            - [Url Parameters](#url-parameters)
            - [Query Parameters](#query-parameters)
            - [Example Response Body](#example-response-body)
        - [Retrieve Setting language](#retrieve-setting-language)
            - [Url Parameters](#url-parameters)
            - [Query Parameters](#query-parameters)
            - [Example Response Body](#example-response-body)
        - [Retrieve Setting theme](#retrieve-setting-theme)
            - [Url Parameters](#url-parameters)
            - [Query Parameters](#query-parameters)
            - [Example Response Body](#example-response-body)
        - [Retrieve Setting gamification](#retrieve-setting-gamification)
            - [Url Parameters](#url-parameters)
            - [Query Parameters](#query-parameters)
            - [Example Response Body](#example-response-body)
        - [Update Setting language](#update-setting)
            - [Url Parameters](#url-parameters-1)
            - [Example Request Body](#example-request-body)
            - [Example Response Body](#example-response-body-1)
        - [Update Setting theme](#update-setting-theme)
            - [Url Parameters](#url-parameters-1)
            - [Example Request Body](#example-request-body)
            - [Example Response Body](#example-response-body-1)
        - [Update Setting gamification](#update-setting-gamification)
            - [Url Parameters](#url-parameters-1)
            - [Example Request Body](#example-request-body)
            - [Example Response Body](#example-response-body-1)


## Resources

### Error

| Attribute   | Data Type   | Description                                       |
|:------------|:------------|:--------------------------------------------------|
| timestamp   | number      | Time (in Unix seconds) that the error occurred at |
| requestPath | string      | Path of the request that lead to this error       |
| errorMsg    | string      | Error message                                     |

### Setting

| Attribute    | Data Type | Description          |
|:-------------|:----------|:---------------------|
| language     | string    | type of the language |
| theme        | string    | app theme            |
| gamification | boolean   | gamification switch  |


### Retrieve Setting

| Endpoint                | Method                   | Description                                |
|:------------------------|:-------------------------|:-------------------------------------------|
| /api/users/@meh/setting | GET                      | Retrieve the setting of the specified user |


#### Example Response Body

##### Success

- Status Code: 201
- Object of type [Setting](#setting) resources that were set from the specified user

```json
{
  "setting":
    {
      "language": "EN",
      "theme": "black",
      "gamification": true
    },
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


### Retrieve Setting language

| Endpoint                         | Method                   | Description                                         |
|:---------------------------------|:-------------------------|:----------------------------------------------------|
| /api/users/@meh/setting/language | GET                      | Retrieve the setting language of the specified user |


#### Example Response Body

##### Success

- Status Code: 201

```json
{
  "language": "EN",
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


### Retrieve Setting theme

| Endpoint                      | Method                   | Description                                      |
|:------------------------------|:-------------------------|:-------------------------------------------------|
| /api/users/@meh/setting/theme | GET                      | Retrieve the setting theme of the specified user |


#### Example Response Body

##### Success

- Status Code: 201

```json
{
  "theme": "black",
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

### Retrieve Setting gamification

| Endpoint                             | Method                   | Description                                             |
|:-------------------------------------|:-------------------------|:--------------------------------------------------------|
| /api/users/@meh/setting/gamification | GET                      | Retrieve the setting gamification of the specified user |


#### Example Response Body

##### Success

- Status Code: 201

```json
{
  "gamification": true,
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


### Update Setting language

| Endpoint                         | Method | Description             |
|:---------------------------------|:-------|:------------------------|
| /api/users/@meh/setting/language | PATCH  | update setting language |

#### Example Request Body

```json
{
  "language": "IT"
}
```


#### Example Response Body

##### Success

- Status Code: 204

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

### Update Setting theme

| Endpoint                      | Method | Description          |
|:------------------------------|:-------|:---------------------|
| /api/users/@meh/setting/theme | PATCH  | update setting theme |

#### Example Request Body

```json
{
  "theme": "white"
}
```


#### Example Response Body

##### Success

- Status Code: 204

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

### Update Setting gamification

| Endpoint                             | Method | Description                 |
|:-------------------------------------|:-------|:----------------------------|
| /api/users/@meh/setting/gamification | PATCH  | update setting gamification |

#### Example Request Body

```json
{
  "gamification": true
}
```


#### Example Response Body

##### Success

- Status Code: 204

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