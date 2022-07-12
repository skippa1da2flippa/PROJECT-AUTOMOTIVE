import { Schema, SchemaTypes, Types } from 'mongoose';


export interface Routine {

    //routine name
    name: string

    //AC temperature
    temperature: number,

    //this may need to be represented as a whole collection if it's more than just one set of lights
    lightsColor: string,

    //represent which genre is related to a certain routine
    music: string[]

    //many others
}

export interface RoutineSubDocument extends Routine, Types.Subdocument {}


// TO DO since the name is unique we'll add routine name with this pattern: routine_name/userID, thanks to this we'll be able to make name unique just for the single user

export const RoutineSchema = new Schema<RoutineSubDocument>(
    {
        name: {
            type: SchemaTypes.String,
            required: true, 
            unique: true
        }, 
        temperature: {
            type: SchemaTypes.Number,
            required: true
        }, 
        lightsColor: {
            type: SchemaTypes.String,
            default: "#FFFFFF"
        },
        music: {
            type: [SchemaTypes.String], 
            default: ["classical"]
        }
    }
)