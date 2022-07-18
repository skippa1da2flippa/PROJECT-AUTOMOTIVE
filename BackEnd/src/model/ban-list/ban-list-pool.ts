import { Tedis } from "tedis"
import { pool } from "../.."
import { toUnixSeconds } from "../../routes/utils/date-utils"

export interface PoolData {
    tokenKey: string,
    insertedIn: number
}

/* CASI DI BAN
 * -> nel caso in cui un utente abbia almeno uno dei due token non popolato (vuol dire che ha la mammina lurida) 
 * -> quando un utente viene bannato crasto dall'intera piattaforma
 * -> quando la verify del refresh token fallisce 
 */

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

    static async isBanned(tokenKey: string): Promise<boolean> {
        let tedis = await pool.getTedis()
        
        let value = await tedis.get(tokenKey)

        pool.putTedis(tedis)

        return value 
            ? Promise.resolve(true)
            : Promise.reject()
    }
}

