// There are some long-running tests
import mongoose from 'mongoose';
import chalk from 'chalk';
import { UserModel } from '../src/model/database/user';
import { VehicleModel } from '../src/model/database/my-vehicle'
import { httpServer } from '../src';


jest.setTimeout(35000);


/**
 * Setup mongoose connection
 */
/**
 * beforeAll(async () => {
 *     // If testing, set test db uri, else use the other
 *     const IS_TESTING_MODE: boolean = process.env.TEST === 'true';
 *     const dbUri: string = IS_TESTING_MODE ? process.env.TEST_DB_URI as string : process.env.DB_URI as string;
 *     // Connect to the database
 *     await mongoose
 *         .connect(dbUri, {})
 *         .then(() => console.log(chalk.bgGreen('Connected to Db')));
 * });
 * */

/**
 * Empty database after all tests have run, then
 * close the mongoose connection
 */
afterAll(async () => {
    await UserModel.deleteMany({});
    await VehicleModel.deleteMany({});
    await mongoose.connection.close();
    httpServer.close()
    console.log(chalk.bgGreen('Connection to Db closed'));
});

