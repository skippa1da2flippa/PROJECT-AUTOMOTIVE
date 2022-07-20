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
exports.removeUserEnjoyedVehicle = exports.updateUserEnjoyedVehicles = exports.setUserStatus = exports.updateRoutineMusic = exports.updateRoutineLightsColor = exports.updateRoutineTemperature = exports.updateRoutineName = exports.updateEmail = exports.updateGamification = exports.updateLanguage = exports.updateSize = exports.updateTheme = exports.updateUserStats = exports.getUserStats = exports.updatePassword = exports.updateNickName = exports.deleteUser = exports.createUser = exports.getUserByEmail = exports.getUserByNickname = exports.getUserById = exports.UserModel = exports.UserSchema = exports.UserStatus = exports.UserRoles = void 0;
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
    UserStatus["InTheCar"] = "In The car";
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
    enjoyedVehicles: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        //default: []
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
        //default: [UserRoles.Base]
    },
    stats: {
        type: user_stats_1.StatsSchema,
        //default: () => ({})
    },
    routines: {
        type: [routine_1.RoutineSchema],
        //default: () => ({})
    },
    docs: {
        types: [document_1.DocumentSchema],
        //default: () => ({})
    },
    setting: {
        type: setting_1.SettingSchema,
        //default: () => ({})
    }
});
// TO DO metti apposto routine names in routine route togliendo /userid
exports.UserSchema.methods.addNotification = function (reqType) {
    return __awaiter(this, void 0, void 0, function () {
        var toInsert;
        return __generator(this, function (_a) {
            toInsert = { type: reqType };
            this.notifications.push(toInsert);
            return [2 /*return*/, this.save()];
        });
    });
};
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
function createUser(data) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            user = new exports.UserModel(data);
            return [2 /*return*/, user.save()];
        });
    });
}
exports.createUser = createUser;
function deleteUser(filter) {
    return __awaiter(this, void 0, void 0, function () {
        var obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.deleteOne(filter).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError('Internal server error'));
                    })];
                case 1:
                    obj = _a.sent();
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
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.updateOne({ _id: _id }, { nickname: nickname }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError("Internal server error"));
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
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
        var user, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getUserById(userId)];
                case 1:
                    user = _a.sent();
                    user.stats.thropies = updatedStats.thropies;
                    user.stats.sauce = updatedStats.sauce;
                    return [2 /*return*/, user.save()];
                case 2:
                    err_2 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_2)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserStats = updateUserStats;
function updateTheme(userId, theme) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getUserById(userId)];
                case 1:
                    user = _a.sent();
                    user.setting.theme = theme;
                    return [4 /*yield*/, user.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 3:
                    err_3 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_3)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateTheme = updateTheme;
function updateSize(userId, size) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getUserById(userId)];
                case 1:
                    user = _a.sent();
                    user.setting.size = size;
                    return [4 /*yield*/, user.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 3:
                    err_4 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_4)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateSize = updateSize;
function updateLanguage(userId, lan) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getUserById(userId)];
                case 1:
                    user = _a.sent();
                    user.setting.language = lan;
                    return [4 /*yield*/, user.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 3:
                    err_5 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_5)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateLanguage = updateLanguage;
function updateGamification(userId, swt) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getUserById(userId)];
                case 1:
                    user = _a.sent();
                    user.setting.gamificationHide = swt;
                    return [4 /*yield*/, user.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 3:
                    err_6 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_6)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateGamification = updateGamification;
function updateEmail(userId, newEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getUserById(userId)];
                case 1:
                    user = _a.sent();
                    user.email = user.nickname = newEmail;
                    return [4 /*yield*/, user.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 3:
                    err_7 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_7)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateEmail = updateEmail;
function updateRoutineName(userId, oldName, newName) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oldName = oldName + "/" + userId.toString();
                    newName = newName + "/" + userId.toString();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getUserById(userId)];
                case 2:
                    user = _a.sent();
                    user.routines.forEach(function (elem, idx, vect) {
                        if (elem.name === oldName)
                            vect[idx].name = newName;
                    });
                    return [4 /*yield*/, user.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 4:
                    err_8 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_8)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateRoutineName = updateRoutineName;
function updateRoutineTemperature(userId, routineName, temp) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    routineName = routineName + "/" + userId.toString();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getUserById(userId)];
                case 2:
                    user = _a.sent();
                    user.routines.forEach(function (elem, idx, vect) {
                        if (elem.name === routineName)
                            vect[idx].temperature = temp;
                    });
                    return [4 /*yield*/, user.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 4:
                    err_9 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_9)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateRoutineTemperature = updateRoutineTemperature;
// this probably needs to be written again 
function updateRoutineLightsColor(userId, routineName, color) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    routineName = routineName + "/" + userId.toString();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getUserById(userId)];
                case 2:
                    user = _a.sent();
                    user.routines.forEach(function (elem, idx, vect) {
                        if (elem.name === routineName)
                            vect[idx].lightsColor = color;
                    });
                    return [4 /*yield*/, user.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 4:
                    err_10 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_10)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateRoutineLightsColor = updateRoutineLightsColor;
function updateRoutineMusic(userId, routineName, musicToAdd, musicToRemove) {
    if (musicToAdd === void 0) { musicToAdd = []; }
    if (musicToRemove === void 0) { musicToRemove = []; }
    return __awaiter(this, void 0, void 0, function () {
        var user, err_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    routineName = routineName + "/" + userId.toString();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getUserById(userId)];
                case 2:
                    user = _a.sent();
                    if (musicToRemove.length)
                        removeMusic(user, routineName, musicToRemove);
                    if (musicToAdd.length)
                        addMusic(user, routineName, musicToAdd);
                    return [4 /*yield*/, user.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 4:
                    err_11 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_11)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateRoutineMusic = updateRoutineMusic;
function removeMusic(user, routineName, musicToRemove) {
    var idx = -1;
    do {
        idx++;
        if (user.routines[idx].name === routineName) {
            user.routines[idx].music = user.routines[idx].music.filter(function (elem) { return !(musicToRemove.includes(elem)); });
        }
    } while (idx < user.routines.length && user.routines[idx].name !== routineName);
}
function addMusic(user, routineName, musicToAdd) {
    var _a;
    for (var idx in user.routines) {
        if (user.routines[idx].name === routineName)
            (_a = user.routines[idx].music).push.apply(_a, musicToAdd);
    }
}
/**
 * Sets the status of the provided user to the provided value
 * and notifies his friends of the change.
 * @param userId id of the user whose status has to be changed
 * @param newStatus new status of the user
 * @return updated user
 * @private
 */
var setUserStatus = function (userId, newStatus) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getUserById(userId)];
            case 1:
                user = _a.sent();
                user.status = newStatus;
                return [2 /*return*/, user.save()];
        }
    });
}); };
exports.setUserStatus = setUserStatus;
function updateUserEnjoyedVehicles(userId, vehicleId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getUserById(userId)];
                case 1:
                    user = _a.sent();
                    user.enjoyedVehicles.push(vehicleId);
                    return [4 /*yield*/, user.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 3:
                    err_12 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_12)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserEnjoyedVehicles = updateUserEnjoyedVehicles;
function removeUserEnjoyedVehicle(userId, vehicleId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, idx, err_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getUserById(userId)];
                case 1:
                    user = _a.sent();
                    for (idx in user.enjoyedVehicles) {
                        if (user.enjoyedVehicles[idx] === vehicleId)
                            user.enjoyedVehicles.splice(parseInt(idx), 1);
                    }
                    return [4 /*yield*/, user.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 3:
                    err_13 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_13)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.removeUserEnjoyedVehicle = removeUserEnjoyedVehicle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBQ3JDLHFDQUE2RjtBQUM3RixrREFBNEI7QUFDNUIsdURBQW9EO0FBQ3BELHFDQUlrQjtBQUNsQix1Q0FLbUI7QUFDbkIsMkNBSXFCO0FBQ3JCLCtDQUt1QjtBQUN2QixxQ0FJa0I7QUFHbEIsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ2pCLDRCQUFlLENBQUE7SUFDZiwwQkFBYSxDQUFBO0lBQ2IsNEJBQWUsQ0FBQTtBQUNuQixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUFFRCxJQUFZLFVBSVg7QUFKRCxXQUFZLFVBQVU7SUFDbEIsaUNBQW1CLENBQUE7SUFDbkIsK0JBQWlCLENBQUE7SUFDakIscUNBQXVCLENBQUE7QUFDM0IsQ0FBQyxFQUpXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBSXJCO0FBMkhZLFFBQUEsVUFBVSxHQUFHLElBQUksaUJBQU0sQ0FDaEM7SUFDSSxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsc0JBQVcsQ0FBQyxNQUFNO1FBQ3hCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBRUQsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLHNCQUFXLENBQUMsTUFBTTtRQUN4QixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUVELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxzQkFBVyxDQUFDLE1BQU07UUFDeEIsUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRSxJQUFJO0tBQ2Q7SUFFRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsc0JBQVcsQ0FB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QyxPQUFPLEVBQUUsRUFBQTs7O29CQUV4QixzQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQUcsQ0FBQyxFQUFBOzs7OztDQUVqQztBQVZELDhEQVVDO0FBRUQsU0FBc0Isd0JBQXdCLENBQUMsTUFBc0IsRUFBRSxTQUF5Qjs7Ozs7OztvQkFHakYscUJBQU0sV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFBOztvQkFBaEMsSUFBSSxHQUFHLFNBQXlCLENBQUE7b0JBQ2hDLEtBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7d0JBQ2xDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTOzRCQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7cUJBQ3BEO29CQUNELHFCQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksMEJBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEVBQXhELENBQXdELENBQUMsRUFBQTs7b0JBQXhGLFNBQXdGLENBQUE7b0JBQ3hGLHNCQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBQTs7O29CQUV4QixzQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQUcsQ0FBQyxFQUFBOzs7OztDQUVqQztBQWJELDREQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5pbXBvcnQgeyBBbnlLZXlzLCBEb2N1bWVudCwgRmlsdGVyUXVlcnksIE1vZGVsLCBTY2hlbWEsIFNjaGVtYVR5cGVzLCBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQnO1xyXG5pbXBvcnQgeyBTZXJ2ZXJFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvc2VydmVyLWVycm9yXCJcclxuaW1wb3J0IHtcclxuICAgIFJvdXRpbmUsXHJcbiAgICBSb3V0aW5lU3ViRG9jdW1lbnQsXHJcbiAgICBSb3V0aW5lU2NoZW1hXHJcbn0gZnJvbSAnLi9yb3V0aW5lJ1xyXG5pbXBvcnQge1xyXG4gICAgT0RvY3VtZW50LFxyXG4gICAgT0RvY1N1YkRvY3VtZW50LFxyXG4gICAgRG9jdW1lbnRTY2hlbWEsXHJcbiAgICBEb2NUeXBlc1xyXG59IGZyb20gJy4vZG9jdW1lbnQnXHJcbmltcG9ydCB7XHJcbiAgICBVc2VyU3RhdHMsXHJcbiAgICBVc2VyU3RhdHNTdWJEb2N1bWVudCxcclxuICAgIFN0YXRzU2NoZW1hXHJcbn0gZnJvbSAnLi91c2VyLXN0YXRzJ1xyXG5pbXBvcnQge1xyXG4gICAgTm90VHlwZXMsXHJcbiAgICBOb3RpZmljYXRpb24sXHJcbiAgICBOb3RpZmljYXRpb25TY2hlbWEsXHJcbiAgICBOb3RpZmljYXRpb25TdWJEb2N1bWVudFxyXG59IGZyb20gJy4vbm90aWZpY2F0aW9uJ1xyXG5pbXBvcnQge1xyXG4gICAgU2V0dGluZyxcclxuICAgIFNldHRpbmdTdWJEb2N1bWVudCxcclxuICAgIFNldHRpbmdTY2hlbWFcclxufSBmcm9tICcuL3NldHRpbmcnXHJcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gJ3NvY2tldC5pbyc7XHJcblxyXG5leHBvcnQgZW51bSBVc2VyUm9sZXMge1xyXG4gICAgQ2hpbGQgPSAnQ2hpbGQnLFxyXG4gICAgQmFzZSA9ICdCYXNlJyxcclxuICAgIE93bmVyID0gJ093bmVyJ1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBVc2VyU3RhdHVzIHtcclxuICAgIE9mZmxpbmUgPSAnT2ZmbGluZScsXHJcbiAgICBPbmxpbmUgPSAnT25saW5lJyxcclxuICAgIEluVGhlQ2FyID0gJ0luIFRoZSBjYXInXHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVzZXIge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgc3VybmFtZTogc3RyaW5nO1xyXG4gICAgbmlja25hbWU6IHN0cmluZztcclxuICAgIGVtYWlsOiBzdHJpbmc7XHJcbiAgICByb2xlczogc3RyaW5nW107XHJcbiAgICBlbmpveWVkVmVoaWNsZXM6IFR5cGVzLk9iamVjdElkW107XHJcbiAgICBwd2RfaGFzaDogc3RyaW5nO1xyXG4gICAgc2FsdDogc3RyaW5nO1xyXG4gICAgc3RhdHM6IFVzZXJTdGF0cztcclxuICAgIHN0YXR1czogVXNlclN0YXR1cztcclxuICAgIGRvY3M6IE9Eb2N1bWVudFtdO1xyXG4gICAgc2V0dGluZzogU2V0dGluZztcclxuICAgIHJvdXRpbmVzOiBSb3V0aW5lW107XHJcbiAgICBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25bXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVc2VyRG9jdW1lbnQgZXh0ZW5kcyBVc2VyLCBEb2N1bWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIFN0YXRzIHN1Yi1kb2N1bWVudFxyXG4gICAgICovXHJcbiAgICBzdGF0czogVXNlclN0YXRzU3ViRG9jdW1lbnQ7IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXJyYXkgb2Ygbm90aWZpY2F0aW9uIHN1Yi1kb2N1bWVudHNcclxuICAgICAqL1xyXG4gICAgbm90aWZpY2F0aW9uczogVHlwZXMuRG9jdW1lbnRBcnJheTxOb3RpZmljYXRpb25TdWJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXByZXNlbnRzIHVzZXIgb3duIHNldHRpbmdcclxuICAgICAqL1xyXG4gICAgc2V0dGluZzogU2V0dGluZ1N1YkRvY3VtZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXJyYXkgb2Ygcm91dGluZSBzdWItZG9jdW1lbnRzXHJcbiAgICAgKi9cclxuICAgIHJvdXRpbmVzOiBUeXBlcy5Eb2N1bWVudEFycmF5PFJvdXRpbmVTdWJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcnJheSBvZiBkb2Mgc3ViLWRvY3VtZW50c1xyXG4gICAgICovXHJcbiAgICBkb2NzOiBUeXBlcy5Eb2N1bWVudEFycmF5PE9Eb2NTdWJEb2N1bWVudD5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIHByb3ZpZGVkIHJvbGUgdG8gdGhpcyBpbnN0YW5jZS5cclxuICAgICAqIElmIHRoZSB1c2VyIGFscmVhZHkgaGFzIHRoZSByb2xlLCBpdCBpcyBub3QgYWRkZWQgYSBzZWNvbmQgdGltZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcm9sZSByb2xlIHRvIGJlIHNldFxyXG4gICAgICovXHJcbiAgICBzZXRSb2xlKHJvbGU6IFVzZXJSb2xlcyk6IFByb21pc2U8VXNlckRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHByb3ZpZGVkIHJvbGUgZnJvbSB0aGlzIGluc3RhbmNlLlxyXG4gICAgICogSWYgdGhlIHVzZXIgZG9lc24ndCBoYXZlIHRoZSByb2xlLCBub3RoaW5nIGhhcHBlbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHJvbGUgcm9sZSB0byBiZSByZW1vdmVkXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVJvbGUocm9sZTogVXNlclJvbGVzKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB1c2VyIGhhcyB0aGUgcHJvdmlkZWQgcm9sZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSByb2xlIHJvbGUgdG8gY2hlY2tcclxuICAgICAqL1xyXG4gICAgaGFzUm9sZShyb2xlOiBVc2VyUm9sZXMpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGEgbmV3IHBhc3N3b3JkIHVzaW5nIGJjcnlwdCBoYXNoaW5nIGFuZCBzYWx0IGdlbmVyYXRpb24gZnVuY3Rpb25zXHJcbiAgICAgKiBAcGFyYW0gcHdkIG5ldyBwYXNzd29yZCB0byBzZXRcclxuICAgICAqL1xyXG4gICAgc2V0UGFzc3dvcmQocHdkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogQ2hlY2sgdGhlIHZhbGlkaXR5IG9mIHRoZSBwYXNzd29yZCB3aXRoIHRoZSBvbmUgc3RvcmVkIG9uIHRoZSBkYXRhYmFzZVxyXG4gICAgICAqIEBwYXJhbSBwd2QgdGhlIHBhc3N3b3JkIHRvIGNoZWNrXHJcbiAgICAgICovXHJcbiAgICB2YWxpZGF0ZVBhc3N3b3JkKHB3ZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIG5vdGlmaWNhdGlvbiBpZGVudGlmaWVkIGJ5IHR5cGUgYW5kIHJlcXVlc3RlclxyXG4gICAgICogUmV0dXJuIGFuIGVycm9yIGlmIGFuIGlkZW50aWNhbCBub3RpZmljYXRpb24gYWxyZWFkeSBleGlzdHNcclxuICAgICAqIEBwYXJhbSB0eXBlIHR5cGUgb2YgdGhlIGluY29taW5nIG5vdGlmaWNhdGlvblxyXG4gICAgICovXHJcbiAgICBhZGROb3RpZmljYXRpb24odHlwZTogTm90VHlwZXMpOiBQcm9taXNlPFVzZXJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBub3RpZmljYXRpb24gaWRlbnRpZmllZCBieSBpdHMgdHlwZVxyXG4gICAgICogUmV0dXJucyBhbiBlcnJvciBpZiB0aGUgbm90aWZpY2F0aW9uIGRvZXNuJ3QgZXhpc3RcclxuICAgICAqIEBwYXJhbSB0eXBlIHR5cGUgb2YgdGhlIG5vdGlmaWNhdGlvbiB0byByZW1vdmVcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlTm90aWZpY2F0aW9uKHR5cGU6IE5vdFR5cGVzKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgZG9jdW1lbnQgaWRlbnRpZmllZCBieSB0eXBlIGFuZCByZXF1ZXN0ZXJcclxuICAgICAqIFJldHVybiBhbiBlcnJvciBpZiBhbiBpZGVudGljYWwgZG9jdW1lbnQgYWxyZWFkeSBleGlzdHNcclxuICAgICAqIEBwYXJhbSBkb2MgcmVwcmVzZW50cyB0aGUgaW5jb21pbmcgZG9jdW1lbnRcclxuICAgICAqL1xyXG4gICAgYWRkRG9jdW1lbnQoZG9jOiBPRG9jdW1lbnQpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgZG9jdW1lbnQgaWRlbnRpZmllZCBieSBpdHMgdHlwZVxyXG4gICAgICogUmV0dXJucyBhbiBlcnJvciBpZiB0aGUgZG9jdW1lbnQgZG9lc24ndCBleGlzdFxyXG4gICAgICogQHBhcmFtIHR5cGUgdHlwZSBvZiB0aGUgZG9jdW1lbnQgdG8gcmVtb3ZlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZURvY3VtZW50KHR5cGU6IERvY1R5cGVzKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGEgcm91dGluZSBmb3IgdGhlIHVzZXJcclxuICAgICAqIEBwYXJhbSByb3V0aW5lIHJlcHJlc2VudHMgdGhlIG5ld2x5IHJvdXRpbmVcclxuICAgICAqL1xyXG4gICAgYWRkUm91dGluZShyb3V0aW5lOiBSb3V0aW5lKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBhIHJvdXRpbmUgZm9yIHRoZSB1c2VyXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBpZGVudGlmaWVzIHRoZSByb3V0aW5lIHVwIHRvIGJlIHJlbW92ZWRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlUm91dGluZShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IFVzZXJTY2hlbWEgPSBuZXcgU2NoZW1hPFVzZXJEb2N1bWVudD4oXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgfSwgXHJcblxyXG4gICAgICAgIHN1cm5hbWU6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgIH0sIFxyXG5cclxuICAgICAgICBlbWFpbDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICB1bmlxdWU6IHRydWUsXHJcbiAgICAgICAgICAgIGluZGV4OiB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbmlja25hbWU6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuU3RyaW5nLFxyXG4gICAgICAgICAgICB1bmlxdWU6IHRydWVcclxuICAgICAgICB9LCBcclxuXHJcbiAgICAgICAgZW5qb3llZFZlaGljbGVzOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFtTY2hlbWFUeXBlcy5PYmplY3RJZF0sXHJcbiAgICAgICAgICAgIC8vZGVmYXVsdDogW11cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzYWx0OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgIFxyXG4gICAgICAgIHB3ZF9oYXNoOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgIFxyXG4gICAgICAgIG5vdGlmaWNhdGlvbnM6IHsgXHJcbiAgICAgICAgICAgIHR5cGU6IFtOb3RpZmljYXRpb25TY2hlbWFdXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcm9sZXM6IHtcclxuICAgICAgICAgICAgdHlwZTogW1NjaGVtYVR5cGVzLlN0cmluZ10sXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBlbnVtOiBVc2VyUm9sZXMsXHJcbiAgICAgICAgICAgIC8vZGVmYXVsdDogW1VzZXJSb2xlcy5CYXNlXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXRzOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0YXRzU2NoZW1hLFxyXG4gICAgICAgICAgICAvL2RlZmF1bHQ6ICgpID0+ICh7fSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByb3V0aW5lczoge1xyXG4gICAgICAgICAgICB0eXBlOiBbUm91dGluZVNjaGVtYV0sXHJcbiAgICAgICAgICAgIC8vZGVmYXVsdDogKCkgPT4gKHt9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRvY3M6IHtcclxuICAgICAgICAgICAgdHlwZXM6IFtEb2N1bWVudFNjaGVtYV0sXHJcbiAgICAgICAgICAgIC8vZGVmYXVsdDogKCkgPT4gKHt9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldHRpbmc6IHtcclxuICAgICAgICAgICAgdHlwZTogU2V0dGluZ1NjaGVtYSxcclxuICAgICAgICAgICAgLy9kZWZhdWx0OiAoKSA9PiAoe30pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pXHJcblxyXG4vLyBUTyBETyBtZXR0aSBhcHBvc3RvIHJvdXRpbmUgbmFtZXMgaW4gcm91dGluZSByb3V0ZSB0b2dsaWVuZG8gL3VzZXJpZFxyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLmFkZE5vdGlmaWNhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChcclxuICAgIHJlcVR5cGU6IE5vdFR5cGVzLFxyXG4pOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgdG9JbnNlcnQ6IE5vdGlmaWNhdGlvbiA9IHsgdHlwZTogcmVxVHlwZSB9O1xyXG4gICAgdGhpcy5ub3RpZmljYXRpb25zLnB1c2godG9JbnNlcnQpO1xyXG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xyXG59O1xyXG5cclxuXHJcbi8vIHBvcCBvbmUgbm90aWZpY2F0aW9uIHdpdGggdGhlIHNhbWUgdHlwZSBhcyB0aGUgb25lIHJlY2lldmVkIGFzIGlucHV0XHJcblVzZXJTY2hlbWEubWV0aG9kcy5yZW1vdmVOb3RpZmljYXRpb24gPSBhc3luYyBmdW5jdGlvbiAoXHJcbiAgICB0eXBlOiBzdHJpbmdcclxuKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGZvciAobGV0IGlkeCBpbiB0aGlzLm5vdGlmaWNhdGlvbnMpIHtcclxuICAgICAgICBpZiAodGhpcy5ub3RpZmljYXRpb25zW2lkeF0udHlwZSA9PT0gdHlwZS52YWx1ZU9mKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLnNwbGljZShwYXJzZUludChpZHgpLCAxKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zYXZlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm90aWZpY2F0aW9uIG5vdCBmb3VuZCcpKTtcclxufTtcclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy5hZGREb2N1bWVudCA9IGFzeW5jIGZ1bmN0aW9uIChkb2M6IE9Eb2N1bWVudCkgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRoaXMuZG9jdW1lbnRzLnB1c2goZG9jKVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKCkuY2F0Y2goKGVycikgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKSlcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG59XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMucmVtb3ZlRG9jdW1lbnQgPSBhc3luYyBmdW5jdGlvbiAodHlwZTogRG9jVHlwZXMpIDogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGZvciAobGV0IGlkeCBpbiB0aGlzLmRvY3MpIHtcclxuICAgICAgICBpZiAodGhpcy5kb2NzW2lkeF0udHlwZSA9PT0gdHlwZS52YWx1ZU9mKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2NzLnNwbGljZShwYXJzZUludChpZHgpLCAxKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zYXZlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllclwiKSlcclxufVxyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLmFkZFJvdXRpbmUgPSBhc3luYyBmdW5jdGlvbiAocm91dGluZTogUm91dGluZSkgOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgcm91dGluZS5uYW1lID0gcm91dGluZS5uYW1lICsgXCIvXCIgKyB0aGlzLl9pZC50b1N0cmluZygpXHJcbiAgICB0aGlzLnJvdXRpbmVzLnB1c2gocm91dGluZSlcclxuICAgIHJldHVybiB0aGlzLnNhdmUoKVxyXG59XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMucmVtb3ZlUm91dGluZSA9IGFzeW5jIGZ1bmN0aW9uIChuYW1lOiBzdHJpbmcpIDogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIG5hbWUgPSBuYW1lICsgXCIvXCIgKyB0aGlzLl9pZC50b1N0cmluZygpXHJcbiAgICB0aGlzLnJvdXRpbmVzID0gdGhpcy5yb3V0aW5lcy5maWx0ZXIoKGVsZW06IFJvdXRpbmVTdWJEb2N1bWVudCkgPT4gZWxlbS5uYW1lICE9PSBuYW1lKVxyXG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgpXHJcbn1cclxuXHJcblxyXG4vKiBNRVRIT0RTIEZPUiBQQVNTV09SRCBNQU5JUFVMQVRJT04gQU5EIFZBTElEQVRJT04gKi9cclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy5zZXRQYXNzd29yZCA9IGFzeW5jIGZ1bmN0aW9uIChwd2Q6IHN0cmluZyk6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBjb25zdCBzYWx0OiBzdHJpbmcgPSBhd2FpdCBiY3J5cHRcclxuICAgICAgICAuZ2VuU2FsdCgxMClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggc2FsdCBnZW5lcmF0aW9uJykpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICBjb25zdCBwd2RIYXNoID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmhhc2gocHdkLCBzYWx0KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignRXJyb3Igd2l0aCBwYXNzd29yZCBlbmNyeXB0aW9uJykpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB0aGlzLnNhbHQgPSBzYWx0O1xyXG4gICAgdGhpcy5wd2RfaGFzaCA9IHB3ZEhhc2g7XHJcbiAgICByZXR1cm4gdGhpcy5zYXZlKCk7XHJcbn07XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMudmFsaWRhdGVQYXNzd29yZCA9IGFzeW5jIGZ1bmN0aW9uIChwd2Q6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgY29uc3QgaGFzaGVkUHcgPSBhd2FpdCBiY3J5cHRcclxuICAgICAgICAuaGFzaChwd2QsIHRoaXMuc2FsdClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggcGFzc3dvcmQgZW5jcnlwdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucHdkX2hhc2ggPT09IGhhc2hlZFB3O1xyXG59O1xyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLnJlbW92ZVJvbGUgPSBhc3luYyBmdW5jdGlvbiAocm9sZTogVXNlclJvbGVzKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGZvciAoY29uc3QgaWR4IGluIHRoaXMucm9sZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5yb2xlc1tpZHhdID09PSByb2xlLnZhbHVlT2YoKSkgdGhpcy5yb2xlcy5zcGxpY2UocGFyc2VJbnQoaWR4KSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xyXG59O1xyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLmhhc1JvbGUgPSBmdW5jdGlvbiAocm9sZTogVXNlclJvbGVzKTogYm9vbGVhbiB7XHJcbiAgICBmb3IgKGxldCBpZHggaW4gdGhpcy5yb2xlcykge1xyXG4gICAgICAgIGlmICh0aGlzLnJvbGVzW2lkeF0gPT0gcm9sZS52YWx1ZU9mKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy5zZXRSb2xlID0gYXN5bmMgZnVuY3Rpb24gKHJvbGU6IFVzZXJSb2xlcyk6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBpZiAoIXRoaXMuaGFzUm9sZShyb2xlKSkge1xyXG4gICAgICAgIHRoaXMucm9sZXMucHVzaChyb2xlLnZhbHVlT2YoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignUm9sZSBhbHJlYWR5IHNldCcpKTtcclxufTtcclxuXHJcbi8vIENyZWF0ZSBcIlVzZXJzXCIgY29sbGVjdGlvblxyXG5leHBvcnQgY29uc3QgVXNlck1vZGVsOiBNb2RlbDxVc2VyRG9jdW1lbnQ+ID0gbW9uZ29vc2UubW9kZWwoJ1VzZXInLCBVc2VyU2NoZW1hLCAnVXNlcnMnKTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyQnlJZCh1c2VySWQ6IFR5cGVzLk9iamVjdElkKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGNvbnN0IHVzZXJEb2MgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7IF9pZDogdXNlcklkIH0pLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuICF1c2VyRG9jXHJcbiAgICAgICAgPyBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ05vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXInKSlcclxuICAgICAgICA6IFByb21pc2UucmVzb2x2ZSh1c2VyRG9jKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCeU5pY2tuYW1lKG5pY2tuYW1lOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgdXNlcmRhdGEgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7IG5pY2tuYW1lIH0pLmNhdGNoKChlcnIpID0+IFxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAhdXNlcmRhdGFcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHVzZXJkYXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgdXNlcmRhdGEgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7IGVtYWlsIH0pLmNhdGNoKChlcnIpID0+IFxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAhdXNlcmRhdGFcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHVzZXJkYXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVVzZXIoZGF0YTogQW55S2V5czxVc2VyRG9jdW1lbnQ+KTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGNvbnN0IHVzZXI6IFVzZXJEb2N1bWVudCA9IG5ldyBVc2VyTW9kZWwoZGF0YSk7XHJcbiAgICByZXR1cm4gdXNlci5zYXZlKClcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVVzZXIoZmlsdGVyOiBGaWx0ZXJRdWVyeTxVc2VyRG9jdW1lbnQ+KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBvYmo6IHsgZGVsZXRlZENvdW50PzogbnVtYmVyIH0gPSBhd2FpdCBVc2VyTW9kZWwuZGVsZXRlT25lKGZpbHRlcikuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gIW9iai5kZWxldGVkQ291bnRcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVOaWNrTmFtZShfaWQ6IFR5cGVzLk9iamVjdElkLCBuaWNrbmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCBVc2VyTW9kZWwudXBkYXRlT25lKHsgX2lkIH0sIHsgbmlja25hbWUgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlUGFzc3dvcmQoX2lkOiBUeXBlcy5PYmplY3RJZCwgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudDtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKF9pZCk7XHJcbiAgICAgICAgYXdhaXQgdXNlci5zZXRQYXNzd29yZChwYXNzd29yZCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJTdGF0cyhfaWQ6IFR5cGVzLk9iamVjdElkKTogUHJvbWlzZTxVc2VyU3RhdHM+IHtcclxuICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7IF9pZCB9LCB7IHN0YXRzOiAxIH0pLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuICFzdGF0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ05vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXInKSlcclxuICAgICAgICA6IFByb21pc2UucmVzb2x2ZShzdGF0LnN0YXRzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB1c2VySWQgaWQgb2YgdGhlIHVzZXIgdG8gdXBkYXRlXHJcbiAqIEBwYXJhbSB1cGRhdGVkU3RhdHMgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHVwZGF0ZWQgc3RhdHMgb2YgdGhlIHVzZXJcclxuICovXHJcbiBleHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlclN0YXRzKFxyXG4gICAgdXNlcklkOiBUeXBlcy5PYmplY3RJZCxcclxuICAgIHVwZGF0ZWRTdGF0czogVXNlclN0YXRzXHJcbik6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHVzZXI6IFVzZXJEb2N1bWVudCA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZCk7XHJcbiAgICAgICAgdXNlci5zdGF0cy50aHJvcGllcyA9IHVwZGF0ZWRTdGF0cy50aHJvcGllcztcclxuICAgICAgICB1c2VyLnN0YXRzLnNhdWNlID0gdXBkYXRlZFN0YXRzLnNhdWNlO1xyXG4gICAgICAgIHJldHVybiB1c2VyLnNhdmUoKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVGhlbWUodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgdGhlbWU6IHN0cmluZykgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnRcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuICAgICAgICB1c2VyLnNldHRpbmcudGhlbWUgPSB0aGVtZVxyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNpemUodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgc2l6ZTogbnVtYmVyKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgdHJ5IHtcclxuICAgICAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQodXNlcklkKVxyXG4gICAgICAgIHVzZXIuc2V0dGluZy5zaXplID0gc2l6ZVxyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxhbmd1YWdlKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIGxhbjogc3RyaW5nKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgdHJ5IHtcclxuICAgICAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQodXNlcklkKVxyXG4gICAgICAgIHVzZXIuc2V0dGluZy5sYW5ndWFnZSA9IGxhblxyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUdhbWlmaWNhdGlvbih1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBzd3Q6IGJvb2xlYW4pIDogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdXNlcjogVXNlckRvY3VtZW50XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpXHJcbiAgICAgICAgdXNlci5zZXR0aW5nLmdhbWlmaWNhdGlvbkhpZGUgPSBzd3RcclxuICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVFbWFpbCh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBuZXdFbWFpbDogc3RyaW5nKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgdHJ5IHtcclxuICAgICAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQodXNlcklkKVxyXG4gICAgICAgIHVzZXIuZW1haWwgPSB1c2VyLm5pY2tuYW1lID0gbmV3RW1haWxcclxuICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVSb3V0aW5lTmFtZSh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgb2xkTmFtZSA9IG9sZE5hbWUgKyBcIi9cIiArIHVzZXJJZC50b1N0cmluZygpXHJcbiAgICBuZXdOYW1lID0gbmV3TmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuICAgICAgICB1c2VyLnJvdXRpbmVzLmZvckVhY2goKGVsZW0sIGlkeCwgdmVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWxlbS5uYW1lID09PSBvbGROYW1lKSB2ZWN0W2lkeF0ubmFtZSA9IG5ld05hbWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJvdXRpbmVUZW1wZXJhdHVyZSh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCByb3V0aW5lTmFtZTogc3RyaW5nLCB0ZW1wOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnRcclxuICAgIHJvdXRpbmVOYW1lID0gcm91dGluZU5hbWUgKyBcIi9cIiArIHVzZXJJZC50b1N0cmluZygpXHJcbiAgICB0cnkge1xyXG4gICAgICAgIHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpXHJcbiAgICAgICAgdXNlci5yb3V0aW5lcy5mb3JFYWNoKChlbGVtLCBpZHgsIHZlY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVsZW0ubmFtZSA9PT0gcm91dGluZU5hbWUpIHZlY3RbaWR4XS50ZW1wZXJhdHVyZSA9IHRlbXBcclxuICAgICAgICB9KVxyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxufVxyXG5cclxuLy8gdGhpcyBwcm9iYWJseSBuZWVkcyB0byBiZSB3cml0dGVuIGFnYWluIFxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlUm91dGluZUxpZ2h0c0NvbG9yKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIHJvdXRpbmVOYW1lOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnRcclxuICAgIHJvdXRpbmVOYW1lID0gcm91dGluZU5hbWUgKyBcIi9cIiArIHVzZXJJZC50b1N0cmluZygpXHJcbiAgICB0cnkge1xyXG4gICAgICAgIHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpXHJcbiAgICAgICAgdXNlci5yb3V0aW5lcy5mb3JFYWNoKChlbGVtLCBpZHgsIHZlY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVsZW0ubmFtZSA9PT0gcm91dGluZU5hbWUpIHZlY3RbaWR4XS5saWdodHNDb2xvciA9IGNvbG9yXHJcbiAgICAgICAgfSlcclxuICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlUm91dGluZU11c2ljKFxyXG4gICAgdXNlcklkOiBUeXBlcy5PYmplY3RJZCwgXHJcbiAgICByb3V0aW5lTmFtZTogc3RyaW5nLCBcclxuICAgIG11c2ljVG9BZGQ6IHN0cmluZ1tdID0gW10sIFxyXG4gICAgbXVzaWNUb1JlbW92ZTogc3RyaW5nW10gPSBbXVxyXG4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnRcclxuICAgIHJvdXRpbmVOYW1lID0gcm91dGluZU5hbWUgKyBcIi9cIiArIHVzZXJJZC50b1N0cmluZygpXHJcbiAgICB0cnkge1xyXG4gICAgICAgIHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpXHJcbiAgICAgICAgaWYgKG11c2ljVG9SZW1vdmUubGVuZ3RoKSByZW1vdmVNdXNpYyh1c2VyLCByb3V0aW5lTmFtZSwgbXVzaWNUb1JlbW92ZSlcclxuICAgICAgICBpZiAobXVzaWNUb0FkZC5sZW5ndGgpIGFkZE11c2ljKHVzZXIsIHJvdXRpbmVOYW1lLCBtdXNpY1RvQWRkKVxyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlTXVzaWModXNlcjogVXNlckRvY3VtZW50LCByb3V0aW5lTmFtZTogc3RyaW5nLCBtdXNpY1RvUmVtb3ZlOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgdmFyIGlkeDogbnVtYmVyID0gLTFcclxuICAgIGRvIHtcclxuICAgICAgICBpZHggKytcclxuICAgICAgICBpZiAodXNlci5yb3V0aW5lc1tpZHhdLm5hbWUgPT09IHJvdXRpbmVOYW1lKSB7XHJcbiAgICAgICAgICAgIHVzZXIucm91dGluZXNbaWR4XS5tdXNpYyA9IHVzZXIucm91dGluZXNbaWR4XS5tdXNpYy5maWx0ZXIoKGVsZW06IHN0cmluZykgPT4gIShtdXNpY1RvUmVtb3ZlLmluY2x1ZGVzKGVsZW0pKSlcclxuICAgICAgICB9XHJcbiAgICB9IHdoaWxlKGlkeCA8IHVzZXIucm91dGluZXMubGVuZ3RoICYmIHVzZXIucm91dGluZXNbaWR4XS5uYW1lICE9PSByb3V0aW5lTmFtZSlcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTXVzaWModXNlcjogVXNlckRvY3VtZW50LCByb3V0aW5lTmFtZTogc3RyaW5nLCBtdXNpY1RvQWRkOiBzdHJpbmdbXSkge1xyXG4gICAgZm9yICh2YXIgaWR4IGluIHVzZXIucm91dGluZXMpIHtcclxuICAgICAgICBpZiAodXNlci5yb3V0aW5lc1tpZHhdLm5hbWUgPT09IHJvdXRpbmVOYW1lKSB1c2VyLnJvdXRpbmVzW2lkeF0ubXVzaWMucHVzaCguLi5tdXNpY1RvQWRkKVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgc3RhdHVzIG9mIHRoZSBwcm92aWRlZCB1c2VyIHRvIHRoZSBwcm92aWRlZCB2YWx1ZVxyXG4gKiBhbmQgbm90aWZpZXMgaGlzIGZyaWVuZHMgb2YgdGhlIGNoYW5nZS5cclxuICogQHBhcmFtIHVzZXJJZCBpZCBvZiB0aGUgdXNlciB3aG9zZSBzdGF0dXMgaGFzIHRvIGJlIGNoYW5nZWRcclxuICogQHBhcmFtIG5ld1N0YXR1cyBuZXcgc3RhdHVzIG9mIHRoZSB1c2VyXHJcbiAqIEByZXR1cm4gdXBkYXRlZCB1c2VyXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2V0VXNlclN0YXR1cyA9IGFzeW5jIChcclxuICAgIHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsXHJcbiAgICBuZXdTdGF0dXM6IFVzZXJTdGF0dXNcclxuKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+ID0+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnQgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpO1xyXG4gICAgdXNlci5zdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiAgICByZXR1cm4gIHVzZXIuc2F2ZSgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVVzZXJFbmpveWVkVmVoaWNsZXModXNlcklkOiBUeXBlcy5PYmplY3RJZCwgdmVoaWNsZUlkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgdHJ5IHtcclxuICAgICAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQodXNlcklkKVxyXG4gICAgICAgIHVzZXIuZW5qb3llZFZlaGljbGVzLnB1c2godmVoaWNsZUlkKVxyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVVzZXJFbmpveWVkVmVoaWNsZSh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCB2ZWhpY2xlSWQ6IFR5cGVzLk9iamVjdElkKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdXNlcjogVXNlckRvY3VtZW50XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpXHJcbiAgICAgICAgZm9yICh2YXIgaWR4IGluIHVzZXIuZW5qb3llZFZlaGljbGVzKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyLmVuam95ZWRWZWhpY2xlc1tpZHhdID09PSB2ZWhpY2xlSWQpIFxyXG4gICAgICAgICAgICAgICAgdXNlci5lbmpveWVkVmVoaWNsZXMuc3BsaWNlKHBhcnNlSW50KGlkeCksIDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxufVxyXG4iXX0=