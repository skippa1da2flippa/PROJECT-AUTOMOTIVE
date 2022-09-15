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
exports.getFullVehicleData = exports.getUserVehicle = exports.removeEnjoyer = exports.changeOwner = exports.updateVehiclePsw = exports.addEnjoyer = exports.setVehicleStatus = exports.updatePassword = exports.getVehiclesByUserId = exports.deleteVehicle = exports.createVehicle = exports.getVehicleById = exports.VehicleModel = exports.myVehicleSchema = exports.VehicleStatus = exports.ModelTypes = void 0;
var mongoose = __importStar(require("mongoose"));
var mongoose_1 = require("mongoose");
var __1 = require("../..");
var enjoyer_request_emitter_1 = require("../../events/emitters/enjoyer-request-emitter");
var legalInfos_1 = require("./legalInfos");
var server_error_1 = require("../errors/server-error");
var user_1 = require("./user");
var bcrypt_1 = __importDefault(require("bcrypt"));
/*
    This collection is thought not to be an embedded document due to the fact that many users can use the same Vehicle, setting this schema as
    a normal collection will probably allow us to code faster while devolping who can control the Vehicle through this app
*/
var ModelTypes;
(function (ModelTypes) {
    ModelTypes["projectZ"] = "projectZ";
    // cars names
})(ModelTypes = exports.ModelTypes || (exports.ModelTypes = {}));
var VehicleStatus;
(function (VehicleStatus) {
    VehicleStatus["Offline"] = "Offline";
    VehicleStatus["Online"] = "Online";
})(VehicleStatus = exports.VehicleStatus || (exports.VehicleStatus = {}));
// TO DO implement remove owner/change owner in a safe way
exports.myVehicleSchema = new mongoose_1.Schema({
    type: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        index: true,
        enum: [ModelTypes.projectZ.valueOf()]
    },
    owner: {
        type: mongoose_1.SchemaTypes.ObjectId,
        required: true
    },
    salt: {
        type: mongoose_1.SchemaTypes.String,
        required: false
    },
    pwd_hash: {
        type: mongoose_1.SchemaTypes.String,
        required: false
    },
    legalInfos: {
        type: legalInfos_1.LegalInfosSchema,
        default: function () { return ({}); }
    },
    enjoyers: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        default: []
    },
    status: {
        type: mongoose_1.SchemaTypes.String,
        default: VehicleStatus.Offline
    }
}, { timestamps: true });
exports.myVehicleSchema.methods.setPassword = function (pwd) {
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
exports.myVehicleSchema.methods.validatePassword = function (pwd) {
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
exports.VehicleModel = mongoose.model('MyVehicle', exports.myVehicleSchema, 'MyVehicles');
function getVehicleById(vehicleId) {
    return __awaiter(this, void 0, void 0, function () {
        var carDoc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.VehicleModel.findOne({ _id: vehicleId }).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError('Internal server error'));
                    })];
                case 1:
                    carDoc = _a.sent();
                    return [2 /*return*/, !carDoc
                            ? Promise.reject(new server_error_1.ServerError('No vehicle with that identifier'))
                            : Promise.resolve(carDoc)];
            }
        });
    });
}
exports.getVehicleById = getVehicleById;
function createVehicle(data) {
    return __awaiter(this, void 0, void 0, function () {
        var vehicle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vehicle = new exports.VehicleModel(data);
                    return [4 /*yield*/, vehicle.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError("Server internal error")); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve(vehicle._id)];
            }
        });
    });
}
exports.createVehicle = createVehicle;
function deleteVehicle(filter) {
    return __awaiter(this, void 0, void 0, function () {
        var vehicle, _a, _b, _i, idx, err_1, obj;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, getVehicleById(filter._id)];
                case 1:
                    vehicle = _c.sent();
                    _a = [];
                    for (_b in vehicle.enjoyers)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    idx = _a[_i];
                    return [4 /*yield*/, (0, user_1.removeUserEnjoyedVehicle)(vehicle.enjoyers[idx], vehicle._id)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _c.sent();
                    return [2 /*return*/, Promise.reject(err_1)];
                case 7: return [4 /*yield*/, exports.VehicleModel.deleteOne(filter).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError('Internal server error'));
                    })];
                case 8:
                    obj = _c.sent();
                    return [2 /*return*/, !obj.deletedCount
                            ? Promise.reject(new server_error_1.ServerError('No vehicle with that identifier'))
                            : Promise.resolve()];
            }
        });
    });
}
exports.deleteVehicle = deleteVehicle;
function getVehiclesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var vehicles, projectVehicles, _i, vehicles_1, vehicle, _a, _b, err_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    vehicles = [];
                    projectVehicles = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, exports.VehicleModel.find()
                        // TODO un giorno forse si mettera meglio
                    ];
                case 2:
                    vehicles = _c.sent();
                    // TODO un giorno forse si mettera meglio
                    vehicles = vehicles.filter(function (elem) { return elem.owner.toString() === userId.toString(); });
                    _i = 0, vehicles_1 = vehicles;
                    _c.label = 3;
                case 3:
                    if (!(_i < vehicles_1.length)) return [3 /*break*/, 6];
                    vehicle = vehicles_1[_i];
                    _b = (_a = projectVehicles).push;
                    return [4 /*yield*/, getFullVehicleData(vehicle._id)];
                case 4:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_2 = _c.sent();
                    return [2 /*return*/, Promise.reject(new server_error_1.ServerError('Internal server error'))];
                case 8: return [2 /*return*/, projectVehicles.length
                        ? Promise.resolve(projectVehicles)
                        : Promise.reject(new server_error_1.ServerError("No vehicles related to the user"))];
            }
        });
    });
}
exports.getVehiclesByUserId = getVehiclesByUserId;
function updatePassword(_id, password) {
    return __awaiter(this, void 0, void 0, function () {
        var vehicle, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getVehicleById(_id)];
                case 1:
                    vehicle = _a.sent();
                    return [4 /*yield*/, vehicle.setPassword(password)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_3)];
                case 4: return [2 /*return*/, Promise.resolve()];
            }
        });
    });
}
exports.updatePassword = updatePassword;
var setVehicleStatus = function (vehicleId, newStatus) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        result = exports.VehicleModel.findByIdAndUpdate(vehicleId, {
            status: newStatus
        }).catch(function (err) { return Promise.reject(new server_error_1.ServerError('Internal server error')); });
        return [2 /*return*/, result
                ? Promise.resolve()
                : Promise.reject(new server_error_1.ServerError('No vehicle with that identifier'))];
    });
}); };
exports.setVehicleStatus = setVehicleStatus;
/**
 * This function add a userId to the 'enjoyers' array
 * @param vehicleId represents the vehicle to update
 * @param enjoyerId represent the enjoyer id to insert
 * @param enjoyerName represents enjoyer name
 * @param enjoyerSurname represents enjoyer surname
 * @param ioServer used to implement web socket connection
 * @param onComplete used to send a response
 */
function addEnjoyer(vehicleId, enjoyerId, enjoyerName, enjoyerSurname, ioServer, onComplete) {
    return __awaiter(this, void 0, void 0, function () {
        var vehicle, res, temp, flag, tedis, enjoyerReqEmitter, idx, interval;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res = "";
                    flag = false;
                    return [4 /*yield*/, __1.pool.getTedis()];
                case 1:
                    tedis = _a.sent();
                    return [4 /*yield*/, getVehicleById(vehicleId)];
                case 2:
                    vehicle = _a.sent();
                    enjoyerReqEmitter = new enjoyer_request_emitter_1.EnjoyerRequestEmitter(ioServer, vehicle.owner);
                    for (idx in vehicle.enjoyers) {
                        if (vehicle.enjoyers[idx].toString() === enjoyerId.toString())
                            return [2 /*return*/, Promise.reject(new server_error_1.ServerError("Users already inside the enjoyers"))];
                    }
                    enjoyerReqEmitter.emit({
                        enjoyerId: enjoyerId.toString(),
                        enjoyerName: enjoyerName,
                        enjoyerSurname: enjoyerSurname,
                        vehicleId: vehicleId.toString(),
                        vehicleModel: vehicle.type
                    });
                    interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!flag) return [3 /*break*/, 7];
                                    return [4 /*yield*/, tedis.get(vehicle.owner.toString())];
                                case 1:
                                    res = !(temp = _a.sent()) ? "" : temp;
                                    if (!(res === "true")) return [3 /*break*/, 5];
                                    return [4 /*yield*/, exports.VehicleModel.findByIdAndUpdate(vehicleId, {
                                            $push: { enjoyers: enjoyerId }
                                        }).catch(function (err) { return Promise.reject(new server_error_1.ServerError("Internal server error")); })];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, (0, user_1.updateUserEnjoyedVehicle)(enjoyerId, vehicleId)];
                                case 3:
                                    _a.sent();
                                    flag = true;
                                    return [4 /*yield*/, tedis.del(vehicle.owner.toString()).catch(function (err) {
                                            console.log("tedis sbanfa");
                                        })];
                                case 4:
                                    _a.sent();
                                    __1.pool.putTedis(tedis);
                                    clearInterval(interval);
                                    onComplete(res);
                                    return [3 /*break*/, 7];
                                case 5:
                                    if (!(res === "false")) return [3 /*break*/, 7];
                                    flag = true;
                                    return [4 /*yield*/, tedis.del(vehicle.owner.toString()).catch(function (err) {
                                            console.log("tedis sbanfa");
                                        })];
                                case 6:
                                    _a.sent();
                                    __1.pool.putTedis(tedis);
                                    clearInterval(interval);
                                    onComplete(res);
                                    _a.label = 7;
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); }, 5000);
                    setTimeout(function () {
                        clearInterval(interval);
                    }, 15000);
                    return [2 /*return*/];
            }
        });
    });
}
exports.addEnjoyer = addEnjoyer;
function updateVehiclePsw(vehicleId, psw) {
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
                    return [4 /*yield*/, exports.VehicleModel.findByIdAndUpdate(vehicleId, {
                            salt: salt,
                            pwd_hash: pwdHash
                        }).catch(function (err) { return Promise.reject(new server_error_1.ServerError("Internal server error")); })];
                case 3:
                    result = _a.sent();
                    if (!result)
                        return [2 /*return*/, Promise.reject(new server_error_1.ServerError("No vehicle with that identifier"))];
                    return [2 /*return*/, Promise.resolve()];
            }
        });
    });
}
exports.updateVehiclePsw = updateVehiclePsw;
function changeOwner(vehicleId, ownerId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.VehicleModel.findByIdAndUpdate(vehicleId, {
                        owner: ownerId
                    }).catch(function (err) { return Promise.reject(new server_error_1.ServerError("Internal server error")); })];
                case 1:
                    result = _a.sent();
                    if (!result)
                        return [2 /*return*/, Promise.reject(new server_error_1.ServerError("No vehicle with that identifier"))];
                    if (result.owner === ownerId)
                        return [2 /*return*/, Promise.reject(new server_error_1.ServerError("User already owner of the car"))];
                    return [2 /*return*/, Promise.resolve()];
            }
        });
    });
}
exports.changeOwner = changeOwner;
function removeEnjoyer(vehicleId, enjoyerId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.VehicleModel.findByIdAndUpdate(vehicleId, {
                        $pull: { enjoyers: enjoyerId }
                    }).catch(function (err) { return Promise.reject(new server_error_1.ServerError("Internal server error")); })];
                case 1:
                    result = _a.sent();
                    if (!result)
                        return [2 /*return*/, Promise.reject(new server_error_1.ServerError("No vehicle with that identifier"))];
                    return [4 /*yield*/, (0, user_1.removeUserEnjoyedVehicle)(enjoyerId, vehicleId).catch(function (err) { return err; })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
            }
        });
    });
}
exports.removeEnjoyer = removeEnjoyer;
function getUserVehicle(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, user_1.getUserById)(userId)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, {
                            name: user.name,
                            status: user.status,
                            surname: user.surname,
                            userId: user._id,
                            email: user.email,
                            nickname: user.nickname
                        }];
            }
        });
    });
}
exports.getUserVehicle = getUserVehicle;
function getFullVehicleData(vehicleId) {
    return __awaiter(this, void 0, void 0, function () {
        var enjoyers, vehicle, owner, _a, _b, _i, idx, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    enjoyers = [];
                    return [4 /*yield*/, getVehicleById(vehicleId)];
                case 1:
                    vehicle = _e.sent();
                    return [4 /*yield*/, getUserVehicle(vehicle.owner)];
                case 2:
                    owner = _e.sent();
                    _a = [];
                    for (_b in vehicle.enjoyers)
                        _a.push(_b);
                    _i = 0;
                    _e.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    idx = _a[_i];
                    _d = (_c = enjoyers).push;
                    return [4 /*yield*/, getUserVehicle(vehicle.enjoyers[idx])];
                case 4:
                    _d.apply(_c, [_e.sent()]);
                    _e.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/, {
                        vehicleId: vehicle._id,
                        owner: owner,
                        status: vehicle.status,
                        legalInfos: vehicle.legalInfos,
                        enjoyers: enjoyers,
                        type: vehicle.type
                    }];
            }
        });
    });
}
exports.getFullVehicleData = getFullVehicleData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktdmVoaWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS9teS12ZWhpY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBQ3JDLHFDQUE2RjtBQUU3RiwyQkFBNkI7QUFDN0IseUZBQXNGO0FBQ3RGLDJDQUFrRjtBQUNsRix1REFBb0Q7QUFDcEQsK0JBT2dCO0FBQ2hCLGtEQUE0QjtBQUs1Qjs7O0VBR0U7QUFHRixJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDbEIsbUNBQXFCLENBQUE7SUFDckIsYUFBYTtBQUNqQixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFFRCxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDckIsb0NBQW1CLENBQUE7SUFDbkIsa0NBQWlCLENBQUE7QUFDckIsQ0FBQyxFQUhXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBR3hCO0FBa0VELDBEQUEwRDtBQUc3QyxRQUFBLGVBQWUsR0FBRyxJQUFJLGlCQUFNLENBQ3JDO0lBQ0ksSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHNCQUFXLENBQUMsTUFBTTtRQUN4QixRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN4QztJQUVELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxzQkFBVyxDQUFDLFFBQVE7UUFDMUIsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFFRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsc0JBQVcsQ0FBQyxNQUFNO1FBQ3hCLFFBQVEsRUFBRSxLQUFLO0tBQ2xCO0lBRUQsUUFBUSxFQUFFO1FB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ckIsRUFBQTs7OztDQUVKO0FBcEJELGdEQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHsgQW55S2V5cywgRG9jdW1lbnQsIEZpbHRlclF1ZXJ5LCBNb2RlbCwgU2NoZW1hLCBTY2hlbWFUeXBlcywgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gJ3NvY2tldC5pbyc7XHJcbmltcG9ydCB7IHBvb2wgfSBmcm9tICcuLi8uLic7XHJcbmltcG9ydCB7IEVuam95ZXJSZXF1ZXN0RW1pdHRlciB9IGZyb20gJy4uLy4uL2V2ZW50cy9lbWl0dGVycy9lbmpveWVyLXJlcXVlc3QtZW1pdHRlcic7XHJcbmltcG9ydCB7IExlZ2FsSW5mb3MsIExlZ2FsSW5mb3NTY2hlbWEsIExlZ2FsSW5mb3NTdWJEb2N1bWVudCB9IGZyb20gJy4vbGVnYWxJbmZvcydcclxuaW1wb3J0IHsgU2VydmVyRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL3NlcnZlci1lcnJvclwiXHJcbmltcG9ydCB7XHJcbiAgICBnZXRVc2VyQnlJZCxcclxuICAgIHJlbW92ZVVzZXJFbmpveWVkVmVoaWNsZSxcclxuICAgIHVwZGF0ZVVzZXJFbmpveWVkVmVoaWNsZSxcclxuICAgIFVzZXJEb2N1bWVudCwgVXNlck1vZGVsLFxyXG4gICAgVXNlclNjaGVtYSxcclxuICAgIFVzZXJTdGF0dXNcclxufSBmcm9tICcuL3VzZXInO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRcIjtcclxuaW1wb3J0IHtVc2VyVmVoaWNsZX0gZnJvbSBcIi4uLy4uL3JvdXRlcy9teS12ZWhpY2xlLXJvdXRlc1wiO1xyXG5pbXBvcnQge015VmVoaWNsZX0gZnJvbSBcIi4uLy4uL3JvdXRlcy91c2VyLXJvdXRlc1wiO1xyXG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5cclxuLypcclxuICAgIFRoaXMgY29sbGVjdGlvbiBpcyB0aG91Z2h0IG5vdCB0byBiZSBhbiBlbWJlZGRlZCBkb2N1bWVudCBkdWUgdG8gdGhlIGZhY3QgdGhhdCBtYW55IHVzZXJzIGNhbiB1c2UgdGhlIHNhbWUgVmVoaWNsZSwgc2V0dGluZyB0aGlzIHNjaGVtYSBhcyBcclxuICAgIGEgbm9ybWFsIGNvbGxlY3Rpb24gd2lsbCBwcm9iYWJseSBhbGxvdyB1cyB0byBjb2RlIGZhc3RlciB3aGlsZSBkZXZvbHBpbmcgd2hvIGNhbiBjb250cm9sIHRoZSBWZWhpY2xlIHRocm91Z2ggdGhpcyBhcHBcclxuKi9cclxuXHJcblxyXG5leHBvcnQgZW51bSBNb2RlbFR5cGVzIHtcclxuICAgIHByb2plY3RaID0gJ3Byb2plY3RaJ1xyXG4gICAgLy8gY2FycyBuYW1lc1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBWZWhpY2xlU3RhdHVzIHtcclxuICAgIE9mZmxpbmUgPSAnT2ZmbGluZScsXHJcbiAgICBPbmxpbmUgPSAnT25saW5lJ1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHByb2plY3RWZWhpY2xlIHtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBjYXIgbW9kZWwgXHJcbiAgICAgKi9cclxuICAgIHR5cGU6IE1vZGVsVHlwZXMsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIGNhciBoYXMgYSBwYXNzd29yZCBiZWNhdXNlOlxyXG4gICAgICogYWNjZXNzIHRvIGhpcyBvd24gcm91dGUgYW5kIHJlY2VpdmUgaXRzIHRva2VuIGJ5IGxvZ2dpbmcgaW4gd2l0aCBpdHMgaWQgYW5kIGl0cyBwc3dcclxuICAgICAqIFBTIHZlaGljbGUgcHN3IGlzIG1lYW50IHRvIGJlIGtub3duIGp1c3QgdG8gdGhlIHZlaGljbGVcclxuICAgICAqICovXHJcbiAgICBwd2RfaGFzaDogc3RyaW5nO1xyXG5cclxuICAgIHNhbHQ6IHN0cmluZztcclxuXHJcbiAgICBzdGF0dXM6IFZlaGljbGVTdGF0dXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBjYXIgb3duZXJcclxuICAgICAqL1xyXG4gICAgb3duZXI6IFR5cGVzLk9iamVjdElkLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBvdGhlciB1c2VycyBkaWZmZXJlbnQgZnJvbSB0aGUgb3duZXIgd2hvIGhhdmUgYWNjZXNzIHRvIHRoZSBjYXJcclxuICAgICAqL1xyXG4gICAgZW5qb3llcnM6IFR5cGVzLk9iamVjdElkW10sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGxlZ2FsIGluZm8gYWJvdXQgdGhlIGNhclxyXG4gICAgICovXHJcbiAgICBsZWdhbEluZm9zOiBMZWdhbEluZm9zXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRlIHRoYXQgdGhlIG5vdGlmaWNhdGlvbiB3YXMgY3JlYXRlZCBhdC5cclxuICAgICAqIEl0IGlzIGF1dG9tYXRpY2FsbHkgaW5zZXJ0ZWQgYnkgdGhlIGRhdGFiYXNlXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZWRBdD86IERhdGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRlIHRoYXQgdGhlIG5vdGlmaWNhdGlvbiB3YXMgbGFzdCB1cGRhdGVkIGF0LlxyXG4gICAgICogSXQgaXMgYXV0b21hdGljYWxseSBpbnNlcnRlZCBhbmQgdXBkYXRlZCBieSB0aGUgZGF0YWJhc2VcclxuICAgICAqL1xyXG4gICAgdXBkYXRlZEF0PzogRGF0ZTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdFZlaGljbGVEb2N1bWVudCBleHRlbmRzIHByb2plY3RWZWhpY2xlLCBEb2N1bWVudCB7XHJcbiAgICBsZWdhbEluZm9zOiBMZWdhbEluZm9zU3ViRG9jdW1lbnQ7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGEgbmV3IHBhc3N3b3JkIHVzaW5nIGJjcnlwdCBoYXNoaW5nIGFuZCBzYWx0IGdlbmVyYXRpb24gZnVuY3Rpb25zXHJcbiAgICAgKiBAcGFyYW0gcHdkIG5ldyBwYXNzd29yZCB0byBzZXRcclxuICAgICAqL1xyXG4gICAgc2V0UGFzc3dvcmQocHdkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJEb2N1bWVudD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayB0aGUgdmFsaWRpdHkgb2YgdGhlIHBhc3N3b3JkIHdpdGggdGhlIG9uZSBzdG9yZWQgb24gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcGFyYW0gcHdkIHRoZSBwYXNzd29yZCB0byBjaGVja1xyXG4gICAgICovXHJcbiAgICB2YWxpZGF0ZVBhc3N3b3JkKHB3ZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcclxufVxyXG5cclxuLy8gVE8gRE8gaW1wbGVtZW50IHJlbW92ZSBvd25lci9jaGFuZ2Ugb3duZXIgaW4gYSBzYWZlIHdheVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBteVZlaGljbGVTY2hlbWEgPSBuZXcgU2NoZW1hPFByb2plY3RWZWhpY2xlRG9jdW1lbnQ+KFxyXG4gICAge1xyXG4gICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgaW5kZXg6IHRydWUsXHJcbiAgICAgICAgICAgIGVudW06IFtNb2RlbFR5cGVzLnByb2plY3RaLnZhbHVlT2YoKV1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvd25lcjoge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5PYmplY3RJZCxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzYWx0OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHdkX2hhc2g6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsZWdhbEluZm9zOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IExlZ2FsSW5mb3NTY2hlbWEsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+ICh7fSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbmpveWVyczoge1xyXG4gICAgICAgICAgICB0eXBlOiBbU2NoZW1hVHlwZXMuT2JqZWN0SWRdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXR1czoge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFZlaGljbGVTdGF0dXMuT2ZmbGluZVxyXG4gICAgICAgIH1cclxuICAgIH0sIFxyXG4gICAge3RpbWVzdGFtcHM6IHRydWV9XHJcbilcclxuXHJcblxyXG5cclxubXlWZWhpY2xlU2NoZW1hLm1ldGhvZHMuc2V0UGFzc3dvcmQgPSBhc3luYyBmdW5jdGlvbiAocHdkOiBzdHJpbmcpOiBQcm9taXNlPFByb2plY3RWZWhpY2xlRG9jdW1lbnQ+IHtcclxuICAgIGNvbnN0IHNhbHQ6IHN0cmluZyA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5nZW5TYWx0KDEwKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignRXJyb3Igd2l0aCBzYWx0IGdlbmVyYXRpb24nKSlcclxuICAgICAgICApO1xyXG5cclxuICAgIGNvbnN0IHB3ZEhhc2ggPSBhd2FpdCBiY3J5cHRcclxuICAgICAgICAuaGFzaChwd2QsIHNhbHQpXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT5cclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdFcnJvciB3aXRoIHBhc3N3b3JkIGVuY3J5cHRpb24nKSlcclxuICAgICAgICApO1xyXG5cclxuICAgIHRoaXMuc2FsdCA9IHNhbHQ7XHJcbiAgICB0aGlzLnB3ZF9oYXNoID0gcHdkSGFzaDtcclxuICAgIHJldHVybiB0aGlzLnNhdmUoKTtcclxufTtcclxuXHJcbm15VmVoaWNsZVNjaGVtYS5tZXRob2RzLnZhbGlkYXRlUGFzc3dvcmQgPSBhc3luYyBmdW5jdGlvbiAocHdkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIGNvbnN0IGhhc2hlZFB3ID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmhhc2gocHdkLCB0aGlzLnNhbHQpXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT5cclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdFcnJvciB3aXRoIHBhc3N3b3JkIGVuY3J5cHRpb24nKSlcclxuICAgICAgICApO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnB3ZF9oYXNoID09PSBoYXNoZWRQdztcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBWZWhpY2xlTW9kZWw6IE1vZGVsPFByb2plY3RWZWhpY2xlRG9jdW1lbnQ+ID0gbW9uZ29vc2UubW9kZWwoJ015VmVoaWNsZScsIG15VmVoaWNsZVNjaGVtYSwgJ015VmVoaWNsZXMnKTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRWZWhpY2xlQnlJZCh2ZWhpY2xlSWQ6IFR5cGVzLk9iamVjdElkKTogUHJvbWlzZTxQcm9qZWN0VmVoaWNsZURvY3VtZW50PiB7XHJcbiAgICBjb25zdCBjYXJEb2MgPSBhd2FpdCBWZWhpY2xlTW9kZWwuZmluZE9uZSh7IF9pZDogdmVoaWNsZUlkIH0pLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuICFjYXJEb2NcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdmVoaWNsZSB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKGNhckRvYyk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVWZWhpY2xlKGRhdGE6IEFueUtleXM8UHJvamVjdFZlaGljbGVEb2N1bWVudD4pOiBQcm9taXNlPFR5cGVzLk9iamVjdElkPiB7XHJcbiAgICBjb25zdCB2ZWhpY2xlOiBQcm9qZWN0VmVoaWNsZURvY3VtZW50ID0gbmV3IFZlaGljbGVNb2RlbChkYXRhKTtcclxuICAgIGF3YWl0IHZlaGljbGUuc2F2ZSgpLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJTZXJ2ZXIgaW50ZXJuYWwgZXJyb3JcIikpKVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2ZWhpY2xlLl9pZClcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVZlaGljbGUoZmlsdGVyOiBGaWx0ZXJRdWVyeTxQcm9qZWN0VmVoaWNsZURvY3VtZW50Pik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHZlaGljbGU6IFByb2plY3RWZWhpY2xlRG9jdW1lbnRcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdmVoaWNsZSA9IGF3YWl0IGdldFZlaGljbGVCeUlkKGZpbHRlci5faWQpXHJcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIHZlaGljbGUuZW5qb3llcnMpIHtcclxuICAgICAgICAgICAgYXdhaXQgcmVtb3ZlVXNlckVuam95ZWRWZWhpY2xlKHZlaGljbGUuZW5qb3llcnNbaWR4XSwgdmVoaWNsZS5faWQpXHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9iajogeyBkZWxldGVkQ291bnQ/OiBudW1iZXIgfSA9IGF3YWl0IFZlaGljbGVNb2RlbC5kZWxldGVPbmUoZmlsdGVyKS5jYXRjaCgoZXJyKSA9PlxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAhb2JqLmRlbGV0ZWRDb3VudFxyXG4gICAgICAgID8gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB2ZWhpY2xlIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoKTtcclxufSBcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRWZWhpY2xlc0J5VXNlcklkKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPE15VmVoaWNsZVtdPiB7XHJcbiAgICBsZXQgdmVoaWNsZXM6IFByb2plY3RWZWhpY2xlRG9jdW1lbnRbXSA9IFtdXHJcbiAgICBsZXQgcHJvamVjdFZlaGljbGVzOiBNeVZlaGljbGVbXSA9IFtdXHJcbiAgICB0cnkge1xyXG4gICAgICAgIHZlaGljbGVzID0gYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmQoKVxyXG5cclxuICAgICAgICAvLyBUT0RPIHVuIGdpb3JubyBmb3JzZSBzaSBtZXR0ZXJhIG1lZ2xpb1xyXG4gICAgICAgIHZlaGljbGVzID0gdmVoaWNsZXMuZmlsdGVyKGVsZW0gPT4gZWxlbS5vd25lci50b1N0cmluZygpID09PSB1c2VySWQudG9TdHJpbmcoKSlcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCB2ZWhpY2xlIG9mIHZlaGljbGVzKSB7XHJcbiAgICAgICAgICAgIHByb2plY3RWZWhpY2xlcy5wdXNoKGF3YWl0IGdldEZ1bGxWZWhpY2xlRGF0YSh2ZWhpY2xlLl9pZCkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByb2plY3RWZWhpY2xlcy5sZW5ndGhcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZShwcm9qZWN0VmVoaWNsZXMpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB2ZWhpY2xlcyByZWxhdGVkIHRvIHRoZSB1c2VyXCIpKVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQYXNzd29yZChfaWQ6IFR5cGVzLk9iamVjdElkLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdmVoaWNsZTogUHJvamVjdFZlaGljbGVEb2N1bWVudDtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdmVoaWNsZSA9IGF3YWl0IGdldFZlaGljbGVCeUlkKF9pZCk7XHJcbiAgICAgICAgYXdhaXQgdmVoaWNsZS5zZXRQYXNzd29yZChwYXNzd29yZCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBzZXRWZWhpY2xlU3RhdHVzID0gYXN5bmMgKFxyXG4gICAgdmVoaWNsZUlkOiBUeXBlcy5PYmplY3RJZCxcclxuICAgIG5ld1N0YXR1czogVmVoaWNsZVN0YXR1c1xyXG4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIC8vIFRPIERPIGVtaXQgdG8gdGhlIG93bmVyIHdoZW4gdGhlIHZlaGljbGUgY2hhbmdlIHN0YXR1cyA/XHJcbiAgICBsZXQgcmVzdWx0ID0gVmVoaWNsZU1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHZlaGljbGVJZCwge1xyXG4gICAgICAgIHN0YXR1czogbmV3U3RhdHVzXHJcbiAgICB9KS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSkpXHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdmVoaWNsZSB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZnVuY3Rpb24gYWRkIGEgdXNlcklkIHRvIHRoZSAnZW5qb3llcnMnIGFycmF5XHJcbiAqIEBwYXJhbSB2ZWhpY2xlSWQgcmVwcmVzZW50cyB0aGUgdmVoaWNsZSB0byB1cGRhdGVcclxuICogQHBhcmFtIGVuam95ZXJJZCByZXByZXNlbnQgdGhlIGVuam95ZXIgaWQgdG8gaW5zZXJ0XHJcbiAqIEBwYXJhbSBlbmpveWVyTmFtZSByZXByZXNlbnRzIGVuam95ZXIgbmFtZVxyXG4gKiBAcGFyYW0gZW5qb3llclN1cm5hbWUgcmVwcmVzZW50cyBlbmpveWVyIHN1cm5hbWVcclxuICogQHBhcmFtIGlvU2VydmVyIHVzZWQgdG8gaW1wbGVtZW50IHdlYiBzb2NrZXQgY29ubmVjdGlvblxyXG4gKiBAcGFyYW0gb25Db21wbGV0ZSB1c2VkIHRvIHNlbmQgYSByZXNwb25zZVxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZEVuam95ZXIoXHJcbiAgICB2ZWhpY2xlSWQ6IFR5cGVzLk9iamVjdElkLFxyXG4gICAgZW5qb3llcklkOiBUeXBlcy5PYmplY3RJZCxcclxuICAgIGVuam95ZXJOYW1lOiBzdHJpbmcsXHJcbiAgICBlbmpveWVyU3VybmFtZTogc3RyaW5nLFxyXG4gICAgaW9TZXJ2ZXI6IFNlcnZlcixcclxuICAgIG9uQ29tcGxldGU6IChyZXM6IHN0cmluZykgPT4gdm9pZCxcclxuKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHZlaGljbGU6IFByb2plY3RWZWhpY2xlRG9jdW1lbnRcclxuICAgIGxldCByZXM6IHN0cmluZyA9IFwiXCJcclxuICAgIGxldCB0ZW1wOiBhbnlcclxuICAgIGxldCBmbGFnOiBib29sZWFuID0gZmFsc2VcclxuICAgIGxldCB0ZWRpcyA9IGF3YWl0IHBvb2wuZ2V0VGVkaXMoKVxyXG5cclxuICAgIHZlaGljbGUgPSBhd2FpdCBnZXRWZWhpY2xlQnlJZCh2ZWhpY2xlSWQpXHJcblxyXG4gICAgY29uc3QgZW5qb3llclJlcUVtaXR0ZXI6IEVuam95ZXJSZXF1ZXN0RW1pdHRlciA9IG5ldyBFbmpveWVyUmVxdWVzdEVtaXR0ZXIoaW9TZXJ2ZXIsIHZlaGljbGUub3duZXIpXHJcblxyXG4gICAgZm9yIChsZXQgaWR4IGluIHZlaGljbGUuZW5qb3llcnMpIHtcclxuICAgICAgICBpZiAodmVoaWNsZS5lbmpveWVyc1tpZHhdLnRvU3RyaW5nKCkgPT09IGVuam95ZXJJZC50b1N0cmluZygpKVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiVXNlcnMgYWxyZWFkeSBpbnNpZGUgdGhlIGVuam95ZXJzXCIpKVxyXG4gICAgfVxyXG5cclxuICAgIGVuam95ZXJSZXFFbWl0dGVyLmVtaXQoe1xyXG4gICAgICAgIGVuam95ZXJJZDogZW5qb3llcklkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgZW5qb3llck5hbWU6IGVuam95ZXJOYW1lLFxyXG4gICAgICAgIGVuam95ZXJTdXJuYW1lOiBlbmpveWVyU3VybmFtZSxcclxuICAgICAgICB2ZWhpY2xlSWQ6IHZlaGljbGVJZC50b1N0cmluZygpLFxyXG4gICAgICAgIHZlaGljbGVNb2RlbDogdmVoaWNsZS50eXBlXHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICAgIHJlcyA9ICEodGVtcCA9IGF3YWl0IHRlZGlzLmdldCh2ZWhpY2xlLm93bmVyLnRvU3RyaW5nKCkpKSA/IFwiXCIgOiB0ZW1wIGFzIHN0cmluZ1xyXG4gICAgICAgICAgICBpZiAocmVzID09PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHZlaGljbGVJZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICRwdXNoOiB7IGVuam95ZXJzOiBlbmpveWVySWQgfVxyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB1cGRhdGVVc2VyRW5qb3llZFZlaGljbGUoZW5qb3llcklkLCB2ZWhpY2xlSWQpXHJcbiAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGVkaXMuZGVsKHZlaGljbGUub3duZXIudG9TdHJpbmcoKSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRlZGlzIHNiYW5mYVwiKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHBvb2wucHV0VGVkaXModGVkaXMpXHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKVxyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZShyZXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocmVzID09PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0ZWRpcy5kZWwodmVoaWNsZS5vd25lci50b1N0cmluZygpKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRlZGlzIHNiYW5mYVwiKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHBvb2wucHV0VGVkaXModGVkaXMpXHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKVxyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZShyZXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCA1MDAwKVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpXHJcbiAgICB9LCAxNTAwMClcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVWZWhpY2xlUHN3KHZlaGljbGVJZDogVHlwZXMuT2JqZWN0SWQsIHBzdzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzYWx0OiBzdHJpbmcgPSBhd2FpdCBiY3J5cHRcclxuICAgICAgICAuZ2VuU2FsdCgxMClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggc2FsdCBnZW5lcmF0aW9uJykpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICBjb25zdCBwd2RIYXNoID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmhhc2gocHN3LCBzYWx0KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignRXJyb3Igd2l0aCBwYXNzd29yZCBlbmNyeXB0aW9uJykpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHZlaGljbGVJZCwge1xyXG4gICAgICAgIHNhbHQ6IHNhbHQsXHJcbiAgICAgICAgcHdkX2hhc2g6IHB3ZEhhc2hcclxuICAgIH0pLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpKVxyXG5cclxuICAgIGlmICghcmVzdWx0KSByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdmVoaWNsZSB3aXRoIHRoYXQgaWRlbnRpZmllclwiKSlcclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGFuZ2VPd25lcih2ZWhpY2xlSWQ6IFR5cGVzLk9iamVjdElkLCBvd25lcklkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0ICBWZWhpY2xlTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodmVoaWNsZUlkLCB7XHJcbiAgICAgICAgIG93bmVyOiBvd25lcklkXHJcbiAgICB9KS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKSlcclxuXHJcbiAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHZlaGljbGUgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcblxyXG4gICAgaWYgKHJlc3VsdC5vd25lciA9PT0gb3duZXJJZCkgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIlVzZXIgYWxyZWFkeSBvd25lciBvZiB0aGUgY2FyXCIpKVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZUVuam95ZXIodmVoaWNsZUlkOiBUeXBlcy5PYmplY3RJZCwgZW5qb3llcklkOiBUeXBlcy5PYmplY3RJZCkgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBWZWhpY2xlTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodmVoaWNsZUlkLCB7XHJcbiAgICAgICAgJHB1bGw6IHsgZW5qb3llcnM6IGVuam95ZXJJZCB9XHJcbiAgICB9KS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKSlcclxuXHJcbiAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHZlaGljbGUgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcblxyXG4gICAgYXdhaXQgcmVtb3ZlVXNlckVuam95ZWRWZWhpY2xlKGVuam95ZXJJZCwgdmVoaWNsZUlkKS5jYXRjaChlcnIgPT4gZXJyKVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlclZlaGljbGUodXNlcklkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8VXNlclZlaGljbGU+IHtcclxuICAgIGNvbnN0IHVzZXI6IFVzZXJEb2N1bWVudCA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogdXNlci5uYW1lLFxyXG4gICAgICAgIHN0YXR1czogdXNlci5zdGF0dXMsXHJcbiAgICAgICAgc3VybmFtZTp1c2VyLnN1cm5hbWUsXHJcbiAgICAgICAgdXNlcklkOiB1c2VyLl9pZCxcclxuICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICBuaWNrbmFtZTogdXNlci5uaWNrbmFtZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RnVsbFZlaGljbGVEYXRhKHZlaGljbGVJZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPE15VmVoaWNsZT57XHJcbiAgICBsZXQgZW5qb3llcnM6IFVzZXJWZWhpY2xlW10gPSBbXVxyXG4gICAgbGV0IHZlaGljbGU6IFByb2plY3RWZWhpY2xlRG9jdW1lbnQgPSBhd2FpdCBnZXRWZWhpY2xlQnlJZCh2ZWhpY2xlSWQpXHJcbiAgICBsZXQgb3duZXIgPSBhd2FpdCBnZXRVc2VyVmVoaWNsZSh2ZWhpY2xlLm93bmVyKVxyXG5cclxuICAgIGZvciAobGV0IGlkeCBpbiB2ZWhpY2xlLmVuam95ZXJzKSB7XHJcbiAgICAgICAgZW5qb3llcnMucHVzaChcclxuICAgICAgICAgICAgYXdhaXQgZ2V0VXNlclZlaGljbGUodmVoaWNsZS5lbmpveWVyc1tpZHhdKVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHZlaGljbGVJZDogdmVoaWNsZS5faWQsXHJcbiAgICAgICAgb3duZXI6IG93bmVyLFxyXG4gICAgICAgIHN0YXR1czogdmVoaWNsZS5zdGF0dXMsXHJcbiAgICAgICAgbGVnYWxJbmZvczogdmVoaWNsZS5sZWdhbEluZm9zLFxyXG4gICAgICAgIGVuam95ZXJzOiBlbmpveWVycyxcclxuICAgICAgICB0eXBlOiB2ZWhpY2xlLnR5cGVcclxuICAgIH1cclxuXHJcbn0iXX0=