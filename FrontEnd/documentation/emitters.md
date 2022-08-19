# Socket.io Client Emitters Documentation

## Table of Contents

- [Socket.io Client Emitters Documentation](#socketio-client-emitters-documentation)
    - [Table of Contents](#table-of-contents)
    - [Resources](#resources)
        - [UserData](#user-Data)
        - [RequestAcceptedData](#request-Accepted-Data)
        - [OwnerResData](#ownerRes-Data)
    - [Events](#events)
        - [Server Joined](#server-Joined)
        - [Owner Response](#owner-Response)
        - [Friend Request Accepted](#friend-Request-Accepted)


<style>
table th:first-of-type {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 40%;
}
table th:nth-of-type(3) {
    width: 40%;
}
</style>


# User Data

| Attribute | Data Type | Description                                            |
|:----------|:----------|:-------------------------------------------------------|
| userId    | string    | Id of the user (mongoDb) who emitted the client socket |

# Request Accepted Data

| Attribute | Data Type | Description                                    |
|:----------|:----------|:-----------------------------------------------|
| sender    | string    | Id of the user that generated the notification |
| receiver  | string    | Id of the user that received the notification  |


# OwnerRes Data

| Attribute | Data Type | Description                                                                          |
|:----------|:----------|:-------------------------------------------------------------------------------------|
| res       | boolean   | owner response (true if he wants his vehicle connected to the requester else false)  |
| ownerId   | string    | Id of the owner who has previously received the request for the vehicle connection   |
| name      | string    | name of the owner who has previously received the request for the vehicle connection |
| enjoyerId | string    | Id of the enjoyer who has previously requested for the vehicle connection            |


## Events

### Server Joined

| Event name    | Description                                                              | Event Data                                                               |
|:--------------|:-------------------------------------------------------------------------|:-------------------------------------------------------------------------|
| server-joined | Every time a user log in, the client emits a socket with this event name | With this event, a [UserData](#user-Data) resource is sent to the server |


### Friend Request Accepted

| Event name              | Description                                                                             | Event Data                                                                             |
|:------------------------|:----------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------|
| friend-request-accepted | When a user accept a friend request the client shall emit a socket with this event name | With this event, a [RequestAcceptedData](#request-Accepted-Data) is sent to the server |


### Owner Response

| Event name     | Description                                                                                                         | Event Data                                                              |
|:---------------|:--------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------|
| owner-response | when a friend request a connection to one of the user vehicles, the client shall emit a socket with this event name | With this event, a [OwnerResData](#ownerRes-data) is sent to the server |
