import { WebSocket } from "ws";
// import { v4 as id } from 'uuid';

// import socket stuff
// import { SocketClient } from "./SocketClient.js";
// import { Board } from "./Game.js";

// import helper
// import { isArray } from "../helper/isArray.js";
// import { SocketEvents, SocketMessage } from "../../types/socket.js";
// import { UserInformation } from "../../client/types/data.js";


/**
 * Creates new Rooms.
 * @class
 */
export class Room {
    /**
     * Unique identifier of the room.
     */
    private _id: string;

    /**
     * Getter for retrieving the id of the room.
     */
    get id() {
        return this._id;
    }

    /**
     * Getter and Setter for retrieving / setting socket clients.
     */
    get sockets() {
        return this._sockets;
    }

    /**
     * Getter and Setter for retrieving / setting socket clients.
     */
    set sockets(sockets: SocketClient | SocketClient[]) {
        if (isArray(sockets)) {
            this._sockets = sockets;
        } else {
            this._sockets = [...this._sockets, sockets];
        }
    }

    public game: Board;

    constructor(public name: string, private _sockets: SocketClient[]) {
        // create an id
        this._id = id();
        // create the board
        this.game = new Board(1920, 1920);
    }

    /**
     * Method for sending a new message to one or more clients connected to the room.
     * @param id The id/ids of the clients.
     * @param data Data to be sent.
     */
    some(id: string | string[], data: any) {
        if (isArray(id)) {
            // loop for ids
            for (let i = 0; i < id.length; ++i) {
                const currentId = id[i];

                // loop for the stored sockets
                for (let j = 0; j < currentId.length; ++j) {
                    const storedSocket = this._sockets[j];
                    if (storedSocket.id === currentId) {
                        storedSocket.socket.send(data);
                        break;
                    }
                }
            }
        } else {
            for (let i = 0; i < this._sockets.length; ++i) {
                const storedSocket = this._sockets[i];
                if (storedSocket.id === id) {
                    storedSocket.socket.send(data);
                    break;
                }
            }
        }
    }

    /**
     * Method for sending a new message to all the clients connected to the room.
     * @param data Data to be sent.
     */
    public all<E extends SocketEvents>(data: SocketMessage<E>) {
        for (let i = 0; i < this._sockets.length; ++i) {
            const storedSocket = this._sockets[i];
            storedSocket.sendMessage(data.event, data.data);
        }
    }

    /**
     * Method for sending a new message to all other clients connected to the room.
     * @param id Id of the client that is sending the message.
     * @param data Data to be sent.
     */
    public others<E extends SocketEvents>(id: string, data: SocketMessage<E>) {
        for (let i = 0; i < this._sockets.length; ++i) {
            if (id === this._sockets[i].id) continue;

            const storedSocket = this._sockets[i];
            storedSocket.sendMessage(data.event, data.data);
        }
    }

    /**
     * Method for adding a socket client to the room.
     * @param socket Socket Client.
     */
    public addClient(socket: SocketClient) {
        console.log(socket.id, 'joined the room: ' + this.name + ' with id:' + this.id);
        this._sockets.push(socket);
        return this.game.field;
    }

    /**
     * Method for removing a socket client from the room.
     * @param socket Socket Client.
     */
    public removeClient(socket: SocketClient) {
        // looping through all connected clients
        for (let i = 0; i < [...this._sockets].length; ++i) {
            // get the stored socket for comparison
            const storedSocket = this._sockets[i];
            // check if the socket client ids match
            if (storedSocket.id === socket.id) {
                // remove the client from the array
                this._sockets.splice(i, 1);
                console.log(socket.id, 'left the room: ' + this.name + ' with id:' + this.id);
                // create message
                const message: SocketMessage<"disconnection"> = {
                    event: "disconnection",
                    data: {
                        id: socket.id,
                        color: socket.color
                    }
                }
                this.all(message);
                break;
            }
        }
    }

    /**
     * Method for getting the informations about the clients in the room.
     * @param id Id of the new connected client.
     * @returns Information about the clients in the room.
     */
    public getInformationAboutClients(id: string) {
        const clientInformations: UserInformation[] = [];
        for (let i = 0; i < this._sockets.length; ++i) {
            if (id !== this._sockets[i].id) {
                clientInformations.push({
                    id: this._sockets[i].id,
                    color: this._sockets[i].color
                })
            }
        }
        return clientInformations;
    }

    /**
     * Method for restarting the game.
     * @param rows Number of rows.
     * @param columns Number of columns.
     */
    public restartGame(rows: number, columns: number) {
        // first restart the game
        const newBoard = this.game.restart(1920, 1920, rows, columns);
        // create socket message
        const message: SocketMessage<"restart"> = {
            event: "restart",
            data: JSON.stringify(newBoard)
        };
        // send the new board to all clients connected to the room
        this.all(message);
    }
}