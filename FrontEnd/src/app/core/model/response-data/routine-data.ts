import {BaseData} from "./base-data"

export interface Routine extends BaseData{

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
