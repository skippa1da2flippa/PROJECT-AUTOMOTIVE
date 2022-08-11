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
        index: true
    },
    nickname: {
        type: mongoose_1.SchemaTypes.String,
        unique: true
    },
    friends: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        default: []
    },
    // TODO this field needs a role paired with each vehicle id to let us know when it's possible to doc certain action
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
        var user;
        return __generator(this, function (_a) {
            user = new exports.UserModel(data);
            return [2 /*return*/, user.save().catch(function (err) {
                    return Promise.reject(new server_error_1.ServerError('Internal server error'));
                })];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBQ3JDLHFDQUE2RjtBQUM3RixrREFBNEI7QUFDNUIsdURBQW9EO0FBQ3BELHFDQUlrQjtBQUNsQix1Q0FLbUI7QUFDbkIsMkNBSXFCO0FBQ3JCLCtDQUt1QjtBQUN2QixxQ0FJa0I7QUFHbEIsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ2pCLDRCQUFlLENBQUE7SUFDZiwwQkFBYSxDQUFBO0lBQ2IsNEJBQWUsQ0FBQTtBQUNuQixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUFFRCxJQUFZLFVBSVg7QUFKRCxXQUFZLFVBQVU7SUFDbEIsaUNBQW1CLENBQUE7SUFDbkIsK0JBQWlCLENBQUE7SUFDakIsbUNBQXFCLENBQUE7QUFDekIsQ0FBQyxFQUpXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBSXJCO0FBdUlZLFFBQUEsVUFBVSxHQUFHLElBQUksaUJBQU0sQ0FDaEM7SUFDSSxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsc0JBQVcsQ0FBQyxNQUFNO1FBQ3hCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBRUQsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLHNCQUFXLENBQUMsTUFBTTtRQUN4QixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUVELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxzQkFBVyxDQUFDLE1BQU07UUFDeEIsUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRSxJQUFJO0tBQ2Q7SUFFRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsc0JBQVcsQ0FB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Q0FBQyxFQUFBOzs7Q0FDeEU7QUFURCxnQ0FTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHsgQW55S2V5cywgRG9jdW1lbnQsIEZpbHRlclF1ZXJ5LCBNb2RlbCwgU2NoZW1hLCBTY2hlbWFUeXBlcywgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0JztcclxuaW1wb3J0IHsgU2VydmVyRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL3NlcnZlci1lcnJvclwiXHJcbmltcG9ydCB7XHJcbiAgICBSb3V0aW5lLFxyXG4gICAgUm91dGluZVN1YkRvY3VtZW50LFxyXG4gICAgUm91dGluZVNjaGVtYSwgUm91dGluZU1vZGVsXHJcbn0gZnJvbSAnLi9yb3V0aW5lJ1xyXG5pbXBvcnQge1xyXG4gICAgT0RvY3VtZW50LFxyXG4gICAgT0RvY1N1YkRvY3VtZW50LFxyXG4gICAgRG9jdW1lbnRTY2hlbWEsXHJcbiAgICBEb2NUeXBlc1xyXG59IGZyb20gJy4vZG9jdW1lbnQnXHJcbmltcG9ydCB7XHJcbiAgICBVc2VyU3RhdHMsXHJcbiAgICBVc2VyU3RhdHNTdWJEb2N1bWVudCxcclxuICAgIFN0YXRzU2NoZW1hXHJcbn0gZnJvbSAnLi91c2VyLXN0YXRzJ1xyXG5pbXBvcnQge1xyXG4gICAgTm90VHlwZXMsXHJcbiAgICBOb3RpZmljYXRpb24sXHJcbiAgICBOb3RpZmljYXRpb25TY2hlbWEsXHJcbiAgICBOb3RpZmljYXRpb25TdWJEb2N1bWVudCwgTm90aWZpY2F0aW9uTW9kZWxcclxufSBmcm9tICcuL25vdGlmaWNhdGlvbidcclxuaW1wb3J0IHtcclxuICAgIFNldHRpbmcsXHJcbiAgICBTZXR0aW5nU3ViRG9jdW1lbnQsXHJcbiAgICBTZXR0aW5nU2NoZW1hXHJcbn0gZnJvbSAnLi9zZXR0aW5nJ1xyXG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tICdzb2NrZXQuaW8nO1xyXG5cclxuZXhwb3J0IGVudW0gVXNlclJvbGVzIHtcclxuICAgIENoaWxkID0gJ0NoaWxkJyxcclxuICAgIEJhc2UgPSAnQmFzZScsXHJcbiAgICBPd25lciA9ICdPd25lcidcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVXNlclN0YXR1cyB7XHJcbiAgICBPZmZsaW5lID0gJ09mZmxpbmUnLFxyXG4gICAgT25saW5lID0gJ09ubGluZScsXHJcbiAgICBJblRoZUNhciA9ICdTd2VydmluZydcclxufVxyXG5cclxuaW50ZXJmYWNlIFBzd0RhdGEge1xyXG4gICAgc2FsdDogc3RyaW5nXHJcbiAgICBwd2RIYXNoOiBzdHJpbmdcclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBzdXJuYW1lOiBzdHJpbmc7XHJcbiAgICBuaWNrbmFtZTogc3RyaW5nO1xyXG4gICAgZW1haWw6IHN0cmluZztcclxuICAgIGZyaWVuZHM6IFR5cGVzLk9iamVjdElkW11cclxuICAgIHJvbGVzOiBzdHJpbmdbXTtcclxuICAgIGVuam95ZWRWZWhpY2xlczogVHlwZXMuT2JqZWN0SWRbXTtcclxuICAgIHB3ZF9oYXNoOiBzdHJpbmc7XHJcbiAgICBzYWx0OiBzdHJpbmc7XHJcbiAgICBzdGF0czogVXNlclN0YXRzO1xyXG4gICAgc3RhdHVzOiBVc2VyU3RhdHVzO1xyXG4gICAgZG9jczogT0RvY3VtZW50W107XHJcbiAgICBzZXR0aW5nOiBTZXR0aW5nO1xyXG4gICAgcm91dGluZXM6IFJvdXRpbmVbXTtcclxuICAgIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbltdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJEb2N1bWVudCBleHRlbmRzIFVzZXIsIERvY3VtZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogU3RhdHMgc3ViLWRvY3VtZW50XHJcbiAgICAgKi9cclxuICAgIHN0YXRzOiBVc2VyU3RhdHNTdWJEb2N1bWVudDsgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcnJheSBvZiBub3RpZmljYXRpb24gc3ViLWRvY3VtZW50c1xyXG4gICAgICovXHJcbiAgICBub3RpZmljYXRpb25zOiBUeXBlcy5Eb2N1bWVudEFycmF5PE5vdGlmaWNhdGlvblN1YkRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlcHJlc2VudHMgdXNlciBvd24gc2V0dGluZ1xyXG4gICAgICovXHJcbiAgICBzZXR0aW5nOiBTZXR0aW5nU3ViRG9jdW1lbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcnJheSBvZiByb3V0aW5lIHN1Yi1kb2N1bWVudHNcclxuICAgICAqL1xyXG4gICAgcm91dGluZXM6IFR5cGVzLkRvY3VtZW50QXJyYXk8Um91dGluZVN1YkRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFycmF5IG9mIGRvYyBzdWItZG9jdW1lbnRzXHJcbiAgICAgKi9cclxuICAgIGRvY3M6IFR5cGVzLkRvY3VtZW50QXJyYXk8T0RvY1N1YkRvY3VtZW50PlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIGdpdmVuIGlkIGlzIGluc2lkZSB0aGUgZnJpZW5kcyBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gZnJpZW5kSWQgcmVwcmVzZW50cyB0aGUgdXNlciB3aG8ncyBzdXBwb3NlZCB0byBiZSBmcmllbmRcclxuICAgICAqICovXHJcbiAgICBpc0ZyaWVuZChmcmllbmRJZDogVHlwZXMuT2JqZWN0SWQpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgcHJvdmlkZWQgcm9sZSB0byB0aGlzIGluc3RhbmNlLlxyXG4gICAgICogSWYgdGhlIHVzZXIgYWxyZWFkeSBoYXMgdGhlIHJvbGUsIGl0IGlzIG5vdCBhZGRlZCBhIHNlY29uZCB0aW1lLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSByb2xlIHJvbGUgdG8gYmUgc2V0XHJcbiAgICAgKi9cclxuICAgIHNldFJvbGUocm9sZTogVXNlclJvbGVzKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgcHJvdmlkZWQgcm9sZSBmcm9tIHRoaXMgaW5zdGFuY2UuXHJcbiAgICAgKiBJZiB0aGUgdXNlciBkb2Vzbid0IGhhdmUgdGhlIHJvbGUsIG5vdGhpbmcgaGFwcGVucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcm9sZSByb2xlIHRvIGJlIHJlbW92ZWRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlUm9sZShyb2xlOiBVc2VyUm9sZXMpOiBQcm9taXNlPFVzZXJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHVzZXIgaGFzIHRoZSBwcm92aWRlZCByb2xlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHJvbGUgcm9sZSB0byBjaGVja1xyXG4gICAgICovXHJcbiAgICBoYXNSb2xlKHJvbGU6IFVzZXJSb2xlcyk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgYSBuZXcgcGFzc3dvcmQgdXNpbmcgYmNyeXB0IGhhc2hpbmcgYW5kIHNhbHQgZ2VuZXJhdGlvbiBmdW5jdGlvbnNcclxuICAgICAqIEBwYXJhbSBwd2QgbmV3IHBhc3N3b3JkIHRvIHNldFxyXG4gICAgICovXHJcbiAgICBzZXRQYXNzd29yZChwd2Q6IHN0cmluZyk6IFByb21pc2U8VXNlckRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAgKiBDaGVjayB0aGUgdmFsaWRpdHkgb2YgdGhlIHBhc3N3b3JkIHdpdGggdGhlIG9uZSBzdG9yZWQgb24gdGhlIGRhdGFiYXNlXHJcbiAgICAgICogQHBhcmFtIHB3ZCB0aGUgcGFzc3dvcmQgdG8gY2hlY2tcclxuICAgICAgKi9cclxuICAgIHZhbGlkYXRlUGFzc3dvcmQocHdkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgbm90aWZpY2F0aW9uIGlkZW50aWZpZWQgYnkgdHlwZSBhbmQgcmVxdWVzdGVyXHJcbiAgICAgKiBSZXR1cm4gYW4gZXJyb3IgaWYgYW4gaWRlbnRpY2FsIG5vdGlmaWNhdGlvbiBhbHJlYWR5IGV4aXN0c1xyXG4gICAgICogQHBhcmFtIHR5cGUgdHlwZSBvZiB0aGUgaW5jb21pbmcgbm90aWZpY2F0aW9uXHJcbiAgICAgKi9cclxuICAgIGFkZE5vdGlmaWNhdGlvbih0eXBlOiBOb3RUeXBlcyk6IFByb21pc2U8VXNlckRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhIG5vdGlmaWNhdGlvbiBpZGVudGlmaWVkIGJ5IGl0cyB0eXBlXHJcbiAgICAgKiBSZXR1cm5zIGFuIGVycm9yIGlmIHRoZSBub3RpZmljYXRpb24gZG9lc24ndCBleGlzdFxyXG4gICAgICogQHBhcmFtIHR5cGUgdHlwZSBvZiB0aGUgbm90aWZpY2F0aW9uIHRvIHJlbW92ZVxyXG4gICAgICovXHJcbiAgICByZW1vdmVOb3RpZmljYXRpb24odHlwZTogTm90VHlwZXMpOiBQcm9taXNlPFVzZXJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBkb2N1bWVudCBpZGVudGlmaWVkIGJ5IHR5cGUgYW5kIHJlcXVlc3RlclxyXG4gICAgICogUmV0dXJuIGFuIGVycm9yIGlmIGFuIGlkZW50aWNhbCBkb2N1bWVudCBhbHJlYWR5IGV4aXN0c1xyXG4gICAgICogQHBhcmFtIGRvYyByZXByZXNlbnRzIHRoZSBpbmNvbWluZyBkb2N1bWVudFxyXG4gICAgICovXHJcbiAgICBhZGREb2N1bWVudChkb2M6IE9Eb2N1bWVudCk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBkb2N1bWVudCBpZGVudGlmaWVkIGJ5IGl0cyB0eXBlXHJcbiAgICAgKiBSZXR1cm5zIGFuIGVycm9yIGlmIHRoZSBkb2N1bWVudCBkb2Vzbid0IGV4aXN0XHJcbiAgICAgKiBAcGFyYW0gdHlwZSB0eXBlIG9mIHRoZSBkb2N1bWVudCB0byByZW1vdmVcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlRG9jdW1lbnQodHlwZTogRG9jVHlwZXMpOiBQcm9taXNlPFVzZXJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgYSByb3V0aW5lIGZvciB0aGUgdXNlclxyXG4gICAgICogQHBhcmFtIHJvdXRpbmUgcmVwcmVzZW50cyB0aGUgbmV3bHkgcm91dGluZVxyXG4gICAgICovXHJcbiAgICBhZGRSb3V0aW5lKHJvdXRpbmU6IFJvdXRpbmUpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGEgcm91dGluZSBmb3IgdGhlIHVzZXJcclxuICAgICAqIEBwYXJhbSBuYW1lIGlkZW50aWZpZXMgdGhlIHJvdXRpbmUgdXAgdG8gYmUgcmVtb3ZlZFxyXG4gICAgICovXHJcbiAgICByZW1vdmVSb3V0aW5lKG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgVXNlclNjaGVtYSA9IG5ldyBTY2hlbWE8VXNlckRvY3VtZW50PihcclxuICAgIHtcclxuICAgICAgICBuYW1lOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICB9LCBcclxuXHJcbiAgICAgICAgc3VybmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgfSwgXHJcblxyXG4gICAgICAgIGVtYWlsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHVuaXF1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5kZXg6IHRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBuaWNrbmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIHVuaXF1ZTogdHJ1ZVxyXG4gICAgICAgIH0sIFxyXG5cclxuICAgICAgICBmcmllbmRzOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFtTY2hlbWFUeXBlcy5PYmplY3RJZF0sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gVE9ETyB0aGlzIGZpZWxkIG5lZWRzIGEgcm9sZSBwYWlyZWQgd2l0aCBlYWNoIHZlaGljbGUgaWQgdG8gbGV0IHVzIGtub3cgd2hlbiBpdCdzIHBvc3NpYmxlIHRvIGRvYyBjZXJ0YWluIGFjdGlvblxyXG4gICAgICAgIGVuam95ZWRWZWhpY2xlczoge1xyXG4gICAgICAgICAgICB0eXBlOiBbU2NoZW1hVHlwZXMuT2JqZWN0SWRdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNhbHQ6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgXHJcbiAgICAgICAgcHdkX2hhc2g6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgXHJcbiAgICAgICAgbm90aWZpY2F0aW9uczogeyBcclxuICAgICAgICAgICAgdHlwZTogW05vdGlmaWNhdGlvblNjaGVtYV1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByb2xlczoge1xyXG4gICAgICAgICAgICB0eXBlOiBbU2NoZW1hVHlwZXMuU3RyaW5nXSxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGVudW06IFVzZXJSb2xlcyxcclxuICAgICAgICAgICAgZGVmYXVsdDogW1VzZXJSb2xlcy5CYXNlXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXRzOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0YXRzU2NoZW1hLFxyXG4gICAgICAgICAgICAvL2RlZmF1bHQ6ICgpID0+ICh7fSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByb3V0aW5lczoge1xyXG4gICAgICAgICAgICB0eXBlOiBbUm91dGluZVNjaGVtYV0sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZG9jczoge1xyXG4gICAgICAgICAgICB0eXBlczogW0RvY3VtZW50U2NoZW1hXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW11cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXR0aW5nOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNldHRpbmdTY2hlbWEsXHJcbiAgICAgICAgICAgIC8vZGVmYXVsdDogKCkgPT4gKHt9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXR1czoge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIGVudW06IFVzZXJTdGF0dXMsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFVzZXJTdGF0dXMuT2ZmbGluZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuKVxyXG5cclxuLy8gVE9ETyBhZGQgYW4gZXJyb3Igd2hlbmV2ZXIgYSB1bmlxdWUgY29uc3RyYWludCBnZXRzIGJyb2tlblxyXG5cclxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRW1haWwgPSAoZW1haWwpID0+IHtcclxuICAgIHJldHVybiBTdHJpbmcoZW1haWwpXHJcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAubWF0Y2goXHJcbiAgICAgICAgICAgIC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkL1xyXG4gICAgICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkTm90aWZpY2F0aW9uKF9pZDogVHlwZXMuT2JqZWN0SWQsIG5vdDogTm90aWZpY2F0aW9uKSB7XHJcblxyXG4gICAgY29uc3Qgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbk1vZGVsKG5vdClcclxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZUFuZFVwZGF0ZSh7IF9pZCB9LCB7XHJcbiAgICAgICAgJHB1c2g6IHsgbm90aWZpY2F0aW9uczogbm90aWZpY2F0aW9uIH1cclxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVtb3ZlTm90aWZpY2F0aW9uKF9pZDogVHlwZXMuT2JqZWN0SWQsIHR5cGU6IE5vdFR5cGVzKSB7XHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lQW5kVXBkYXRlKHsgX2lkIH0sIHtcclxuICAgICAgICAkcHVsbDogeyBub3RpZmljYXRpb25zOiB7IHR5cGUgfSB9XHJcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlci9ub3RpZmljYXRpb24gd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcbn1cclxuXHJcblxyXG4vLyBwb3Agb25lIG5vdGlmaWNhdGlvbiB3aXRoIHRoZSBzYW1lIHR5cGUgYXMgdGhlIG9uZSByZWNpZXZlZCBhcyBpbnB1dFxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMucmVtb3ZlTm90aWZpY2F0aW9uID0gYXN5bmMgZnVuY3Rpb24gKFxyXG4gICAgdHlwZTogc3RyaW5nXHJcbik6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBmb3IgKGxldCBpZHggaW4gdGhpcy5ub3RpZmljYXRpb25zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm90aWZpY2F0aW9uc1tpZHhdLnR5cGUgPT09IHR5cGUudmFsdWVPZigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9ucy5zcGxpY2UocGFyc2VJbnQoaWR4KSwgMSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ05vdGlmaWNhdGlvbiBub3QgZm91bmQnKSk7XHJcbn07XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMuaXNGcmllbmQgPSBmdW5jdGlvbihmcmllbmRJZDogVHlwZXMuT2JqZWN0SWQpIDogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5mcmllbmRzLmluY2x1ZGVzKGZyaWVuZElkKVxyXG59XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMuYWRkRG9jdW1lbnQgPSBhc3luYyBmdW5jdGlvbiAoZG9jOiBPRG9jdW1lbnQpIDogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLmRvY3VtZW50cy5wdXNoKGRvYylcclxuICAgIGF3YWl0IHRoaXMuc2F2ZSgpLmNhdGNoKChlcnIpID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxufVxyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLnJlbW92ZURvY3VtZW50ID0gYXN5bmMgZnVuY3Rpb24gKHR5cGU6IERvY1R5cGVzKSA6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBmb3IgKGxldCBpZHggaW4gdGhpcy5kb2NzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9jc1tpZHhdLnR5cGUgPT09IHR5cGUudmFsdWVPZigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jcy5zcGxpY2UocGFyc2VJbnQoaWR4KSwgMSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcbn1cclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy5hZGRSb3V0aW5lID0gYXN5bmMgZnVuY3Rpb24gKHJvdXRpbmU6IFJvdXRpbmUpIDogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIHJvdXRpbmUubmFtZSA9IHJvdXRpbmUubmFtZSArIFwiL1wiICsgdGhpcy5faWQudG9TdHJpbmcoKVxyXG4gICAgdGhpcy5yb3V0aW5lcy5wdXNoKHJvdXRpbmUpXHJcbiAgICByZXR1cm4gdGhpcy5zYXZlKClcclxufVxyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLnJlbW92ZVJvdXRpbmUgPSBhc3luYyBmdW5jdGlvbiAobmFtZTogc3RyaW5nKSA6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBuYW1lID0gbmFtZSArIFwiL1wiICsgdGhpcy5faWQudG9TdHJpbmcoKVxyXG4gICAgdGhpcy5yb3V0aW5lcyA9IHRoaXMucm91dGluZXMuZmlsdGVyKChlbGVtOiBSb3V0aW5lU3ViRG9jdW1lbnQpID0+IGVsZW0ubmFtZSAhPT0gbmFtZSlcclxuICAgIHJldHVybiB0aGlzLnNhdmUoKVxyXG59XHJcblxyXG5cclxuLyogTUVUSE9EUyBGT1IgUEFTU1dPUkQgTUFOSVBVTEFUSU9OIEFORCBWQUxJREFUSU9OICovXHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMuc2V0UGFzc3dvcmQgPSBhc3luYyBmdW5jdGlvbiAocHdkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgY29uc3Qgc2FsdDogc3RyaW5nID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmdlblNhbHQoMTApXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT5cclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdFcnJvciB3aXRoIHNhbHQgZ2VuZXJhdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgY29uc3QgcHdkSGFzaCA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5oYXNoKHB3ZCwgc2FsdClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggcGFzc3dvcmQgZW5jcnlwdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgdGhpcy5zYWx0ID0gc2FsdDtcclxuICAgIHRoaXMucHdkX2hhc2ggPSBwd2RIYXNoO1xyXG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBzdyh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBwc3c6IHN0cmluZykge1xyXG4gICAgY29uc3Qgc2FsdDogc3RyaW5nID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmdlblNhbHQoMTApXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT5cclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdFcnJvciB3aXRoIHNhbHQgZ2VuZXJhdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgY29uc3QgcHdkSGFzaCA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5oYXNoKHBzdywgc2FsdClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggcGFzc3dvcmQgZW5jcnlwdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh1c2VySWQsIHtcclxuICAgICAgICBzYWx0OiBzYWx0LFxyXG4gICAgICAgIHB3ZF9oYXNoOiBwd2RIYXNoXHJcbiAgICB9KS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKSlcclxuXHJcbiAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTYWx0TmRIYXNoKHBzdzogc3RyaW5nKTogUHJvbWlzZTxQc3dEYXRhPiB7XHJcbiAgICBjb25zdCBzYWx0OiBzdHJpbmcgPSBhd2FpdCBiY3J5cHRcclxuICAgICAgICAuZ2VuU2FsdCgxMClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggc2FsdCBnZW5lcmF0aW9uJykpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICBjb25zdCBwd2RIYXNoID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmhhc2gocHN3LCBzYWx0KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignRXJyb3Igd2l0aCBwYXNzd29yZCBlbmNyeXB0aW9uJykpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcclxuICAgICAgICBzYWx0LFxyXG4gICAgICAgIHB3ZEhhc2hcclxuICAgIH0pXHJcbn1cclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy52YWxpZGF0ZVBhc3N3b3JkID0gYXN5bmMgZnVuY3Rpb24gKHB3ZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICBjb25zdCBoYXNoZWRQdyA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5oYXNoKHB3ZCwgdGhpcy5zYWx0KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignRXJyb3Igd2l0aCBwYXNzd29yZCBlbmNyeXB0aW9uJykpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5wd2RfaGFzaCA9PT0gaGFzaGVkUHc7XHJcbn07XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMucmVtb3ZlUm9sZSA9IGFzeW5jIGZ1bmN0aW9uIChyb2xlOiBVc2VyUm9sZXMpOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgZm9yIChjb25zdCBpZHggaW4gdGhpcy5yb2xlcykge1xyXG4gICAgICAgIGlmICh0aGlzLnJvbGVzW2lkeF0gPT09IHJvbGUudmFsdWVPZigpKSB0aGlzLnJvbGVzLnNwbGljZShwYXJzZUludChpZHgpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5zYXZlKCk7XHJcbn07XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMuaGFzUm9sZSA9IGZ1bmN0aW9uIChyb2xlOiBVc2VyUm9sZXMpOiBib29sZWFuIHtcclxuICAgIGZvciAobGV0IGlkeCBpbiB0aGlzLnJvbGVzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucm9sZXNbaWR4XSA9PSByb2xlLnZhbHVlT2YoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLnNldFJvbGUgPSBhc3luYyBmdW5jdGlvbiAocm9sZTogVXNlclJvbGVzKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGlmICghdGhpcy5oYXNSb2xlKHJvbGUpKSB7XHJcbiAgICAgICAgdGhpcy5yb2xlcy5wdXNoKHJvbGUudmFsdWVPZigpKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5zYXZlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdSb2xlIGFscmVhZHkgc2V0JykpO1xyXG59O1xyXG5cclxuLy8gQ3JlYXRlIFwiVXNlcnNcIiBjb2xsZWN0aW9uXHJcbmV4cG9ydCBjb25zdCBVc2VyTW9kZWw6IE1vZGVsPFVzZXJEb2N1bWVudD4gPSBtb25nb29zZS5tb2RlbCgnVXNlcicsIFVzZXJTY2hlbWEsICdVc2VycycpO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCeUlkKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgdXNlckRvYyA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHsgX2lkOiB1c2VySWQgfSkuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gIXVzZXJEb2NcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHVzZXJEb2MpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckJ5Tmlja25hbWUobmlja25hbWU6IHN0cmluZyk6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBjb25zdCB1c2VyZGF0YSA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHsgbmlja25hbWUgfSkuY2F0Y2goKGVycikgPT4gXHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuICF1c2VyZGF0YVxyXG4gICAgICAgID8gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUodXNlcmRhdGEpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckJ5RW1haWwoZW1haWw6IHN0cmluZyk6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBjb25zdCB1c2VyZGF0YSA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHsgZW1haWwgfSkuY2F0Y2goKGVycikgPT4gXHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuICF1c2VyZGF0YVxyXG4gICAgICAgID8gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUodXNlcmRhdGEpO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRGcmllbmRzaGlwKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIGZyaWVuZElkOiBUeXBlcy5PYmplY3RJZCkge1xyXG4gICAgbGV0IHJlc3VsdDEsIHJlc3VsdDJcclxuXHJcbiAgICByZXN1bHQxID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXJJZCwge1xyXG4gICAgICAgICRwdXNoOiB7IGZyaWVuZHM6IGZyaWVuZElkfVxyXG4gICAgfSkuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXN1bHQyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKGZyaWVuZElkLCB7XHJcbiAgICAgICAgJHB1c2g6IHsgZnJpZW5kczogdXNlcklkfVxyXG4gICAgfSkuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocmVzdWx0MSAmJiByZXN1bHQyKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGF3YWl0IHJlbW92ZUZyaWVuZHNoaXAodXNlcklkLCBmcmllbmRJZCwgdHJ1ZSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiT25lIG9mIHRoZW0gZG9lc24ndCBleGlzdHMgb24gdGhlIGRhdGFiYXNlLCBvcGVyYXRpb24gbmVnYXRlZFwiKSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZUZyaWVuZHNoaXAodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgZnJpZW5kSWQ6IFR5cGVzLk9iamVjdElkLCBhdXRvQ2F0Y2g6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgbGV0IHJlc3VsdDEsIHJlc3VsdDJcclxuICAgIHJlc3VsdDEgPSBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlcklkLCB7XHJcbiAgICAgICAgJHB1bGw6IHsgZnJpZW5kczogZnJpZW5kSWR9XHJcbiAgICB9KS5jYXRjaCgoZXJyKSA9PlxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJlc3VsdDIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUoZnJpZW5kSWQsIHtcclxuICAgICAgICAkcHVsbDogeyBmcmllbmRzOiB1c2VySWR9XHJcbiAgICB9KS5jYXRjaCgoZXJyKSA9PlxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAoKHJlc3VsdDEgJiYgcmVzdWx0MikgfHwgYXV0b0NhdGNoKVxyXG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk9uZSBvZiB0aGVtIGRvZXNuJ3QgZXhpc3RzIG9uIHRoZSBkYXRhYmFzZVwiKSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVVzZXIoZGF0YTogQW55S2V5czxVc2VyRG9jdW1lbnQ+KTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGNvbnN0IHVzZXI6IFVzZXJEb2N1bWVudCA9IG5ldyBVc2VyTW9kZWwoZGF0YSk7XHJcbiAgICByZXR1cm4gdXNlci5zYXZlKCkuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVVzZXIoZmlsdGVyOiBGaWx0ZXJRdWVyeTxVc2VyRG9jdW1lbnQ+KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdXNlcjogVXNlckRvY3VtZW50ID0gYXdhaXQgZ2V0VXNlckJ5SWQoZmlsdGVyLl9pZClcclxuXHJcbiAgICBmb3IgKGxldCBpZHggaW4gdXNlci5mcmllbmRzKSB7XHJcbiAgICAgICAgYXdhaXQgcmVtb3ZlRnJpZW5kc2hpcCh1c2VyLmZyaWVuZHNbaWR4XSwgZmlsdGVyLl9pZClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvYmo6IHsgZGVsZXRlZENvdW50PzogbnVtYmVyIH0gPSBhd2FpdCBVc2VyTW9kZWwuZGVsZXRlT25lKGZpbHRlcikuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gIW9iai5kZWxldGVkQ291bnRcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVOaWNrTmFtZShfaWQ6IFR5cGVzLk9iamVjdElkLCBuaWNrbmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmVBbmRVcGRhdGUoeyBfaWQgfSwgeyBuaWNrbmFtZSB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllclwiKSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBhc3N3b3JkKF9pZDogVHlwZXMuT2JqZWN0SWQsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnQ7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZChfaWQpO1xyXG4gICAgICAgIGF3YWl0IHVzZXIuc2V0UGFzc3dvcmQocGFzc3dvcmQpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyU3RhdHMoX2lkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8VXNlclN0YXRzPiB7XHJcbiAgICBjb25zdCBzdGF0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyBfaWQgfSwgeyBzdGF0czogMSB9KS5jYXRjaCgoZXJyKSA9PlxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAhc3RhdFxyXG4gICAgICAgID8gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoc3RhdC5zdGF0cyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gdXNlcklkIGlkIG9mIHRoZSB1c2VyIHRvIHVwZGF0ZVxyXG4gKiBAcGFyYW0gdXBkYXRlZFN0YXRzIG9iamVjdCBjb250YWluaW5nIHRoZSB1cGRhdGVkIHN0YXRzIG9mIHRoZSB1c2VyXHJcbiAqL1xyXG4gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVVzZXJTdGF0cyhcclxuICAgIHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsXHJcbiAgICB1cGRhdGVkU3RhdHM6IFVzZXJTdGF0c1xyXG4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlcklkLCB7XHJcbiAgICAgICAgc3RhdHM6IHVwZGF0ZWRTdGF0c1xyXG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVUaGVtZSh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCB0aGVtZTogc3RyaW5nKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh1c2VySWQsIHtcclxuICAgICAgICBcInNldHRpbmcudGhlbWVcIjogdGhlbWVcclxuICAgIH0pLmNhdGNoKChlcnIpID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpO1xyXG5cclxuICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlU2l6ZSh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBzaXplOiBudW1iZXIpIDogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXJJZCwge1xyXG4gICAgICAgIFwic2V0dGluZy5zaXplXCI6IHNpemVcclxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGFuZ3VhZ2UodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgbGFuOiBzdHJpbmcpIDogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXJJZCwge1xyXG4gICAgICAgIFwic2V0dGluZy5sYW5ndWFnZVwiOiBsYW5cclxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlR2FtaWZpY2F0aW9uKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIHN3dDogYm9vbGVhbikgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlcklkLCB7XHJcbiAgICAgICAgXCJzZXR0aW5nLmdhbWlmaWNhdGlvbkhpZGVcIjogIXN3dFxyXG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVFbWFpbChfaWQ6IFR5cGVzLk9iamVjdElkLCBlbWFpbDogc3RyaW5nKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSggX2lkICwgeyBlbWFpbCB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllclwiKSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJvdXRpbmVOYW1lKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIG9sZE5hbWU6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdXNlcjogVXNlckRvY3VtZW50XHJcbiAgICBvbGROYW1lID0gb2xkTmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuICAgIG5ld05hbWUgPSBuZXdOYW1lICsgXCIvXCIgKyB1c2VySWQudG9TdHJpbmcoKVxyXG5cclxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZUFuZFVwZGF0ZSh7XHJcbiAgICAgICAgX2lkOiB1c2VySWQsXHJcbiAgICAgICAgXCJyb3V0aW5lcy5uYW1lXCI6IG9sZE5hbWVcclxuICAgIH0sIHtcclxuICAgICAgICAkc2V0OiB7IFwicm91dGluZXMuJC5uYW1lXCI6IG5ld05hbWUgfVxyXG4gICAgfSkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpKVxyXG5cclxuICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHJvdXRpbmUgZm91bmQgbWF0Y2hpbmcgdGhlIGlkXCIpKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlUm91dGluZVRlbXBlcmF0dXJlKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIHJvdXRpbmVOYW1lOiBzdHJpbmcsIHRlbXA6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgcm91dGluZU5hbWUgPSByb3V0aW5lTmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmVBbmRVcGRhdGUoe1xyXG4gICAgICAgIF9pZDogdXNlcklkLFxyXG4gICAgICAgIFwicm91dGluZXMubmFtZVwiOiByb3V0aW5lTmFtZVxyXG4gICAgfSwge1xyXG4gICAgICAgICRzZXQ6IHsgXCJyb3V0aW5lcy4kLnRlbXBlcmF0dXJlXCI6IHRlbXAgfVxyXG4gICAgfSkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpKVxyXG5cclxuICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHJvdXRpbmUgZm91bmQgbWF0Y2hpbmcgdGhlIGlkXCIpKVxyXG59XHJcblxyXG4vLyB0aGlzIHByb2JhYmx5IG5lZWRzIHRvIGJlIHdyaXR0ZW4gYWdhaW4gXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVSb3V0aW5lTGlnaHRzQ29sb3IodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgcm91dGluZU5hbWU6IHN0cmluZywgY29sb3I6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgcm91dGluZU5hbWUgPSByb3V0aW5lTmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmVBbmRVcGRhdGUoe1xyXG4gICAgICAgIF9pZDogdXNlcklkLFxyXG4gICAgICAgIFwicm91dGluZXMubmFtZVwiOiByb3V0aW5lTmFtZVxyXG4gICAgfSwge1xyXG4gICAgICAgICRzZXQ6IHsgXCJyb3V0aW5lcy4kLmxpZ2h0c0NvbG9yXCI6IGNvbG9yIH1cclxuICAgIH0pLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciByb3V0aW5lIGZvdW5kIG1hdGNoaW5nIHRoZSBpZFwiKSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVSb3V0aW5lTXVzaWMoXHJcbiAgICB1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBcclxuICAgIHJvdXRpbmVOYW1lOiBzdHJpbmcsIFxyXG4gICAgbXVzaWNUb0FkZDogc3RyaW5nW10gPSBbXSwgXHJcbiAgICBtdXNpY1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdXHJcbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgbGV0IHJlc3VsdFxyXG4gICAgbGV0IG11c2ljOiBzdHJpbmdbXVxyXG5cclxuICAgIHJvdXRpbmVOYW1lID0gcm91dGluZU5hbWUgKyBcIi9cIiArIHVzZXJJZC50b1N0cmluZygpXHJcbiAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQodXNlcklkKVxyXG5cclxuICAgIC8vcmVtb3ZlIHRoZSBtdXNpY1xyXG4gICAgZm9yIChsZXQgaWR4IGluIHVzZXIucm91dGluZXMpIHtcclxuICAgICAgICBpZiAodXNlci5yb3V0aW5lc1tpZHhdLm5hbWUgPT09IHJvdXRpbmVOYW1lKXtcclxuICAgICAgICAgICAgbXVzaWMgPSB1c2VyLnJvdXRpbmVzW2lkeF0ubXVzaWMuZmlsdGVyKGVsZW0gPT4gIW11c2ljVG9SZW1vdmUuaW5jbHVkZXMoZWxlbSkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCB0aGUgbmV3IG9uZVxyXG4gICAgbXVzaWMucHVzaCguLi5tdXNpY1RvQWRkKVxyXG5cclxuICAgICByZXN1bHQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZUFuZFVwZGF0ZSh7XHJcbiAgICAgICAgX2lkOiB1c2VySWQsXHJcbiAgICAgICAgXCJyb3V0aW5lcy5uYW1lXCI6IHJvdXRpbmVOYW1lXHJcbiAgICB9LCB7XHJcbiAgICAgICAgJHNldDoge1xyXG4gICAgICAgICAgICBcInJvdXRpbmVzLiQubXVzaWNcIjogbXVzaWMsXHJcbiAgICAgICAgfSxcclxuICAgIH0pLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciByb3V0aW5lIGZvdW5kIG1hdGNoaW5nIHRoZSBpZFwiKSlcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBzdGF0dXMgb2YgdGhlIHByb3ZpZGVkIHVzZXIgdG8gdGhlIHByb3ZpZGVkIHZhbHVlXHJcbiAqIGFuZCBub3RpZmllcyBoaXMgZnJpZW5kcyBvZiB0aGUgY2hhbmdlLlxyXG4gKiBAcGFyYW0gdXNlcklkIGlkIG9mIHRoZSB1c2VyIHdob3NlIHN0YXR1cyBoYXMgdG8gYmUgY2hhbmdlZFxyXG4gKiBAcGFyYW0gbmV3U3RhdHVzIG5ldyBzdGF0dXMgb2YgdGhlIHVzZXJcclxuICogQHJldHVybiB1cGRhdGVkIHVzZXJcclxuICovXHJcbmV4cG9ydCBjb25zdCBzZXRVc2VyU3RhdHVzID0gYXN5bmMgKFxyXG4gICAgdXNlcklkOiBUeXBlcy5PYmplY3RJZCxcclxuICAgIG5ld1N0YXR1czogVXNlclN0YXR1c1xyXG4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGxldCByZXN1bHQgPSBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlcklkLCB7XHJcbiAgICAgICAgc3RhdHVzOiBuZXdTdGF0dXNcclxuICAgIH0pLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllclwiKSlcclxufTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVVc2VyRW5qb3llZFZlaGljbGUodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgdmVoaWNsZUlkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgbGV0IGZsYWc6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgdHJ5IHtcclxuICAgICAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQodXNlcklkKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpZHggaW4gdXNlci5lbmpveWVkVmVoaWNsZXMpIHtcclxuICAgICAgICAgICAgaWYgKHVzZXIuZW5qb3llZFZlaGljbGVzW2lkeF0udG9TdHJpbmcoKSA9PT0gdmVoaWNsZUlkLnRvU3RyaW5nKCkpIGZsYWcgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZmxhZykgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIlZlaGljbGUgYWxyZWFkeSBpbnNpZGUgdGhlIGNvbGxlY3Rpb25cIikpXHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlcklkLCB7XHJcbiAgICAgICAgICAgICRwdXNoOiB7IGVuam95ZWRWZWhpY2xlczogdmVoaWNsZUlkIH1cclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKSlcclxuXHJcbiAgICAgICAgaWYgKCFyZXN1bHQpIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLy8gVE8gRE8gZG92cmVpIGNoaWFtYXJlIGxhIHZlaGljbGVSZW1vdmVFbmpveWVyIG8gbG8gZmEgaWwgY2xpZW50XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVVc2VyRW5qb3llZFZlaGljbGUodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgdmVoaWNsZUlkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgbGV0IGZsYWc6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgdHJ5IHtcclxuICAgICAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQodXNlcklkKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpZHggaW4gdXNlci5lbmpveWVkVmVoaWNsZXMpIHtcclxuICAgICAgICAgICAgaWYgKHVzZXIuZW5qb3llZFZlaGljbGVzW2lkeF0udG9TdHJpbmcoKSA9PT0gdmVoaWNsZUlkLnRvU3RyaW5nKCkpIGZsYWcgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWZsYWcpIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyBlbmpveWVkIHZlaGljbGVzIHJlbGF0ZWQgdG8gdGhpcyB1c2VyXCIpKVxyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXJJZCwge1xyXG4gICAgICAgICAgICAkcHVsbDogeyBlbmpveWVkVmVoaWNsZXM6IHZlaGljbGVJZCB9XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpXHJcblxyXG4gICAgICAgIGlmICghcmVzdWx0KSByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllclwiKSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVSb3V0aW5lKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIG5hbWU6IHN0cmluZyA9IFwiXCIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIG5hbWUgPSBuYW1lICsgXCIvXCIgKyB1c2VySWQudG9TdHJpbmcoKVxyXG5cclxuICAgIGNvbnNvbGUubG9nKG5hbWUpXHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXJJZCwge1xyXG4gICAgICAgICRwdWxsOiB7cm91dGluZXM6IHtuYW1lfX1cclxuICAgIH0pLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpKVxyXG5cclxuICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHJvdXRpbmUgZm91bmQgbWF0Y2hpbmcgdGhlIGlkXCIpKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkUm91dGluZSh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCByb3V0aW5lOiBSb3V0aW5lKSB7XHJcbiAgICBsZXQgcm91dGluZVN1YjogUm91dGluZVN1YkRvY3VtZW50ID0gbmV3IFJvdXRpbmVNb2RlbChyb3V0aW5lKVxyXG4gICAgbGV0IHJlc3VsdCA9IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh1c2VySWQsIHtcclxuICAgICAgICAkcHVzaDoge3JvdXRpbmVzOiByb3V0aW5lU3VifVxyXG4gICAgfSkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpXHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcbn0iXX0=