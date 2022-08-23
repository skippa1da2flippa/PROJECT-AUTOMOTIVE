"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoutine = exports.deleteRoutine = exports.removeUserEnjoyedVehicle = exports.updateUserEnjoyedVehicle = exports.setUserStatus = exports.updateRoutineMusic = exports.updateRoutineLightsColor = exports.updateRoutineTemperature = exports.updateRoutineName = exports.updateEmail = exports.updateGamification = exports.updateLanguage = exports.updateSize = exports.updateTheme = exports.updateUserStats = exports.getUserStats = exports.updatePassword = exports.updateNickName = exports.deleteUser = exports.createUser = exports.removeFriendship = exports.addFriendship = exports.getUserByEmail = exports.getUserByNickname = exports.getUserById = exports.UserModel = exports.getSaltNdHash = exports.updatePsw = exports.removeNotification = exports.addNotification = exports.validateEmail = exports.UserSchema = exports.UserStatus = exports.UserRoles = void 0;
var mongoose = __importStar(require("mongoose"));
var mongoose_1 = require("mongoose");
var bcrypt_1 = __importDefault(require("bcrypt"));
var server_error_1 = require("../errors/server-error");
var routine_1 = require("./routine");
var document_1 = require("./document");
var user_stats_1 = require("./user-stats");
var notification_1 = require("./notification");
var setting_1 = require("./setting");
var UserRoles;
(function (UserRoles) {
    UserRoles["Child"] = "Child";
    UserRoles["Base"] = "Base";
    UserRoles["Owner"] = "Owner";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["Offline"] = "Offline";
    UserStatus["Online"] = "Online";
    UserStatus["InTheCar"] = "Swerving";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.SchemaTypes.String,
        required: true
    },
    surname: {
        type: mongoose_1.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        unique: true,
    },
    nickname: {
        type: mongoose_1.SchemaTypes.String,
        unique: true
    },
    friends: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        default: []
    },
    // TODO this field needs a role paired with each vehicle id to let us know when it's possible to do certain action
    enjoyedVehicles: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        default: []
    },
    salt: {
        type: mongoose_1.SchemaTypes.String,
        required: false
    },
    pwd_hash: {
        type: mongoose_1.SchemaTypes.String,
        required: false
    },
    notifications: {
        type: [notification_1.NotificationSchema]
    },
    roles: {
        type: [mongoose_1.SchemaTypes.String],
        required: true,
        enum: UserRoles,
        default: [UserRoles.Base]
    },
    stats: {
        type: user_stats_1.StatsSchema,
        //default: () => ({})
    },
    routines: {
        type: [routine_1.RoutineSchema],
        default: []
    },
    docs: {
        types: [document_1.DocumentSchema],
        default: []
    },
    setting: {
        type: setting_1.SettingSchema,
        //default: () => ({})
    },
    status: {
        type: mongoose_1.SchemaTypes.String,
        enum: UserStatus,
        default: UserStatus.Offline
    }
});
// TODO add an error whenever a unique constraint gets broken
var validateEmail = function (email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
exports.validateEmail = validateEmail;
function addNotification(_id, not) {
    return __awaiter(this, void 0, void 0, function () {
        var notification, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    notification = new notification_1.NotificationModel(not);
                    return [4 /*yield*/, exports.UserModel.findOneAndUpdate({ _id: _id }, {
                            $push: { notifications: notification }
                        }).catch(function (err) {
                            return Promise.reject(new server_error_1.ServerError("Internal server error"));
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
            }
        });
    });
}
exports.addNotification = addNotification;
function removeNotification(_id, type) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findOneAndUpdate({ _id: _id }, {
                        $pull: { notifications: { type: type } }
                    }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError("Internal server error"));
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user/notification with that identifier"))];
            }
        });
    });
}
exports.removeNotification = removeNotification;
// pop one notification with the same type as the one recieved as input
exports.UserSchema.methods.removeNotification = function (type) {
    return __awaiter(this, void 0, void 0, function () {
        var idx;
        return __generator(this, function (_a) {
            for (idx in this.notifications) {
                if (this.notifications[idx].type === type.valueOf()) {
                    this.notifications.splice(parseInt(idx), 1);
                    return [2 /*return*/, this.save()];
                }
            }
            return [2 /*return*/, Promise.reject(new server_error_1.ServerError('Notification not found'))];
        });
    });
};
exports.UserSchema.methods.isFriend = function (friendId) {
    return this.friends.includes(friendId);
};
exports.UserSchema.methods.addDocument = function (doc) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    this.documents.push(doc);
                    return [4 /*yield*/, this.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError("Internal server error")); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
            }
        });
    });
};
exports.UserSchema.methods.removeDocument = function (type) {
    return __awaiter(this, void 0, void 0, function () {
        var idx;
        return __generator(this, function (_a) {
            for (idx in this.docs) {
                if (this.docs[idx].type === type.valueOf()) {
                    this.docs.splice(parseInt(idx), 1);
                    return [2 /*return*/, this.save()];
                }
            }
            return [2 /*return*/, Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
        });
    });
};
exports.UserSchema.methods.addRoutine = function (routine) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            routine.name = routine.name + "/" + this._id.toString();
            this.routines.push(routine);
            return [2 /*return*/, this.save()];
        });
    });
};
exports.UserSchema.methods.removeRoutine = function (name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            name = name + "/" + this._id.toString();
            this.routines = this.routines.filter(function (elem) { return elem.name !== name; });
            return [2 /*return*/, this.save()];
        });
    });
};
/* METHODS FOR PASSWORD MANIPULATION AND VALIDATION */
exports.UserSchema.methods.setPassword = function (pwd) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, pwdHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default
                        .genSalt(10)
                        .catch(function (error) {
                        return Promise.reject(new server_error_1.ServerError('Error with salt generation'));
                    })];
                case 1:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default
                            .hash(pwd, salt)
                            .catch(function (error) {
                            return Promise.reject(new server_error_1.ServerError('Error with password encryption'));
                        })];
                case 2:
                    pwdHash = _a.sent();
                    this.salt = salt;
                    this.pwd_hash = pwdHash;
                    return [2 /*return*/, this.save()];
            }
        });
    });
};
function updatePsw(userId, psw) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, pwdHash, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default
                        .genSalt(10)
                        .catch(function (error) {
                        return Promise.reject(new server_error_1.ServerError('Error with salt generation'));
                    })];
                case 1:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default
                            .hash(psw, salt)
                            .catch(function (error) {
                            return Promise.reject(new server_error_1.ServerError('Error with password encryption'));
                        })];
                case 2:
                    pwdHash = _a.sent();
                    return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(userId, {
                            salt: salt,
                            pwd_hash: pwdHash
                        }).catch(function (err) { return Promise.reject(new server_error_1.ServerError("Internal server error")); })];
                case 3:
                    result = _a.sent();
                    if (!result)
                        return [2 /*return*/, Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
                    return [2 /*return*/, Promise.resolve()];
            }
        });
    });
}
exports.updatePsw = updatePsw;
function getSaltNdHash(psw) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, pwdHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default
                        .genSalt(10)
                        .catch(function (error) {
                        return Promise.reject(new server_error_1.ServerError('Error with salt generation'));
                    })];
                case 1:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default
                            .hash(psw, salt)
                            .catch(function (error) {
                            return Promise.reject(new server_error_1.ServerError('Error with password encryption'));
                        })];
                case 2:
                    pwdHash = _a.sent();
                    return [2 /*return*/, Promise.resolve({
                            salt: salt,
                            pwdHash: pwdHash
                        })];
            }
        });
    });
}
exports.getSaltNdHash = getSaltNdHash;
exports.UserSchema.methods.validatePassword = function (pwd) {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPw;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default
                        .hash(pwd, this.salt)
                        .catch(function (error) {
                        return Promise.reject(new server_error_1.ServerError('Error with password encryption'));
                    })];
                case 1:
                    hashedPw = _a.sent();
                    return [2 /*return*/, this.pwd_hash === hashedPw];
            }
        });
    });
};
exports.UserSchema.methods.removeRole = function (role) {
    return __awaiter(this, void 0, void 0, function () {
        var idx;
        return __generator(this, function (_a) {
            for (idx in this.roles) {
                if (this.roles[idx] === role.valueOf())
                    this.roles.splice(parseInt(idx), 1);
            }
            return [2 /*return*/, this.save()];
        });
    });
};
exports.UserSchema.methods.hasRole = function (role) {
    for (var idx in this.roles) {
        if (this.roles[idx] == role.valueOf()) {
            return true;
        }
    }
    return false;
};
exports.UserSchema.methods.setRole = function (role) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!this.hasRole(role)) {
                this.roles.push(role.valueOf());
                return [2 /*return*/, this.save()];
            }
            return [2 /*return*/, Promise.reject(new server_error_1.ServerError('Role already set'))];
        });
    });
};
// Create "Users" collection
exports.UserModel = mongoose.model('User', exports.UserSchema, 'Users');
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var userDoc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findOne({ _id: userId }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError('Internal server error'));
                    })];
                case 1:
                    userDoc = _a.sent();
                    return [2 /*return*/, !userDoc
                            ? Promise.reject(new server_error_1.ServerError('No user with that identifier'))
                            : Promise.resolve(userDoc)];
            }
        });
    });
}
exports.getUserById = getUserById;
function getUserByNickname(nickname) {
    return __awaiter(this, void 0, void 0, function () {
        var userdata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findOne({ nickname: nickname }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError('Internal server error'));
                    })];
                case 1:
                    userdata = _a.sent();
                    return [2 /*return*/, !userdata
                            ? Promise.reject(new server_error_1.ServerError('No user with that identifier'))
                            : Promise.resolve(userdata)];
            }
        });
    });
}
exports.getUserByNickname = getUserByNickname;
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var userdata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findOne({ email: email }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError('Internal server error'));
                    })];
                case 1:
                    userdata = _a.sent();
                    return [2 /*return*/, !userdata
                            ? Promise.reject(new server_error_1.ServerError('No user with that identifier'))
                            : Promise.resolve(userdata)];
            }
        });
    });
}
exports.getUserByEmail = getUserByEmail;
function addFriendship(userId, friendId) {
    return __awaiter(this, void 0, void 0, function () {
        var result1, result2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(userId, {
                        $push: { friends: friendId }
                    }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError('Internal server error'));
                    })];
                case 1:
                    result1 = _a.sent();
                    return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(friendId, {
                            $push: { friends: userId }
                        }).catch(function (err) {
                            return Promise.reject(new server_error_1.ServerError('Internal server error'));
                        })];
                case 2:
                    result2 = _a.sent();
                    if (!(result1 && result2)) return [3 /*break*/, 3];
                    return [2 /*return*/, Promise.resolve()];
                case 3: return [4 /*yield*/, removeFriendship(userId, friendId, true)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, Promise.reject(new server_error_1.ServerError("One of them doesn't exists on the database, operation negated"))];
            }
        });
    });
}
exports.addFriendship = addFriendship;
function removeFriendship(userId, friendId, autoCatch) {
    if (autoCatch === void 0) { autoCatch = false; }
    return __awaiter(this, void 0, void 0, function () {
        var result1, result2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(userId, {
                        $pull: { friends: friendId }
                    }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError('Internal server error'));
                    })];
                case 1:
                    result1 = _a.sent();
                    return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(friendId, {
                            $pull: { friends: userId }
                        }).catch(function (err) {
                            return Promise.reject(new server_error_1.ServerError('Internal server error'));
                        })];
                case 2:
                    result2 = _a.sent();
                    return [2 /*return*/, ((result1 && result2) || autoCatch)
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("One of them doesn't exists on the database"))];
            }
        });
    });
}
exports.removeFriendship = removeFriendship;
function createUser(data) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("dentro la craeate");
                    console.log(data);
                    return [4 /*yield*/, exports.UserModel.insertMany([data]).catch(function (err) {
                            return Promise.reject(new server_error_1.ServerError(err.message));
                        })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, getUserById(result[0]._id)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.createUser = createUser;
function deleteUser(filter) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, _b, _i, idx, obj;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getUserById(filter._id)];
                case 1:
                    user = _c.sent();
                    _a = [];
                    for (_b in user.friends)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    idx = _a[_i];
                    return [4 /*yield*/, removeFriendship(user.friends[idx], filter._id)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, exports.UserModel.deleteOne(filter).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError('Internal server error'));
                    })];
                case 6:
                    obj = _c.sent();
                    return [2 /*return*/, !obj.deletedCount
                            ? Promise.reject(new server_error_1.ServerError('No user with that identifier'))
                            : Promise.resolve()];
            }
        });
    });
}
exports.deleteUser = deleteUser;
function updateNickName(_id, nickname) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findOneAndUpdate({ _id: _id }, { nickname: nickname }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError("Internal server error"));
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
            }
        });
    });
}
exports.updateNickName = updateNickName;
function updatePassword(_id, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getUserById(_id)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, user.setPassword(password)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_1)];
                case 4: return [2 /*return*/, Promise.resolve()];
            }
        });
    });
}
exports.updatePassword = updatePassword;
function getUserStats(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var stat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findOne({ _id: _id }, { stats: 1 }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError('Internal server error'));
                    })];
                case 1:
                    stat = _a.sent();
                    return [2 /*return*/, !stat
                            ? Promise.reject(new server_error_1.ServerError('No user with that identifier'))
                            : Promise.resolve(stat.stats)];
            }
        });
    });
}
exports.getUserStats = getUserStats;
/**
 * @param userId id of the user to update
 * @param updatedStats object containing the updated stats of the user
 */
function updateUserStats(userId, updatedStats) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(userId, {
                        stats: updatedStats
                    }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError("Internal server error"));
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
            }
        });
    });
}
exports.updateUserStats = updateUserStats;
function updateTheme(userId, theme) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(userId, {
                        "setting.theme": theme
                    }).catch(function (err) { return Promise.reject(new server_error_1.ServerError("Internal server error")); })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
            }
        });
    });
}
exports.updateTheme = updateTheme;
function updateSize(userId, size) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(userId, {
                        "setting.size": size
                    }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError("Internal server error"));
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
            }
        });
    });
}
exports.updateSize = updateSize;
function updateLanguage(userId, lan) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(userId, {
                        "setting.language": lan
                    }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError("Internal server error"));
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
            }
        });
    });
}
exports.updateLanguage = updateLanguage;
function updateGamification(userId, swt) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(userId, {
                        "setting.gamificationHide": !swt
                    }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError("Internal server error"));
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
            }
        });
    });
}
exports.updateGamification = updateGamification;
function updateEmail(_id, email) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(_id, { email: email }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError("Internal server error"));
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
            }
        });
    });
}
exports.updateEmail = updateEmail;
function updateRoutineName(userId, oldName, newName) {
    return __awaiter(this, void 0, void 0, function () {
        var user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oldName = oldName + "/" + userId.toString();
                    newName = newName + "/" + userId.toString();
                    return [4 /*yield*/, exports.UserModel.findOneAndUpdate({
                            _id: userId,
                            "routines.name": oldName
                        }, {
                            $set: { "routines.$.name": newName }
                        }).catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user routine found matching the id"))];
            }
        });
    });
}
exports.updateRoutineName = updateRoutineName;
function updateRoutineTemperature(userId, routineName, temp) {
    return __awaiter(this, void 0, void 0, function () {
        var user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    routineName = routineName + "/" + userId.toString();
                    return [4 /*yield*/, exports.UserModel.findOneAndUpdate({
                            _id: userId,
                            "routines.name": routineName
                        }, {
                            $set: { "routines.$.temperature": temp }
                        }).catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user routine found matching the id"))];
            }
        });
    });
}
exports.updateRoutineTemperature = updateRoutineTemperature;
// this probably needs to be written again 
function updateRoutineLightsColor(userId, routineName, color) {
    return __awaiter(this, void 0, void 0, function () {
        var user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    routineName = routineName + "/" + userId.toString();
                    return [4 /*yield*/, exports.UserModel.findOneAndUpdate({
                            _id: userId,
                            "routines.name": routineName
                        }, {
                            $set: { "routines.$.lightsColor": color }
                        }).catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user routine found matching the id"))];
            }
        });
    });
}
exports.updateRoutineLightsColor = updateRoutineLightsColor;
function updateRoutineMusic(userId, routineName, musicToAdd, musicToRemove) {
    if (musicToAdd === void 0) { musicToAdd = []; }
    if (musicToRemove === void 0) { musicToRemove = []; }
    return __awaiter(this, void 0, void 0, function () {
        var user, result, music, idx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    routineName = routineName + "/" + userId.toString();
                    return [4 /*yield*/, getUserById(userId)
                        //remove the music
                    ];
                case 1:
                    user = _a.sent();
                    //remove the music
                    for (idx in user.routines) {
                        if (user.routines[idx].name === routineName) {
                            music = user.routines[idx].music.filter(function (elem) { return !musicToRemove.includes(elem); });
                        }
                    }
                    // add the new one
                    music.push.apply(music, musicToAdd);
                    return [4 /*yield*/, exports.UserModel.findOneAndUpdate({
                            _id: userId,
                            "routines.name": routineName
                        }, {
                            $set: {
                                "routines.$.music": music,
                            },
                        }).catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user routine found matching the id"))];
            }
        });
    });
}
exports.updateRoutineMusic = updateRoutineMusic;
/**
 * Sets the status of the provided user to the provided value
 * and notifies his friends of the change.
 * @param userId id of the user whose status has to be changed
 * @param newStatus new status of the user
 * @return updated user
 */
var setUserStatus = function (userId, newStatus) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        result = exports.UserModel.findByIdAndUpdate(userId, {
            status: newStatus
        }).catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); });
        return [2 /*return*/, result
                ? Promise.resolve()
                : Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
    });
}); };
exports.setUserStatus = setUserStatus;
function updateUserEnjoyedVehicle(userId, vehicleId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, flag, idx, result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    flag = false;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getUserById(userId)];
                case 2:
                    user = _a.sent();
                    for (idx in user.enjoyedVehicles) {
                        if (user.enjoyedVehicles[idx].toString() === vehicleId.toString())
                            flag = true;
                    }
                    if (flag)
                        return [2 /*return*/, Promise.reject(new server_error_1.ServerError("Vehicle already inside the collection"))];
                    return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(userId, {
                            $push: { enjoyedVehicles: vehicleId }
                        }).catch(function (err) { return Promise.reject(new server_error_1.ServerError("Internal server error")); })];
                case 3:
                    result = _a.sent();
                    if (!result)
                        return [2 /*return*/, Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
                    return [2 /*return*/, Promise.resolve()];
                case 4:
                    err_2 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_2)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserEnjoyedVehicle = updateUserEnjoyedVehicle;
// TO DO dovrei chiamare la vehicleRemoveEnjoyer o lo fa il client
function removeUserEnjoyedVehicle(userId, vehicleId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, flag, idx, result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    flag = false;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getUserById(userId)];
                case 2:
                    user = _a.sent();
                    for (idx in user.enjoyedVehicles) {
                        if (user.enjoyedVehicles[idx].toString() === vehicleId.toString())
                            flag = true;
                    }
                    if (!flag)
                        return [2 /*return*/, Promise.reject(new server_error_1.ServerError("No enjoyed vehicles related to this user"))];
                    return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(userId, {
                            $pull: { enjoyedVehicles: vehicleId }
                        }).catch(function (err) { return Promise.reject(new server_error_1.ServerError("Internal server error")); })];
                case 3:
                    result = _a.sent();
                    if (!result)
                        return [2 /*return*/, Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
                    return [2 /*return*/, Promise.resolve()];
                case 4:
                    err_3 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_3)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.removeUserEnjoyedVehicle = removeUserEnjoyedVehicle;
function deleteRoutine(userId, name) {
    if (name === void 0) { name = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = name + "/" + userId.toString();
                    console.log(name);
                    return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(userId, {
                            $pull: { routines: { name: name } }
                        }).catch(function (err) { return Promise.reject(new server_error_1.ServerError("Internal server error")); })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result
                            ? Promise.resolve()
                            : Promise.reject(new server_error_1.ServerError("No user routine found matching the id"))];
            }
        });
    });
}
exports.deleteRoutine = deleteRoutine;
function addRoutine(userId, routine) {
    return __awaiter(this, void 0, void 0, function () {
        var routineSub, result;
        return __generator(this, function (_a) {
            routineSub = new routine_1.RoutineModel(routine);
            result = exports.UserModel.findByIdAndUpdate(userId, {
                $push: { routines: routineSub }
            }).catch(function (err) { return Promise.reject(new server_error_1.ServerError("Internal server error")); });
            return [2 /*return*/, result
                    ? Promise.resolve()
                    : Promise.reject(new server_error_1.ServerError("No user with that identifier"))];
        });
    });
}
exports.addRoutine = addRoutine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBQ3JDLHFDQUE2RjtBQUM3RixrREFBNEI7QUFDNUIsdURBQW9EO0FBQ3BELHFDQUlrQjtBQUNsQix1Q0FLbUI7QUFDbkIsMkNBSXFCO0FBQ3JCLCtDQUt1QjtBQUN2QixxQ0FJa0I7QUFJbEIsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ2pCLDRCQUFlLENBQUE7SUFDZiwwQkFBYSxDQUFBO0lBQ2IsNEJBQWUsQ0FBQTtBQUNuQixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUFFRCxJQUFZLFVBSVg7QUFKRCxXQUFZLFVBQVU7SUFDbEIsaUNBQW1CLENBQUE7SUFDbkIsK0JBQWlCLENBQUE7SUFDakIsbUNBQXFCLENBQUE7QUFDekIsQ0FBQyxFQUpXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBSXJCO0FBdUlZLFFBQUEsVUFBVSxHQUFHLElBQUksaUJBQU0sQ0FDaEM7SUFDSSxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsc0JBQVcsQ0FBQyxNQUFNO1FBQ3hCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBRUQsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLHNCQUFXLENBQUMsTUFBTTtRQUN4QixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUVELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxzQkFBVyxDQUFDLE1BQU07UUFDeEIsUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsSUFBSTtLQUNmO0lBRUQsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLHNCQUFXLENBQUMsTUFBTTtRQUN4QixNQUFNLEVB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Qyx1QkFBdUIsQ0FBQyxDQUFDLEVBQXhELENBQXdELENBQUMsQ0FBQTtZQUV6RSxzQkFBTyxNQUFNO29CQUNULENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUNuQixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLDBCQUFXLENBQUMsOEJBQThCLENBQUMsQ0FBQyxFQUFBOzs7Q0FDeEU7QUFURCxnQ0FTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHsgQW55S2V5cywgRG9jdW1lbnQsIEZpbHRlclF1ZXJ5LCBNb2RlbCwgU2NoZW1hLCBTY2hlbWFUeXBlcywgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0JztcclxuaW1wb3J0IHsgU2VydmVyRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL3NlcnZlci1lcnJvclwiXHJcbmltcG9ydCB7XHJcbiAgICBSb3V0aW5lLFxyXG4gICAgUm91dGluZVN1YkRvY3VtZW50LFxyXG4gICAgUm91dGluZVNjaGVtYSwgUm91dGluZU1vZGVsXHJcbn0gZnJvbSAnLi9yb3V0aW5lJ1xyXG5pbXBvcnQge1xyXG4gICAgT0RvY3VtZW50LFxyXG4gICAgT0RvY1N1YkRvY3VtZW50LFxyXG4gICAgRG9jdW1lbnRTY2hlbWEsXHJcbiAgICBEb2NUeXBlc1xyXG59IGZyb20gJy4vZG9jdW1lbnQnXHJcbmltcG9ydCB7XHJcbiAgICBVc2VyU3RhdHMsXHJcbiAgICBVc2VyU3RhdHNTdWJEb2N1bWVudCxcclxuICAgIFN0YXRzU2NoZW1hXHJcbn0gZnJvbSAnLi91c2VyLXN0YXRzJ1xyXG5pbXBvcnQge1xyXG4gICAgTm90VHlwZXMsXHJcbiAgICBOb3RpZmljYXRpb24sXHJcbiAgICBOb3RpZmljYXRpb25TY2hlbWEsXHJcbiAgICBOb3RpZmljYXRpb25TdWJEb2N1bWVudCwgTm90aWZpY2F0aW9uTW9kZWxcclxufSBmcm9tICcuL25vdGlmaWNhdGlvbidcclxuaW1wb3J0IHtcclxuICAgIFNldHRpbmcsXHJcbiAgICBTZXR0aW5nU3ViRG9jdW1lbnQsXHJcbiAgICBTZXR0aW5nU2NoZW1hXHJcbn0gZnJvbSAnLi9zZXR0aW5nJ1xyXG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tICdzb2NrZXQuaW8nO1xyXG5pbXBvcnQge29wdGlvbnN9IGZyb20gXCJzdXBlcmFnZW50XCI7XHJcblxyXG5leHBvcnQgZW51bSBVc2VyUm9sZXMge1xyXG4gICAgQ2hpbGQgPSAnQ2hpbGQnLFxyXG4gICAgQmFzZSA9ICdCYXNlJyxcclxuICAgIE93bmVyID0gJ093bmVyJ1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBVc2VyU3RhdHVzIHtcclxuICAgIE9mZmxpbmUgPSAnT2ZmbGluZScsXHJcbiAgICBPbmxpbmUgPSAnT25saW5lJyxcclxuICAgIEluVGhlQ2FyID0gJ1N3ZXJ2aW5nJ1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUHN3RGF0YSB7XHJcbiAgICBzYWx0OiBzdHJpbmdcclxuICAgIHB3ZEhhc2g6IHN0cmluZ1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVc2VyIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHN1cm5hbWU6IHN0cmluZztcclxuICAgIG5pY2tuYW1lOiBzdHJpbmc7XHJcbiAgICBlbWFpbDogc3RyaW5nO1xyXG4gICAgZnJpZW5kczogVHlwZXMuT2JqZWN0SWRbXVxyXG4gICAgcm9sZXM6IHN0cmluZ1tdO1xyXG4gICAgZW5qb3llZFZlaGljbGVzOiBUeXBlcy5PYmplY3RJZFtdO1xyXG4gICAgcHdkX2hhc2g6IHN0cmluZztcclxuICAgIHNhbHQ6IHN0cmluZztcclxuICAgIHN0YXRzOiBVc2VyU3RhdHM7XHJcbiAgICBzdGF0dXM6IFVzZXJTdGF0dXM7XHJcbiAgICBkb2NzOiBPRG9jdW1lbnRbXTtcclxuICAgIHNldHRpbmc6IFNldHRpbmc7XHJcbiAgICByb3V0aW5lczogUm91dGluZVtdO1xyXG4gICAgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlckRvY3VtZW50IGV4dGVuZHMgVXNlciwgRG9jdW1lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdGF0cyBzdWItZG9jdW1lbnRcclxuICAgICAqL1xyXG4gICAgc3RhdHM6IFVzZXJTdGF0c1N1YkRvY3VtZW50OyBcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFycmF5IG9mIG5vdGlmaWNhdGlvbiBzdWItZG9jdW1lbnRzXHJcbiAgICAgKi9cclxuICAgIG5vdGlmaWNhdGlvbnM6IFR5cGVzLkRvY3VtZW50QXJyYXk8Tm90aWZpY2F0aW9uU3ViRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVwcmVzZW50cyB1c2VyIG93biBzZXR0aW5nXHJcbiAgICAgKi9cclxuICAgIHNldHRpbmc6IFNldHRpbmdTdWJEb2N1bWVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFycmF5IG9mIHJvdXRpbmUgc3ViLWRvY3VtZW50c1xyXG4gICAgICovXHJcbiAgICByb3V0aW5lczogVHlwZXMuRG9jdW1lbnRBcnJheTxSb3V0aW5lU3ViRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXJyYXkgb2YgZG9jIHN1Yi1kb2N1bWVudHNcclxuICAgICAqL1xyXG4gICAgZG9jczogVHlwZXMuRG9jdW1lbnRBcnJheTxPRG9jU3ViRG9jdW1lbnQ+XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgZ2l2ZW4gaWQgaXMgaW5zaWRlIHRoZSBmcmllbmRzIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSBmcmllbmRJZCByZXByZXNlbnRzIHRoZSB1c2VyIHdobydzIHN1cHBvc2VkIHRvIGJlIGZyaWVuZFxyXG4gICAgICogKi9cclxuICAgIGlzRnJpZW5kKGZyaWVuZElkOiBUeXBlcy5PYmplY3RJZCk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBwcm92aWRlZCByb2xlIHRvIHRoaXMgaW5zdGFuY2UuXHJcbiAgICAgKiBJZiB0aGUgdXNlciBhbHJlYWR5IGhhcyB0aGUgcm9sZSwgaXQgaXMgbm90IGFkZGVkIGEgc2Vjb25kIHRpbWUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHJvbGUgcm9sZSB0byBiZSBzZXRcclxuICAgICAqL1xyXG4gICAgc2V0Um9sZShyb2xlOiBVc2VyUm9sZXMpOiBQcm9taXNlPFVzZXJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBwcm92aWRlZCByb2xlIGZyb20gdGhpcyBpbnN0YW5jZS5cclxuICAgICAqIElmIHRoZSB1c2VyIGRvZXNuJ3QgaGF2ZSB0aGUgcm9sZSwgbm90aGluZyBoYXBwZW5zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSByb2xlIHJvbGUgdG8gYmUgcmVtb3ZlZFxyXG4gICAgICovXHJcbiAgICByZW1vdmVSb2xlKHJvbGU6IFVzZXJSb2xlcyk6IFByb21pc2U8VXNlckRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdXNlciBoYXMgdGhlIHByb3ZpZGVkIHJvbGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcm9sZSByb2xlIHRvIGNoZWNrXHJcbiAgICAgKi9cclxuICAgIGhhc1JvbGUocm9sZTogVXNlclJvbGVzKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBhIG5ldyBwYXNzd29yZCB1c2luZyBiY3J5cHQgaGFzaGluZyBhbmQgc2FsdCBnZW5lcmF0aW9uIGZ1bmN0aW9uc1xyXG4gICAgICogQHBhcmFtIHB3ZCBuZXcgcGFzc3dvcmQgdG8gc2V0XHJcbiAgICAgKi9cclxuICAgIHNldFBhc3N3b3JkKHB3ZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIENoZWNrIHRoZSB2YWxpZGl0eSBvZiB0aGUgcGFzc3dvcmQgd2l0aCB0aGUgb25lIHN0b3JlZCBvbiB0aGUgZGF0YWJhc2VcclxuICAgICAgKiBAcGFyYW0gcHdkIHRoZSBwYXNzd29yZCB0byBjaGVja1xyXG4gICAgICAqL1xyXG4gICAgdmFsaWRhdGVQYXNzd29yZChwd2Q6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBub3RpZmljYXRpb24gaWRlbnRpZmllZCBieSB0eXBlIGFuZCByZXF1ZXN0ZXJcclxuICAgICAqIFJldHVybiBhbiBlcnJvciBpZiBhbiBpZGVudGljYWwgbm90aWZpY2F0aW9uIGFscmVhZHkgZXhpc3RzXHJcbiAgICAgKiBAcGFyYW0gdHlwZSB0eXBlIG9mIHRoZSBpbmNvbWluZyBub3RpZmljYXRpb25cclxuICAgICAqL1xyXG4gICAgYWRkTm90aWZpY2F0aW9uKHR5cGU6IE5vdFR5cGVzKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgbm90aWZpY2F0aW9uIGlkZW50aWZpZWQgYnkgaXRzIHR5cGVcclxuICAgICAqIFJldHVybnMgYW4gZXJyb3IgaWYgdGhlIG5vdGlmaWNhdGlvbiBkb2Vzbid0IGV4aXN0XHJcbiAgICAgKiBAcGFyYW0gdHlwZSB0eXBlIG9mIHRoZSBub3RpZmljYXRpb24gdG8gcmVtb3ZlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZU5vdGlmaWNhdGlvbih0eXBlOiBOb3RUeXBlcyk6IFByb21pc2U8VXNlckRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIGRvY3VtZW50IGlkZW50aWZpZWQgYnkgdHlwZSBhbmQgcmVxdWVzdGVyXHJcbiAgICAgKiBSZXR1cm4gYW4gZXJyb3IgaWYgYW4gaWRlbnRpY2FsIGRvY3VtZW50IGFscmVhZHkgZXhpc3RzXHJcbiAgICAgKiBAcGFyYW0gZG9jIHJlcHJlc2VudHMgdGhlIGluY29taW5nIGRvY3VtZW50XHJcbiAgICAgKi9cclxuICAgIGFkZERvY3VtZW50KGRvYzogT0RvY3VtZW50KTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhIGRvY3VtZW50IGlkZW50aWZpZWQgYnkgaXRzIHR5cGVcclxuICAgICAqIFJldHVybnMgYW4gZXJyb3IgaWYgdGhlIGRvY3VtZW50IGRvZXNuJ3QgZXhpc3RcclxuICAgICAqIEBwYXJhbSB0eXBlIHR5cGUgb2YgdGhlIGRvY3VtZW50IHRvIHJlbW92ZVxyXG4gICAgICovXHJcbiAgICByZW1vdmVEb2N1bWVudCh0eXBlOiBEb2NUeXBlcyk6IFByb21pc2U8VXNlckRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBhIHJvdXRpbmUgZm9yIHRoZSB1c2VyXHJcbiAgICAgKiBAcGFyYW0gcm91dGluZSByZXByZXNlbnRzIHRoZSBuZXdseSByb3V0aW5lXHJcbiAgICAgKi9cclxuICAgIGFkZFJvdXRpbmUocm91dGluZTogUm91dGluZSk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgYSByb3V0aW5lIGZvciB0aGUgdXNlclxyXG4gICAgICogQHBhcmFtIG5hbWUgaWRlbnRpZmllcyB0aGUgcm91dGluZSB1cCB0byBiZSByZW1vdmVkXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVJvdXRpbmUobmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBVc2VyU2NoZW1hID0gbmV3IFNjaGVtYTxVc2VyRG9jdW1lbnQ+KFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgIH0sIFxyXG5cclxuICAgICAgICBzdXJuYW1lOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICB9LCBcclxuXHJcbiAgICAgICAgZW1haWw6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgdW5pcXVlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG5pY2tuYW1lOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgdW5pcXVlOiB0cnVlXHJcbiAgICAgICAgfSwgXHJcblxyXG4gICAgICAgIGZyaWVuZHM6IHtcclxuICAgICAgICAgICAgdHlwZTogW1NjaGVtYVR5cGVzLk9iamVjdElkXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW11cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBUT0RPIHRoaXMgZmllbGQgbmVlZHMgYSByb2xlIHBhaXJlZCB3aXRoIGVhY2ggdmVoaWNsZSBpZCB0byBsZXQgdXMga25vdyB3aGVuIGl0J3MgcG9zc2libGUgdG8gZG8gY2VydGFpbiBhY3Rpb25cclxuICAgICAgICBlbmpveWVkVmVoaWNsZXM6IHtcclxuICAgICAgICAgICAgdHlwZTogW1NjaGVtYVR5cGVzLk9iamVjdElkXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW11cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzYWx0OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgIFxyXG4gICAgICAgIHB3ZF9oYXNoOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgIFxyXG4gICAgICAgIG5vdGlmaWNhdGlvbnM6IHsgXHJcbiAgICAgICAgICAgIHR5cGU6IFtOb3RpZmljYXRpb25TY2hlbWFdXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcm9sZXM6IHtcclxuICAgICAgICAgICAgdHlwZTogW1NjaGVtYVR5cGVzLlN0cmluZ10sXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBlbnVtOiBVc2VyUm9sZXMsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtVc2VyUm9sZXMuQmFzZV1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGF0czoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdGF0c1NjaGVtYSxcclxuICAgICAgICAgICAgLy9kZWZhdWx0OiAoKSA9PiAoe30pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcm91dGluZXM6IHtcclxuICAgICAgICAgICAgdHlwZTogW1JvdXRpbmVTY2hlbWFdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRvY3M6IHtcclxuICAgICAgICAgICAgdHlwZXM6IFtEb2N1bWVudFNjaGVtYV0sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0dGluZzoge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXR0aW5nU2NoZW1hLFxyXG4gICAgICAgICAgICAvL2RlZmF1bHQ6ICgpID0+ICh7fSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGF0dXM6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuU3RyaW5nLFxyXG4gICAgICAgICAgICBlbnVtOiBVc2VyU3RhdHVzLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBVc2VyU3RhdHVzLk9mZmxpbmVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbilcclxuXHJcbi8vIFRPRE8gYWRkIGFuIGVycm9yIHdoZW5ldmVyIGEgdW5pcXVlIGNvbnN0cmFpbnQgZ2V0cyBicm9rZW5cclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVtYWlsID0gKGVtYWlsKSA9PiB7XHJcbiAgICByZXR1cm4gU3RyaW5nKGVtYWlsKVxyXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgLm1hdGNoKFxyXG4gICAgICAgICAgICAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC9cclxuICAgICAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZE5vdGlmaWNhdGlvbihfaWQ6IFR5cGVzLk9iamVjdElkLCBub3Q6IE5vdGlmaWNhdGlvbikge1xyXG5cclxuICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb25Nb2RlbChub3QpXHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmVBbmRVcGRhdGUoeyBfaWQgfSwge1xyXG4gICAgICAgICRwdXNoOiB7IG5vdGlmaWNhdGlvbnM6IG5vdGlmaWNhdGlvbiB9XHJcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllclwiKSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZU5vdGlmaWNhdGlvbihfaWQ6IFR5cGVzLk9iamVjdElkLCB0eXBlOiBOb3RUeXBlcykge1xyXG5cclxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZUFuZFVwZGF0ZSh7IF9pZCB9LCB7XHJcbiAgICAgICAgJHB1bGw6IHsgbm90aWZpY2F0aW9uczogeyB0eXBlIH0gfVxyXG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHVzZXIvbm90aWZpY2F0aW9uIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG59XHJcblxyXG5cclxuLy8gcG9wIG9uZSBub3RpZmljYXRpb24gd2l0aCB0aGUgc2FtZSB0eXBlIGFzIHRoZSBvbmUgcmVjaWV2ZWQgYXMgaW5wdXRcclxuVXNlclNjaGVtYS5tZXRob2RzLnJlbW92ZU5vdGlmaWNhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChcclxuICAgIHR5cGU6IHN0cmluZ1xyXG4pOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgZm9yIChsZXQgaWR4IGluIHRoaXMubm90aWZpY2F0aW9ucykge1xyXG4gICAgICAgIGlmICh0aGlzLm5vdGlmaWNhdGlvbnNbaWR4XS50eXBlID09PSB0eXBlLnZhbHVlT2YoKSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMuc3BsaWNlKHBhcnNlSW50KGlkeCksIDEpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdOb3RpZmljYXRpb24gbm90IGZvdW5kJykpO1xyXG59O1xyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLmlzRnJpZW5kID0gZnVuY3Rpb24oZnJpZW5kSWQ6IFR5cGVzLk9iamVjdElkKSA6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZnJpZW5kcy5pbmNsdWRlcyhmcmllbmRJZClcclxufVxyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLmFkZERvY3VtZW50ID0gYXN5bmMgZnVuY3Rpb24gKGRvYzogT0RvY3VtZW50KSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgdGhpcy5kb2N1bWVudHMucHVzaChkb2MpXHJcbiAgICBhd2FpdCB0aGlzLnNhdmUoKS5jYXRjaCgoZXJyKSA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpKVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbn1cclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy5yZW1vdmVEb2N1bWVudCA9IGFzeW5jIGZ1bmN0aW9uICh0eXBlOiBEb2NUeXBlcykgOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgZm9yIChsZXQgaWR4IGluIHRoaXMuZG9jcykge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3NbaWR4XS50eXBlID09PSB0eXBlLnZhbHVlT2YoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3Muc3BsaWNlKHBhcnNlSW50KGlkeCksIDEpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG59XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMuYWRkUm91dGluZSA9IGFzeW5jIGZ1bmN0aW9uIChyb3V0aW5lOiBSb3V0aW5lKSA6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICByb3V0aW5lLm5hbWUgPSByb3V0aW5lLm5hbWUgKyBcIi9cIiArIHRoaXMuX2lkLnRvU3RyaW5nKClcclxuICAgIHRoaXMucm91dGluZXMucHVzaChyb3V0aW5lKVxyXG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgpXHJcbn1cclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy5yZW1vdmVSb3V0aW5lID0gYXN5bmMgZnVuY3Rpb24gKG5hbWU6IHN0cmluZykgOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgbmFtZSA9IG5hbWUgKyBcIi9cIiArIHRoaXMuX2lkLnRvU3RyaW5nKClcclxuICAgIHRoaXMucm91dGluZXMgPSB0aGlzLnJvdXRpbmVzLmZpbHRlcigoZWxlbTogUm91dGluZVN1YkRvY3VtZW50KSA9PiBlbGVtLm5hbWUgIT09IG5hbWUpXHJcbiAgICByZXR1cm4gdGhpcy5zYXZlKClcclxufVxyXG5cclxuXHJcbi8qIE1FVEhPRFMgRk9SIFBBU1NXT1JEIE1BTklQVUxBVElPTiBBTkQgVkFMSURBVElPTiAqL1xyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLnNldFBhc3N3b3JkID0gYXN5bmMgZnVuY3Rpb24gKHB3ZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGNvbnN0IHNhbHQ6IHN0cmluZyA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5nZW5TYWx0KDEwKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignRXJyb3Igd2l0aCBzYWx0IGdlbmVyYXRpb24nKSlcclxuICAgICAgICApO1xyXG5cclxuICAgIGNvbnN0IHB3ZEhhc2ggPSBhd2FpdCBiY3J5cHRcclxuICAgICAgICAuaGFzaChwd2QsIHNhbHQpXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT5cclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdFcnJvciB3aXRoIHBhc3N3b3JkIGVuY3J5cHRpb24nKSlcclxuICAgICAgICApO1xyXG5cclxuICAgIHRoaXMuc2FsdCA9IHNhbHQ7XHJcbiAgICB0aGlzLnB3ZF9oYXNoID0gcHdkSGFzaDtcclxuICAgIHJldHVybiB0aGlzLnNhdmUoKTtcclxufTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQc3codXNlcklkOiBUeXBlcy5PYmplY3RJZCwgcHN3OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHNhbHQ6IHN0cmluZyA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5nZW5TYWx0KDEwKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignRXJyb3Igd2l0aCBzYWx0IGdlbmVyYXRpb24nKSlcclxuICAgICAgICApO1xyXG5cclxuICAgIGNvbnN0IHB3ZEhhc2ggPSBhd2FpdCBiY3J5cHRcclxuICAgICAgICAuaGFzaChwc3csIHNhbHQpXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT5cclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdFcnJvciB3aXRoIHBhc3N3b3JkIGVuY3J5cHRpb24nKSlcclxuICAgICAgICApO1xyXG5cclxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlcklkLCB7XHJcbiAgICAgICAgc2FsdDogc2FsdCxcclxuICAgICAgICBwd2RfaGFzaDogcHdkSGFzaFxyXG4gICAgfSkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpXHJcblxyXG4gICAgaWYgKCFyZXN1bHQpIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2FsdE5kSGFzaChwc3c6IHN0cmluZyk6IFByb21pc2U8UHN3RGF0YT4ge1xyXG4gICAgY29uc3Qgc2FsdDogc3RyaW5nID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmdlblNhbHQoMTApXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT5cclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdFcnJvciB3aXRoIHNhbHQgZ2VuZXJhdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgY29uc3QgcHdkSGFzaCA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5oYXNoKHBzdywgc2FsdClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggcGFzc3dvcmQgZW5jcnlwdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XHJcbiAgICAgICAgc2FsdCxcclxuICAgICAgICBwd2RIYXNoXHJcbiAgICB9KVxyXG59XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMudmFsaWRhdGVQYXNzd29yZCA9IGFzeW5jIGZ1bmN0aW9uIChwd2Q6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgY29uc3QgaGFzaGVkUHcgPSBhd2FpdCBiY3J5cHRcclxuICAgICAgICAuaGFzaChwd2QsIHRoaXMuc2FsdClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggcGFzc3dvcmQgZW5jcnlwdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucHdkX2hhc2ggPT09IGhhc2hlZFB3O1xyXG59O1xyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLnJlbW92ZVJvbGUgPSBhc3luYyBmdW5jdGlvbiAocm9sZTogVXNlclJvbGVzKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGZvciAoY29uc3QgaWR4IGluIHRoaXMucm9sZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5yb2xlc1tpZHhdID09PSByb2xlLnZhbHVlT2YoKSkgdGhpcy5yb2xlcy5zcGxpY2UocGFyc2VJbnQoaWR4KSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xyXG59O1xyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLmhhc1JvbGUgPSBmdW5jdGlvbiAocm9sZTogVXNlclJvbGVzKTogYm9vbGVhbiB7XHJcbiAgICBmb3IgKGxldCBpZHggaW4gdGhpcy5yb2xlcykge1xyXG4gICAgICAgIGlmICh0aGlzLnJvbGVzW2lkeF0gPT0gcm9sZS52YWx1ZU9mKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy5zZXRSb2xlID0gYXN5bmMgZnVuY3Rpb24gKHJvbGU6IFVzZXJSb2xlcyk6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBpZiAoIXRoaXMuaGFzUm9sZShyb2xlKSkge1xyXG4gICAgICAgIHRoaXMucm9sZXMucHVzaChyb2xlLnZhbHVlT2YoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignUm9sZSBhbHJlYWR5IHNldCcpKTtcclxufTtcclxuXHJcbi8vIENyZWF0ZSBcIlVzZXJzXCIgY29sbGVjdGlvblxyXG5leHBvcnQgY29uc3QgVXNlck1vZGVsOiBNb2RlbDxVc2VyRG9jdW1lbnQ+ID0gbW9uZ29vc2UubW9kZWwoJ1VzZXInLCBVc2VyU2NoZW1hLCAnVXNlcnMnKTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyQnlJZCh1c2VySWQ6IFR5cGVzLk9iamVjdElkKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGNvbnN0IHVzZXJEb2MgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7IF9pZDogdXNlcklkIH0pLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuICF1c2VyRG9jXHJcbiAgICAgICAgPyBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ05vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXInKSlcclxuICAgICAgICA6IFByb21pc2UucmVzb2x2ZSh1c2VyRG9jKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCeU5pY2tuYW1lKG5pY2tuYW1lOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgdXNlcmRhdGEgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7IG5pY2tuYW1lIH0pLmNhdGNoKChlcnIpID0+IFxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAhdXNlcmRhdGFcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHVzZXJkYXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgdXNlcmRhdGEgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7IGVtYWlsIH0pLmNhdGNoKChlcnIpID0+IFxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAhdXNlcmRhdGFcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHVzZXJkYXRhKTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkRnJpZW5kc2hpcCh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBmcmllbmRJZDogVHlwZXMuT2JqZWN0SWQpIHtcclxuICAgIGxldCByZXN1bHQxLCByZXN1bHQyXHJcblxyXG4gICAgcmVzdWx0MSA9IGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh1c2VySWQsIHtcclxuICAgICAgICAkcHVzaDogeyBmcmllbmRzOiBmcmllbmRJZH1cclxuICAgIH0pLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgcmVzdWx0MiA9IGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZShmcmllbmRJZCwge1xyXG4gICAgICAgICRwdXNoOiB7IGZyaWVuZHM6IHVzZXJJZH1cclxuICAgIH0pLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3VsdDEgJiYgcmVzdWx0MikgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhd2FpdCByZW1vdmVGcmllbmRzaGlwKHVzZXJJZCwgZnJpZW5kSWQsIHRydWUpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk9uZSBvZiB0aGVtIGRvZXNuJ3QgZXhpc3RzIG9uIHRoZSBkYXRhYmFzZSwgb3BlcmF0aW9uIG5lZ2F0ZWRcIikpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVGcmllbmRzaGlwKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIGZyaWVuZElkOiBUeXBlcy5PYmplY3RJZCwgYXV0b0NhdGNoOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGxldCByZXN1bHQxLCByZXN1bHQyXHJcbiAgICByZXN1bHQxID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXJJZCwge1xyXG4gICAgICAgICRwdWxsOiB7IGZyaWVuZHM6IGZyaWVuZElkfVxyXG4gICAgfSkuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXN1bHQyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKGZyaWVuZElkLCB7XHJcbiAgICAgICAgJHB1bGw6IHsgZnJpZW5kczogdXNlcklkfVxyXG4gICAgfSkuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gKChyZXN1bHQxICYmIHJlc3VsdDIpIHx8IGF1dG9DYXRjaClcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJPbmUgb2YgdGhlbSBkb2Vzbid0IGV4aXN0cyBvbiB0aGUgZGF0YWJhc2VcIikpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVVc2VyKGRhdGE6IEFueUtleXM8VXNlckRvY3VtZW50Pik6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcImRlbnRybyBsYSBjcmFlYXRlXCIpXHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG5cclxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBVc2VyTW9kZWwuaW5zZXJ0TWFueShbZGF0YV0pLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKGVyci5tZXNzYWdlKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIGF3YWl0IGdldFVzZXJCeUlkKHJlc3VsdFswXS5faWQpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVVc2VyKGZpbHRlcjogRmlsdGVyUXVlcnk8VXNlckRvY3VtZW50Pik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudCA9IGF3YWl0IGdldFVzZXJCeUlkKGZpbHRlci5faWQpXHJcblxyXG4gICAgZm9yIChsZXQgaWR4IGluIHVzZXIuZnJpZW5kcykge1xyXG4gICAgICAgIGF3YWl0IHJlbW92ZUZyaWVuZHNoaXAodXNlci5mcmllbmRzW2lkeF0sIGZpbHRlci5faWQpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb2JqOiB7IGRlbGV0ZWRDb3VudD86IG51bWJlciB9ID0gYXdhaXQgVXNlck1vZGVsLmRlbGV0ZU9uZShmaWx0ZXIpLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuICFvYmouZGVsZXRlZENvdW50XHJcbiAgICAgICAgPyBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ05vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXInKSlcclxuICAgICAgICA6IFByb21pc2UucmVzb2x2ZSgpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTmlja05hbWUoX2lkOiBUeXBlcy5PYmplY3RJZCwgbmlja25hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lQW5kVXBkYXRlKHsgX2lkIH0sIHsgbmlja25hbWUgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQYXNzd29yZChfaWQ6IFR5cGVzLk9iamVjdElkLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdXNlcjogVXNlckRvY3VtZW50O1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQoX2lkKTtcclxuICAgICAgICBhd2FpdCB1c2VyLnNldFBhc3N3b3JkKHBhc3N3b3JkKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlclN0YXRzKF9pZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPFVzZXJTdGF0cz4ge1xyXG4gICAgY29uc3Qgc3RhdCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHsgX2lkIH0sIHsgc3RhdHM6IDEgfSkuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gIXN0YXRcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHN0YXQuc3RhdHMpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHVzZXJJZCBpZCBvZiB0aGUgdXNlciB0byB1cGRhdGVcclxuICogQHBhcmFtIHVwZGF0ZWRTdGF0cyBvYmplY3QgY29udGFpbmluZyB0aGUgdXBkYXRlZCBzdGF0cyBvZiB0aGUgdXNlclxyXG4gKi9cclxuIGV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVVc2VyU3RhdHMoXHJcbiAgICB1c2VySWQ6IFR5cGVzLk9iamVjdElkLFxyXG4gICAgdXBkYXRlZFN0YXRzOiBVc2VyU3RhdHNcclxuKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXJJZCwge1xyXG4gICAgICAgIHN0YXRzOiB1cGRhdGVkU3RhdHNcclxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVGhlbWUodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgdGhlbWU6IHN0cmluZykgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlcklkLCB7XHJcbiAgICAgICAgXCJzZXR0aW5nLnRoZW1lXCI6IHRoZW1lXHJcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpKTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllclwiKSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNpemUodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgc2l6ZTogbnVtYmVyKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh1c2VySWQsIHtcclxuICAgICAgICBcInNldHRpbmcuc2l6ZVwiOiBzaXplXHJcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllclwiKSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxhbmd1YWdlKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIGxhbjogc3RyaW5nKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh1c2VySWQsIHtcclxuICAgICAgICBcInNldHRpbmcubGFuZ3VhZ2VcIjogbGFuXHJcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllclwiKSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUdhbWlmaWNhdGlvbih1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBzd3Q6IGJvb2xlYW4pIDogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXJJZCwge1xyXG4gICAgICAgIFwic2V0dGluZy5nYW1pZmljYXRpb25IaWRlXCI6ICFzd3RcclxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlRW1haWwoX2lkOiBUeXBlcy5PYmplY3RJZCwgZW1haWw6IHN0cmluZykgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUoIF9pZCAsIHsgZW1haWwgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVSb3V0aW5lTmFtZSh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgb2xkTmFtZSA9IG9sZE5hbWUgKyBcIi9cIiArIHVzZXJJZC50b1N0cmluZygpXHJcbiAgICBuZXdOYW1lID0gbmV3TmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmVBbmRVcGRhdGUoe1xyXG4gICAgICAgIF9pZDogdXNlcklkLFxyXG4gICAgICAgIFwicm91dGluZXMubmFtZVwiOiBvbGROYW1lXHJcbiAgICB9LCB7XHJcbiAgICAgICAgJHNldDogeyBcInJvdXRpbmVzLiQubmFtZVwiOiBuZXdOYW1lIH1cclxuICAgIH0pLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciByb3V0aW5lIGZvdW5kIG1hdGNoaW5nIHRoZSBpZFwiKSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJvdXRpbmVUZW1wZXJhdHVyZSh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCByb3V0aW5lTmFtZTogc3RyaW5nLCB0ZW1wOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnRcclxuICAgIHJvdXRpbmVOYW1lID0gcm91dGluZU5hbWUgKyBcIi9cIiArIHVzZXJJZC50b1N0cmluZygpXHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lQW5kVXBkYXRlKHtcclxuICAgICAgICBfaWQ6IHVzZXJJZCxcclxuICAgICAgICBcInJvdXRpbmVzLm5hbWVcIjogcm91dGluZU5hbWVcclxuICAgIH0sIHtcclxuICAgICAgICAkc2V0OiB7IFwicm91dGluZXMuJC50ZW1wZXJhdHVyZVwiOiB0ZW1wIH1cclxuICAgIH0pLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciByb3V0aW5lIGZvdW5kIG1hdGNoaW5nIHRoZSBpZFwiKSlcclxufVxyXG5cclxuLy8gdGhpcyBwcm9iYWJseSBuZWVkcyB0byBiZSB3cml0dGVuIGFnYWluIFxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlUm91dGluZUxpZ2h0c0NvbG9yKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIHJvdXRpbmVOYW1lOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnRcclxuICAgIHJvdXRpbmVOYW1lID0gcm91dGluZU5hbWUgKyBcIi9cIiArIHVzZXJJZC50b1N0cmluZygpXHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lQW5kVXBkYXRlKHtcclxuICAgICAgICBfaWQ6IHVzZXJJZCxcclxuICAgICAgICBcInJvdXRpbmVzLm5hbWVcIjogcm91dGluZU5hbWVcclxuICAgIH0sIHtcclxuICAgICAgICAkc2V0OiB7IFwicm91dGluZXMuJC5saWdodHNDb2xvclwiOiBjb2xvciB9XHJcbiAgICB9KS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSkpXHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHVzZXIgcm91dGluZSBmb3VuZCBtYXRjaGluZyB0aGUgaWRcIikpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlUm91dGluZU11c2ljKFxyXG4gICAgdXNlcklkOiBUeXBlcy5PYmplY3RJZCwgXHJcbiAgICByb3V0aW5lTmFtZTogc3RyaW5nLCBcclxuICAgIG11c2ljVG9BZGQ6IHN0cmluZ1tdID0gW10sIFxyXG4gICAgbXVzaWNUb1JlbW92ZTogc3RyaW5nW10gPSBbXVxyXG4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnRcclxuICAgIGxldCByZXN1bHRcclxuICAgIGxldCBtdXNpYzogc3RyaW5nW11cclxuXHJcbiAgICByb3V0aW5lTmFtZSA9IHJvdXRpbmVOYW1lICsgXCIvXCIgKyB1c2VySWQudG9TdHJpbmcoKVxyXG4gICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuXHJcbiAgICAvL3JlbW92ZSB0aGUgbXVzaWNcclxuICAgIGZvciAobGV0IGlkeCBpbiB1c2VyLnJvdXRpbmVzKSB7XHJcbiAgICAgICAgaWYgKHVzZXIucm91dGluZXNbaWR4XS5uYW1lID09PSByb3V0aW5lTmFtZSl7XHJcbiAgICAgICAgICAgIG11c2ljID0gdXNlci5yb3V0aW5lc1tpZHhdLm11c2ljLmZpbHRlcihlbGVtID0+ICFtdXNpY1RvUmVtb3ZlLmluY2x1ZGVzKGVsZW0pKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGQgdGhlIG5ldyBvbmVcclxuICAgIG11c2ljLnB1c2goLi4ubXVzaWNUb0FkZClcclxuXHJcbiAgICAgcmVzdWx0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmVBbmRVcGRhdGUoe1xyXG4gICAgICAgIF9pZDogdXNlcklkLFxyXG4gICAgICAgIFwicm91dGluZXMubmFtZVwiOiByb3V0aW5lTmFtZVxyXG4gICAgfSwge1xyXG4gICAgICAgICRzZXQ6IHtcclxuICAgICAgICAgICAgXCJyb3V0aW5lcy4kLm11c2ljXCI6IG11c2ljLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSkpXHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHVzZXIgcm91dGluZSBmb3VuZCBtYXRjaGluZyB0aGUgaWRcIikpXHJcblxyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgc3RhdHVzIG9mIHRoZSBwcm92aWRlZCB1c2VyIHRvIHRoZSBwcm92aWRlZCB2YWx1ZVxyXG4gKiBhbmQgbm90aWZpZXMgaGlzIGZyaWVuZHMgb2YgdGhlIGNoYW5nZS5cclxuICogQHBhcmFtIHVzZXJJZCBpZCBvZiB0aGUgdXNlciB3aG9zZSBzdGF0dXMgaGFzIHRvIGJlIGNoYW5nZWRcclxuICogQHBhcmFtIG5ld1N0YXR1cyBuZXcgc3RhdHVzIG9mIHRoZSB1c2VyXHJcbiAqIEByZXR1cm4gdXBkYXRlZCB1c2VyXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2V0VXNlclN0YXR1cyA9IGFzeW5jIChcclxuICAgIHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsXHJcbiAgICBuZXdTdGF0dXM6IFVzZXJTdGF0dXNcclxuKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBsZXQgcmVzdWx0ID0gVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXJJZCwge1xyXG4gICAgICAgIHN0YXR1czogbmV3U3RhdHVzXHJcbiAgICB9KS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSkpXHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcbn07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlckVuam95ZWRWZWhpY2xlKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIHZlaGljbGVJZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnRcclxuICAgIGxldCBmbGFnOiBib29sZWFuID0gZmFsc2VcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIHVzZXIuZW5qb3llZFZlaGljbGVzKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyLmVuam95ZWRWZWhpY2xlc1tpZHhdLnRvU3RyaW5nKCkgPT09IHZlaGljbGVJZC50b1N0cmluZygpKSBmbGFnID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZsYWcpIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJWZWhpY2xlIGFscmVhZHkgaW5zaWRlIHRoZSBjb2xsZWN0aW9uXCIpKVxyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXJJZCwge1xyXG4gICAgICAgICAgICAkcHVzaDogeyBlbmpveWVkVmVoaWNsZXM6IHZlaGljbGVJZCB9XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpXHJcblxyXG4gICAgICAgIGlmICghcmVzdWx0KSByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllclwiKSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8vIFRPIERPIGRvdnJlaSBjaGlhbWFyZSBsYSB2ZWhpY2xlUmVtb3ZlRW5qb3llciBvIGxvIGZhIGlsIGNsaWVudFxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVtb3ZlVXNlckVuam95ZWRWZWhpY2xlKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIHZlaGljbGVJZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnRcclxuICAgIGxldCBmbGFnOiBib29sZWFuID0gZmFsc2VcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIHVzZXIuZW5qb3llZFZlaGljbGVzKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyLmVuam95ZWRWZWhpY2xlc1tpZHhdLnRvU3RyaW5nKCkgPT09IHZlaGljbGVJZC50b1N0cmluZygpKSBmbGFnID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFmbGFnKSByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gZW5qb3llZCB2ZWhpY2xlcyByZWxhdGVkIHRvIHRoaXMgdXNlclwiKSlcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh1c2VySWQsIHtcclxuICAgICAgICAgICAgJHB1bGw6IHsgZW5qb3llZFZlaGljbGVzOiB2ZWhpY2xlSWQgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpKVxyXG5cclxuICAgICAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlUm91dGluZSh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBuYW1lOiBzdHJpbmcgPSBcIlwiKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBuYW1lID0gbmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuXHJcbiAgICBjb25zb2xlLmxvZyhuYW1lKVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh1c2VySWQsIHtcclxuICAgICAgICAkcHVsbDoge3JvdXRpbmVzOiB7bmFtZX19XHJcbiAgICB9KS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKSlcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciByb3V0aW5lIGZvdW5kIG1hdGNoaW5nIHRoZSBpZFwiKSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFJvdXRpbmUodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgcm91dGluZTogUm91dGluZSkge1xyXG4gICAgbGV0IHJvdXRpbmVTdWI6IFJvdXRpbmVTdWJEb2N1bWVudCA9IG5ldyBSb3V0aW5lTW9kZWwocm91dGluZSlcclxuICAgIGxldCByZXN1bHQgPSBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlcklkLCB7XHJcbiAgICAgICAgJHB1c2g6IHtyb3V0aW5lczogcm91dGluZVN1Yn1cclxuICAgIH0pLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpKVxyXG5cclxuICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG59Il19