import {Router} from "express";
import {authenticateToken} from "./auth-routes";
import {retrieveUserId} from "./utils/param-checking";
import {AuthenticatedRequest} from "./utils/authenticated-request";
import {UserEndpointResponse} from "./user-routes";
import {getUserById, updateUserStats, UserDocument} from "../model/database/user";
import {toUnixSeconds} from "./utils/date-utils";


interface UpdateStatsBody {
    sauce: number,
    trophies: number
}

interface UpdateStatsRequest extends AuthenticatedRequest {
    body: UpdateStatsBody
}

export const router = Router()

router.get(
    "/users/@meh/stats",
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let user: UserDocument
        let userId = res.locals.userId
        try {
            user = await getUserById(userId)
            return res.status(201).json({
                stats: user.stats,
                accessToken: res.locals.newAccessToken
            })
        } catch(err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
)


router.put(
    "/users/@meh/stats",
    authenticateToken,
    retrieveUserId,
    async (req: UpdateStatsRequest, res: UserEndpointResponse) => {
        let user: UserDocument
        let userId = res.locals.userId
        try {
            await updateUserStats(userId, {
                sauce: req.body.sauce,
                trophies: req.body.trophies
            })

            return res.sendStatus(204)
        } catch(err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
)