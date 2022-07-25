import * as mongoose from 'mongoose';
import { AnyKeys, Document, FilterQuery, Model, Schema, SchemaTypes, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { ServerError } from "../errors/server-error"
import {
    Routine,
    RoutineSubDocument,
    RoutineSchema, RoutineModel
} from './routine'
import {
    ODocument,
    ODocSubDocument,
    DocumentSchema,
    DocTypes
} from './document'
import {
    UserStats,
    UserStatsSubDocument,
    StatsSchema
} from './user-stats'
import {
    NotTypes,
    Notification,
    NotificationSchema,
    NotificationSubDocument
} from './notification'
import {
    Setting,
    SettingSubDocument,
    SettingSchema
} from './setting'
import { Server } from 'socket.io';

export enum UserRoles {
    Child = 'Child',
    Base = 'Base',
    Owner = 'Owner'
}

export enum UserStatus {
    Offline = 'Offline',
    Online = 'Online',
    InTheCar = 'In The car'
}

interface PswData {
    salt: string
    pwdHash: string
}


export interface User {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    roles: string[];
    enjoyedVehicles: Types.ObjectId[];
    pwd_hash: string;
    salt: string;
    stats: UserStats;
    status: UserStatus;
    docs: ODocument[];
    setting: Setting;
    routines: Routine[];
    notifications: Notification[];
}

export interface UserDocument extends User, Document {
    /**
     * Stats sub-document
     */
    stats: UserStatsSubDocument; 

    /**
     * Array of notification sub-documents
     */
    notifications: Types.DocumentArray<NotificationSubDocument>;

    /**
     * represents user own setting
     */
    setting: SettingSubDocument;

    /**
     * Array of routine sub-documents
     */
    routines: Types.DocumentArray<RoutineSubDocument>;

    /**
     * Array of doc sub-documents
     */
    docs: Types.DocumentArray<ODocSubDocument>

    /**
     * Adds the provided role to this instance.
     * If the user already has the role, it is not added a second time.
     *
     * @param role role to be set
     */
    setRole(role: UserRoles): Promise<UserDocument>;

    /**
     * Removes the provided role from this instance.
     * If the user doesn't have the role, nothing happens.
     *
     * @param role role to be removed
     */
    removeRole(role: UserRoles): Promise<UserDocument>;

    /**
     * Returns true if the user has the provided role, false otherwise.
     *
     * @param role role to check
     */
    hasRole(role: UserRoles): boolean;

    /**
     * Set a new password using bcrypt hashing and salt generation functions
     * @param pwd new password to set
     */
    setPassword(pwd: string): Promise<UserDocument>;

    /**
      * Check the validity of the password with the one stored on the database
      * @param pwd the password to check
      */
    validatePassword(pwd: string): Promise<boolean>;

    /**
     * Add a notification identified by type and requester
     * Return an error if an identical notification already exists
     * @param type type of the incoming notification
     */
    addNotification(type: NotTypes): Promise<UserDocument>;

    /**
     * Remove a notification identified by its type
     * Returns an error if the notification doesn't exist
     * @param type type of the notification to remove
     */
    removeNotification(type: NotTypes): Promise<UserDocument>;

    /**
     * Add a document identified by type and requester
     * Return an error if an identical document already exists
     * @param doc represents the incoming document
     */
    addDocument(doc: ODocument): Promise<void>;

    /**
     * Remove a document identified by its type
     * Returns an error if the document doesn't exist
     * @param type type of the document to remove
     */
    removeDocument(type: DocTypes): Promise<UserDocument>;

    /**
     * add a routine for the user
     * @param routine represents the newly routine
     */
    addRoutine(routine: Routine): Promise<void>;

    /**
     * remove a routine for the user
     * @param name identifies the routine up to be removed
     */
    removeRoutine(name: string): Promise<void>;
}


export const UserSchema = new Schema<UserDocument>(
    {
        name: {
            type: SchemaTypes.String,
            required: true
        }, 

        surname: {
            type: SchemaTypes.String,
            required: true
        }, 

        email: {
            type: SchemaTypes.String,
            required: true,
            unique: true,
            index: true
        },

        nickname: {
            type: SchemaTypes.String,
            unique: true
        }, 

        enjoyedVehicles: {
            type: [SchemaTypes.ObjectId],
            default: []
        },

        salt: {
            type: SchemaTypes.String,
            required: false
        },
    
        pwd_hash: {
            type: SchemaTypes.String,
            required: false
        },
    
        notifications: { 
            type: [NotificationSchema]
        },

        roles: {
            type: [SchemaTypes.String],
            required: true,
            enum: UserRoles,
            default: [UserRoles.Base]
        },

        stats: {
            type: StatsSchema,
            //default: () => ({})
        },

        routines: {
            type: [RoutineSchema],
            //default: () => ({})
        },

        docs: {
            types: [DocumentSchema],
            //default: () => ({})
        },

        setting: {
            type: SettingSchema,
            //default: () => ({})
        }
    }
)

// TO DO metti apposto routine names in routine route togliendo /userid

UserSchema.methods.addNotification = async function (
    reqType: NotTypes,
): Promise<UserDocument> {
    const toInsert: Notification = { type: reqType };
    this.notifications.push(toInsert);
    return this.save();
};


// pop one notification with the same type as the one recieved as input
UserSchema.methods.removeNotification = async function (
    type: string
): Promise<UserDocument> {
    for (let idx in this.notifications) {
        if (this.notifications[idx].type === type.valueOf()) {
            this.notifications.splice(parseInt(idx), 1)
            return this.save()
        }
    }

    return Promise.reject(new ServerError('Notification not found'));
};

UserSchema.methods.addDocument = async function (doc: ODocument) : Promise<void> {
    this.documents.push(doc)
    await this.save().catch((err) => Promise.reject(new ServerError("Internal server error")))
    return Promise.resolve()
}

UserSchema.methods.removeDocument = async function (type: DocTypes) : Promise<UserDocument> {
    for (let idx in this.docs) {
        if (this.docs[idx].type === type.valueOf()) {
            this.docs.splice(parseInt(idx), 1)
            return this.save()
        }
    }
    return Promise.reject(new ServerError("No user with that identifier"))
}

UserSchema.methods.addRoutine = async function (routine: Routine) : Promise<UserDocument> {
    routine.name = routine.name + "/" + this._id.toString()
    this.routines.push(routine)
    return this.save()
}

UserSchema.methods.removeRoutine = async function (name: string) : Promise<UserDocument> {
    name = name + "/" + this._id.toString()
    this.routines = this.routines.filter((elem: RoutineSubDocument) => elem.name !== name)
    return this.save()
}


/* METHODS FOR PASSWORD MANIPULATION AND VALIDATION */

UserSchema.methods.setPassword = async function (pwd: string): Promise<UserDocument> {
    const salt: string = await bcrypt
        .genSalt(10)
        .catch((error) =>
            Promise.reject(new ServerError('Error with salt generation'))
        );

    const pwdHash = await bcrypt
        .hash(pwd, salt)
        .catch((error) =>
            Promise.reject(new ServerError('Error with password encryption'))
        );

    this.salt = salt;
    this.pwd_hash = pwdHash;
    return this.save();
};

export async function updatePsw(userId: Types.ObjectId, psw: string) {
    const salt: string = await bcrypt
        .genSalt(10)
        .catch((error) =>
            Promise.reject(new ServerError('Error with salt generation'))
        );

    const pwdHash = await bcrypt
        .hash(psw, salt)
        .catch((error) =>
            Promise.reject(new ServerError('Error with password encryption'))
        );

    let result = await UserModel.findByIdAndUpdate(userId, {
        salt: salt,
        pwd_hash: pwdHash
    }).catch(err => Promise.reject(new ServerError("Internal server error")))

    if (!result) return Promise.reject(new ServerError("No user with that identifier"))

    return Promise.resolve()
}

export async function getSaltNdHash(psw: string): Promise<PswData> {
    const salt: string = await bcrypt
        .genSalt(10)
        .catch((error) =>
            Promise.reject(new ServerError('Error with salt generation'))
        );

    const pwdHash = await bcrypt
        .hash(psw, salt)
        .catch((error) =>
            Promise.reject(new ServerError('Error with password encryption'))
        );

    return Promise.resolve({
        salt,
        pwdHash
    })
}

UserSchema.methods.validatePassword = async function (pwd: string): Promise<boolean> {
    const hashedPw = await bcrypt
        .hash(pwd, this.salt)
        .catch((error) =>
            Promise.reject(new ServerError('Error with password encryption'))
        );

    return this.pwd_hash === hashedPw;
};

UserSchema.methods.removeRole = async function (role: UserRoles): Promise<UserDocument> {
    for (const idx in this.roles) {
        if (this.roles[idx] === role.valueOf()) this.roles.splice(parseInt(idx), 1);
    }

    return this.save();
};

UserSchema.methods.hasRole = function (role: UserRoles): boolean {
    for (let idx in this.roles) {
        if (this.roles[idx] == role.valueOf()) {
            return true;
        }
    }

    return false;
};

UserSchema.methods.setRole = async function (role: UserRoles): Promise<UserDocument> {
    if (!this.hasRole(role)) {
        this.roles.push(role.valueOf());
        return this.save();
    }
    return Promise.reject(new ServerError('Role already set'));
};

// Create "Users" collection
export const UserModel: Model<UserDocument> = mongoose.model('User', UserSchema, 'Users');

export async function getUserById(userId: Types.ObjectId): Promise<UserDocument> {
    const userDoc = await UserModel.findOne({ _id: userId }).catch((err) =>
        Promise.reject(new ServerError('Internal server error'))
    );

    return !userDoc
        ? Promise.reject(new ServerError('No user with that identifier'))
        : Promise.resolve(userDoc);
}

export async function getUserByNickname(nickname: string): Promise<UserDocument> {
    const userdata = await UserModel.findOne({ nickname }).catch((err) => 
        Promise.reject(new ServerError('Internal server error'))
    );

    return !userdata
        ? Promise.reject(new ServerError('No user with that identifier'))
        : Promise.resolve(userdata);
}

export async function getUserByEmail(email: string): Promise<UserDocument> {
    const userdata = await UserModel.findOne({ email }).catch((err) => 
        Promise.reject(new ServerError('Internal server error'))
    );

    return !userdata
        ? Promise.reject(new ServerError('No user with that identifier'))
        : Promise.resolve(userdata);
}

export async function createUser(data: AnyKeys<UserDocument>): Promise<UserDocument> {
    const user: UserDocument = new UserModel(data);
    return user.save()
}

export async function deleteUser(filter: FilterQuery<UserDocument>): Promise<void> {
    const obj: { deletedCount?: number } = await UserModel.deleteOne(filter).catch((err) =>
        Promise.reject(new ServerError('Internal server error'))
    );

    return !obj.deletedCount
        ? Promise.reject(new ServerError('No user with that identifier'))
        : Promise.resolve();
}

export async function updateNickName(_id: Types.ObjectId, nickname: string): Promise<void> {
    await UserModel.updateOne({ _id }, { nickname }).catch((err) => {
        return Promise.reject(new ServerError("Internal server error"));
    });

    return Promise.resolve();
}

export async function updatePassword(_id: Types.ObjectId, password: string): Promise<void> {
    let user: UserDocument;
    try {
        user = await getUserById(_id);
        await user.setPassword(password);
    } catch (err) {
        return Promise.reject(err);
    }
    return Promise.resolve();
}

export async function getUserStats(_id: Types.ObjectId): Promise<UserStats> {
    const stat = await UserModel.findOne({ _id }, { stats: 1 }).catch((err) =>
        Promise.reject(new ServerError('Internal server error'))
    );

    return !stat
        ? Promise.reject(new ServerError('No user with that identifier'))
        : Promise.resolve(stat.stats);
}

/**
 * @param userId id of the user to update
 * @param updatedStats object containing the updated stats of the user
 */
 export async function updateUserStats(
    userId: Types.ObjectId,
    updatedStats: UserStats
): Promise<UserDocument> {
    try {
        const user: UserDocument = await getUserById(userId);
        user.stats.thropies = updatedStats.thropies;
        user.stats.sauce = updatedStats.sauce;
        return user.save();
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function updateTheme(userId: Types.ObjectId, theme: string) : Promise<void> {
    let result = await UserModel.findByIdAndUpdate(userId, {
        "setting.theme": theme
    }).catch((err) => {
        return Promise.reject(new ServerError("Internal server error"));
    });

    return result
        ? Promise.resolve()
        : Promise.reject(new ServerError("No user with that identifier"))
}

export async function updateSize(userId: Types.ObjectId, size: number) : Promise<void> {
    let result = await UserModel.findByIdAndUpdate(userId, {
        "setting.size": size
    }).catch((err) => {
        return Promise.reject(new ServerError("Internal server error"));
    });

    return result
        ? Promise.resolve()
        : Promise.reject(new ServerError("No user with that identifier"))
}

export async function updateLanguage(userId: Types.ObjectId, lan: string) : Promise<void> {
    let result = await UserModel.findByIdAndUpdate(userId, {
        "setting.language": lan
    }).catch((err) => {
        return Promise.reject(new ServerError("Internal server error"));
    });

    return result
        ? Promise.resolve()
        : Promise.reject(new ServerError("No user with that identifier"))
}

export async function updateGamification(userId: Types.ObjectId, swt: boolean) : Promise<void> {
    let result = await UserModel.findByIdAndUpdate(userId, {
        "setting.gamificationHide": swt
    }).catch((err) => {
        return Promise.reject(new ServerError("Internal server error"));
    });

    return result
        ? Promise.resolve()
        : Promise.reject(new ServerError("No user with that identifier"))
}

export async function updateEmail(_id: Types.ObjectId, email: string) : Promise<void> {
    let result = await UserModel.findByIdAndUpdate( _id , { email }).catch((err) => {
        return Promise.reject(new ServerError("Internal server error"));
    });

    return result
        ? Promise.resolve()
        : Promise.reject(new ServerError("No user with that identifier"))
}

export async function updateRoutineName(userId: Types.ObjectId, oldName: string, newName: string): Promise<void> {
    let user: UserDocument
    oldName = oldName + "/" + userId.toString()
    newName = newName + "/" + userId.toString()
    let result = await RoutineModel.findOneAndUpdate({ name: oldName }, {
        name: newName
    }).catch(err => Promise.reject(new ServerError('Internal server error')))

    return result
        ? Promise.resolve()
        : Promise.reject(new ServerError("No user routine found matching the id"))
}

export async function updateRoutineTemperature(userId: Types.ObjectId, routineName: string, temp: number): Promise<void> {
    let user: UserDocument
    routineName = routineName + "/" + userId.toString()
    let result = await RoutineModel.findOneAndUpdate({ name: routineName }, {
        temperature: temp
    }).catch(err => Promise.reject(new ServerError('Internal server error')))

    return result
        ? Promise.resolve()
        : Promise.reject(new ServerError("No user routine found matching the id"))
}

// this probably needs to be written again 
export async function updateRoutineLightsColor(userId: Types.ObjectId, routineName: string, color: string): Promise<void> {
    let user: UserDocument
    routineName = routineName + "/" + userId.toString()

    let result = await RoutineModel.findOneAndUpdate({ name: routineName }, {
        lightsColor: color
    }).catch(err => Promise.reject(new ServerError('Internal server error')))

    return result
        ? Promise.resolve()
        : Promise.reject(new ServerError("No user routine found matching the id"))
}


export async function updateRoutineMusic(
    userId: Types.ObjectId, 
    routineName: string, 
    musicToAdd: string[] = [], 
    musicToRemove: string[] = []
): Promise<void> {
    let user: UserDocument
    let result
    routineName = routineName + "/" + userId.toString()
    if (musicToRemove.length && musicToAdd.length) {

        result = await RoutineModel.findOneAndUpdate({name: routineName}, {
            $pullAll: { musics: musicToRemove },
            $pushAll: { music: musicToAdd }
        }).catch(err => Promise.reject(new ServerError('Internal server error')))

    } else if (musicToRemove.length) {

        result = await RoutineModel.findOneAndUpdate({name: routineName}, {
            $pullAll: { musics: musicToRemove },
        }).catch(err => Promise.reject(new ServerError('Internal server error')))

    } else {

        result = await RoutineModel.findOneAndUpdate({name: routineName}, {
            $pushAll: { musics: musicToAdd },
        }).catch(err => Promise.reject(new ServerError('Internal server error')))

    }

    return result
        ? Promise.resolve()
        : Promise.reject(new ServerError("No user routine found matching the id"))

}

/**
 * Sets the status of the provided user to the provided value
 * and notifies his friends of the change.
 * @param userId id of the user whose status has to be changed
 * @param newStatus new status of the user
 * @return updated user
 */
export const setUserStatus = async (
    userId: Types.ObjectId,
    newStatus: UserStatus
): Promise<UserDocument> => {
    let user: UserDocument = await getUserById(userId);
    user.status = newStatus;
    return  user.save();
};

export async function updateUserEnjoyedVehicle(userId: Types.ObjectId, vehicleId: Types.ObjectId): Promise<void> {
    try {
        let result = await UserModel.findByIdAndUpdate(userId, {
            $push: { enjoyedVehicles: vehicleId }
        }).catch(err => Promise.reject(new ServerError("Internal server error")))

        if (!result) return Promise.reject(new ServerError("No user with that identifier"))
        return Promise.resolve()
    } catch(err) {
        return Promise.reject(err)
    }
}


// TO DO dovrei chiamare la vehicleRemoveEnjoyer o lo fa il client
export async function removeUserEnjoyedVehicle(userId: Types.ObjectId, vehicleId: Types.ObjectId): Promise<void> {
    let user: UserDocument
    let flag: boolean
    try {
        user = await getUserById(userId)

        for (let idx in user.enjoyedVehicles) {
            if (user.enjoyedVehicles[idx].toString() === vehicleId.toString()) flag = true
        }

        if (flag) return Promise.reject(new ServerError("No enjoyed vehicles related to this user"))

        let result = await UserModel.findByIdAndUpdate(userId, {
            $push: { enjoyedVehicles: vehicleId }
        }).catch(err => Promise.reject(new ServerError("Internal server error")))

        if (!result) return Promise.reject(new ServerError("No user with that identifier"))
        return Promise.resolve()
    } catch(err) {
        return Promise.reject(err)
    }
}
