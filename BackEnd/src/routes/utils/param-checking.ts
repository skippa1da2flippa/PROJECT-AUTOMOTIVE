import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { ServerError } from '../../model/errors/server-error';
import { AuthenticatedRequest } from './authenticated-request';
import { toUnixSeconds } from './date-utils';

/**
 * Middleware that tries to extract the skip and limit query parameters from
 * the request url and checks their validity.
 * If they are not set, their default value is -1.
 * If they are set with a non-numerical value, an error response is returned.
 * The parsed params can be found in the "locals" field of the response.
 *
 * @param req
 * @param res
 * @param next
 */
export const skipLimitChecker = function (req: Request, res: Response, next: NextFunction) {
    const regexp: RegExp = /[a-zA-Z]/;
    const skip: string = (req.query.skip as string) || '-1';
    const limit: string = (req.query.limit as string) || '-1';

    if (regexp.test(skip) || regexp.test(limit)) {
        return res.status(400).json({
            timestamp: toUnixSeconds(new Date()),
            errorMessage: 'Wrong skip or limit',
            requestPath: req.path,
        });
    }

    res.locals.skip = parseInt(skip, 10);
    res.locals.limit = parseInt(limit, 10);

    next();
};

/**
 * Middleware that tries to extract the userId request parameter from
 * the request url.
 * If the parameter is invalid, an error response is returned.
 * The parsed param can be found in the "locals" field of the response.
 *
 * @param req
 * @param res
 * @param next
 */
export const retrieveUserId = function (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        res.locals.userId = new Types.ObjectId(req.jwtContent.Id);
        next();
    } catch (err) {
        return res.status(404).json({
            timestamp: toUnixSeconds(new Date()),
            errorMessage: err.message,
            requestPath: req.path,
        });
    }
};

/**
 * If the parameter is invalid, an error response is returned.
 * The parsed param can be found in the "locals" field of the response.
 *
 * This middleware is developed for endpoints as myVehicles, since while receiving the request we
 * do know a car is doing the request
 *
 * @param req
 * @param res
 * @param next
 */
export const retrieveVehicleId = function (req:  AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        res.locals.vehicleId = new Types.ObjectId(req.jwtContent.Id);
        next();
    } catch (err) {
        return res.status(404).json({
            timestamp: toUnixSeconds(new Date()),
            errorMessage: err.message,
            requestPath: req.path,
        });
    }
};

export const retrieveId = function (s_id: string) {
    try {
        return new Types.ObjectId(s_id);
    } catch (err) {
        throw new Error('No user with that identifier');
    }
};


