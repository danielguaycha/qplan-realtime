import express from 'express';
import dotenv from 'dotenv';

import './core/db';
import middlewares from './core/http.middlewares';
import WebsocketIo from './core/websocket';
import FriendRouting from './modules/friends/friend.routing';

class ExpressServer {
    public readonly app: express.Application;
    public readonly apiPrefix: string;

    constructor() {
        dotenv.config();
        this.apiPrefix = 'api';
        this.app = express();
    }

    start(): void {
        // init middlewares
        middlewares.forEach(middleWare => {
            this.app.use(middleWare);
        });

        // routes
        this.app.use('/friends', new FriendRouting().router);

        // start
        const server = this.app.listen(process.env.PORT || 3000, () => {
            console.log(`Server on port ${process.env.port || 3000}`);
        });

        // web socket server
        WebsocketIo.getInstance(server);
    }
}

const server = new ExpressServer();
server.start();