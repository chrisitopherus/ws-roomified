/**
 * Template for creating new Events.
 */
type SocketEvent<E extends `${any}`, D extends any> = {
    event: E,
    data: D
}

/**
 * Just a Template to define a structure.
 * 
 * ? By default this type defines SocketEvents to be any event with any data.
 */
type SocketEvents = SocketEvent<`${any}`, any>

/**
 * Utility type helper for finding the data for a specific event name.
 */
type DataByEvent<E extends SocketEvents['event'], T extends SocketEvents> = T extends { event: E } ? T : never;

/**
 * Utility type helper for creating a mapped type for the socket events.
 */
type SocketEventsHelper<Events extends SocketEvents> = {
    [E in Events["event"]]: DataByEvent<E, Events>["data"]
}

export { SocketEventsHelper, SocketEvent, SocketEvents, DataByEvent };