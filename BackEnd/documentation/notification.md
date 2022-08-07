# Notification Endpoints Documentation

## Table of Contents

- [Notification Endpoints Documentation](#notification-endpoints-documentation)
    - [Table of Contents](#table-of-contents)
    - [Resources](#resources)
        - [Error](#error)
        - [Notification](#notification)
        - [Retrieve Notifications](#retrieve-notifications)
            - [Url Parameters](#url-parameters)
            - [Query Parameters](#query-parameters)
            - [Example Response Body](#example-response-body)
        - [Add Notification](#add-notification)
            - [Url Parameters](#url-parameters-1)
            - [Example Request Body](#example-request-body)
            - [Example Response Body](#example-response-body-1)
        - [Remove Notification](#remove-notification)
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

### Notification

| Attribute | Data Type | Description              |
|:----------|:----------|:-------------------------|
| type      | string    | type of the notification |
| receiver  | string    | Id of the receiver       |

### Retrieve Notifications

| Endpoint                      | Method                   | Description                                                               |
|:------------------------------|:-------------------------|:--------------------------------------------------------------------------|
| /api/users/@meh/notifications | GET                      | Retrieve the notifications, ordered by most recent, of the specified user |


#### Example Response Body

##### Success

- Status Code: 200
- Array of [Notification](#notification) resources that were sent to the specified user, ordered by most recent

```json
{
  "notifications": [
    {
      "type": "FriendRequest",
      "sender": "sender-id"
    }
  ],
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

### Add Notification

| Endpoint                      | Method | Description                              |
|:------------------------------|:-------|:-----------------------------------------|
| /api/users/@meh/notifications | POST   | Add a notification to the specified user |


#### Example Request Body

[Notification](#notification) resource representing the notification to add to the user

```json
{
    "type": "FriendRequest",
    "receiver": "receiver-id"
}
```

#### Example Response Body

##### Success

- Status Code: 201
- [Notification](#notification) resource that was just added to the user

```json
{
    "type": "FriendRequest",
    "sender": "sender-id"
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

### Remove Notification

| Endpoint                               | Method | Description                                     |
|:---------------------------------------|:-------|:------------------------------------------------|
| /api/users/:userId/notifications/:type | DELETE | Remove the notification from the specified user |

#### Url Parameters

| Name | Data Type | Description                            |
|:-----|:----------|:---------------------------------------|
| type | string    | type of the notification to be removed |


#### Example Response Body

##### Success

- Status Code: 204
- Empty response

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
 