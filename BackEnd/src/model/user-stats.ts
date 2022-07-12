import { Schema, SchemaTypes, Types} from 'mongoose';

/*
   TO DO Thropies rules for assignment should be stored inside the client and back-end just saves stats or we do need a collection to save the rules inside mongodb
*/


/**
 * Interface that represent the stats of some user of the system.
 */
export interface UserStats {
    sauce: number;
    thropies: number;
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
        thropies: {
            type: SchemaTypes.Number,
            default: 0,
        },
    },
    { _id: false }
);
