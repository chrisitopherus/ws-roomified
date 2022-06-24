import { WebSocket } from "ws";
import { AbstractSocketClient } from "./Socket/SocketClient.js";
import { SocketEvent } from "./types/SocketClient.js";

type SocketEvents = SocketEvent<"start", string> | SocketEvent<"stop", number>;

class SocketClient extends AbstractSocketClient<SocketEvents, SocketEvents> {
    constructor(socket: WebSocket) {
        super(socket);
        this.on("start", this.StartHandler);
        this.id
    }

    private StartHandler = (msg: string) => {
        console.log(msg);
    }

}

new SocketClient("" as any)