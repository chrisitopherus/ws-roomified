import { EventEmitter } from "events";

import { id } from "../utils/id.js";

// import types
import { RawData, WebSocket } from "ws";
import { SocketEvents, SocketEventsHelper } from "../types/Socket";

/**
 * Abstract class for a SocketClient that implements all necessary methods and properties.
 * @abstract
 * @class
 */
export abstract class AbstractSocketClient<SocketEventsFromServer extends SocketEvents, SocketEventsFromClient extends SocketEvents> {

    /**
     * Getter for reading the socket instance.
     * @public
     */
    public get socket(): WebSocket {
        return this._socket;
    };

    /**
     * Getter for reading in the id of the socket.
     * @public
     */
    public get id(): string {
        return this._id;
    };

    /**
     * Id of the socket.
     * @private
     */
    private _id: string;

    /**
     * EventEmitter instance used for handling the incoming socket events.
     * @protected
     */
    protected _EventEmitter: EventEmitter = new EventEmitter();

    /**
     * Constructor of the SocketClient abstract class.
     * @param _socket The socket connection instance.
     * @param _id Optional setting id of the socket. `By default it will create an uuid`.
     * @public
     * @constructor
     */
    public constructor(private _socket: WebSocket, _id?: string) {
        // if id was set manually, then dont create a uuid
        if (_id) {
            this._id = _id;
        } else {
            this._id = id();
        }

        // listen to messages
        _socket.on('message', this.receiveMessage);
    }

    /**
     * Method for sending a message to the client.
     * @param event Name of the event.
     * @param data Data according to the event.
     * @public
     */
    public sendMessage<E extends keyof SocketEventsHelper<SocketEventsFromServer>>(event: E, data: SocketEventsHelper<SocketEventsFromServer>[E]) {
        // creating the message<
        const message = {
            event,
            data
        }
        // sending the message to the client
        this.socket.send(JSON.stringify(message));
    }

    /**
     * Method for registering a handler to a specific socket event sent by a client.
     * @param event The event name.
     * @param cb Callback function to be called when the socket event from the client occured.
     * @public
     */
    public on<E extends keyof SocketEventsHelper<SocketEventsFromClient>>(event: E, cb: (message: SocketEventsHelper<SocketEventsFromClient>[E]) => unknown) {
        this._EventEmitter.on(event as any, cb);
    }

    /**
     * Method for receiving messages from the client.
     * @param message Rawdata of the message sent by the client.
     * @private
     */
    private receiveMessage = <E extends SocketEventsFromClient>(message: RawData) => {
        // buffer to string and then convert json to an object
        const msg = JSON.parse(message.toString()) as E;
        // destructure the message object
        const { event, data } = msg;

        // emiting the event with the data
        this._EventEmitter.emit(event, data);

    }
}