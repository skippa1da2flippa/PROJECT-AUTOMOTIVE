import {Router} from "express";
import {authenticateToken} from "./auth-routes";
import {retrieveUserId} from "./utils/param-checking";
import {AuthenticatedRequest} from "./utils/authenticated-request";
import {UserEndpointResponse} from "./user-routes";
import {
    getUserById,
    updateRoutineLightsColor,
    updateRoutineMusic,
    updateRoutineName, updateRoutineTemperature,
    UserDocument
} from "../model/database/user";
import {toUnixSeconds} from "./utils/date-utils";
import {RoutineSubDocument} from "../model/database/routine";
import {ServerError} from "../model/errors/server-error";
import {use} from "passport";


export const router = Router();

interface RoutineUpdateBody {
    newName?: string
    temperature: number
    lights: string
    musicToAdd: string[]
    musicToRemove: string[]
}

interface RoutineUpdateRequest extends AuthenticatedRequest {
    body: RoutineUpdateBody
}


router.get(
    "/api/users/@meh/routines",
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let userId = res.locals.userId
        let user: UserDocument
        try {
            user = await getUserById(userId)
            return res.status(201).json({
                routines: user.routines
            })
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            })
        }
    }
)

router.get(
    "/api/users/@meh/routines/:name",
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let userId = res.locals.userId
        let user: UserDocument
        let routine: RoutineSubDocument
        try {
            user = await getUserById(userId)
            for(let idx in user.routines) {
                let routineName = user.routines[idx].name.split("/")[0]
                if (routineName === req.params.name)
                    routine = user.routines[idx]
            }
            if (!routine) throw new ServerError("No user routine found matching the id")
            return res.status(201).json({
                routine
            })
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            })
        }
    }
)

router.put(
    "/api/users/@meh/routines/:name",
    authenticateToken,
    retrieveUserId,
    async (req: RoutineUpdateRequest, res: UserEndpointResponse) => {
        const userId = res.locals.userId
        const oldName = req.params.name
        const newName = req.body.newName || oldName
        const color = req.body.lights
        const temperature = req.body.temperature
        const musicToAdd = req.body.musicToAdd
        const musicToRemove = req.body.musicToRemove
        try {
            if (oldName !== newName) await updateRoutineName(userId, oldName, newName)
            await updateRoutineLightsColor(userId, newName, color)
            await updateRoutineTemperature(userId, newName, temperature)
            await updateRoutineMusic(userId, newName, musicToAdd, musicToRemove)
        } catch(err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            })
        }
    }
)