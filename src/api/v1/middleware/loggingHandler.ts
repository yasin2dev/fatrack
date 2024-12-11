import { Request, Response, NextFunction } from "express";

export function loggingHandler(req: Request, res: Response, next: NextFunction) {
    logging.log(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

    res.on("finish", (err: Error) => {
        logging.log(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${req.statusCode}]`)
    });

    next()
}