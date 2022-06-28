import { SocketEvents } from "../types/Socket";
import { AbstractRoom } from "./Room";
import { AbstractSocketClient } from "./SocketClient";


/**
 * Abstract class managing and storing all sockets and rooms.
 * @abstract
 * @class
 */
export abstract class AbstractManager<Socket extends AbstractSocketClient<SocketEvents, SocketEvents>, Room extends AbstractRoom<Socket, SocketEvents>> {

    /**
     * All the sockets connected to the server.
     * @private
     */
    private _sockets: Socket[];

    /**
     * All the rooms that currently exist.
     * @private
     */
    private _rooms: Room[];

    /**
     * Getter for retrieving all the sockets that are currently connected to the server.
     * @public
     */
    public get sockets() {
        return this._sockets;
    }

    /**
     * Gett for retrieving all the rooms that currently exist.
     * @public
     */
    public get rooms() {
        return this._rooms;
    }

    /**
     * Constructor of the abstract Manager class.
     * @param _sockets All the sockets connected to the server.
     * @param _rooms All the rooms that currently exist.
     * @public
     */
    public constructor(_sockets: Socket[], _rooms: Room[]) {
        this._sockets = _sockets;
        this._rooms = _rooms;
    }

    /**
     * Method for adding a new socket to the socket storage.
     * ? Takes a socket instance as an argument and pushes it into the socket storage.
     * @param createdSocket Created SocketClient instance.
     * @public
     */
    public addSocket(createdSocket: Socket): {
        addedSocket: Socket;
        prevLength: number;
        newLength: number;
    } {
        // saving the previous length
        const prevLength = this.sockets.length;
        // pushing the room and saving the length
        const newLength = this._sockets.push(createdSocket);
        // return information
        return {
            addedSocket: createdSocket,
            newLength,
            prevLength
        };
    }

    /**
     * Method for removing an existing socket by its id.
     * @param id Id of the socket to be removed.
     * @returns Either the removed socket or `null`.
     * @public
     */
    public removeSocketById(id: string): Socket | null {
        for (let i = 0; i < [...this._sockets].length; ++i) {
            const storedSocket = this._sockets[i];
            if (id === storedSocket.id) {
                const deletedSocket = this._sockets.splice(i, 1);
                return deletedSocket[0];
            }
        }
        return null;
    }

    /**
     * Method for removing multiple existing sockets by their id.
     * @param ids Ids of the sockets to be removed.
     * @public
     */
    public removeSocketsById(ids: string[]) {
        const removedSockets: Socket[] = [];
        // looping through the connected sockets
        for (let i = 0; i < this._sockets.length; ++i) {
            // retrieving the socket
            const storedSocket = this._sockets[i];
            // check if socket is the one of the specified ones
            for (let j = 0; j < ids.length; ++j) {
                if (ids[j] === storedSocket.id) {
                    // remove the id from the array for better performance
                    ids.splice(j, 1);
                    // delete the socket
                    removedSockets.push(...this._sockets.splice(i, 1));
                    // reduce the counter variable, because one socket was deleted
                    i--;
                    break;
                }
            }
        }
    }

    /**
     * Method for adding a new room to the room storage.
     * ? Takes a room instance as an argument and pushes it into the room storage.
     * @param createdRoom Created Room instance.
     * @public
     */
    public addRoom(createdRoom: Room): {
        addedRoom: Room;
        prevLength: number;
        newLength: number;
    } {
        // saving the previous length
        const prevLength = this._rooms.length;
        // pushing the room and saving the length
        const newLength = this._rooms.push(createdRoom);
        // return information
        return {
            addedRoom: createdRoom,
            newLength,
            prevLength
        }
    }

    /**
     * Method for removing an existing room by its id.
     * @param id Id of the room to be removed.
     * @returns Either the removed room or `null`.
     * @public
     */
    public removeRoomById(id: string): Room | null {
        for (let i = 0; i < [...this._rooms].length; ++i) {
            const storedRoom = this._rooms[i];
            if (id === storedRoom.id) {
                const deletedRoom = this._rooms.splice(i, 1);
                return deletedRoom[0];
            }
        }
        return null;
    }


}