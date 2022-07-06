[ws-roomified](../README.md) / [Exports](../modules.md) / AbstractSocketClient

# Class: AbstractSocketClient<SocketEventsFromServer, SocketEventsFromClient\>

Abstract class for a SocketClient that implements all necessary methods and properties.

**`Abstract`**

 

## Type parameters

| Name | Type |
| :------ | :------ |
| `SocketEventsFromServer` | extends [`SocketEvents`](../modules.md#socketevents) = `any` |
| `SocketEventsFromClient` | extends [`SocketEvents`](../modules.md#socketevents) = `any` |

## Table of contents

### Constructors

- [constructor](AbstractSocketClient.md#constructor)

### Properties

- [\_EventEmitter](AbstractSocketClient.md#_eventemitter)
- [\_id](AbstractSocketClient.md#_id)
- [\_socket](AbstractSocketClient.md#_socket)
- [currentRoom](AbstractSocketClient.md#currentroom)

### Accessors

- [id](AbstractSocketClient.md#id)
- [socket](AbstractSocketClient.md#socket)

### Methods

- [join](AbstractSocketClient.md#join)
- [leave](AbstractSocketClient.md#leave)
- [leaveRoomById](AbstractSocketClient.md#leaveroombyid)
- [off](AbstractSocketClient.md#off)
- [on](AbstractSocketClient.md#on)
- [receiveMessage](AbstractSocketClient.md#receivemessage)
- [sendMessage](AbstractSocketClient.md#sendmessage)

## Constructors

### constructor

• **new AbstractSocketClient**<`SocketEventsFromServer`, `SocketEventsFromClient`\>(`_socket`, `_managerInstance`, `_id?`)

Constructor of the abstract SocketClient class.

? By default it will add the created client to the storage inside the given manager instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `SocketEventsFromServer` | extends [`SocketEvents`](../modules.md#socketevents) = `any` |
| `SocketEventsFromClient` | extends [`SocketEvents`](../modules.md#socketevents) = `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_socket` | `WebSocket` | The socket connection. |
| `_managerInstance` | [`AbstractManager`](AbstractManager.md)<[`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>, [`AbstractRoom`](AbstractRoom.md)<[`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>, `SocketEventsFromServer`\>\> | Manager instance reference to have access to rooms. |
| `_id?` | `string` | Optional setting id of the socket. `By default it will create an uuid`. |

## Properties

### \_EventEmitter

• `Protected` **\_EventEmitter**: `EventEmitter`

EventEmitter instance used for handling the incoming socket events.

#### Defined in

[Socket/SocketClient.ts:50](https://github.com/chrisitopherus/ws-roomified/blob/8367edb/src/Socket/SocketClient.ts#L50)

___

### \_id

• `Private` **\_id**: `string`

Id of the socket.

#### Defined in

[Socket/SocketClient.ts:36](https://github.com/chrisitopherus/ws-roomified/blob/8367edb/src/Socket/SocketClient.ts#L36)

___

### \_socket

• `Private` **\_socket**: `WebSocket`

The socket connection.

#### Defined in

[Socket/SocketClient.ts:22](https://github.com/chrisitopherus/ws-roomified/blob/8367edb/src/Socket/SocketClient.ts#L22)

___

### currentRoom

• **currentRoom**: ``null`` \| [`AbstractRoom`](AbstractRoom.md)<[`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>, `SocketEventsFromServer`\> = `null`

Property containing either the current room instance or `null`.

#### Defined in

[Socket/SocketClient.ts:56](https://github.com/chrisitopherus/ws-roomified/blob/8367edb/src/Socket/SocketClient.ts#L56)

## Accessors

### id

• `get` **id**(): `string`

Getter for reading in the id of the socket.

#### Returns

`string`

___

### socket

• `get` **socket**(): `WebSocket`

Getter for reading the socket instance.

#### Returns

`WebSocket`

## Methods

### join

▸ **join**(`id`): [`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>

Method for joining a new room.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Id of the room to join. |

#### Returns

[`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>

The socket client instance for chaining.

___

### leave

▸ **leave**(): [`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>

Method for leaving the current room.

#### Returns

[`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>

The socket client instance for chaining.

___

### leaveRoomById

▸ **leaveRoomById**(`id`): [`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>

Method for leaving a room by its id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Id of the room to leave. |

#### Returns

[`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>

The socket client instance for chaining.

___

### off

▸ **off**<`E`\>(`event`, `cb`): [`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>

Method for unregistering a handler from a specific socket event.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends \`${any}\` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `E` | The event name. |
| `cb` | (`message`: [`SocketEventsHelper`](../modules.md#socketeventshelper)<`SocketEventsFromClient`\>[`E`]) => `unknown` | Callback function to be called when the socket event from the client occured. |

#### Returns

[`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>

The socket client instance for chaining.

___

### on

▸ **on**<`E`\>(`event`, `cb`): [`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>

Method for registering a handler to a specific socket event sent by a client.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends \`${any}\` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `E` | The event name. |
| `cb` | (`this`: [`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>, `message`: [`SocketEventsHelper`](../modules.md#socketeventshelper)<`SocketEventsFromClient`\>[`E`]) => `unknown` | Callback function to be called when the socket event from the client occured. |

#### Returns

[`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>

The socket client instance for chaining.

___

### receiveMessage

▸ `Private` **receiveMessage**<`E`\>(`message`): `void`

Method for receiving messages from the client.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`SocketEvents`](../modules.md#socketevents) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `RawData` | Rawdata of the message sent by the client. |

#### Returns

`void`

___

### sendMessage

▸ **sendMessage**<`E`\>(`event`, `data`): [`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>

Method for sending a message to the client.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends \`${any}\` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `E` | Name of the event. |
| `data` | [`SocketEventsHelper`](../modules.md#socketeventshelper)<`SocketEventsFromServer`\>[`E`] | Data according to the event. |

#### Returns

[`AbstractSocketClient`](AbstractSocketClient.md)<`SocketEventsFromServer`, `SocketEventsFromClient`\>

The socket client instance for chaining.
