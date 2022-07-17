import { Tedis } from "tedis"
import { pool } from ".."
import { toUnixSeconds } from "../routes/utils/date-utils"

export interface PoolData {
    tokenKey: string,
    insertedIn: number
}


export class BanListPool {
    static bannedReferences: PoolData[]
    static async insertElem(bannedToken: string) {

        // gets a connection from the pool
        let tedis = await pool.getTedis()

        // adds the bannedToken to the array reference
        this.bannedReferences.push({
            tokenKey: bannedToken, 
            insertedIn: toUnixSeconds(new Date())
        })

        // stores the response
        await tedis.set(bannedToken.toString(), toUnixSeconds(new Date()).toString())

        // delete expired tokens
        this.deleteExpired(tedis)

        // gives back the connection
        pool.putTedis(tedis)
    }

    private static async deleteExpired(tedisConn: Tedis): Promise<void> {
        for(var idx in this.bannedReferences) {
            var duration = Math.abs(
                toUnixSeconds(new Date()) - this.bannedReferences[idx].insertedIn
            );

            var hDuration = Math.floor(duration / 60)

            if (hDuration >= 2) await tedisConn.del(this.bannedReferences[idx].tokenKey)
        }

        return Promise.resolve()
    }
}

