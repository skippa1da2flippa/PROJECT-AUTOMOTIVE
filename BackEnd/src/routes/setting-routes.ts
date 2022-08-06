import { Router, Response } from 'express';
import {authenticateToken} from "./auth-routes";
import {retrieveUserId} from "./utils/param-checking";
import {AuthenticatedRequest} from "./utils/authenticated-request";
import {UserEndpointResponse} from "./user-routes";
import {
    getUserById,
    updateGamification,
    updateLanguage,
    updateSize,
    updateTheme,
    UserDocument
} from "../model/database/user";
import {toUnixSeconds} from "./utils/date-utils";


interface SettingLanguageBody {
    language: string
}

interface SettingLanguageRequest extends AuthenticatedRequest {
    body: SettingLanguageBody
}

interface SettingThemeBody {
    theme: string
}

interface SettingThemeRequest extends AuthenticatedRequest {
    body: SettingThemeBody
}

interface SettingSizeBody {
    size: number
}

interface SettingSizeRequest extends AuthenticatedRequest {
    body: SettingSizeBody
}

interface SettingGamificationBody {
    gamification: boolean
}

interface SettingGamificationRequest extends AuthenticatedRequest {
    body: SettingGamificationBody
}

export const router = Router()

router.get(
    "/users/@meh/setting",
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let userId = res.locals.userId
        let user: UserDocument
        try {
            user = await getUserById(userId)
            return res.status(201).json({
                setting: user.setting,
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


router.get(
    "/users/@meh/setting/language",
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let userId = res.locals.userId
        let user: UserDocument
        try {
            user = await getUserById(userId)
            return res.status(201).json({
                language: user.setting.language,
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


router.get(
    "/users/@meh/setting/theme",
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let userId = res.locals.userId
        let user: UserDocument
        try {
            user = await getUserById(userId)
            return res.status(201).json({
                theme: user.setting.theme,
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


router.get(
    "/users/@meh/setting/size",
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let userId = res.locals.userId
        let user: UserDocument
        try {
            user = await getUserById(userId)
            return res.status(201).json({
                size: user.setting.size
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
    "/users/@meh/setting/gamification",
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let userId = res.locals.userId
        let user: UserDocument
        try {
            user = await getUserById(userId)
            return res.status(201).json({
                gamificationHide: user.setting.gamificationHide,
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


router.patch(
    "/users/@meh/setting/language",
    authenticateToken,
    retrieveUserId,
    async (req: SettingLanguageRequest, res: UserEndpointResponse) => {
        let userId = res.locals.userId
        let language = req.body.language
        if (language) {
            try {
                await updateLanguage(userId, language)
                return res.sendStatus(204)
            } catch (err) {
                return res.status(err.statusCode).json({
                    timestamp: toUnixSeconds(new Date()),
                    errorMessage: err.message,
                    requestPath: req.path,
                })
            }
        } else {
            return res.status(400).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: "language inside the body request is undefined",
                requestPath: req.path,
            })
        }
    }
)

router.patch(
    "/users/@meh/setting/theme",
    authenticateToken,
    retrieveUserId,
    async (req: SettingThemeRequest, res: UserEndpointResponse) => {
        let userId = res.locals.userId
        let theme  = req.body.theme
        if (theme) {
            try {
                await updateTheme(userId, theme)
                return res.sendStatus(204)
            } catch (err) {
                return res.status(err.statusCode).json({
                    timestamp: toUnixSeconds(new Date()),
                    errorMessage: err.message,
                    requestPath: req.path,
                })
            }
        } else {
            return res.status(400).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: "theme inside the body request is undefined",
                requestPath: req.path,
            })
        }
    }
)

router.patch(
    "/users/@meh/setting/size",
    authenticateToken,
    retrieveUserId,
    async (req: SettingSizeRequest, res: UserEndpointResponse) => {
        let userId = res.locals.userId
        let size  = req.body.size
        if (size) {
            try {
                await updateSize(userId, size)
                return res.sendStatus(204)
            } catch (err) {
                return res.status(err.statusCode).json({
                    timestamp: toUnixSeconds(new Date()),
                    errorMessage: err.message,
                    requestPath: req.path,
                })
            }
        } else {
            return res.status(400).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: "size inside the body request is undefined",
                requestPath: req.path,
            })
        }
    }
)

router.patch(
    "/users/@meh/setting/gamification",
    authenticateToken,
    retrieveUserId,
    async (req: SettingGamificationRequest, res: UserEndpointResponse) => {
        let userId = res.locals.userId
        let gamification  = req.body.gamification
        if (gamification) {
            try {
                await updateGamification(userId, gamification)
                return res.sendStatus(204)
            } catch (err) {
                return res.status(err.statusCode).json({
                    timestamp: toUnixSeconds(new Date()),
                    errorMessage: err.message,
                    requestPath: req.path,
                })
            }
        } else {
            return res.status(400).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: "gamification inside the body request is undefined",
                requestPath: req.path,
            })
        }
    }
)