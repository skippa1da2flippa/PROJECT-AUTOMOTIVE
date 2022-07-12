import * as mongoose from 'mongoose';
import { AnyKeys, Document, FilterQuery, Model, Schema, SchemaTypes, Types } from 'mongoose';
import { Server } from 'socket.io';
import bcrypt from 'bcrypt';
import {
    Routine,
    RoutineSubDocument,
    RoutineSchema
} from '../model/routine'
import {
    ODocument,
    ODocSubDocument,
    DocumentSchema
} from '../model/document'
import {
    UserStats,
    UserStatsSubDocument,
    StatsSchema
} from '../model/user-stats'
import {
    NotTypes,
    Notification,
    NotificationSchema,
    NotificationSubDocument
} from '../model/notification'
import {
    Setting,
    SettingSubDocument,
    SettingSchema
} from '../model/setting'

export enum UserRoles {
    Child = 'Child',
    Base = 'Base',
    Owner = 'Owner'
}

export interface User {
    name: string;
    surname: string;
    nickname?: string;
    roles: string[];
    pwd_hash: string;
    salt: string;
    stats: UserStats;
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
     * Remove a notification identified by its id
     * Returns an error if the notification doesn't exist
     * @param type type of the notification to remove
     */
    removeNotification(type: NotTypes): Promise<UserDocument>;

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

        nickname: {
            type: SchemaTypes.String,
            default: "saucer"
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
            default: () => ({})
        },

        routines: {
            type: [RoutineSchema],
            default: () => ({})
        },

        docs: {
            types: [DocumentSchema],
            default: () => ({})
        },

        setting: {
            type: SettingSchema,
            default: () => ({})
        }
    }
)

UserSchema.methods.addNotification = async function (
    reqType: NotTypes,
): Promise<UserDocument> {
    const toInsert: Notification = { type: reqType };
    this.notifications.push(toInsert);
    return this.save();
};

// pop of the last notification with the same type as the one recieved as input
UserSchema.methods.removeNotification = async function (
    type: string
): Promise<UserDocument> {
    this.notifications.sort((n1, n2) => {
        if (n1.createdAt > n2.createdAt) return 1
        else if (n1.createdAt < n2.createdAt) return -1
        else return 0
    })

    for (let idx in this.notifications) {
        if (this.notifications[idx].type === type) {
            this.splice(parseInt(idx), 1)
            return this.save()
        }
    }

    return Promise.reject(new Error('Notification not found'));
};

/* METHODS FOR PASSWORD MANIPULATION AND VALIDATION */

UserSchema.methods.setPassword = async function (pwd: string): Promise<UserDocument> {
    const salt: string = await bcrypt
        .genSalt(10)
        .catch((error) =>
            Promise.reject(new Error('Error with salt generation: ' + error.message))
        );

    const pwdHash = await bcrypt
        .hash(pwd, salt)
        .catch((error) =>
            Promise.reject(new Error('Error with password encryption: ' + error.message))
        );

    this.salt = salt;
    this.pwd_hash = pwdHash;
    return this.save();
};

UserSchema.methods.validatePassword = async function (pwd: string): Promise<boolean> {
    const hashedPw = await bcrypt
        .hash(pwd, this.salt)
        .catch((error) =>
            Promise.reject(new Error('Error with password encryption: ' + error.message))
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
    return Promise.reject(new Error('Role already set'));
};

// Create "Users" collection
export const UserModel: Model<UserDocument> = mongoose.model('User', UserSchema, 'Users');

export async function getUserById(userId: Types.ObjectId): Promise<UserDocument> {
    const userDoc = await UserModel.findOne({ _id: userId }).catch((err: Error) =>
        Promise.reject(err)
    );

    return !userDoc
        ? Promise.reject(new Error('No user with that identifier'))
        : Promise.resolve(userDoc);
}

export async function getUserByNickname(nickname: string): Promise<UserDocument> {
    const userdata = await UserModel.findOne({ nickname }).catch((err: Error) => 
        Promise.reject(new Error('Internal server error'))
    );

    return !userdata
        ? Promise.reject(new Error('No user with that identifier'))
        : Promise.resolve(userdata);
}

export async function createUser(data: AnyKeys<UserDocument>): Promise<UserDocument> {
    const user: UserDocument = new UserModel(data);
    await user.save().catch((err) =>
        Promise.reject(new Error('User already exists'))
    );
    return user;
}

export async function deleteUser(filter: FilterQuery<UserDocument>): Promise<void> {
    const obj: { deletedCount?: number } = await UserModel.deleteOne(filter).catch((err) =>
        Promise.reject(err)
    );

    return !obj.deletedCount
        ? Promise.reject(new Error('No user with that identifier'))
        : Promise.resolve();
}

export async function updateNickName(_id: Types.ObjectId, nickname: string): Promise<void> {
    await UserModel.updateOne({ _id }, { nickname }).catch((err) => {
        return Promise.reject(new Error(err.message));
    });

    return Promise.resolve();
}

export async function updatePassword(_id: Types.ObjectId, password: string): Promise<void> {
    let user: UserDocument;
    try {
        user = await getUserById(_id);
        await user.setPassword(password);
    } catch (err) {
        return Promise.reject(new Error(err.message));
    }
    return Promise.resolve();
}

export async function getUserStats(_id: Types.ObjectId): Promise<UserStats> {
    const stat = await UserModel.findOne({ _id }, { stats: 1 }).catch((err) =>
        Promise.reject(new Error('Sum internal error just occurred'))
    );

    return !stat
        ? Promise.reject(new Error('No user with that identifier'))
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
        return Promise.reject(new Error(err.message));
    }
}