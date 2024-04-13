import {Server as HttpServer} from 'http';
import {Server} from 'socket.io';

const WEBSOCKET_CORS = {
    origin: '*',
    methods: ['GET', 'POST']
};

class WebsocketIo extends Server {

    private static io: WebsocketIo;

    constructor(httpServer: HttpServer) {
        super(httpServer, {
            cors: WEBSOCKET_CORS
        });
    }

    public static getInstance(httpServer?: HttpServer): WebsocketIo {

        if (!WebsocketIo.io) {
            WebsocketIo.io = new WebsocketIo(httpServer!);
        }

        return WebsocketIo.io;

    }
}

export default WebsocketIo;