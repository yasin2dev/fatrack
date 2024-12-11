import { Request, Response, NextFunction } from "express";

export const routeNotFound = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const error = new Error('Route not found');
    logging.error(error);

    return res.status(404).json({error});
}