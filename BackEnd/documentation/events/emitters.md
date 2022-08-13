# Socket.io Server-Side Emitters Documentation

## Table of Contents

- [Socket.io Server-Side Emitters Documentation](#socketio-server-side-emitters-documentation)
    - [Table of Contents](#table-of-contents)
    - [Resources](#resources)
        - [FriendStatusChange](#friendstatuschange)
        - [Enjoyer Message](#enjoyer-Message)
        - [Notification](#notification)
    - [Events](#events)
        - [Friend Status Changed](#friend-status-changed)
        - [Notification Received](#notification-received)
        - [Notification Deleted](#notification-deleted)
        - [EnjoyerRequest](#enjoyer-Request)


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

### FriendStatusChange

| Attribute  | Data Type | Description                               |
|:-----------|:----------|:------------------------------------------|
| friendId   | string    | Id of the friend whose status has changed |
| status     | string    | New status of the friend                  |


### Notification

| Attribute | Data Type | Description                                    |
|:----------|:----------|:-----------------------------------------------|
| sender    | string    | Id of the user that generated the notification |
| type      | string    | Type of the notification                       |

### Enjoyer Message

| Attribute        | Data Type | Description                                                     |
|:-----------------|:----------|:----------------------------------------------------------------|
| enjoyerId        | string    | id of the user whom requests the connection to the vehicle      |
| enjoyerName      | string    | name of the user whom requests the connection to the vehicle    |
| enjoyerSurname   | string    | surname of the user whom requests the connection to the vehicle |
| vehicleId        | string    | id of the vehicle whose connection is requested                 |
| vehicleModel     | string    | model of the vehicle whose connection is requested              |



## Events


### Friend Status Changed

| Event name            | Description                                                                                        | Event Data                                                                                                                                                            |
|:----------------------|:---------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| friend-status-changed | Every time the status of a friend of the current user changes, the user is notified by the server. | With this event, a [FriendStatusChanged](#friendstatuschange) resource is sent, which contains the id of the friend whose status has just changed and its new status. |


### Notification Received

| Event name            | Description                                                                                                                                                                                                                             | Event Data                                                                                                                                                 |
|:----------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| notification-received | Every time a user sends some request to another user, the latter is notified by the server that he has a new notification. More specifically, this happens after the server receives a request to add a notification to a certain user. | With this event, a [Notification](#notification) resource is sent, which contains information about the notification that has just been added to the user. |

### Notification Deleted

| Event name           | Description                                                                                                                                                                                                                 | Event Data                                                                                                                                       |
|:---------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------|
| notification-deleted | Every time a notification is deleted by the server, the user is notified so that he can update his state. More specifically, this happens after the server receives a request to remove a notification from a certain user. | With this event, a [Notification](#notification) resource is sent, which contains information about the notification that has just been deleted. |


### Enjoyer Request

| Event name        | Description                                                                              | Event Data                                                                                                                              |
|:------------------|:-----------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------|
| enjoyer-request   | Every time a user wants to connect to a vehicle the server will notify the vehicle owner | With this event, a [EnjoyerMessage](#enjoyer-Message) resource is sent, which contains information about the user whom wants to connect |
