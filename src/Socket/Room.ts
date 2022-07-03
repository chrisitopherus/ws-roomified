import { id } from "../utils/id.js";

import { SocketEvents, SocketEventsHelper } from "../types/Socket";
import { AbstractSocketClient } from "./SocketClient";

/**
 * Abstract class for a Room that implements all necessary methods and properties.
 * @abstract
 * @class
 */
export abstract class AbstractRoom<Socket extends AbstractSocketClient<SocketEvents, SocketEvents> = any, SocketEventsFromServer extends SocketEvents = any> {

    /**
     * Sockets inside the room.
     * @private
     */
    private _sockets: Socket[];

    /**
     * Unique identifier of the room.
     * @private
     */
    private _id: string;

    /**
     * Getter for retrieving the id of the room.
     * @public
     */
    public get id() {
        return this._id;
    }

    /**
     * Getter for retrieving all sockets connected to the room.
     * @public
     */
    public get sockets() {
        return this._sockets;
    }

    /**
     * Constructor of the abstract Room class.
     * @param _sockets Sockets inside the room.
     * @param _id Optional setting id of the socket. `By default it will create an uuid`.
     * @public
     * @constructor
     */
    public constructor(_sockets: Socket[], _id?: string) {
        this._sockets = _sockets;
        if (_id) {
            // set id manually
            this._id = _id;
        } else {
            // create an id
            this._id = id();
        }
    }

    /**
     * Method for adding a socket to the room.
     * @param socket The socket that joined the room.
     * @returns The room instance for chaining.
     * @public
     */
    public addSocket(socket: Socket) {
        // push the given socket to the rooms sockets array
        this._sockets.push(socket);
        return this;
    }

    /**
     * Method for removing a socket from the room.
     * @param socket The socket that should leave the room.
     * @returns The room instance for chaining.
     * @public
     */
    public removeSocket(socket: Socket) {
        // looping through the connected sockets
        for (let i = 0; i < this._sockets.length; ++i) {
            // retrieving the socket
            const storedSocket = this._sockets[i];
            if (storedSocket.id === socket.id) {
                // remove the socket
                this._sockets.splice(i, 1);
                break;
            }
        }
        return this;
    }

    /**
     * Method for sending a new message to all the sockets connected to the room.
     * @param event The event.
     * @param message Data to be sent.
     * @returns The room instance for chaining.
     * @public
     */
    public all<E extends keyof SocketEventsHelper<SocketEventsFromServer>>(event: E, message: SocketEventsHelper<SocketEventsFromServer>[E]) {
        // looping through the connected sockets
        for (let i = 0; i < this._sockets.length; ++i) {
            // retrieving the socket
            const storedSocket = this._sockets[i];
            // send the specified message
            storedSocket.sendMessage(event, message);
        }
        return this;
    }

    /**
     * Method for sending a new message to all sockets connected to the room except the one with the specified id.
     * @param id Id of the socket that should not receive the message.
     * @param event Event of the message.
     * @param message Data to be sent to the sockets.
     * @returns The room instance for chaining.
     * @public
     */
    public other<E extends keyof SocketEventsHelper<SocketEventsFromServer>>(id: string, event: E, message: SocketEventsHelper<SocketEventsFromServer>[E]) {
        // looping through the connected sockets
        for (let i = 0; i < this._sockets.length; ++i) {
            // retrieving the socket
            const storedSocket = this._sockets[i];
            // check if socket is the exception
            if (id === storedSocket.id) continue;
            // send the specified message
            storedSocket.sendMessage(event, message);
        }
        return this;
    }

    /**
     * Method for sending a new message to one socket connected to the room.
     * @param id Id of the socket that should receive the message.
     * @param event Event of the message.
     * @param message Data to be sent to the sockets.
     * @returns The room instance for chaining.
     * @public
     */
    public one<E extends keyof SocketEventsHelper<SocketEventsFromServer>>(id: string, event: E, message: SocketEventsHelper<SocketEventsFromServer>[E]) {
        // looping through the connected sockets
        for (let i = 0; i < this._sockets.length; ++i) {
            // retrieving the socket
            const storedSocket = this._sockets[i];
            // check if socket is the one that is specified
            if (id === storedSocket.id) {
                storedSocket.sendMessage(event, message);
                break;
            }
        }
        return this;
    }

    /**
     * Method for sending a new message to some sockets connected to the room.
     * @param ids Ids of the sockets that should receive the message.
     * @param event Event of the message.
     * @param message Data to be sent to the sockets.
     * @returns The room instance for chaining.
     * @public
     */
    public some<E extends keyof SocketEventsHelper<SocketEventsFromServer>>(ids: string[], event: E, message: SocketEventsHelper<SocketEventsFromServer>[E]) {
        // looping through the connected sockets
        for (let i = 0; i < this._sockets.length; ++i) {
            // retrieving the socket
            const storedSocket = this._sockets[i];
            // check if socket is the one of the specified ones
            for (let j = 0; j < ids.length; ++j) {
                if (ids[j] === storedSocket.id) {
                    // remove the id from the array for better performance
                    ids.splice(j, 1);
                    // send the specified message
                    storedSocket.sendMessage(event, message);
                    break;
                }
            }
        }
        return this;
    }
}