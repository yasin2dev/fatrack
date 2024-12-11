import http from "http"
import express from 'express'
import { info } from './config/logging'
import { loggingHandler } from "./middleware/loggingHandler"
import { corsHandler } from "./middleware/corsHandler"
import { routeNotFound } from "./middleware/routeNotFound"
import { SERVER_HOSTNAME, SERVER_PORT } from "./config/config"


export const app = express()
export let httpServer: ReturnType<typeof http.createServer>

export const Main = () => {
    info('Initializing API...');
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    info('and configurating');
    app.use(loggingHandler);
    app.use(corsHandler);

    info('Define Controller Routing');
    app.get('/main/healthcheck', async (req, res, next): Promise<any> => {
        return res.status(200).json({products: [{id: 1, title: "WORLD", price: "10.99"}]});
    })

    info('Define Controller Routing');
    app.use(routeNotFound);

    info("Server Start");
    httpServer = http.createServer(app);
    httpServer.listen(SERVER_PORT, () => {
        info("Server Started " + SERVER_HOSTNAME + ':' + SERVER_PORT);
    });
}

export const ShutdownServer = (callback: any) => httpServer && httpServer.close(callback);

Main();