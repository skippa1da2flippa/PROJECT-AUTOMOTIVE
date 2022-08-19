# Socket.io Server-Side Listeners Documentation

## Table of Contents

- [Socket.io Server-Side Listeners Documentation](#socketio-server-side-listeners-documentation)
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


# Resources

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

| Event name    | Description                                                                                                                    | Event Data                                                                    |
|:--------------|:-------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------|
| server-joined | Every time a user (client-side) emit a socket with this event name, he starts listening in a room identified by his mongoDb id | With this event, a [UserData](#user-Data) resource is expected to be received |


### Friend Request Accepted

| Event name              | Description                                                                                                                                                                      | Event Data                                                                                             |
|:------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------|
| friend-request-accepted | Every time a user (client-side) emit a socket with this event name, he will be added as friend to the user who sent the friend request (this operation is done for the user too) | With this event, a [RequestAcceptedData](#request-Accepted-Data) resource is expected to be received   |


### Owner Response

| Event name     | Description                                                                                                                                                                                     | Event Data                                                                            |
|:---------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------|
| owner-response | Every time a user (client-side) emit a socket with this event name, the friend who requested the vehicle connection will be accepted or denied as a vehicle enjoyer based on the owner response | With this event, a [OwnerResData](#ownerRes-data) resource is expected to be received |
