import {BaseData} from "./base-data";

export interface Setting extends BaseData{
    theme: string,

    language: string,

    gamificationHide: boolean,
}
