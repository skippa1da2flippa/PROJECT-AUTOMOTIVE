import { Schema, SchemaTypes, Types } from 'mongoose';


export interface Setting {
    theme: string,

    size: number,

    language: string,

    gamificationHide: boolean,
}

export interface SettingSubDocument extends Setting, Types.Subdocument {}


export const SettingSchema = new Schema(
    {
        theme: {
            types: SchemaTypes.String,
            default: "black"
        }, 

        size: {
            types: SchemaTypes.Number,
            default: 3
        },

        language: {
            types: SchemaTypes.String,
            default: "ENG"
        },

        gamificationHide: {
            types: SchemaTypes.Boolean,
            default: true
        }
    },
    {_id: false}
)