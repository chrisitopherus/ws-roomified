[ws-roomified](README.md) / Exports

# ws-roomified

## Table of contents

### Classes

- [AbstractManager](classes/AbstractManager.md)
- [AbstractRoom](classes/AbstractRoom.md)
- [AbstractSocketClient](classes/AbstractSocketClient.md)

### Type Aliases

- [DataByEvent](modules.md#databyevent)
- [SocketEvent](modules.md#socketevent)
- [SocketEvents](modules.md#socketevents)
- [SocketEventsHelper](modules.md#socketeventshelper)

### Functions

- [id](modules.md#id)

## Type Aliases

### DataByEvent

Ƭ **DataByEvent**<`E`, `T`\>: `T` extends { `event`: `E`  } ? `T` : `never`

Utility type helper for finding the data for a specific event name.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`SocketEvents`](modules.md#socketevents)[``"event"``] |
| `T` | extends [`SocketEvents`](modules.md#socketevents) |

#### Defined in

[types/Socket.ts:19](https://github.com/chrisitopherus/ws-roomified/blob/5a5d150/src/types/Socket.ts#L19)

___

### SocketEvent

Ƭ **SocketEvent**<`E`, `D`\>: `Object`

Template for creating new Events.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends \`${any}\` |
| `D` | extends `any` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `D` |
| `event` | `E` |

#### Defined in

[types/Socket.ts:4](https://github.com/chrisitopherus/ws-roomified/blob/5a5d150/src/types/Socket.ts#L4)

___

### SocketEvents

Ƭ **SocketEvents**: [`SocketEvent`](modules.md#socketevent)<\`${any}\`, `any`\>

Just a Template to define a structure.

? By default this type defines SocketEvents to be any event with any data.

#### Defined in

[types/Socket.ts:14](https://github.com/chrisitopherus/ws-roomified/blob/5a5d150/src/types/Socket.ts#L14)

___

### SocketEventsHelper

Ƭ **SocketEventsHelper**<`Events`\>: { [E in Events["event"]]: DataByEvent<E, Events\>["data"] }

Utility type helper for creating a mapped type for the socket events.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Events` | extends [`SocketEvents`](modules.md#socketevents) |

#### Defined in

[types/Socket.ts:24](https://github.com/chrisitopherus/ws-roomified/blob/5a5d150/src/types/Socket.ts#L24)

## Functions

### id

▸ **id**(`entropyCache?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entropyCache?` | ``true`` |

#### Returns

`string`
