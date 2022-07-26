import mongoose, {Model, Schema, SchemaTypes, Types} from 'mongoose';


export interface Routine {

    //routine name
    name: string

    //AC temperature
    temperature: number,

    //this may need to be represented as a whole collection if it's more than just one set of lights
    lightsColor: string,

    //represent which genre is related to a certain routine
    music: string[]

    //correct the type
    path: any
}

export interface RoutineSubDocument extends Routine, Types.Subdocument {}


// TO DO when testing is done replace normal tye with SchemaTypes.type
export const RoutineSchema = new Schema<RoutineSubDocument>(
    {
        name: {
            type: String,
            required: true, 
            unique: true
        }, 
        temperature: {
            type: Number,
        }, 
        lightsColor: {
            type: String,
            default: "#FFFFFF"
        },
        music: {
            type: [String],
            default: ["classical"]
        }, 
        path: {
            // needed data to work with google api
        }
    }
)

export const RoutineModel: Model<RoutineSubDocument> = mongoose.model("Routine", RoutineSchema, "Routines")

