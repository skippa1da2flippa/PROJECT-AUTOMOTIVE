import { Server, Socket } from 'socket.io';
import chalk from 'chalk';

import { UserData } from '../../model/events/user-data';
import {
    getUserById,
    UserDocument,
} from '../../model/database/user';
import { ClientListenerNotifier } from './base/client-listener-notifier';

/**
 * Class that wraps socket.io functionality to listen to a 'server-joined' client event.
 * Such event creates a room for the client based on the
 * userId that the login has been made with, which allows the server
 * to send events specifically to the user.
 *
 * This listener also handles "teardown" operations for the user,
 * such as setting its status to offline, removing it from the matchmaking queue
 * and making it leave any match he is currently playing.
 */
export class ServerJoinedListener extends ClientListenerNotifier<UserData> {
    constructor(client: Socket, ioServer: Server) {
        super(ioServer, client, 'server-joined');
    }

    public listen(): void {
        super.listen(async (joinData: UserData): Promise<void> => {
            this.client.join(joinData.userId);

            console.log(chalk.green.bold(`User ${joinData.userId} joined the server!`));

            // Add disconnect listener that performs teardown operations on the
            // user when he leaves the server (such as setting its status to Offline)
            this.client.on('disconnect', async () => {
                console.log(
                    chalk.red.bold(`User ${joinData.userId} disconnected from the server!`)
                );

                await this.userTeardown(joinData.userId);
            });

            return Promise.resolve();
        });
    }

    /**
     * Execute teardown of the user, which consists in all those operations
     * that must be performed after the user leaves the server.
     * Notably, such operation are the following:
     *  - deconnection from the car
     *
     * @param userId id of the user to teardown
     * @private
     */
    private async userTeardown(userId: string): Promise<void> {
        try {
            // Do something in the future to teardown the connection with the car

        } catch (err) {
            console.log(
                chalk.bgRed(`User teardown on disconnect has failed. Reason: ${err.message}`)
            );
        }
    }
}
