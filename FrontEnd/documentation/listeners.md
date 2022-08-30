# Socket.io Client Listeners Documentation

## Table of Contents

- [Socket.io Client Listeners Documentation](#socketio-client-listeners-documentation)
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


### Enjoyer Message

| Attribute        | Data Type | Description                                                     |
|:-----------------|:----------|:----------------------------------------------------------------|
| enjoyerId        | string    | id of the user whom requests the connection to the vehicle      |
| enjoyerName      | string    | name of the user whom requests the connection to the vehicle    |
| enjoyerSurname   | string    | surname of the user whom requests the connection to the vehicle |
| vehicleId        | string    | id of the vehicle whose connection is requested                 |
| vehicleModel     | string    | model of the vehicle whose connection is requested              |

### Notification

| Attribute | Data Type | Description                                    |
|:----------|:----------|:-----------------------------------------------|
| sender    | string    | Id of the user that generated the notification |
| type      | string    | Type of the notification                       |


## Events


### Friend Status Changed

| Event name            | Description                                                                                       | Event Data                                                                               |
|:----------------------|:--------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------|
| friend-status-changed | Every time a user (client-side) emit a socket with this event name, his friends receive some data | With this event, a [FriendStatusChanged](#friendstatuschange) is expected to be received |


### Notification Received

| Event name            | Description                                                                                                                                 | Event Data                                                                  |
|:----------------------|:--------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------|
| notification-received | Every time a user (client-side) emit a socket with this event name, the receiver is notified by the server that he has a new notification.  | With this event, a [Notification](#notification) is expected to be received |

### Notification Deleted

| Event name           | Description                                                                                                                                 | Event Data                                                                   |
|:---------------------|:--------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------|
| notification-deleted | Every time a user (client-side) emit a socket with this event name, the sender is notified by the server that his notification was deleted. | With this event, a [Notification](#notification) is expected to be received. |


### Enjoyer Request

| Event name        | Description                                                                                               | Event Data                                                                       |
|:------------------|:----------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|
| enjoyer-request   | Every time a it's emitted (server-side) a socket with this event name,the vehicle owner receive some data | With this event, a [EnjoyerMessage](#enjoyer-Message) is expected to be received |
