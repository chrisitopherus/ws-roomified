[ws-roomified](../README.md) / [Exports](../modules.md) / AbstractRoom

# Class: AbstractRoom<Socket, SocketEventsFromServer\>

Abstract class for a Room that implements all necessary methods and properties.

**`Abstract`**

 

## Type parameters

| Name | Type |
| :------ | :------ |
| `Socket` | extends [`AbstractSocketClient`](AbstractSocketClient.md)<[`SocketEvents`](../modules.md#socketevents), [`SocketEvents`](../modules.md#socketevents)\> |
| `SocketEventsFromServer` | extends [`SocketEvents`](../modules.md#socketevents) |

## Table of contents

### Constructors

- [constructor](AbstractRoom.md#constructor)

### Properties

- [\_id](AbstractRoom.md#_id)
- [\_sockets](AbstractRoom.md#_sockets)

### Accessors

- [id](AbstractRoom.md#id)
- [sockets](AbstractRoom.md#sockets)

### Methods

- [addSocket](AbstractRoom.md#addsocket)
- [all](AbstractRoom.md#all)
- [one](AbstractRoom.md#one)
- [other](AbstractRoom.md#other)
- [removeSocket](AbstractRoom.md#removesocket)
- [some](AbstractRoom.md#some)

## Constructors

### constructor

• **new AbstractRoom**<`Socket`, `SocketEventsFromServer`\>(`_sockets`, `_id?`)

Constructor of the abstract Room class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Socket` | extends [`AbstractSocketClient`](AbstractSocketClient.md)<[`SocketEvents`](../modules.md#socketevents), [`SocketEvents`](../modules.md#socketevents), `Socket`\> |
| `SocketEventsFromServer` | extends [`SocketEvents`](../modules.md#socketevents) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_sockets` | `Socket`[] | Sockets inside the room. |
| `_id?` | `string` | Optional setting id of the socket. `By default it will create an uuid`. |

## Properties

### \_id

• `Private` **\_id**: `string`

Unique identifier of the room.

#### Defined in

[Socket/Room.ts:23](https://github.com/chrisitopherus/ws-roomified/blob/ebb3a5c/src/Socket/Room.ts#L23)

___

### \_sockets

• `Private` **\_sockets**: `Socket`[]

Sockets inside the room.

#### Defined in

[Socket/Room.ts:17](https://github.com/chrisitopherus/ws-roomified/blob/ebb3a5c/src/Socket/Room.ts#L17)

## Accessors

### id

• `get` **id**(): `string`

Getter for retrieving the id of the room.

#### Returns

`string`

___

### sockets

• `get` **sockets**(): `Socket`[]

Getter for retrieving all sockets connected to the room.

#### Returns

`Socket`[]

## Methods

### addSocket

▸ **addSocket**(`socket`): [`AbstractRoom`](AbstractRoom.md)<`Socket`, `SocketEventsFromServer`\>

Method for adding a socket to the room.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `socket` | `Socket` | The socket that joined the room. |

#### Returns

[`AbstractRoom`](AbstractRoom.md)<`Socket`, `SocketEventsFromServer`\>

The room instance for chaining.

___

### all

▸ **all**<`E`\>(`event`, `message`): [`AbstractRoom`](AbstractRoom.md)<`Socket`, `SocketEventsFromServer`\>

Method for sending a new message to all the sockets connected to the room.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends \`${any}\` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `E` | The event. |
| `message` | [`SocketEventsHelper`](../modules.md#socketeventshelper)<`SocketEventsFromServer`\>[`E`] | Data to be sent. |

#### Returns

[`AbstractRoom`](AbstractRoom.md)<`Socket`, `SocketEventsFromServer`\>

The room instance for chaining.

___

### one

▸ **one**<`E`\>(`id`, `event`, `message`): [`AbstractRoom`](AbstractRoom.md)<`Socket`, `SocketEventsFromServer`\>

Method for sending a new message to one socket connected to the room.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends \`${any}\` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Id of the socket that should receive the message. |
| `event` | `E` | Event of the message. |
| `message` | [`SocketEventsHelper`](../modules.md#socketeventshelper)<`SocketEventsFromServer`\>[`E`] | Data to be sent to the sockets. |

#### Returns

[`AbstractRoom`](AbstractRoom.md)<`Socket`, `SocketEventsFromServer`\>

The room instance for chaining.

___

### other

▸ **other**<`E`\>(`id`, `event`, `message`): [`AbstractRoom`](AbstractRoom.md)<`Socket`, `SocketEventsFromServer`\>

Method for sending a new message to all sockets connected to the room except the one with the specified id.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends \`${any}\` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Id of the socket that should not receive the message. |
| `event` | `E` | Event of the message. |
| `message` | [`SocketEventsHelper`](../modules.md#socketeventshelper)<`SocketEventsFromServer`\>[`E`] | Data to be sent to the sockets. |

#### Returns

[`AbstractRoom`](AbstractRoom.md)<`Socket`, `SocketEventsFromServer`\>

The room instance for chaining.

___

### removeSocket

▸ **removeSocket**(`socket`): [`AbstractRoom`](AbstractRoom.md)<`Socket`, `SocketEventsFromServer`\>

Method for removing a socket from the room.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `socket` | `Socket` | The socket that should leave the room. |

#### Returns

[`AbstractRoom`](AbstractRoom.md)<`Socket`, `SocketEventsFromServer`\>

The room instance for chaining.

___

### some

▸ **some**<`E`\>(`ids`, `event`, `message`): [`AbstractRoom`](AbstractRoom.md)<`Socket`, `SocketEventsFromServer`\>

Method for sending a new message to some sockets connected to the room.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends \`${any}\` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `string`[] | Ids of the sockets that should receive the message. |
| `event` | `E` | Event of the message. |
| `message` | [`SocketEventsHelper`](../modules.md#socketeventshelper)<`SocketEventsFromServer`\>[`E`] | Data to be sent to the sockets. |

#### Returns

[`AbstractRoom`](AbstractRoom.md)<`Socket`, `SocketEventsFromServer`\>

The room instance for chaining.
