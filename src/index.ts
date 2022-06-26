import { WebSocket } from "ws";
import { AbstractSocketClient } from "./Socket/SocketClient.js";
import { SocketEvent } from "./types/SocketClient";

type SocketEvents = SocketEvent<"start", string>

class SocketClient extends AbstractSocketClient<SocketEvents, SocketEvents> {
    constructor(socket: WebSocket) {
        super(socket);
        this.on("start", this.StartHandler);
    }

    private StartHandler = (msg: string) => {
        console.log('New start event occured: ' + msg);
    }
}

new SocketClient("" as any).sendMessage("start", "Started...");

export { AbstractSocketClient } from './Socket/SocketClient.js';