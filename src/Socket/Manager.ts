import { SocketEvents, Nullable } from "../types/Socket";
import { AbstractRoom } from "./Room";
import { AbstractSocketClient } from "./SocketClient";


/**
 * Abstract class managing and storing all sockets and rooms.
 * @abstract
 * @class
 */
export abstract class AbstractManager<Socket extends AbstractSocketClient<SocketEvents, SocketEvents> = any, Room extends AbstractRoom<Socket, SocketEvents> = any> {

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
     * Method for adding a new socket manually to the socket storage.
     * 
     * ? Takes a socket instance as an argument and pushes it into the socket storage.
     * @param createdSocket Created SocketClient instance.
     * @returns Information.
     * @public
     */
    public addSocket(createdSocket: Socket): {
        addedSocket: Socket;
        prevLength: number;
        newLength: number;
    } {
        // saving the previous length
        const prevLength = this.sockets.length;
        // looping through the sockets
        for (let i = 0; i < this._sockets.length; ++i) {
            // retrive a stored socket
            const storedSocket = this._sockets[i];
            if (storedSocket.id === createdSocket.id) {
                // return that information that indicates that nothing was added
                return {
                    addedSocket: createdSocket,
                    newLength: prevLength,
                    prevLength
                };
            }
        }
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
     * @returns Either the true or `null`.
     * @public
     */
    public removeSocketById(id: string): true | null {
        for (let i = 0; i < [...this._sockets].length; ++i) {
            const storedSocket = this._sockets[i];
            if (id === storedSocket.id) {
                const deletedSocket = this._sockets.splice(i, 1);
                this.garbage(deletedSocket);
                return true;
            }
        }
        return null;
    }

    /**
     * Method for removing multiple existing sockets by their id.
     * @param ids Ids of the sockets to be removed.
     * @returns Either true or `null`.
     * @public
     */
    public removeSocketsById(ids: string[]): true | null {
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
                    // delete the socket and collect it
                    removedSockets.push(...this._sockets.splice(i, 1));
                    // reduce the counter variable, because one socket was deleted
                    i--;
                    break;
                }
            }
        }

        // setting value to null, so garbage collector can collect it
        const len = removedSockets.length;
        this.garbage(removedSockets);
        return len === 0 ? null : true;
    }

    /**
     * Method for adding a new room to the room storage.
     * 
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
     * @returns Either true or `null`.
     * @public
     */
    public removeRoomById(id: string): true | null {
        for (let i = 0; i < [...this._rooms].length; ++i) {
            const storedRoom = this._rooms[i];
            if (id === storedRoom.id) {
                const deletedRoom = this._rooms.splice(i, 1);
                // setting value to null, so garbage collector can collect it
                this.garbage(deletedRoom);
                return true;
            }
        }
        return null;
    }

    /**
     * Method for removing multiple existing rooms by their id.
     * @param ids Ids of the rooms to be removed.
     * @returns Either the true or `null`.
     * @public
     */
    public removeRoomsById(ids: string[]): true | null {
        const removedRooms: Room[] = [];
        // looping through the existing rooms
        for (let i = 0; i < this._rooms.length; ++i) {
            // retrieving the room
            const storedRoom = this._rooms[i];
            // check if socket is the one of the specified ones
            for (let j = 0; j < ids.length; ++j) {
                if (ids[j] === storedRoom.id) {
                    // remove the id from the array for better performance
                    ids.splice(j, 1);
                    // delete the socket and collect it
                    removedRooms.push(...this._rooms.splice(i, 1));
                    // reduce the counter variable, because one socket was deleted
                    i--;
                    break;
                }
            }
        }
        const len = removedRooms.length;
        // setting value to null, so garbage collector can collect it
        this.garbage(removedRooms);

        return len === 0 ? null : true;
    }

    /**
     * Method that lets one socket join a room by its id.
     * @param id Id of the room to join.
     * @param socket The socket which should join the room.
     * @returns The manager instance for chaining.
     * @public
     */
    public joinRoomById(id: string, socket: Socket) {
        for (let i = 0; i < this._rooms.length; ++i) {
            const storedRoom = this._rooms[i];
            if (id === storedRoom.id) {
                // join the room
                storedRoom.addSocket(socket);
                socket.currentRoom = storedRoom;
                break;
            }
        }
        return this;
    }

    /**
     * Method that lets one socket leave a room by its id.
     * @param id Id of the room to leave.
     * @param socket The socket which should leave the room.
     * @returns The manager instance for chaining.
     * @public
     */
    public leaveRoomById(id: string, socket: Socket) {
        for (let i = 0; i < this._rooms.length; ++i) {
            const storedRoom = this._rooms[i];
            if (id === storedRoom.id) {
                // leave the room
                storedRoom.removeSocket(socket);
                socket.currentRoom = null;
                break;
            }
        }
        return this;
    }

    /**
     * Method for clearing a reference from a variable, so it can be collected by the garbage collector.
     * @param instance A variable holding a reference to an instance of a SocketClient or Room.
     * @returns The manager instance for chaining.
     * @public
     */
    public garbage<T extends Socket | Socket[] | Room | Room[]>(instance: Nullable<T>) {
        instance = null;
        return this;
    }

}