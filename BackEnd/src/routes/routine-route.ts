import {Router} from "express";
import {authenticateToken} from "./auth-routes";
import {retrieveUserId} from "./utils/param-checking";
import {AuthenticatedRequest} from "./utils/authenticated-request";
import {UserEndpointResponse} from "./user-routes";
import {
    addRoutine,
    deleteRoutine,
    getUserById,
    updateRoutineLightsColor,
    updateRoutineMusic,
    updateRoutineName, updateRoutineTemperature,
    UserDocument
} from "../model/database/user";
import {toUnixSeconds} from "./utils/date-utils";
import {Routine, RoutineSubDocument} from "../model/database/routine";
import {ServerError} from "../model/errors/server-error";


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

interface RoutineCreationBody {
    name: string,
    temperature: number,
    lightsColor: string,
    music: string[],
    path: string
}

interface RoutineCreationRequest extends AuthenticatedRequest {
    body: RoutineCreationBody
}


router.get(
    "/users/@meh/routines",
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let userId = res.locals.userId
        let user: UserDocument
        try {
            user = await getUserById(userId)
            const routines: Routine[] = user.routines.map(elem => {
                return {
                    lightsColor: elem.lightsColor,
                    name: elem.name.split("/")[0],
                    temperature: elem.temperature ,
                    music: elem.music,
                    path: "chilling"
                }
            })
            return res.status(201).json({
                routines: routines,
                accessToken: res.locals.newAccessToken ? res.locals.newAccessToken : ""
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

router.post(
    "/users/@meh/routines",
    authenticateToken,
    retrieveUserId,
    async (req: RoutineCreationRequest, res: UserEndpointResponse) => {
        let userId = res.locals.userId
        try {
            const routine: Routine = {
                name: req.body.name + "/" + userId,
                temperature: req.body.temperature,
                path: req.body.path,
                lightsColor: req.body.lightsColor,
                music: req.body.music
            }
            await addRoutine(userId, routine)
            return res.status(204).json()
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
    "/users/@meh/routines/:name",
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
                routine,
                accessToken: res.locals.newAccessToken ? res.locals.newAccessToken : ""
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
    "/users/@meh/routines/:name",
    authenticateToken,
    retrieveUserId,
    async (req: RoutineUpdateRequest, res: UserEndpointResponse) => {
        const userId = res.locals.userId
        const oldName = req.params.name
        const newName = req.body.newName || oldName
        const color = req.body.lights
        const temperature = req.body.temperature
        const musicToAdd = req.body.musicToAdd || []
        const musicToRemove = req.body.musicToRemove || []
        if (userId && oldName && newName && color && temperature && musicToAdd && musicToRemove){
            try {
                if (oldName !== newName) await updateRoutineName(userId, oldName, newName)
                await updateRoutineLightsColor(userId, newName, color)
                await updateRoutineTemperature(userId, newName, temperature)
                await updateRoutineMusic(userId, newName, musicToAdd, musicToRemove)
                return res.sendStatus(204)
            } catch(err) {
                return res.status(err.statusCode).json({
                    timestamp: toUnixSeconds(new Date()),
                    errorMessage: err.message,
                    requestPath: req.path,
                })
            }
        } else {
            return res.status(400).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: "One or more parameters are undefined",
                requestPath: req.path,
            })
        }
    }
)

router.delete(
    "/users/@meh/routines/:name",
    authenticateToken,
    retrieveUserId,
    async (req: RoutineUpdateRequest, res: UserEndpointResponse) => {
        const userId = res.locals.userId
        const name = req.params.name
        try {
            await deleteRoutine(userId, name)
            return res.sendStatus(204)
        } catch(err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            })
        }
    }
)