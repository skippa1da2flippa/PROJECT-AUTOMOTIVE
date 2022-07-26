import { Schema, SchemaTypes, Types} from 'mongoose';




/**
 * Interface that represent the stats of some user of the system.
 */
export interface UserStats {
    sauce: number;
    trophies: number; // create a thropies collection representing what to do to win it and its rules, and its state for unlocking it
    //many others 
}

/**
 * Interface that represent a stats sub-document in the user document
 */
export interface UserStatsSubDocument extends UserStats, Types.Subdocument {}

export const StatsSchema = new Schema<UserStatsSubDocument>(
    {
        sauce: {
            type: SchemaTypes.Number,
            default: 0,
            index: true,
        },
        trophies: {
            type: SchemaTypes.Number,
            default: 0,
        },
    },
    { _id: false }
);
