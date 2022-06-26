import { id } from "../utils/id.js";

import { SocketEvent, SocketEvents, SocketEventsHelper } from "../types/SocketClient";
import { AbstractSocketClient } from "./SocketClient";

/**
 * Abstract class for a Room that implements all necessary methods and properties.
 * @abstract
 * @class
 */
export abstract class AbstractRoom<Client extends AbstractSocketClient<SocketEvents, SocketEvents>, SocketEventsFromServer extends SocketEvents> {

    /**
     * Unique identifier of the room.
     */
    private _id: string;

    /**
     * Getter for retrieving the id of the room.
     */
    public get id() {
        return this._id;
    }

    /**
     * Getter for retrieving sockets.
     * @public
     */
    public get sockets() {
        return this._sockets;
    }

    /**
     * Constructor of the Room abstract class.
     * @param _sockets Sockets inside the room.
     * @param _id Optional setting id of the socket. `By default it will create an uuid`.
     * @public
     * @constructor
     */
    public constructor(private _sockets: Client[], _id?: string) {
        if (_id) {
            // set id manually
            this._id = _id;
        } else {
            // create an id
            this._id = id();
        }
    }

    /**
     * Method for sending a new message to all the clients connected to the room.
     * @param message Data to be sent.
     */
    public all<E extends keyof SocketEventsHelper<SocketEventsFromServer>>(message: SocketEventsHelper<SocketEventsFromServer>[E]) {
        for (let i = 0; i < this._sockets.length; ++i) {
            const storedSocket = this._sockets[i];
            storedSocket.sendMessage(message.event, message.data);
        }
    }
}