import { Socket } from 'socket.io';
import chalk from 'chalk';
import { OwnerResData } from "../../model/events/owner-res-data"
import { ClientListener } from './base/client-listener';
import { Tedis, TedisPool } from "tedis";
import { pool } from '../..';

/**
 * Class that wraps socket.io functionality to listen
 * to a 'owner-response' client event.
 * Such event allows the client to join a socket.io room for listening
 * specific chat, so that he can listen only to messages of such chat.
 */
 export class OwnerResponseListener extends ClientListener<OwnerResData> {
    constructor(client: Socket) {
        super(client, 'owner-response');
    }

    public listen(): void {
        super.listen(async (data: OwnerResData) => {

            // gets a connection from the pool
            let tedis = await pool.getTedis()

            // stores the response
            // TODO you should store <userId, {vehicleId, response}>
            await tedis.set(data.ownerId, data.res.toString())

            // gives back the connection
            pool.putTedis(tedis)

            return (data.res)? Promise.resolve() : Promise.reject()
        })
    }
}