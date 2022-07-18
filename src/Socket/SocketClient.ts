import { EventEmitter } from "events";

import { id } from "../utils/id.js";

// import types
import { RawData, WebSocket } from "ws";
import { SocketEvents, SocketEventsHelper } from "../types/Socket";
import { AbstractRoom } from "./Room.js";
import { AbstractManager } from "./Manager.js";

/**
 * Abstract class for a SocketClient that implements all necessary methods and properties.
 * @abstract
 * @class
 */
export abstract class AbstractSocketClient<SocketEventsFromServer extends SocketEvents = any, SocketEventsFromClient extends SocketEvents = any, Room extends AbstractRoom<AbstractSocketClient, SocketEventsFromServer> = any> {

    /**
     * The socket connection.
     * @private
     */
    private _socket: WebSocket;

    /**
     * Getter for reading the socket instance.
     * @public
     */
    public get socket(): WebSocket {
        return this._socket;
    };

    /**
     * Id of the socket.
     * @private
     */
    private _id: string;

    /**
     * Getter for reading in the id of the socket.
     * @public
     */
    public get id(): string {
        return this._id;
    };

    /**
     * EventEmitter instance used for handling the incoming socket events.
     * @protected
     */
    protected _EventEmitter: EventEmitter = new EventEmitter();

    /**
     * Property containing either the current room instance or `null`.
     * @public
     */
    public currentRoom: Room | null = null;

    /**
     * Constructor of the abstract SocketClient class.
     * 
     * ? By default it will add the created client to the storage inside the given manager instance.
     * @param _socket The socket connection.
     * @param _managerInstance Manager instance reference to have access to rooms.
     * @param _id Optional setting id of the socket. `By default it will create an uuid`.
     * @public
     * @constructor
     */
    public constructor(_socket: WebSocket, private _managerInstance: AbstractManager<AbstractSocketClient<SocketEventsFromServer, SocketEventsFromClient>, AbstractRoom<AbstractSocketClient<SocketEventsFromServer, SocketEventsFromClient>, SocketEventsFromServer>>, _id?: string) {
        // setting the socket
        this._socket = _socket;
        // if id was set manually, then dont create a uuid
        if (_id) {
            this._id = _id;
        } else {
            this._id = id();
        }
        // add the client to the stored sockets
        this._managerInstance.addSocket(this);

        // listen to messages
        _socket.on('message', this.receiveMessage);
    }

    /**
     * Method for registering a handler to a specific socket event sent by a client.
     * @param event The event name.
     * @param cb Callback function to be called when the socket event from the client occured.
     * @returns The socket client instance for chaining.
     * @public
     */
    public on<E extends keyof SocketEventsHelper<SocketEventsFromClient>>(event: E, cb: (this: this, message: SocketEventsHelper<SocketEventsFromClient>[E]) => unknown) {
        this._EventEmitter.on(event, cb.bind(this));
        return this;
    }

    /**
     * Method for unregistering a handler from a specific socket event.
     * @param event The event name.
     * @param cb Callback function to be called when the socket event from the client occured.
     * @returns The socket client instance for chaining.
     */
    public off<E extends keyof SocketEventsHelper<SocketEventsFromClient>>(event: E, cb: (message: SocketEventsHelper<SocketEventsFromClient>[E]) => unknown) {
        this._EventEmitter.off(event, cb);
        return this;
    }

    /**
     * Method for joining a new room.
     * @param id Id of the room to join.
     * @returns The socket client instance for chaining.
     * @public
     */
    public join(id: string) {
        // join the room
        this._managerInstance.joinRoomById(id, this);
        return this;
    }


    /**
     * Method for leaving the current room.
     * @returns The socket client instance for chaining.
     * @public
     */
    public leave() {
        if (!this.currentRoom) return this;
        // leave the current room
        this._managerInstance.leaveRoomById(this.currentRoom.id, this);
        return this;
    }

    /**
     * Method for leaving a room by its id.
     * @param id Id of the room to leave.
     * @returns The socket client instance for chaining.
     * @public
     */
    public leaveRoomById(id: string) {
        this._managerInstance.leaveRoomById(id, this);
        return this;
    }

    /**
     * Method for sending a message to the client.
     * @param event Name of the event.
     * @param data Data according to the event.
     * @returns The socket client instance for chaining.
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
        return this;
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