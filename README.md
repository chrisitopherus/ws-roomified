# ws-roomified

[![Version npm](https://img.shields.io/badge/version-0.5.0-blue.svg?logo=npm)](https://www.npmjs.com/package/ws)

> A room wrapper for the ws module optimized for working with typescript by providing built-in types.

## [Homepage](https://chrisitopherus.github.io/ws-roomified)

## Author

👤 **chrisitopherus**

## Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/chrisitopherus/ws-roomified/issues).

***

**Note**: This module does not work in the browser. Browser clients must use the native
[`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
object. But you can use one of the many wrappers available on npm, like
[isomorphic-ws](https://github.com/heineiuo/isomorphic-ws) to use the ws module in the browser.

## Table of Contents

- [ws-roomified](#ws-roomified)
  - [Homepage](#homepage)
  - [Author](#author)
  - [Contributing](#contributing)
  - [Table of Contents](#table-of-contents)
  - [Installing](#installing)
  - [API docs](#api-docs)
  - [How to use](#how-to-use)
    - [Getting Started](#getting-started)
    - [Setting up the classes](#setting-up-the-classes)
      - [SocketClient](#socketclient)
      - [Room](#room)
      - [Manager](#manager)
  - [Usage examples](#usage-examples)
    - [Handling a new connection on the server](#handling-a-new-connection-on-the-server)
  - [Changelog](#changelog)
  - [License](#license)

## Installing

```sh
npm install
```

## API docs

See [`/docs/index.html`](https://chrisitopherus.github.io/ws-roomified) for Node.js-like documentation of ws classes and
utility functions.

## How to use

First of all you obviously need to install the moudle itself before you can use it.

Also make sure you installed the [`ws`]((https://www.npmjs.com/package/ws)) module and its types (if you are using typescript [`@types/ws`]((https://www.npmjs.com/package/@types/ws)))

### Getting Started

**Note: The Guide will be written in Typescript, but no worries besides TS-only features it will be the same for Javascript.**

The module comes with 3 main `abstract` classes.

- `AbstractSocketClient` (Wrapper for the Sockets)
- `AbstractRoom` (Wrapper for the Rooms)
- `AbstractManager` (Manages/Saves all the sockets and rooms)

And some type aliases:

- `SocketEvent` Template for creating new Events.
- `SocketEvents` Just a Template to define any event with any data. Use it if you don't care about the event names and data.
- `SocketEventsHelper` Utility type helper for creating a mapped type for the socket events and their data.
- `DataByEvent` Utility type helper for finding the data for a specific event name.

```ts
// importing the abstract classes
import { AbstractSocketClient, AbstractRoom, AbstractManager } from 'ws-roomified';
// importing the type aliases
import {SocketEvent, SocketEvents, SocketEventsHelper, DataByEvent} from 'ws-roomified';
```

### Setting up the classes

First of all, lets create some sample events (only for ts users needed):

To accomplish this, we will use one of exported type aliases `SocketEvent`.

Our goal is to differentiate between events sent by the server and events sent by the client:

```ts
// type alias containing the events sent by the server
type FromServer = SocketEvent<"message", {message: string}> | SocketEvent<"ping", number>;

// type alias containing the events sent by the client
type FromClient = SocketEvent<"message", string> | SocketEvent<"pong", number>;
```

In order to work with this module, you need to extend the provided abstract classes:

**Note: A list of all methods and properties can be found in the docs.**

#### SocketClient

The SocketClient is meant to be the socket connection saved on the server.

```ts
// importing the WebSocket from the ws module to overwrite the initial WebSocket type 
import { WebSocket } from 'ws';

// for TS users, pass the type aliases containing the events as generics
class SocketClient extends AbstractSocketClient<FromServer, FromClient> {
    // Manager will be the name of the extended AbstractManager class -> later in the guide

    // we pass the socket connection and the manager instance since they are needed by the abstract class
    constructor(socket: WebSocket, manager: Manager) {
        // calling the constructor of the abstract class with the socket and the manager
        super(socket, manager);
    }
}
```

Use now the SocketClient class to implement own logic, props or whatever you need.

#### Room

The Room is meant to be group some socket connections together.

```ts
// for TS users, pass the SocketClient and the type alias containing the events sent by the server as generics
class Room extends AbstractRoom<SocketClient, FromServer>{
    constructor() {
        // if there are already some sockets which should be connected to the room, then simply define a new constructor parameter and pass it then to the super call
        super([]);
    }
}
```

Use now the Room class to implement own logic, props or whatever you need.

#### Manager

The Manager is meant to stores and manage all sockets and rooms.

```ts
// for TS users, pass the SocketClient and Room as generics
class Manager extends AbstractManager<SocketClient, Room>{
    // we pass already connected sockets and already created rooms to the constructor
    constructor(sockets: SocketClient[], rooms: Room[]) {
        super(sockets, rooms);
    }
}
```

Use now the Manager class to implement own logic, props or whatever you need.

## Usage examples

**Note: Using the things that were used in the guide.**

### Handling a new connection on the server

```ts
// creating an empty Manager with our created class
const manager = new Manager([], []);

// creating a simple room
const room = new Room();

// adding the room to the manager
manager.addRoom(room);

// listening to the connection event
wsServer.on('connection', socket => {
    // wrapping the connection in our created SocketCLient class, the connection is automatically passed to the manager
    const client = new SocketClient(socket, manager);

    // now we will simply join our only room by its id and then we notify the client that he joined the room
    client.join(room.id).sendMessage("message", { message: "you joined a room" });
    // as you see we can also chain methods since many methods return the instance back

    // now we notify other clients in the room that someone joined the room 

    // checking if the client really is currently inside a room, because something could have gone wrong when joining the room
    if (client.currentRoom){
        client.currentRoom.other(client.id, "message", { message: `client: ${client.id} joined the room`});
    }

    // adding one listener to "message" events sent by the client
    // this could ofc also be done directly inside the SocketClient constructor
    client.on("message", function (msg) {
        // the this keyword will be pointing the the SocketClient instance, which received the message
        
        // now we will send the message to all clients in the room including the sender
        if (client.currentRoom){
            client.currentRoom.all("message", { message: msg});
        }
    });
});
```

## Changelog

We're using the GitHub [releases][changelog] for changelog entries.

## License

[MIT](LICENSE)

[changelog]: https://github.com/chrisitopherus/ws-roomified/releases
