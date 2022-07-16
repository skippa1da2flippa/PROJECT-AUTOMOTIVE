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
exports.updateRoutineMusic = exports.updateRoutineLightsColor = exports.updateRoutineTemperature = exports.updateRoutineName = exports.updateGamification = exports.updateLanguage = exports.updateSize = exports.updateTheme = exports.updateUserStats = exports.getUserStats = exports.updatePassword = exports.updateNickName = exports.deleteUser = exports.createUser = exports.getUserByNickname = exports.getUserById = exports.UserModel = exports.UserSchema = exports.UserRoles = void 0;
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
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.SchemaTypes.String,
        required: true
    },
    surname: {
        type: mongoose_1.SchemaTypes.String,
        required: true
    },
    nickname: {
        type: mongoose_1.SchemaTypes.String,
        default: "saucer"
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
        default: function () { return ({}); }
    },
    routines: {
        type: [routine_1.RoutineSchema],
        default: function () { return ({}); }
    },
    docs: {
        types: [document_1.DocumentSchema],
        default: function () { return ({}); }
    },
    setting: {
        type: setting_1.SettingSchema,
        default: function () { return ({}); }
    }
});
// TO DO Fai metodo che ti mette routine name normale usa una fun normale tipo return fun(routine) e sta roba qua ritorma la routine apposto
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
                    this.splice(parseInt(idx), 1);
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
                    this.splice(parseInt(idx), 1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBQ3JDLHFDQUE2RjtBQUM3RixrREFBNEI7QUFDNUIsdURBQW9EO0FBQ3BELHFDQUlrQjtBQUNsQix1Q0FLbUI7QUFDbkIsMkNBSXFCO0FBQ3JCLCtDQUt1QjtBQUN2QixxQ0FJa0I7QUFFbEIsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ2pCLDRCQUFlLENBQUE7SUFDZiwwQkFBYSxDQUFBO0lBQ2IsNEJBQWUsQ0FBQTtBQUNuQixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUF1SFksUUFBQSxVQUFVLEdBQUcsSUFBSSxpQkFBTSxDQUNoQztJQUNJLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxzQkFBVyxDQUFDLE1BQU07UUFDeEIsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFFRCxPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsc0JBQVcsQ0FBQyxNQUFNO1FBQ3hCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBRUQsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLHNCQUFXLENBQUMsTUFBTTtRQUN4QixPQUFPLEVBQUUsUUFBUTtLQUNwQjtJQUVELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxzQkFBVyxDQUFDLE1BQU07UUFDeEIsUUFBUSxFQUFFLEtBQUs7S0FDbEI7SUFFRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsc0JBQVcsQ0FBQyxNQUFNO1FBQ3hCLFFBQVEsRUFBRSxLQUFLO0tBQ2xCO0lBRUQsYUFBYSxFQUFFO1FBQ1gsSUFBSSxFQUFFLENBQUMsaUNBQWtCLENBQUM7S0FDN0I7SUFFRCxLQUFLLEVB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LEVBQUUsV0FBbUIsRUFBRSxVQUFvQjs7SUFDM0UsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssV0FBVztZQUFFLENBQUEsS0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQSxDQUFDLElBQUksV0FBSSxVQUFVLEVBQUM7S0FDNUY7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5pbXBvcnQgeyBBbnlLZXlzLCBEb2N1bWVudCwgRmlsdGVyUXVlcnksIE1vZGVsLCBTY2hlbWEsIFNjaGVtYVR5cGVzLCBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQnO1xyXG5pbXBvcnQgeyBTZXJ2ZXJFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvc2VydmVyLWVycm9yXCJcclxuaW1wb3J0IHtcclxuICAgIFJvdXRpbmUsXHJcbiAgICBSb3V0aW5lU3ViRG9jdW1lbnQsXHJcbiAgICBSb3V0aW5lU2NoZW1hXHJcbn0gZnJvbSAnLi9yb3V0aW5lJ1xyXG5pbXBvcnQge1xyXG4gICAgT0RvY3VtZW50LFxyXG4gICAgT0RvY1N1YkRvY3VtZW50LFxyXG4gICAgRG9jdW1lbnRTY2hlbWEsXHJcbiAgICBEb2NUeXBlc1xyXG59IGZyb20gJy4vZG9jdW1lbnQnXHJcbmltcG9ydCB7XHJcbiAgICBVc2VyU3RhdHMsXHJcbiAgICBVc2VyU3RhdHNTdWJEb2N1bWVudCxcclxuICAgIFN0YXRzU2NoZW1hXHJcbn0gZnJvbSAnLi91c2VyLXN0YXRzJ1xyXG5pbXBvcnQge1xyXG4gICAgTm90VHlwZXMsXHJcbiAgICBOb3RpZmljYXRpb24sXHJcbiAgICBOb3RpZmljYXRpb25TY2hlbWEsXHJcbiAgICBOb3RpZmljYXRpb25TdWJEb2N1bWVudFxyXG59IGZyb20gJy4vbm90aWZpY2F0aW9uJ1xyXG5pbXBvcnQge1xyXG4gICAgU2V0dGluZyxcclxuICAgIFNldHRpbmdTdWJEb2N1bWVudCxcclxuICAgIFNldHRpbmdTY2hlbWFcclxufSBmcm9tICcuL3NldHRpbmcnXHJcblxyXG5leHBvcnQgZW51bSBVc2VyUm9sZXMge1xyXG4gICAgQ2hpbGQgPSAnQ2hpbGQnLFxyXG4gICAgQmFzZSA9ICdCYXNlJyxcclxuICAgIE93bmVyID0gJ093bmVyJ1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVzZXIge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgc3VybmFtZTogc3RyaW5nO1xyXG4gICAgbmlja25hbWU/OiBzdHJpbmc7XHJcbiAgICByb2xlczogc3RyaW5nW107XHJcbiAgICBwd2RfaGFzaDogc3RyaW5nO1xyXG4gICAgc2FsdDogc3RyaW5nO1xyXG4gICAgc3RhdHM6IFVzZXJTdGF0cztcclxuICAgIGRvY3M6IE9Eb2N1bWVudFtdO1xyXG4gICAgc2V0dGluZzogU2V0dGluZztcclxuICAgIHJvdXRpbmVzOiBSb3V0aW5lW107XHJcbiAgICBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25bXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVc2VyRG9jdW1lbnQgZXh0ZW5kcyBVc2VyLCBEb2N1bWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIFN0YXRzIHN1Yi1kb2N1bWVudFxyXG4gICAgICovXHJcbiAgICBzdGF0czogVXNlclN0YXRzU3ViRG9jdW1lbnQ7IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXJyYXkgb2Ygbm90aWZpY2F0aW9uIHN1Yi1kb2N1bWVudHNcclxuICAgICAqL1xyXG4gICAgbm90aWZpY2F0aW9uczogVHlwZXMuRG9jdW1lbnRBcnJheTxOb3RpZmljYXRpb25TdWJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXByZXNlbnRzIHVzZXIgb3duIHNldHRpbmdcclxuICAgICAqL1xyXG4gICAgc2V0dGluZzogU2V0dGluZ1N1YkRvY3VtZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXJyYXkgb2Ygcm91dGluZSBzdWItZG9jdW1lbnRzXHJcbiAgICAgKi9cclxuICAgIHJvdXRpbmVzOiBUeXBlcy5Eb2N1bWVudEFycmF5PFJvdXRpbmVTdWJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcnJheSBvZiBkb2Mgc3ViLWRvY3VtZW50c1xyXG4gICAgICovXHJcbiAgICBkb2NzOiBUeXBlcy5Eb2N1bWVudEFycmF5PE9Eb2NTdWJEb2N1bWVudD5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIHByb3ZpZGVkIHJvbGUgdG8gdGhpcyBpbnN0YW5jZS5cclxuICAgICAqIElmIHRoZSB1c2VyIGFscmVhZHkgaGFzIHRoZSByb2xlLCBpdCBpcyBub3QgYWRkZWQgYSBzZWNvbmQgdGltZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcm9sZSByb2xlIHRvIGJlIHNldFxyXG4gICAgICovXHJcbiAgICBzZXRSb2xlKHJvbGU6IFVzZXJSb2xlcyk6IFByb21pc2U8VXNlckRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHByb3ZpZGVkIHJvbGUgZnJvbSB0aGlzIGluc3RhbmNlLlxyXG4gICAgICogSWYgdGhlIHVzZXIgZG9lc24ndCBoYXZlIHRoZSByb2xlLCBub3RoaW5nIGhhcHBlbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHJvbGUgcm9sZSB0byBiZSByZW1vdmVkXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVJvbGUocm9sZTogVXNlclJvbGVzKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB1c2VyIGhhcyB0aGUgcHJvdmlkZWQgcm9sZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSByb2xlIHJvbGUgdG8gY2hlY2tcclxuICAgICAqL1xyXG4gICAgaGFzUm9sZShyb2xlOiBVc2VyUm9sZXMpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGEgbmV3IHBhc3N3b3JkIHVzaW5nIGJjcnlwdCBoYXNoaW5nIGFuZCBzYWx0IGdlbmVyYXRpb24gZnVuY3Rpb25zXHJcbiAgICAgKiBAcGFyYW0gcHdkIG5ldyBwYXNzd29yZCB0byBzZXRcclxuICAgICAqL1xyXG4gICAgc2V0UGFzc3dvcmQocHdkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogQ2hlY2sgdGhlIHZhbGlkaXR5IG9mIHRoZSBwYXNzd29yZCB3aXRoIHRoZSBvbmUgc3RvcmVkIG9uIHRoZSBkYXRhYmFzZVxyXG4gICAgICAqIEBwYXJhbSBwd2QgdGhlIHBhc3N3b3JkIHRvIGNoZWNrXHJcbiAgICAgICovXHJcbiAgICB2YWxpZGF0ZVBhc3N3b3JkKHB3ZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIG5vdGlmaWNhdGlvbiBpZGVudGlmaWVkIGJ5IHR5cGUgYW5kIHJlcXVlc3RlclxyXG4gICAgICogUmV0dXJuIGFuIGVycm9yIGlmIGFuIGlkZW50aWNhbCBub3RpZmljYXRpb24gYWxyZWFkeSBleGlzdHNcclxuICAgICAqIEBwYXJhbSB0eXBlIHR5cGUgb2YgdGhlIGluY29taW5nIG5vdGlmaWNhdGlvblxyXG4gICAgICovXHJcbiAgICBhZGROb3RpZmljYXRpb24odHlwZTogTm90VHlwZXMpOiBQcm9taXNlPFVzZXJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBub3RpZmljYXRpb24gaWRlbnRpZmllZCBieSBpdHMgdHlwZVxyXG4gICAgICogUmV0dXJucyBhbiBlcnJvciBpZiB0aGUgbm90aWZpY2F0aW9uIGRvZXNuJ3QgZXhpc3RcclxuICAgICAqIEBwYXJhbSB0eXBlIHR5cGUgb2YgdGhlIG5vdGlmaWNhdGlvbiB0byByZW1vdmVcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlTm90aWZpY2F0aW9uKHR5cGU6IE5vdFR5cGVzKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgZG9jdW1lbnQgaWRlbnRpZmllZCBieSB0eXBlIGFuZCByZXF1ZXN0ZXJcclxuICAgICAqIFJldHVybiBhbiBlcnJvciBpZiBhbiBpZGVudGljYWwgZG9jdW1lbnQgYWxyZWFkeSBleGlzdHNcclxuICAgICAqIEBwYXJhbSBkb2MgcmVwcmVzZW50cyB0aGUgaW5jb21pbmcgZG9jdW1lbnRcclxuICAgICAqL1xyXG4gICAgYWRkRG9jdW1lbnQoZG9jOiBPRG9jdW1lbnQpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgZG9jdW1lbnQgaWRlbnRpZmllZCBieSBpdHMgdHlwZVxyXG4gICAgICogUmV0dXJucyBhbiBlcnJvciBpZiB0aGUgZG9jdW1lbnQgZG9lc24ndCBleGlzdFxyXG4gICAgICogQHBhcmFtIHR5cGUgdHlwZSBvZiB0aGUgZG9jdW1lbnQgdG8gcmVtb3ZlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZURvY3VtZW50KHR5cGU6IERvY1R5cGVzKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGEgcm91dGluZSBmb3IgdGhlIHVzZXJcclxuICAgICAqIEBwYXJhbSByb3V0aW5lIHJlcHJlc2VudHMgdGhlIG5ld2x5IHJvdXRpbmVcclxuICAgICAqL1xyXG4gICAgYWRkUm91dGluZShyb3V0aW5lOiBSb3V0aW5lKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBhIHJvdXRpbmUgZm9yIHRoZSB1c2VyXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBpZGVudGlmaWVzIHRoZSByb3V0aW5lIHVwIHRvIGJlIHJlbW92ZWRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlUm91dGluZShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IFVzZXJTY2hlbWEgPSBuZXcgU2NoZW1hPFVzZXJEb2N1bWVudD4oXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgfSwgXHJcblxyXG4gICAgICAgIHN1cm5hbWU6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgIH0sIFxyXG5cclxuICAgICAgICBuaWNrbmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwic2F1Y2VyXCJcclxuICAgICAgICB9LCBcclxuXHJcbiAgICAgICAgc2FsdDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICBcclxuICAgICAgICBwd2RfaGFzaDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICBcclxuICAgICAgICBub3RpZmljYXRpb25zOiB7IC8vIGRlbGF0YWJsZVxyXG4gICAgICAgICAgICB0eXBlOiBbTm90aWZpY2F0aW9uU2NoZW1hXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJvbGVzOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFtTY2hlbWFUeXBlcy5TdHJpbmddLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgZW51bTogVXNlclJvbGVzLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbVXNlclJvbGVzLkJhc2VdXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhdHM6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RhdHNTY2hlbWEsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+ICh7fSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByb3V0aW5lczoge1xyXG4gICAgICAgICAgICB0eXBlOiBbUm91dGluZVNjaGVtYV0sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+ICh7fSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkb2NzOiB7XHJcbiAgICAgICAgICAgIHR5cGVzOiBbRG9jdW1lbnRTY2hlbWFdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiAoe30pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0dGluZzoge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXR0aW5nU2NoZW1hLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiAoe30pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pXHJcblxyXG4vLyBUTyBETyBGYWkgbWV0b2RvIGNoZSB0aSBtZXR0ZSByb3V0aW5lIG5hbWUgbm9ybWFsZSB1c2EgdW5hIGZ1biBub3JtYWxlIHRpcG8gcmV0dXJuIGZ1bihyb3V0aW5lKSBlIHN0YSByb2JhIHF1YSByaXRvcm1hIGxhIHJvdXRpbmUgYXBwb3N0b1xyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLmFkZE5vdGlmaWNhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChcclxuICAgIHJlcVR5cGU6IE5vdFR5cGVzLFxyXG4pOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgdG9JbnNlcnQ6IE5vdGlmaWNhdGlvbiA9IHsgdHlwZTogcmVxVHlwZSB9O1xyXG4gICAgdGhpcy5ub3RpZmljYXRpb25zLnB1c2godG9JbnNlcnQpO1xyXG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xyXG59O1xyXG5cclxuXHJcbi8vIHBvcCBvbmUgbm90aWZpY2F0aW9uIHdpdGggdGhlIHNhbWUgdHlwZSBhcyB0aGUgb25lIHJlY2lldmVkIGFzIGlucHV0XHJcblVzZXJTY2hlbWEubWV0aG9kcy5yZW1vdmVOb3RpZmljYXRpb24gPSBhc3luYyBmdW5jdGlvbiAoXHJcbiAgICB0eXBlOiBzdHJpbmdcclxuKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGZvciAobGV0IGlkeCBpbiB0aGlzLm5vdGlmaWNhdGlvbnMpIHtcclxuICAgICAgICBpZiAodGhpcy5ub3RpZmljYXRpb25zW2lkeF0udHlwZSA9PT0gdHlwZS52YWx1ZU9mKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGxpY2UocGFyc2VJbnQoaWR4KSwgMSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ05vdGlmaWNhdGlvbiBub3QgZm91bmQnKSk7XHJcbn07XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMuYWRkRG9jdW1lbnQgPSBhc3luYyBmdW5jdGlvbiAoZG9jOiBPRG9jdW1lbnQpIDogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLmRvY3VtZW50cy5wdXNoKGRvYylcclxuICAgIGF3YWl0IHRoaXMuc2F2ZSgpLmNhdGNoKChlcnIpID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxufVxyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLnJlbW92ZURvY3VtZW50ID0gYXN5bmMgZnVuY3Rpb24gKHR5cGU6IERvY1R5cGVzKSA6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBmb3IgKGxldCBpZHggaW4gdGhpcy5kb2NzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9jc1tpZHhdLnR5cGUgPT09IHR5cGUudmFsdWVPZigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlKHBhcnNlSW50KGlkeCksIDEpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG59XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMuYWRkUm91dGluZSA9IGFzeW5jIGZ1bmN0aW9uIChyb3V0aW5lOiBSb3V0aW5lKSA6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICByb3V0aW5lLm5hbWUgPSByb3V0aW5lLm5hbWUgKyBcIi9cIiArIHRoaXMuX2lkLnRvU3RyaW5nKClcclxuICAgIHRoaXMucm91dGluZXMucHVzaChyb3V0aW5lKVxyXG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgpXHJcbn1cclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy5yZW1vdmVSb3V0aW5lID0gYXN5bmMgZnVuY3Rpb24gKG5hbWU6IHN0cmluZykgOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgbmFtZSA9IG5hbWUgKyBcIi9cIiArIHRoaXMuX2lkLnRvU3RyaW5nKClcclxuICAgIHRoaXMucm91dGluZXMgPSB0aGlzLnJvdXRpbmVzLmZpbHRlcigoZWxlbTogUm91dGluZVN1YkRvY3VtZW50KSA9PiBlbGVtLm5hbWUgIT09IG5hbWUpXHJcbiAgICByZXR1cm4gdGhpcy5zYXZlKClcclxufVxyXG5cclxuXHJcbi8qIE1FVEhPRFMgRk9SIFBBU1NXT1JEIE1BTklQVUxBVElPTiBBTkQgVkFMSURBVElPTiAqL1xyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLnNldFBhc3N3b3JkID0gYXN5bmMgZnVuY3Rpb24gKHB3ZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGNvbnN0IHNhbHQ6IHN0cmluZyA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5nZW5TYWx0KDEwKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignRXJyb3Igd2l0aCBzYWx0IGdlbmVyYXRpb24nKSlcclxuICAgICAgICApO1xyXG5cclxuICAgIGNvbnN0IHB3ZEhhc2ggPSBhd2FpdCBiY3J5cHRcclxuICAgICAgICAuaGFzaChwd2QsIHNhbHQpXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT5cclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdFcnJvciB3aXRoIHBhc3N3b3JkIGVuY3J5cHRpb24nKSlcclxuICAgICAgICApO1xyXG5cclxuICAgIHRoaXMuc2FsdCA9IHNhbHQ7XHJcbiAgICB0aGlzLnB3ZF9oYXNoID0gcHdkSGFzaDtcclxuICAgIHJldHVybiB0aGlzLnNhdmUoKTtcclxufTtcclxuXHJcblVzZXJTY2hlbWEubWV0aG9kcy52YWxpZGF0ZVBhc3N3b3JkID0gYXN5bmMgZnVuY3Rpb24gKHB3ZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICBjb25zdCBoYXNoZWRQdyA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5oYXNoKHB3ZCwgdGhpcy5zYWx0KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignRXJyb3Igd2l0aCBwYXNzd29yZCBlbmNyeXB0aW9uJykpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5wd2RfaGFzaCA9PT0gaGFzaGVkUHc7XHJcbn07XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMucmVtb3ZlUm9sZSA9IGFzeW5jIGZ1bmN0aW9uIChyb2xlOiBVc2VyUm9sZXMpOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgZm9yIChjb25zdCBpZHggaW4gdGhpcy5yb2xlcykge1xyXG4gICAgICAgIGlmICh0aGlzLnJvbGVzW2lkeF0gPT09IHJvbGUudmFsdWVPZigpKSB0aGlzLnJvbGVzLnNwbGljZShwYXJzZUludChpZHgpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5zYXZlKCk7XHJcbn07XHJcblxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMuaGFzUm9sZSA9IGZ1bmN0aW9uIChyb2xlOiBVc2VyUm9sZXMpOiBib29sZWFuIHtcclxuICAgIGZvciAobGV0IGlkeCBpbiB0aGlzLnJvbGVzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucm9sZXNbaWR4XSA9PSByb2xlLnZhbHVlT2YoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuVXNlclNjaGVtYS5tZXRob2RzLnNldFJvbGUgPSBhc3luYyBmdW5jdGlvbiAocm9sZTogVXNlclJvbGVzKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIGlmICghdGhpcy5oYXNSb2xlKHJvbGUpKSB7XHJcbiAgICAgICAgdGhpcy5yb2xlcy5wdXNoKHJvbGUudmFsdWVPZigpKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5zYXZlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdSb2xlIGFscmVhZHkgc2V0JykpO1xyXG59O1xyXG5cclxuLy8gQ3JlYXRlIFwiVXNlcnNcIiBjb2xsZWN0aW9uXHJcbmV4cG9ydCBjb25zdCBVc2VyTW9kZWw6IE1vZGVsPFVzZXJEb2N1bWVudD4gPSBtb25nb29zZS5tb2RlbCgnVXNlcicsIFVzZXJTY2hlbWEsICdVc2VycycpO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCeUlkKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgdXNlckRvYyA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHsgX2lkOiB1c2VySWQgfSkuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gIXVzZXJEb2NcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHVzZXJEb2MpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckJ5Tmlja25hbWUobmlja25hbWU6IHN0cmluZyk6IFByb21pc2U8VXNlckRvY3VtZW50PiB7XHJcbiAgICBjb25zdCB1c2VyZGF0YSA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHsgbmlja25hbWUgfSkuY2F0Y2goKGVycikgPT4gXHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuICF1c2VyZGF0YVxyXG4gICAgICAgID8gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUodXNlcmRhdGEpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVXNlcihkYXRhOiBBbnlLZXlzPFVzZXJEb2N1bWVudD4pOiBQcm9taXNlPFVzZXJEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgdXNlcjogVXNlckRvY3VtZW50ID0gbmV3IFVzZXJNb2RlbChkYXRhKTtcclxuICAgIHJldHVybiB1c2VyLnNhdmUoKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlVXNlcihmaWx0ZXI6IEZpbHRlclF1ZXJ5PFVzZXJEb2N1bWVudD4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IG9iajogeyBkZWxldGVkQ291bnQ/OiBudW1iZXIgfSA9IGF3YWl0IFVzZXJNb2RlbC5kZWxldGVPbmUoZmlsdGVyKS5jYXRjaCgoZXJyKSA9PlxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAhb2JqLmRlbGV0ZWRDb3VudFxyXG4gICAgICAgID8gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZU5pY2tOYW1lKF9pZDogVHlwZXMuT2JqZWN0SWQsIG5pY2tuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGF3YWl0IFVzZXJNb2RlbC51cGRhdGVPbmUoeyBfaWQgfSwgeyBuaWNrbmFtZSB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQYXNzd29yZChfaWQ6IFR5cGVzLk9iamVjdElkLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdXNlcjogVXNlckRvY3VtZW50O1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQoX2lkKTtcclxuICAgICAgICBhd2FpdCB1c2VyLnNldFBhc3N3b3JkKHBhc3N3b3JkKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlclN0YXRzKF9pZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPFVzZXJTdGF0cz4ge1xyXG4gICAgY29uc3Qgc3RhdCA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHsgX2lkIH0sIHsgc3RhdHM6IDEgfSkuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gIXN0YXRcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHN0YXQuc3RhdHMpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHVzZXJJZCBpZCBvZiB0aGUgdXNlciB0byB1cGRhdGVcclxuICogQHBhcmFtIHVwZGF0ZWRTdGF0cyBvYmplY3QgY29udGFpbmluZyB0aGUgdXBkYXRlZCBzdGF0cyBvZiB0aGUgdXNlclxyXG4gKi9cclxuIGV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVVc2VyU3RhdHMoXHJcbiAgICB1c2VySWQ6IFR5cGVzLk9iamVjdElkLFxyXG4gICAgdXBkYXRlZFN0YXRzOiBVc2VyU3RhdHNcclxuKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdXNlcjogVXNlckRvY3VtZW50ID0gYXdhaXQgZ2V0VXNlckJ5SWQodXNlcklkKTtcclxuICAgICAgICB1c2VyLnN0YXRzLnRocm9waWVzID0gdXBkYXRlZFN0YXRzLnRocm9waWVzO1xyXG4gICAgICAgIHVzZXIuc3RhdHMuc2F1Y2UgPSB1cGRhdGVkU3RhdHMuc2F1Y2U7XHJcbiAgICAgICAgcmV0dXJuIHVzZXIuc2F2ZSgpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVUaGVtZSh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCB0aGVtZTogc3RyaW5nKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgdHJ5IHtcclxuICAgICAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQodXNlcklkKVxyXG4gICAgICAgIHVzZXIuc2V0dGluZy50aGVtZSA9IHRoZW1lXHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlU2l6ZSh1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBzaXplOiBudW1iZXIpIDogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdXNlcjogVXNlckRvY3VtZW50XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpXHJcbiAgICAgICAgdXNlci5zZXR0aW5nLnNpemUgPSBzaXplXHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGFuZ3VhZ2UodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgbGFuOiBzdHJpbmcpIDogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdXNlcjogVXNlckRvY3VtZW50XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpXHJcbiAgICAgICAgdXNlci5zZXR0aW5nLmxhbmd1YWdlID0gbGFuXHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlR2FtaWZpY2F0aW9uKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIHN3dDogYm9vbGVhbikgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB1c2VyOiBVc2VyRG9jdW1lbnRcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuICAgICAgICB1c2VyLnNldHRpbmcuZ2FtaWZpY2F0aW9uSGlkZSA9IHN3dFxyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJvdXRpbmVOYW1lKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIG9sZE5hbWU6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdXNlcjogVXNlckRvY3VtZW50XHJcbiAgICBvbGROYW1lID0gb2xkTmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuICAgIG5ld05hbWUgPSBuZXdOYW1lICsgXCIvXCIgKyB1c2VySWQudG9TdHJpbmcoKVxyXG4gICAgdHJ5IHtcclxuICAgICAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQodXNlcklkKVxyXG4gICAgICAgIHVzZXIucm91dGluZXMuZm9yRWFjaCgoZWxlbSwgaWR4LCB2ZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtLm5hbWUgPT09IG9sZE5hbWUpIHZlY3RbaWR4XS5uYW1lID0gbmV3TmFtZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlUm91dGluZVRlbXBlcmF0dXJlKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQsIHJvdXRpbmVOYW1lOiBzdHJpbmcsIHRlbXA6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgcm91dGluZU5hbWUgPSByb3V0aW5lTmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuICAgICAgICB1c2VyLnJvdXRpbmVzLmZvckVhY2goKGVsZW0sIGlkeCwgdmVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWxlbS5uYW1lID09PSByb3V0aW5lTmFtZSkgdmVjdFtpZHhdLnRlbXBlcmF0dXJlID0gdGVtcFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyB0aGlzIHByb2JhYmx5IG5lZWRzIHRvIGJlIHdyaXR0ZW4gYWdhaW4gXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVSb3V0aW5lTGlnaHRzQ29sb3IodXNlcklkOiBUeXBlcy5PYmplY3RJZCwgcm91dGluZU5hbWU6IHN0cmluZywgY29sb3I6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgcm91dGluZU5hbWUgPSByb3V0aW5lTmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuICAgICAgICB1c2VyLnJvdXRpbmVzLmZvckVhY2goKGVsZW0sIGlkeCwgdmVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWxlbS5uYW1lID09PSByb3V0aW5lTmFtZSkgdmVjdFtpZHhdLmxpZ2h0c0NvbG9yID0gY29sb3JcclxuICAgICAgICB9KVxyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVSb3V0aW5lTXVzaWMoXHJcbiAgICB1c2VySWQ6IFR5cGVzLk9iamVjdElkLCBcclxuICAgIHJvdXRpbmVOYW1lOiBzdHJpbmcsIFxyXG4gICAgbXVzaWNUb0FkZDogc3RyaW5nW10gPSBbXSwgXHJcbiAgICBtdXNpY1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdXHJcbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudFxyXG4gICAgcm91dGluZU5hbWUgPSByb3V0aW5lTmFtZSArIFwiL1wiICsgdXNlcklkLnRvU3RyaW5nKClcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuICAgICAgICBpZiAobXVzaWNUb1JlbW92ZS5sZW5ndGgpIHJlbW92ZU11c2ljKHVzZXIsIHJvdXRpbmVOYW1lLCBtdXNpY1RvUmVtb3ZlKVxyXG4gICAgICAgIGlmIChtdXNpY1RvQWRkLmxlbmd0aCkgYWRkTXVzaWModXNlciwgcm91dGluZU5hbWUsIG11c2ljVG9BZGQpXHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpKVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVNdXNpYyh1c2VyOiBVc2VyRG9jdW1lbnQsIHJvdXRpbmVOYW1lOiBzdHJpbmcsIG11c2ljVG9SZW1vdmU6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICB2YXIgaWR4OiBudW1iZXIgPSAtMVxyXG4gICAgZG8ge1xyXG4gICAgICAgIGlkeCArK1xyXG4gICAgICAgIGlmICh1c2VyLnJvdXRpbmVzW2lkeF0ubmFtZSA9PT0gcm91dGluZU5hbWUpIHtcclxuICAgICAgICAgICAgdXNlci5yb3V0aW5lc1tpZHhdLm11c2ljID0gdXNlci5yb3V0aW5lc1tpZHhdLm11c2ljLmZpbHRlcigoZWxlbTogc3RyaW5nKSA9PiAhKG11c2ljVG9SZW1vdmUuaW5jbHVkZXMoZWxlbSkpKVxyXG4gICAgICAgIH1cclxuICAgIH0gd2hpbGUoaWR4IDwgdXNlci5yb3V0aW5lcy5sZW5ndGggJiYgdXNlci5yb3V0aW5lc1tpZHhdLm5hbWUgIT09IHJvdXRpbmVOYW1lKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRNdXNpYyh1c2VyOiBVc2VyRG9jdW1lbnQsIHJvdXRpbmVOYW1lOiBzdHJpbmcsIG11c2ljVG9BZGQ6IHN0cmluZ1tdKSB7XHJcbiAgICBmb3IgKHZhciBpZHggaW4gdXNlci5yb3V0aW5lcykge1xyXG4gICAgICAgIGlmICh1c2VyLnJvdXRpbmVzW2lkeF0ubmFtZSA9PT0gcm91dGluZU5hbWUpIHVzZXIucm91dGluZXNbaWR4XS5tdXNpYy5wdXNoKC4uLm11c2ljVG9BZGQpXHJcbiAgICB9XHJcbn1cclxuIl19