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
exports.removeUserEnjoyedVehicle = exports.updateUserEnjoyedVehicle = exports.setUserStatus = exports.updateRoutineMusic = exports.updateRoutineLightsColor = exports.updateRoutineTemperature = exports.updateRoutineName = exports.updateEmail = exports.updateGamification = exports.updateLanguage = exports.updateSize = exports.updateTheme = exports.updateUserStats = exports.getUserStats = exports.updatePassword = exports.updateNickName = exports.deleteUser = exports.createUser = exports.getUserByEmail = exports.getUserByNickname = exports.getUserById = exports.UserModel = exports.UserSchema = exports.UserStatus = exports.UserRoles = void 0;
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
function updateEmail(_id, email) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserModel.updateOne({ _id: _id }, { email: email }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError("Internal server error"));
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
            }
        });
    });
}
exports.updateEmail = updateEmail;
function updateRoutineName(userId, oldName, newName) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_7;
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
                    err_7 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_7)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateRoutineName = updateRoutineName;
function updateRoutineTemperature(userId, routineName, temp) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_8;
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
                    err_8 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_8)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateRoutineTemperature = updateRoutineTemperature;
// this probably needs to be written again 
function updateRoutineLightsColor(userId, routineName, color) {
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
                            vect[idx].lightsColor = color;
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
exports.updateRoutineLightsColor = updateRoutineLightsColor;
function updateRoutineMusic(userId, routineName, musicToAdd, musicToRemove) {
    if (musicToAdd === void 0) { musicToAdd = []; }
    if (musicToRemove === void 0) { musicToRemove = []; }
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
                    if (musicToRemove.length)
                        removeMusic(user, routineName, musicToRemove);
                    if (musicToAdd.length)
                        addMusic(user, routineName, musicToAdd);
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
function updateUserEnjoyedVehicle(userId, vehicleId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("DENTRO la updateUserEnjoyedVehicle");
                    return [4 /*yield*/, getUserById(userId)];
                case 1:
                    user = _a.sent();
                    console.log("EnjoyedVehicles.len PRIMA: " + user.enjoyedVehicles.length);
                    user.enjoyedVehicles.push(vehicleId);
                    console.log("EnjoyedVehicles.len DOPO: " + user.enjoyedVehicles.length);
                    //TO DO rimetti apposto
                    return [4 /*yield*/, user.save().catch(function (err) { return Promise.reject(err); })]; //new ServerError('Internal server error')))
                case 2:
                    //TO DO rimetti apposto
                    _a.sent(); //new ServerError('Internal server error')))
                    return [2 /*return*/, Promise.resolve()];
                case 3:
                    err_11 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_11)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserEnjoyedVehicle = updateUserEnjoyedVehicle;
function removeUserEnjoyedVehicle(userId, vehicleId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, idx, err_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("DENTRO la removeUserEnjoyedVehicle");
                    return [4 /*yield*/, getUserById(userId)];
                case 1:
                    user = _a.sent();
                    if (!user.enjoyedVehicles.includes(vehicleId))
                        throw new server_error_1.ServerError("No enjoyed vehicles related to this user");
                    console.log("EnjoyedVehicles.len PRIMA: " + user.enjoyedVehicles.length);
                    for (idx in user.enjoyedVehicles) {
                        if (user.enjoyedVehicles[idx] === vehicleId)
                            user.enjoyedVehicles.splice(parseInt(idx), 1);
                    }
                    console.log("EnjoyedVehicles.len DOPO: " + user.enjoyedVehicles.length);
                    //TO DO rimetti apposto
                    return [4 /*yield*/, user.save().catch(function (err) { return Promise.reject(err); })]; //new ServerError('Internal server error')))
                case 2:
                    //TO DO rimetti apposto
                    _a.sent(); //new ServerError('Internal server error')))
                    return [2 /*return*/, Promise.resolve()];
                case 3:
                    err_12 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_12)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.removeUserEnjoyedVehicle = removeUserEnjoyedVehicle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBQ3JDLHFDQUE2RjtBQUM3RixrREFBNEI7QUFDNUIsdURBQW9EO0FBQ3BELHFDQUlrQjtBQUNsQix1Q0FLbUI7QUFDbkIsMkNBSXFCO0FBQ3JCLCtDQUt1QjtBQUN2QixxQ0FJa0I7QUFHbEIsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ2pCLDRCQUFlLENBQUE7SUFDZiwwQkFBYSxDQUFBO0lBQ2IsNEJBQWUsQ0FBQTtBQUNuQixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUFFRCxJQUFZLFVBSVg7QUFKRCxXQUFZLFVBQVU7SUFDbEIsaUNBQW1CLENBQUE7SUFDbkIsK0JBQWlCLENBQUE7SUFDakIscUNBQXVCLENBQUE7QUFDM0IsQ0FBQyxFQUpXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBSXJCO0FBMkhZLFFBQUEsVUFBVSxHQUFHLElBQUksaUJBQU0sQ0FDaEM7SUFDSSxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsc0JBQVcsQ0FBQyxNQUFNO1FBQ3hCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBRUQsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLHNCQUFXLENBQUMsTUFBTTtRQUN4QixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUVELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxzQkFBVyxDQUFDLE1BQU07UUFDeEIsUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRSxJQUFJO0tBQ2Q7SUFFRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsc0JBQVcsQ0FB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TSxDQUFDLEdBQUcsQ0FBQyxFQUFuQixDQUFtQixDQUFDLEVBQUEsQ0FBQSw0Q0FBNEM7O29CQUQvRix1QkFBdUI7b0JBQ3ZCLFNBQW1ELENBQUEsQ0FBQSw0Q0FBNEM7b0JBQy9GLHNCQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBQTs7O29CQUV4QixzQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQUcsQ0FBQyxFQUFBOzs7OztDQUVqQztBQWxCRCw0REFrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCB7IEFueUtleXMsIERvY3VtZW50LCBGaWx0ZXJRdWVyeSwgTW9kZWwsIFNjaGVtYSwgU2NoZW1hVHlwZXMsIFR5cGVzIH0gZnJvbSAnbW9uZ29vc2UnO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdCc7XHJcbmltcG9ydCB7IFNlcnZlckVycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9zZXJ2ZXItZXJyb3JcIlxyXG5pbXBvcnQge1xyXG4gICAgUm91dGluZSxcclxuICAgIFJvdXRpbmVTdWJEb2N1bWVudCxcclxuICAgIFJvdXRpbmVTY2hlbWFcclxufSBmcm9tICcuL3JvdXRpbmUnXHJcbmltcG9ydCB7XHJcbiAgICBPRG9jdW1lbnQsXHJcbiAgICBPRG9jU3ViRG9jdW1lbnQsXHJcbiAgICBEb2N1bWVudFNjaGVtYSxcclxuICAgIERvY1R5cGVzXHJcbn0gZnJvbSAnLi9kb2N1bWVudCdcclxuaW1wb3J0IHtcclxuICAgIFVzZXJTdGF0cyxcclxuICAgIFVzZXJTdGF0c1N1YkRvY3VtZW50LFxyXG4gICAgU3RhdHNTY2hlbWFcclxufSBmcm9tICcuL3VzZXItc3RhdHMnXHJcbmltcG9ydCB7XHJcbiAgICBOb3RUeXBlcyxcclxuICAgIE5vdGlmaWNhdGlvbixcclxuICAgIE5vdGlmaWNhdGlvblNjaGVtYSxcclxuICAgIE5vdGlmaWNhdGlvblN1YkRvY3VtZW50XHJcbn0gZnJvbSAnLi9ub3RpZmljYXRpb24nXHJcbmltcG9ydCB7XHJcbiAgICBTZXR0aW5nLFxyXG4gICAgU2V0dGluZ1N1YkRvY3VtZW50LFxyXG4gICAgU2V0dGluZ1NjaGVtYVxyXG59IGZyb20gJy4vc2V0dGluZydcclxuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSAnc29ja2V0LmlvJztcclxuXHJcbmV4cG9ydCBlbnVtIFVzZXJSb2xlcyB7XHJcbiAgICBDaGlsZCA9ICdDaGlsZCcsXHJcbiAgICBCYXNlID0gJ0Jhc2UnLFxyXG4gICAgT3duZXIgPSAnT3duZXInXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFVzZXJTdGF0dXMge1xyXG4gICAgT2ZmbGluZSA9ICdPZmZsaW5lJyxcclxuICAgIE9ubGluZSA9ICdPbmxpbmUnLFxyXG4gICAgSW5UaGVDYXIgPSAnSW4gVGhlIGNhcidcclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBzdXJuYW1lOiBzdHJpbmc7XHJcbiAgICBuaWNrbmFtZTogc3RyaW5nO1xyXG4gICAgZW1haWw6IHN0cmluZztcclxuICAgIHJvbGVzOiBzdHJpbmdbXTtcclxuICAgIGVuam95ZWRWZWhpY2xlczogVHlwZXMuT2JqZWN0SWRbXTtcclxuICAgIHB3ZF9oYXNoOiBzdHJpbmc7XHJcbiAgICBzYWx0OiBzdHJpbmc7XHJcbiAgICBzdGF0czogVXNlclN0YXRzO1xyXG4gICAgc3RhdHVzOiBVc2VyU3RhdHVzO1xyXG4gICAgZG9jczogT0RvY3VtZW50W107XHJcbiAgICBzZXR0aW5nOiBTZXR0aW5nO1xyXG4gICAgcm91dGluZXM6IFJvdXRpbmVbXTtcclxuICAgIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbltdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJEb2N1bWVudCBleHRlbmRzIFVzZXIsIERvY3VtZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogU3RhdHMgc3ViLWRvY3VtZW50XHJcbiAgICAgKi9cclxuICAgIHN0YXRzOiBVc2VyU3RhdHNTdWJEb2N1bWVudDsgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcnJheSBvZiBub3RpZmljYXRpb24gc3ViLWRvY3VtZW50c1xyXG4gICAgICovXHJcbiAgICBub3RpZmljYXRpb25zOiBUeXBlcy5Eb2N1bWVudEFycmF5PE5vdGlmaWNhdGlvblN1YkRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlcHJlc2VudHMgdXNlciBvd24gc2V0dGluZ1xyXG4gICAgICovXHJcbiAgICBzZXR0aW5nOiBTZXR0aW5nU3ViRG9jdW1lbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcnJheSBvZiByb3V0aW5lIHN1Yi1kb2N1bWVudHNcclxuICAgICAqL1xyXG4gICAgcm91dGluZXM6IFR5cGVzLkRvY3VtZW50QXJyYXk8Um91dGluZVN1YkRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFycmF5IG9mIGRvYyBzdWItZG9jdW1lbnRzXHJcbiAgICAgKi9cclxuICAgIGRvY3M6IFR5cGVzLkRvY3VtZW50QXJyYXk8T0RvY1N1YkRvY3VtZW50PlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgcHJvdmlkZWQgcm9sZSB0byB0aGlzIGluc3RhbmNlLlxyXG4gICAgICogSWYgdGhlIHVzZXIgYWxyZWFkeSBoYXMgdGhlIHJvbGUsIGl0IGlzIG5vdCBhZGRlZCBhIHNlY29uZCB0aW1lLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSByb2xlIHJvbGUgdG8gYmUgc2V0XHJcbiAgICAgKi9cclxuICAgIHNldFJvbGUocm9sZTogVXNlclJvbGVzKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgcHJvdmlkZWQgcm9sZSBmcm9tIHRoaXMgaW5zdGFuY2UuXHJcbiAgICAgKiBJZiB0aGUgdXNlciBkb2Vzbid0IGhhdmUgdGhlIHJvbGUsIG5vdGhpbmcgaGFwcGVucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcm9sZSByb2xlIHRvIGJlIHJlbW92ZWRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlUm9sZShyb2xlOiBVc2VyUm9sZXMpOiBQcm9taXNlPFVzZXJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHVzZXIgaGFzIHRoZSBwcm92aWRlZCByb2xlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHJvbGUgcm9sZSB0byBjaGVja1xyXG4gICAgICovXHJcbiAgICBoYXNSb2xlKHJvbGU6IFVzZXJSb2xlcyk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgYSBuZXcgcGFzc3dvcmQgdXNpbmcgYmNyeXB0IGhhc2hpbmcgYW5kIHNhbHQgZ2VuZXJhdGlvbiBmdW5jdGlvbnNcclxuICAgICAqIEBwYXJhbSBwd2QgbmV3IHBhc3N3b3JkIHRvIHNldFxyXG4gICAgICovXHJcbiAgICBzZXRQYXNzd29yZChwd2Q6IHN0cmluZyk6IFByb21pc2U8VXNlckRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAgKiBDaGVjayB0aGUgdmFsaWRpdHkgb2YgdGhlIHBhc3N3b3JkIHdpdGggdGhlIG9uZSBzdG9yZWQgb24gdGhlIGRhdGFiYXNlXHJcbiAgICAgICogQHBhcmFtIHB3ZCB0aGUgcGFzc3dvcmQgdG8gY2hlY2tcclxuICAgICAgKi9cclxuICAgIHZhbGlkYXRlUGFzc3dvcmQocHdkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgbm90aWZpY2F0aW9uIGlkZW50aWZpZWQgYnkgdHlwZSBhbmQgcmVxdWVzdGVyXHJcbiAgICAgKiBSZXR1cm4gYW4gZXJyb3IgaWYgYW4gaWRlbnRpY2FsIG5vdGlmaWNhdGlvbiBhbHJlYWR5IGV4aXN0c1xyXG4gICAgICogQHBhcmFtIHR5cGUgdHlwZSBvZiB0aGUgaW5jb21pbmcgbm90aWZpY2F0aW9uXHJcbiAgICAgKi9cclxuICAgIGFkZE5vdGlmaWNhdGlvbih0eXBlOiBOb3RUeXBlcyk6IFByb21pc2U8VXNlckRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhIG5vdGlmaWNhdGlvbiBpZGVudGlmaWVkIGJ5IGl0cyB0eXBlXHJcbiAgICAgKiBSZXR1cm5zIGFuIGVycm9yIGlmIHRoZSBub3RpZmljYXRpb24gZG9lc24ndCBleGlzdFxyXG4gICAgICogQHBhcmFtIHR5cGUgdHlwZSBvZiB0aGUgbm90aWZpY2F0aW9uIHRvIHJlbW92ZVxyXG4gICAgICovXHJcbiAgICByZW1vdmVOb3RpZmljYXRpb24odHlwZTogTm90VHlwZXMpOiBQcm9taXNlPFVzZXJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBkb2N1bWVudCBpZGVudGlmaWVkIGJ5IHR5cGUgYW5kIHJlcXVlc3RlclxyXG4gICAgICogUmV0dXJuIGFuIGVycm9yIGlmIGFuIGlkZW50aWNhbCBkb2N1bWVudCBhbHJlYWR5IGV4aXN0c1xyXG4gICAgICogQHBhcmFtIGRvYyByZXByZXNlbnRzIHRoZSBpbmNvbWluZyBkb2N1bWVudFxyXG4gICAgICovXHJcbiAgICBhZGREb2N1bWVudChkb2M6IE9Eb2N1bWVudCk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBkb2N1bWVudCBpZGVudGlmaWVkIGJ5IGl0cyB0eXBlXHJcbiAgICAgKiBSZXR1cm5zIGFuIGVycm9yIGlmIHRoZSBkb2N1bWVudCBkb2Vzbid0IGV4aXN0XHJcbiAgICAgKiBAcGFyYW0gdHlwZSB0eXBlIG9mIHRoZSBkb2N1bWVudCB0byByZW1vdmVcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlRG9jdW1lbnQodHlwZTogRG9jVHlwZXMpOiBQcm9taXNlPFVzZXJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgYSByb3V0aW5lIGZvciB0aGUgdXNlclxyXG4gICAgICogQHBhcmFtIHJvdXRpbmUgcmVwcmVzZW50cyB0aGUgbmV3bHkgcm91dGluZVxyXG4gICAgICovXHJcbiAgICBhZGRSb3V0aW5lKHJvdXRpbmU6IFJvdXRpbmUpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGEgcm91dGluZSBmb3IgdGhlIHVzZXJcclxuICAgICAqIEBwYXJhbSBuYW1lIGlkZW50aWZpZXMgdGhlIHJvdXRpbmUgdXAgdG8gYmUgcmVtb3ZlZFxyXG4gICAgICovXHJcbiAgICByZW1vdmVSb3V0aW5lKG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgVXNlclNjaGVtYSA9IG5ldyBTY2hlbWE8VXNlckRvY3VtZW50PihcclxuICAgIHtcclxuICAgICAgICBuYW1lOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICB9LCBcclxuXHJcbiAgICAgICAgc3VybmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgfSwgXHJcblxyXG4gICAgICAgIGVtYWlsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHVuaXF1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5kZXg6IHRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBuaWNrbmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIHVuaXF1ZTogdHJ1ZVxyXG4gICAgICAgIH0sIFxyXG5cclxuICAgICAgICBlbmpveWVkVmVoaWNsZXM6IHtcclxuICAgICAgICAgICAgdHlwZTogW1NjaGVtYVR5cGVzLk9iamVjdElkXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW11cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzYWx0OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgIFxyXG4gICAgICAgIHB3ZF9oYXNoOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgIFxyXG4gICAgICAgIG5vdGlmaWNhdGlvbnM6IHsgXHJcbiAgICAgICAgICAgIHR5cGU6IFtOb3RpZmljYXRpb25TY2hlbWFdXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcm9sZXM6IHtcclxuICAgICAgICAgICAgdHlwZTogW1NjaGVtYVR5cGVzLlN0cmluZ10sXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBlbnVtOiBVc2VyUm9sZXMsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtVc2VyUm9sZXMuQmFzZV1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGF0czoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdGF0c1NjaGVtYSxcclxuICAgICAgICAgICAgLy9kZWZhdWx0OiAoKSA9PiAoe30pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcm91dGluZXM6IHtcclxuICAgICAgICAgICAgdHlwZTogW1JvdXRpbmVTY2hlbWFdLFxyXG4gICAgICAgICAgICAvL2RlZmF1bHQ6ICgpID0+ICh7fSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkb2NzOiB7XHJcbiAgICAgICAgICAgIHR5cGVzOiBbRG9jdW1lbnRTY2hlbWFdLFxyXG4gICAgICAgICAgICAvL2RlZmF1bHQ6ICgpID0+ICh7fSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXR0aW5nOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNldHRpbmdTY2hlbWEsXHJcbiAgICAgICAgICAgIC8vZGVmYXVsdDogKCkgPT4gKHt9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuKVxyXG5cclxuLy8gVE8gRE8gbWV0dGkgYXBwb3N0byByb3V0aW5lIG5hbWVzIGluIHJvdXRpbmUgcm91dGUgdG9nbGllbmRvIC91c2VyaWRcclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy5hZGROb3RpZmljYXRpb24gPSBhc3luYyBmdW5jdGlvbiAoXHJcbiAgICByZXFUeXBlOiBOb3RUeXBlcyxcclxuKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGNvbnN0IHRvSW5zZXJ0OiBOb3RpZmljYXRpb24gPSB7IHR5cGU6IHJlcVR5cGUgfTtcclxuICAgIHRoaXMubm90aWZpY2F0aW9ucy5wdXNoKHRvSW5zZXJ0KTtcclxuICAgIHJldHVybiB0aGlzLnNhdmUoKTtcclxufTtcclxuXHJcblxyXG4vLyBwb3Agb25lIG5vdGlmaWNhdGlvbiB3aXRoIHRoZSBzYW1lIHR5cGUgYXMgdGhlIG9uZSByZWNpZXZlZCBhcyBpbnB1dFxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMucmVtb3ZlTm90aWZpY2F0aW9uID0gYXN5bmMgZnVuY3Rpb24gKFxyXG4gICAgdHlwZTogc3RyaW5nXHJcbik6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBmb3IgKGxldCBpZHggaW4gdGhpcy5ub3RpZmljYXRpb25zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm90aWZpY2F0aW9uc1tpZHhdLnR5cGUgPT09IHR5cGUudmFsdWVPZigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9ucy5zcGxpY2UocGFyc2VJbnQoaWR4KSwgMSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ05vdGlmaWNhdGlvbiBub3QgZm91bmQnKSk7XHJcbn07XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMuYWRkRG9jdW1lbnQgPSBhc3luYyBmdW5jdGlvbiAoZG9jOiBPRG9jdW1lbnQpIDogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLmRvY3VtZW50cy5wdXNoKGRvYylcclxuICAgIGF3YWl0IHRoaXMuc2F2ZSgpLmNhdGNoKChlcnIpID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxufVxyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLnJlbW92ZURvY3VtZW50ID0gYXN5bmMgZnVuY3Rpb24gKHR5cGU6IERvY1R5cGVzKSA6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBmb3IgKGxldCBpZHggaW4gdGhpcy5kb2NzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9jc1tpZHhdLnR5cGUgPT09IHR5cGUudmFsdWVPZigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jcy5zcGxpY2UocGFyc2VJbnQoaWR4KSwgMSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcbn1cclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy5hZGRSb3V0aW5lID0gYXN5bmMgZnVuY3Rpb24gKHJvdXRpbmU6IFJvdXRpbmUpIDogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIHJvdXRpbmUubmFtZSA9IHJvdXRpbmUubmFtZSArIFwiL1wiICsgdGhpcy5faWQudG9TdHJpbmcoKVxyXG4gICAgdGhpcy5yb3V0aW5lcy5wdXNoKHJvdXRpbmUpXHJcbiAgICByZXR1cm4gdGhpcy5zYXZlKClcclxufVxyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLnJlbW92ZVJvdXRpbmUgPSBhc3luYyBmdW5jdGlvbiAobmFtZTogc3RyaW5nKSA6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBuYW1lID0gbmFtZSArIFwiL1wiICsgdGhpcy5faWQudG9TdHJpbmcoKVxyXG4gICAgdGhpcy5yb3V0aW5lcyA9IHRoaXMucm91dGluZXMuZmlsdGVyKChlbGVtOiBSb3V0aW5lU3ViRG9jdW1lbnQpID0+IGVsZW0ubmFtZSAhPT0gbmFtZSlcclxuICAgIHJldHVybiB0aGlzLnNhdmUoKVxyXG59XHJcblxyXG5cclxuLyogTUVUSE9EUyBGT1IgUEFTU1dPUkQgTUFOSVBVTEFUSU9OIEFORCBWQUxJREFUSU9OICovXHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMuc2V0UGFzc3dvcmQgPSBhc3luYyBmdW5jdGlvbiAocHdkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgY29uc3Qgc2FsdDogc3RyaW5nID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmdlblNhbHQoMTApXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT5cclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdFcnJvciB3aXRoIHNhbHQgZ2VuZXJhdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgY29uc3QgcHdkSGFzaCA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5oYXNoKHB3ZCwgc2FsdClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggcGFzc3dvcmQgZW5jcnlwdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgdGhpcy5zYWx0ID0gc2FsdDtcclxuICAgIHRoaXMucHdkX2hhc2ggPSBwd2RIYXNoO1xyXG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xyXG59O1xyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLnZhbGlkYXRlUGFzc3dvcmQgPSBhc3luYyBmdW5jdGlvbiAocHdkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIGNvbnN0IGhhc2hlZFB3ID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmhhc2gocHdkLCB0aGlzLnNhbHQpXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT5cclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdFcnJvciB3aXRoIHBhc3N3b3JkIGVuY3J5cHRpb24nKSlcclxuICAgICAgICApO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnB3ZF9oYXNoID09PSBoYXNoZWRQdztcclxufTtcclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy5yZW1vdmVSb2xlID0gYXN5bmMgZnVuY3Rpb24gKHJvbGU6IFVzZXJSb2xlcyk6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBmb3IgKGNvbnN0IGlkeCBpbiB0aGlzLnJvbGVzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucm9sZXNbaWR4XSA9PT0gcm9sZS52YWx1ZU9mKCkpIHRoaXMucm9sZXMuc3BsaWNlKHBhcnNlSW50KGlkeCksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnNhdmUoKTtcclxufTtcclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy5oYXNSb2xlID0gZnVuY3Rpb24gKHJvbGU6IFVzZXJSb2xlcyk6IGJvb2xlYW4ge1xyXG4gICAgZm9yIChsZXQgaWR4IGluIHRoaXMucm9sZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5yb2xlc1tpZHhdID09IHJvbGUudmFsdWVPZigpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMuc2V0Um9sZSA9IGFzeW5jIGZ1bmN0aW9uIChyb2xlOiBVc2VyUm9sZXMpOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgaWYgKCF0aGlzLmhhc1JvbGUocm9sZSkpIHtcclxuICAgICAgICB0aGlzLnJvbGVzLnB1c2gocm9sZS52YWx1ZU9mKCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNhdmUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ1JvbGUgYWxyZWFkeSBzZXQnKSk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGUgXCJVc2Vyc1wiIGNvbGxlY3Rpb25cclxuZXhwb3J0IGNvbnN0IFVzZXJNb2RlbDogTW9kZWw8VXNlckRvY3VtZW50PiA9IG1vbmdvb3NlLm1vZGVsKCdVc2VyJywgVXNlclNjaGVtYSwgJ1VzZXJzJyk7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckJ5SWQodXNlcklkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBjb25zdCB1c2VyRG9jID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyBfaWQ6IHVzZXJJZCB9KS5jYXRjaCgoZXJyKSA9PlxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAhdXNlckRvY1xyXG4gICAgICAgID8gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUodXNlckRvYyk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyQnlOaWNrbmFtZShuaWNrbmFtZTogc3RyaW5nKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGNvbnN0IHVzZXJkYXRhID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyBuaWNrbmFtZSB9KS5jYXRjaCgoZXJyKSA9PiBcclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gIXVzZXJkYXRhXHJcbiAgICAgICAgPyBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ05vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXInKSlcclxuICAgICAgICA6IFByb21pc2UucmVzb2x2ZSh1c2VyZGF0YSk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyQnlFbWFpbChlbWFpbDogc3RyaW5nKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGNvbnN0IHVzZXJkYXRhID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyBlbWFpbCB9KS5jYXRjaCgoZXJyKSA9PiBcclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gIXVzZXJkYXRhXHJcbiAgICAgICAgPyBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ05vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXInKSlcclxuICAgICAgICA6IFByb21pc2UucmVzb2x2ZSh1c2VyZGF0YSk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVVc2VyKGRhdGE6IEFueUtleXM8VXNlckRvY3VtZW50Pik6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBjb25zdCB1c2VyOiBVc2VyRG9jdW1lbnQgPSBuZXcgVXNlck1vZGVsKGRhdGEpO1xyXG4gICAgcmV0dXJuIHVzZXIuc2F2ZSgpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVVc2VyKGZpbHRlcjogRmlsdGVyUXVlcnk8VXNlckRvY3VtZW50Pik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3Qgb2JqOiB7IGRlbGV0ZWRDb3VudD86IG51bWJlciB9ID0gYXdhaXQgVXNlck1vZGVsLmRlbGV0ZU9uZShmaWx0ZXIpLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuICFvYmouZGVsZXRlZENvdW50XHJcbiAgICAgICAgPyBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ05vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXInKSlcclxuICAgICAgICA6IFByb21pc2UucmVzb2x2ZSgpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTmlja05hbWUoX2lkOiBUeXBlcy5PYmplY3RJZCwgbmlja25hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgYXdhaXQgVXNlck1vZGVsLnVwZGF0ZU9uZSh7IF9pZCB9LCB7IG5pY2tuYW1lIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBhc3N3b3JkKF9pZDogVHlwZXMuT2JqZWN0SWQsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnQ7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZChfaWQpO1xyXG4gICAgICAgIGF3YWl0IHVzZXIuc2V0UGFzc3dvcmQocGFzc3dvcmQpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyU3RhdHMoX2lkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8VXNlclN0YXRzPiB7XHJcbiAgICBjb25zdCBzdGF0ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyBfaWQgfSwgeyBzdGF0czogMSB9KS5jYXRjaCgoZXJyKSA9PlxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAhc3RhdFxyXG4gICAgICAgID8gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoc3RhdC5zdGF0cyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gdXNlcklkIGlkIG9mIHRoZSB1c2VyIHRvIHVwZGF0ZVxyXG4gKiBAcGFyYW0gdXBkYXRlZFN0YXRzIG9iamVjdCBjb250YWluaW5nIHRoZSB1cGRhdGVkIHN0YXRzIG9mIHRoZSB1c2VyXHJcbiAqL1xyXG4gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVVzZXJTdGF0cyhcclxuICAgIHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsXHJcbiAgICB1cGRhdGVkU3RhdHM6IFVzZXJTdGF0c1xyXG4pOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB1c2VyOiBVc2VyRG9jdW1lbnQgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpO1xyXG4gICAgICAgIHVzZXIuc3RhdHMudGhyb3BpZXMgPSB1cGRhdGVkU3RhdHMudGhyb3BpZXM7XHJcbiAgICAgICAgdXNlci5zdGF0cy5zYXVjZSA9IHVwZGF0ZWRTdGF0cy5zYXVjZTtcclxuICAgICAgICByZXR1cm4gdXNlci5zYXZlKCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVRoZW1lKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIHRoZW1lOiBzdHJpbmcpIDogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdXNlcjogVXNlckRvY3VtZW50XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpXHJcbiAgICAgICAgdXNlci5zZXR0aW5nLnRoZW1lID0gdGhlbWVcclxuICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVTaXplKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIHNpemU6IG51bWJlcikgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnRcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuICAgICAgICB1c2VyLnNldHRpbmcuc2l6ZSA9IHNpemVcclxuICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVMYW5ndWFnZSh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBsYW46IHN0cmluZykgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnRcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuICAgICAgICB1c2VyLnNldHRpbmcubGFuZ3VhZ2UgPSBsYW5cclxuICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVHYW1pZmljYXRpb24odXNlcklkOiBUeXBlcy5PYmplY3RJZCwgc3d0OiBib29sZWFuKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgdHJ5IHtcclxuICAgICAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQodXNlcklkKVxyXG4gICAgICAgIHVzZXIuc2V0dGluZy5nYW1pZmljYXRpb25IaWRlID0gc3d0XHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlRW1haWwoX2lkOiBUeXBlcy5PYmplY3RJZCwgZW1haWw6IHN0cmluZykgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGF3YWl0IFVzZXJNb2RlbC51cGRhdGVPbmUoeyBfaWQgfSwgeyBlbWFpbCB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJvdXRpbmVOYW1lKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIG9sZE5hbWU6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdXNlcjogVXNlckRvY3VtZW50XHJcbiAgICBvbGROYW1lID0gb2xkTmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuICAgIG5ld05hbWUgPSBuZXdOYW1lICsgXCIvXCIgKyB1c2VySWQudG9TdHJpbmcoKVxyXG4gICAgdHJ5IHtcclxuICAgICAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQodXNlcklkKVxyXG4gICAgICAgIHVzZXIucm91dGluZXMuZm9yRWFjaCgoZWxlbSwgaWR4LCB2ZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtLm5hbWUgPT09IG9sZE5hbWUpIHZlY3RbaWR4XS5uYW1lID0gbmV3TmFtZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlUm91dGluZVRlbXBlcmF0dXJlKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIHJvdXRpbmVOYW1lOiBzdHJpbmcsIHRlbXA6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgcm91dGluZU5hbWUgPSByb3V0aW5lTmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuICAgICAgICB1c2VyLnJvdXRpbmVzLmZvckVhY2goKGVsZW0sIGlkeCwgdmVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWxlbS5uYW1lID09PSByb3V0aW5lTmFtZSkgdmVjdFtpZHhdLnRlbXBlcmF0dXJlID0gdGVtcFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyB0aGlzIHByb2JhYmx5IG5lZWRzIHRvIGJlIHdyaXR0ZW4gYWdhaW4gXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVSb3V0aW5lTGlnaHRzQ29sb3IodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgcm91dGluZU5hbWU6IHN0cmluZywgY29sb3I6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgcm91dGluZU5hbWUgPSByb3V0aW5lTmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuICAgICAgICB1c2VyLnJvdXRpbmVzLmZvckVhY2goKGVsZW0sIGlkeCwgdmVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWxlbS5uYW1lID09PSByb3V0aW5lTmFtZSkgdmVjdFtpZHhdLmxpZ2h0c0NvbG9yID0gY29sb3JcclxuICAgICAgICB9KVxyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVSb3V0aW5lTXVzaWMoXHJcbiAgICB1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBcclxuICAgIHJvdXRpbmVOYW1lOiBzdHJpbmcsIFxyXG4gICAgbXVzaWNUb0FkZDogc3RyaW5nW10gPSBbXSwgXHJcbiAgICBtdXNpY1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdXHJcbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgcm91dGluZU5hbWUgPSByb3V0aW5lTmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuICAgICAgICBpZiAobXVzaWNUb1JlbW92ZS5sZW5ndGgpIHJlbW92ZU11c2ljKHVzZXIsIHJvdXRpbmVOYW1lLCBtdXNpY1RvUmVtb3ZlKVxyXG4gICAgICAgIGlmIChtdXNpY1RvQWRkLmxlbmd0aCkgYWRkTXVzaWModXNlciwgcm91dGluZU5hbWUsIG11c2ljVG9BZGQpXHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVNdXNpYyh1c2VyOiBVc2VyRG9jdW1lbnQsIHJvdXRpbmVOYW1lOiBzdHJpbmcsIG11c2ljVG9SZW1vdmU6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICB2YXIgaWR4OiBudW1iZXIgPSAtMVxyXG4gICAgZG8ge1xyXG4gICAgICAgIGlkeCArK1xyXG4gICAgICAgIGlmICh1c2VyLnJvdXRpbmVzW2lkeF0ubmFtZSA9PT0gcm91dGluZU5hbWUpIHtcclxuICAgICAgICAgICAgdXNlci5yb3V0aW5lc1tpZHhdLm11c2ljID0gdXNlci5yb3V0aW5lc1tpZHhdLm11c2ljLmZpbHRlcigoZWxlbTogc3RyaW5nKSA9PiAhKG11c2ljVG9SZW1vdmUuaW5jbHVkZXMoZWxlbSkpKVxyXG4gICAgICAgIH1cclxuICAgIH0gd2hpbGUoaWR4IDwgdXNlci5yb3V0aW5lcy5sZW5ndGggJiYgdXNlci5yb3V0aW5lc1tpZHhdLm5hbWUgIT09IHJvdXRpbmVOYW1lKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRNdXNpYyh1c2VyOiBVc2VyRG9jdW1lbnQsIHJvdXRpbmVOYW1lOiBzdHJpbmcsIG11c2ljVG9BZGQ6IHN0cmluZ1tdKSB7XHJcbiAgICBmb3IgKHZhciBpZHggaW4gdXNlci5yb3V0aW5lcykge1xyXG4gICAgICAgIGlmICh1c2VyLnJvdXRpbmVzW2lkeF0ubmFtZSA9PT0gcm91dGluZU5hbWUpIHVzZXIucm91dGluZXNbaWR4XS5tdXNpYy5wdXNoKC4uLm11c2ljVG9BZGQpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBzdGF0dXMgb2YgdGhlIHByb3ZpZGVkIHVzZXIgdG8gdGhlIHByb3ZpZGVkIHZhbHVlXHJcbiAqIGFuZCBub3RpZmllcyBoaXMgZnJpZW5kcyBvZiB0aGUgY2hhbmdlLlxyXG4gKiBAcGFyYW0gdXNlcklkIGlkIG9mIHRoZSB1c2VyIHdob3NlIHN0YXR1cyBoYXMgdG8gYmUgY2hhbmdlZFxyXG4gKiBAcGFyYW0gbmV3U3RhdHVzIG5ldyBzdGF0dXMgb2YgdGhlIHVzZXJcclxuICogQHJldHVybiB1cGRhdGVkIHVzZXJcclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBjb25zdCBzZXRVc2VyU3RhdHVzID0gYXN5bmMgKFxyXG4gICAgdXNlcklkOiBUeXBlcy5PYmplY3RJZCxcclxuICAgIG5ld1N0YXR1czogVXNlclN0YXR1c1xyXG4pOiBQcm9taXNlPFVzZXJEb2N1bWVudD4gPT4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudCA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZCk7XHJcbiAgICB1c2VyLnN0YXR1cyA9IG5ld1N0YXR1cztcclxuICAgIHJldHVybiAgdXNlci5zYXZlKCk7XHJcbn07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlckVuam95ZWRWZWhpY2xlKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIHZlaGljbGVJZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnRcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJERU5UUk8gbGEgdXBkYXRlVXNlckVuam95ZWRWZWhpY2xlXCIpXHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVuam95ZWRWZWhpY2xlcy5sZW4gUFJJTUE6IFwiICsgdXNlci5lbmpveWVkVmVoaWNsZXMubGVuZ3RoKVxyXG4gICAgICAgIHVzZXIuZW5qb3llZFZlaGljbGVzLnB1c2godmVoaWNsZUlkKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRW5qb3llZFZlaGljbGVzLmxlbiBET1BPOiBcIiArIHVzZXIuZW5qb3llZFZlaGljbGVzLmxlbmd0aClcclxuICAgICAgICAvL1RPIERPIHJpbWV0dGkgYXBwb3N0b1xyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChlcnIpKS8vbmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVVc2VyRW5qb3llZFZlaGljbGUodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgdmVoaWNsZUlkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkRFTlRSTyBsYSByZW1vdmVVc2VyRW5qb3llZFZlaGljbGVcIilcclxuICAgICAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQodXNlcklkKVxyXG4gICAgICAgIGlmICghdXNlci5lbmpveWVkVmVoaWNsZXMuaW5jbHVkZXModmVoaWNsZUlkKSkgdGhyb3cgbmV3IFNlcnZlckVycm9yKFwiTm8gZW5qb3llZCB2ZWhpY2xlcyByZWxhdGVkIHRvIHRoaXMgdXNlclwiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRW5qb3llZFZlaGljbGVzLmxlbiBQUklNQTogXCIgKyB1c2VyLmVuam95ZWRWZWhpY2xlcy5sZW5ndGgpXHJcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIHVzZXIuZW5qb3llZFZlaGljbGVzKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyLmVuam95ZWRWZWhpY2xlc1tpZHhdID09PSB2ZWhpY2xlSWQpIFxyXG4gICAgICAgICAgICAgICAgdXNlci5lbmpveWVkVmVoaWNsZXMuc3BsaWNlKHBhcnNlSW50KGlkeCksIDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRW5qb3llZFZlaGljbGVzLmxlbiBET1BPOiBcIiArIHVzZXIuZW5qb3llZFZlaGljbGVzLmxlbmd0aClcclxuICAgICAgICAvL1RPIERPIHJpbWV0dGkgYXBwb3N0b1xyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChlcnIpKS8vbmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSkpXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpXHJcbiAgICB9XHJcbn1cclxuIl19