import { Request, Response, Router } from 'express';
import { toUnixSeconds } from '../utils/date-utils';
import {setUpHeader} from "../../../tests/endpoint-tests/user.test";

export const router = Router();

interface MongoDpApiCredentials {
    apiBaseUrl: string;
    apiKey: string;
    clusterName: string;
    dbName: string;
}

/**
 * Returns the necessary information to access the MongoDb Data Api
 *
 * This route is important because it allows the client to retrieve the required secrets
 * (notably the api-key) to make requests to the MongoDb Data Api. This allows the client to directly
 * perform operations in the database, which is useful for integration testing purposes.
 * This route is registered in the app only if the project is in testing mode.
 */
router.get('/testing/mongoDbApi/credentials', async (req: Request, res: Response) => {
    try {
        const apiCred: MongoDpApiCredentials = {
            apiBaseUrl: process.env.MONGO_DB_API_URL,
            clusterName: process.env.MONGO_DB_CLUSTER_NAME,
            apiKey: process.env.MONGO_DB_API_KEY,
            dbName: getTestDbName(),
        };
        return res.status(200).json(apiCred);
    } catch (err) {
        return res.status(400).json({
            timestamp: toUnixSeconds(new Date()),
            errorMessage: err.message,
            requestPath: req.path,
        });
    }
});

/**
 * Returns the right header for a user without the need of authenticate
 */
router.get('/testing/getHeader/:userId', async (req: Request, res: Response) => {
    try {
        const header = {
            "authorization" : setUpHeader(req.params.userId)
        }

        return res.status(200).json({
            header
        })
    } catch (err) {
        return res.status(400).json({
            timestamp: toUnixSeconds(new Date()),
            errorMessage: err.message,
            requestPath: req.path,
        });
    }
});

const getTestDbName = (): string => {
    // The string format is the following:
    // mongodb+srv://<username>:<pwd>@<cluster-name>.<some-id>.mongodb.net/<dbName>?retryWrites=true&w=majority
    const testDbUri: string = process.env.TEST_DB_URI;
    const afterLastSlash: string = testDbUri.split('/')[3];
    const dbName: string = afterLastSlash.split('?')[0];

    return dbName;
};
