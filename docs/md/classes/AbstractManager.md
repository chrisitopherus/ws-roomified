[ws-roomified](../README.md) / [Exports](../modules.md) / AbstractManager

# Class: AbstractManager<Socket, Room\>

Abstract class managing and storing all sockets and rooms.

**`Abstract`**

 

## Type parameters

| Name | Type |
| :------ | :------ |
| `Socket` | extends [`AbstractSocketClient`](AbstractSocketClient.md)<[`SocketEvents`](../modules.md#socketevents), [`SocketEvents`](../modules.md#socketevents)\> |
| `Room` | extends [`AbstractRoom`](AbstractRoom.md)<`Socket`, [`SocketEvents`](../modules.md#socketevents)\> |

## Table of contents

### Constructors

- [constructor](AbstractManager.md#constructor)

### Properties

- [\_rooms](AbstractManager.md#_rooms)
- [\_sockets](AbstractManager.md#_sockets)

### Accessors

- [rooms](AbstractManager.md#rooms)
- [sockets](AbstractManager.md#sockets)

### Methods

- [addRoom](AbstractManager.md#addroom)
- [addSocket](AbstractManager.md#addsocket)
- [garbage](AbstractManager.md#garbage)
- [joinRoomById](AbstractManager.md#joinroombyid)
- [leaveRoomById](AbstractManager.md#leaveroombyid)
- [removeRoomById](AbstractManager.md#removeroombyid)
- [removeRoomsById](AbstractManager.md#removeroomsbyid)
- [removeSocketById](AbstractManager.md#removesocketbyid)
- [removeSocketsById](AbstractManager.md#removesocketsbyid)

## Constructors

### constructor

• **new AbstractManager**<`Socket`, `Room`\>(`_sockets`, `_rooms`)

Constructor of the abstract Manager class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Socket` | extends [`AbstractSocketClient`](AbstractSocketClient.md)<[`SocketEvents`](../modules.md#socketevents), [`SocketEvents`](../modules.md#socketevents), `Socket`\> |
| `Room` | extends [`AbstractRoom`](AbstractRoom.md)<`Socket`, [`SocketEvents`](../modules.md#socketevents), `Room`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_sockets` | `Socket`[] | All the sockets connected to the server. |
| `_rooms` | `Room`[] | All the rooms that currently exist. |

## Properties

### \_rooms

• `Private` **\_rooms**: `Room`[]

All the rooms that currently exist.

#### Defined in

[Socket/Manager.ts:23](https://github.com/chrisitopherus/ws-roomified/blob/ebb3a5c/src/Socket/Manager.ts#L23)

___

### \_sockets

• `Private` **\_sockets**: `Socket`[]

All the sockets connected to the server.

#### Defined in

[Socket/Manager.ts:17](https://github.com/chrisitopherus/ws-roomified/blob/ebb3a5c/src/Socket/Manager.ts#L17)

## Accessors

### rooms

• `get` **rooms**(): `Room`[]

Gett for retrieving all the rooms that currently exist.

#### Returns

`Room`[]

___

### sockets

• `get` **sockets**(): `Socket`[]

Getter for retrieving all the sockets that are currently connected to the server.

#### Returns

`Socket`[]

## Methods

### addRoom

▸ **addRoom**(`createdRoom`): `Object`

Method for adding a new room to the room storage.

? Takes a room instance as an argument and pushes it into the room storage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createdRoom` | `Room` | Created Room instance. |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `addedRoom` | `Room` |
| `newLength` | `number` |
| `prevLength` | `number` |

___

### addSocket

▸ **addSocket**(`createdSocket`): `Object`

Method for adding a new socket manually to the socket storage.

? Takes a socket instance as an argument and pushes it into the socket storage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createdSocket` | `Socket` | Created SocketClient instance. |

#### Returns

`Object`

Information.

| Name | Type |
| :------ | :------ |
| `addedSocket` | `Socket` |
| `newLength` | `number` |
| `prevLength` | `number` |

___

### garbage

▸ **garbage**<`T`\>(`instance`): [`AbstractManager`](AbstractManager.md)<`Socket`, `Room`\>

Method for clearing a reference from a variable, so it can be collected by the garbage collector.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AbstractSocketClient`](AbstractSocketClient.md)<[`SocketEvents`](../modules.md#socketevents), [`SocketEvents`](../modules.md#socketevents)\> \| [`AbstractRoom`](AbstractRoom.md)<`Socket`, [`SocketEvents`](../modules.md#socketevents)\> \| `Socket`[] \| `Room`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instance` | `Nullable`<`T`\> | A variable holding a reference to an instance of a SocketClient or Room. |

#### Returns

[`AbstractManager`](AbstractManager.md)<`Socket`, `Room`\>

The manager instance for chaining.

___

### joinRoomById

▸ **joinRoomById**(`id`, `socket`): [`AbstractManager`](AbstractManager.md)<`Socket`, `Room`\>

Method that lets one socket join a room by its id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Id of the room to join. |
| `socket` | `Socket` | The socket which should join the room. |

#### Returns

[`AbstractManager`](AbstractManager.md)<`Socket`, `Room`\>

The manager instance for chaining.

___

### leaveRoomById

▸ **leaveRoomById**(`id`, `socket`): [`AbstractManager`](AbstractManager.md)<`Socket`, `Room`\>

Method that lets one socket leave a room by its id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Id of the room to leave. |
| `socket` | `Socket` | The socket which should leave the room. |

#### Returns

[`AbstractManager`](AbstractManager.md)<`Socket`, `Room`\>

The manager instance for chaining.

___

### removeRoomById

▸ **removeRoomById**(`id`): ``null`` \| ``true``

Method for removing an existing room by its id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Id of the room to be removed. |

#### Returns

``null`` \| ``true``

Either true or `null`.

___

### removeRoomsById

▸ **removeRoomsById**(`ids`): ``null`` \| ``true``

Method for removing multiple existing rooms by their id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `string`[] | Ids of the rooms to be removed. |

#### Returns

``null`` \| ``true``

Either the true or `null`.

___

### removeSocketById

▸ **removeSocketById**(`id`): ``null`` \| ``true``

Method for removing an existing socket by its id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Id of the socket to be removed. |

#### Returns

``null`` \| ``true``

Either the true or `null`.

___

### removeSocketsById

▸ **removeSocketsById**(`ids`): ``null`` \| ``true``

Method for removing multiple existing sockets by their id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `string`[] | Ids of the sockets to be removed. |

#### Returns

``null`` \| ``true``

Either true or `null`.
