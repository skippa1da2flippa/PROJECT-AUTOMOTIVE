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
exports.getFullVehicleData = exports.removeEnjoyer = exports.changeOwner = exports.updateVehiclePsw = exports.addEnjoyer = exports.setVehicleStatus = exports.updatePassword = exports.getVehiclesByUserId = exports.deleteVehicle = exports.createVehicle = exports.getVehicleById = exports.VehicleModel = exports.myVehicleSchema = exports.VehicleStatus = exports.ModelTypes = void 0;
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
// TO DO remember to put in the front-end the 60 sec limit for the owner to answer and answer anyway
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
        var vehicle, res, temp, flag, enjoyerReqEmitter, idx, tedis, interval;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res = "";
                    flag = false;
                    return [4 /*yield*/, getVehicleById(vehicleId)];
                case 1:
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
                    return [4 /*yield*/, __1.pool.getTedis()];
                case 2:
                    tedis = _a.sent();
                    interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!flag) return [3 /*break*/, 5];
                                    return [4 /*yield*/, tedis.get(vehicle.owner.toString())];
                                case 1:
                                    res = !(temp = _a.sent()) ? "" : temp;
                                    if (!(res === "true")) return [3 /*break*/, 4];
                                    return [4 /*yield*/, exports.VehicleModel.findByIdAndUpdate(vehicleId, {
                                            $push: { enjoyers: enjoyerId }
                                        }).catch(function (err) { return Promise.reject(new server_error_1.ServerError("Internal server error")); })];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, (0, user_1.updateUserEnjoyedVehicle)(enjoyerId, vehicleId)];
                                case 3:
                                    _a.sent();
                                    onComplete(res);
                                    flag = true;
                                    return [3 /*break*/, 5];
                                case 4:
                                    if (res === "false") {
                                        onComplete(res);
                                        flag = true;
                                    }
                                    _a.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); }, 5000);
                    try {
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        clearInterval(interval);
                                        if (res === "")
                                            onComplete("false");
                                        //pop the pair
                                        return [4 /*yield*/, tedis.del(vehicle.owner.toString()).catch(function (err) {
                                                console.log("tedis sbanfa");
                                            })
                                            // gives back the connection
                                        ];
                                    case 1:
                                        //pop the pair
                                        _a.sent();
                                        // gives back the connection
                                        try {
                                            __1.pool.putTedis(tedis);
                                        }
                                        catch (err) {
                                            console.log("Teuds sbanfa2");
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 60000);
                    }
                    catch (err) {
                        console.log("si spacca neol tru");
                    }
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
                case 0:
                    console.log("sono dentro la remove");
                    return [4 /*yield*/, exports.VehicleModel.findByIdAndUpdate(vehicleId, {
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
function getFullVehicleData(vehicleId) {
    return __awaiter(this, void 0, void 0, function () {
        var enjoyers, vehicle, user, owner, _a, _b, _i, idx, user_2, err_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    enjoyers = [];
                    return [4 /*yield*/, getVehicleById(vehicleId)];
                case 1:
                    vehicle = _c.sent();
                    return [4 /*yield*/, (0, user_1.getUserById)(vehicle.owner)];
                case 2:
                    user = _c.sent();
                    owner = {
                        name: user.name,
                        surname: user.surname,
                        status: user.status,
                        userId: user._id,
                        email: user.email,
                        nickname: user.nickname
                    };
                    _a = [];
                    for (_b in vehicle.enjoyers)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    idx = _a[_i];
                    return [4 /*yield*/, (0, user_1.getUserById)(vehicle.enjoyers[idx])];
                case 4:
                    user_2 = _c.sent();
                    enjoyers.push({
                        name: user_2.name,
                        surname: user_2.surname,
                        userId: user_2._id,
                        status: user_2.status,
                        email: user_2.email,
                        nickname: user_2.nickname
                    });
                    _c.label = 5;
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
                case 7:
                    err_4 = _c.sent();
                    return [2 /*return*/, Promise.reject(err_4)];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getFullVehicleData = getFullVehicleData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktdmVoaWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS9teS12ZWhpY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBQ3JDLHFDQUE2RjtBQUU3RiwyQkFBNkI7QUFDN0IseUZBQXNGO0FBQ3RGLDJDQUFrRjtBQUNsRix1REFBb0Q7QUFDcEQsK0JBT2dCO0FBQ2hCLGtEQUE0QjtBQUk1Qjs7O0VBR0U7QUFHRixJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDbEIsbUNBQXFCLENBQUE7SUFDckIsYUFBYTtBQUNqQixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFFRCxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDckIsb0NBQW1CLENBQUE7SUFDbkIsa0NBQWlCLENBQUE7QUFDckIsQ0FBQyxFQUhXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBR3hCO0FBa0VELDBEQUEwRDtBQUc3QyxRQUFBLGVBQWUsR0FBRyxJQUFJLGlCQUFNLENBQ3JDO0lBQ0ksSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHNCQUFXLENBQUMsTUFBTTtRQUN4QixRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN4QztJQUVELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxzQkFBVyxDQUFDLFFBQVE7UUFDMUIsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFFRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsc0JBQVcsQ0FBQyxNQUFNO1FBQ3hCLFFBQVEsRUFBRSxLQUFLO0tBQ2xCO0lBRUQsUUFBUSxFQUFFO1FB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QUssRUFBRSxLQUFLO3dCQUNaLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTt3QkFDdEIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO3dCQUM5QixRQUFRLEVBQUUsUUFBUTt3QkFDbEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO3FCQUNyQixFQUFBOzs7b0JBRUQsc0JBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFHLENBQUMsRUFBQTs7Ozs7Q0FFakM7QUF0Q0QsZ0RBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5pbXBvcnQgeyBBbnlLZXlzLCBEb2N1bWVudCwgRmlsdGVyUXVlcnksIE1vZGVsLCBTY2hlbWEsIFNjaGVtYVR5cGVzLCBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSAnc29ja2V0LmlvJztcclxuaW1wb3J0IHsgcG9vbCB9IGZyb20gJy4uLy4uJztcclxuaW1wb3J0IHsgRW5qb3llclJlcXVlc3RFbWl0dGVyIH0gZnJvbSAnLi4vLi4vZXZlbnRzL2VtaXR0ZXJzL2Vuam95ZXItcmVxdWVzdC1lbWl0dGVyJztcclxuaW1wb3J0IHsgTGVnYWxJbmZvcywgTGVnYWxJbmZvc1NjaGVtYSwgTGVnYWxJbmZvc1N1YkRvY3VtZW50IH0gZnJvbSAnLi9sZWdhbEluZm9zJ1xyXG5pbXBvcnQgeyBTZXJ2ZXJFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvc2VydmVyLWVycm9yXCJcclxuaW1wb3J0IHtcclxuICAgIGdldFVzZXJCeUlkLFxyXG4gICAgcmVtb3ZlVXNlckVuam95ZWRWZWhpY2xlLFxyXG4gICAgdXBkYXRlVXNlckVuam95ZWRWZWhpY2xlLFxyXG4gICAgVXNlckRvY3VtZW50LCBVc2VyTW9kZWwsXHJcbiAgICBVc2VyU2NoZW1hLFxyXG4gICAgVXNlclN0YXR1c1xyXG59IGZyb20gJy4vdXNlcic7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdFwiO1xyXG5pbXBvcnQge1VzZXJWZWhpY2xlfSBmcm9tIFwiLi4vLi4vcm91dGVzL215LXZlaGljbGUtcm91dGVzXCI7XHJcbmltcG9ydCB7TXlWZWhpY2xlfSBmcm9tIFwiLi4vLi4vcm91dGVzL3VzZXItcm91dGVzXCI7XHJcblxyXG4vKlxyXG4gICAgVGhpcyBjb2xsZWN0aW9uIGlzIHRob3VnaHQgbm90IHRvIGJlIGFuIGVtYmVkZGVkIGRvY3VtZW50IGR1ZSB0byB0aGUgZmFjdCB0aGF0IG1hbnkgdXNlcnMgY2FuIHVzZSB0aGUgc2FtZSBWZWhpY2xlLCBzZXR0aW5nIHRoaXMgc2NoZW1hIGFzIFxyXG4gICAgYSBub3JtYWwgY29sbGVjdGlvbiB3aWxsIHByb2JhYmx5IGFsbG93IHVzIHRvIGNvZGUgZmFzdGVyIHdoaWxlIGRldm9scGluZyB3aG8gY2FuIGNvbnRyb2wgdGhlIFZlaGljbGUgdGhyb3VnaCB0aGlzIGFwcFxyXG4qL1xyXG5cclxuXHJcbmV4cG9ydCBlbnVtIE1vZGVsVHlwZXMge1xyXG4gICAgcHJvamVjdFogPSAncHJvamVjdFonXHJcbiAgICAvLyBjYXJzIG5hbWVzXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZlaGljbGVTdGF0dXMge1xyXG4gICAgT2ZmbGluZSA9ICdPZmZsaW5lJyxcclxuICAgIE9ubGluZSA9ICdPbmxpbmUnXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcHJvamVjdFZlaGljbGUge1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGNhciBtb2RlbCBcclxuICAgICAqL1xyXG4gICAgdHlwZTogTW9kZWxUeXBlcyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgY2FyIGhhcyBhIHBhc3N3b3JkIGJlY2F1c2U6XHJcbiAgICAgKiBhY2Nlc3MgdG8gaGlzIG93biByb3V0ZSBhbmQgcmVjZWl2ZSBpdHMgdG9rZW4gYnkgbG9nZ2luZyBpbiB3aXRoIGl0cyBpZCBhbmQgaXRzIHBzd1xyXG4gICAgICogUFMgdmVoaWNsZSBwc3cgaXMgbWVhbnQgdG8gYmUga25vd24ganVzdCB0byB0aGUgdmVoaWNsZVxyXG4gICAgICogKi9cclxuICAgIHB3ZF9oYXNoOiBzdHJpbmc7XHJcblxyXG4gICAgc2FsdDogc3RyaW5nO1xyXG5cclxuICAgIHN0YXR1czogVmVoaWNsZVN0YXR1cztcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGNhciBvd25lclxyXG4gICAgICovXHJcbiAgICBvd25lcjogVHlwZXMuT2JqZWN0SWQsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIG90aGVyIHVzZXJzIGRpZmZlcmVudCBmcm9tIHRoZSBvd25lciB3aG8gaGF2ZSBhY2Nlc3MgdG8gdGhlIGNhclxyXG4gICAgICovXHJcbiAgICBlbmpveWVyczogVHlwZXMuT2JqZWN0SWRbXSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgbGVnYWwgaW5mbyBhYm91dCB0aGUgY2FyXHJcbiAgICAgKi9cclxuICAgIGxlZ2FsSW5mb3M6IExlZ2FsSW5mb3NcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGUgdGhhdCB0aGUgbm90aWZpY2F0aW9uIHdhcyBjcmVhdGVkIGF0LlxyXG4gICAgICogSXQgaXMgYXV0b21hdGljYWxseSBpbnNlcnRlZCBieSB0aGUgZGF0YWJhc2VcclxuICAgICAqL1xyXG4gICAgY3JlYXRlZEF0PzogRGF0ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGUgdGhhdCB0aGUgbm90aWZpY2F0aW9uIHdhcyBsYXN0IHVwZGF0ZWQgYXQuXHJcbiAgICAgKiBJdCBpcyBhdXRvbWF0aWNhbGx5IGluc2VydGVkIGFuZCB1cGRhdGVkIGJ5IHRoZSBkYXRhYmFzZVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVkQXQ/OiBEYXRlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0VmVoaWNsZURvY3VtZW50IGV4dGVuZHMgcHJvamVjdFZlaGljbGUsIERvY3VtZW50IHtcclxuICAgIGxlZ2FsSW5mb3M6IExlZ2FsSW5mb3NTdWJEb2N1bWVudDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgYSBuZXcgcGFzc3dvcmQgdXNpbmcgYmNyeXB0IGhhc2hpbmcgYW5kIHNhbHQgZ2VuZXJhdGlvbiBmdW5jdGlvbnNcclxuICAgICAqIEBwYXJhbSBwd2QgbmV3IHBhc3N3b3JkIHRvIHNldFxyXG4gICAgICovXHJcbiAgICBzZXRQYXNzd29yZChwd2Q6IHN0cmluZyk6IFByb21pc2U8VXNlckRvY3VtZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIHRoZSB2YWxpZGl0eSBvZiB0aGUgcGFzc3dvcmQgd2l0aCB0aGUgb25lIHN0b3JlZCBvbiB0aGUgZGF0YWJhc2VcclxuICAgICAqIEBwYXJhbSBwd2QgdGhlIHBhc3N3b3JkIHRvIGNoZWNrXHJcbiAgICAgKi9cclxuICAgIHZhbGlkYXRlUGFzc3dvcmQocHdkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+O1xyXG59XHJcblxyXG4vLyBUTyBETyBpbXBsZW1lbnQgcmVtb3ZlIG93bmVyL2NoYW5nZSBvd25lciBpbiBhIHNhZmUgd2F5XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IG15VmVoaWNsZVNjaGVtYSA9IG5ldyBTY2hlbWE8UHJvamVjdFZlaGljbGVEb2N1bWVudD4oXHJcbiAgICB7XHJcbiAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBpbmRleDogdHJ1ZSxcclxuICAgICAgICAgICAgZW51bTogW01vZGVsVHlwZXMucHJvamVjdFoudmFsdWVPZigpXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG93bmVyOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLk9iamVjdElkLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNhbHQ6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwd2RfaGFzaDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxlZ2FsSW5mb3M6IHtcclxuICAgICAgICAgICAgdHlwZTogTGVnYWxJbmZvc1NjaGVtYSxcclxuICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gKHt9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGVuam95ZXJzOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFtTY2hlbWFUeXBlcy5PYmplY3RJZF0sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhdHVzOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgZGVmYXVsdDogVmVoaWNsZVN0YXR1cy5PZmZsaW5lXHJcbiAgICAgICAgfVxyXG4gICAgfSwgXHJcbiAgICB7dGltZXN0YW1wczogdHJ1ZX1cclxuKVxyXG5cclxuXHJcbi8vIFRPIERPIHJlbWVtYmVyIHRvIHB1dCBpbiB0aGUgZnJvbnQtZW5kIHRoZSA2MCBzZWMgbGltaXQgZm9yIHRoZSBvd25lciB0byBhbnN3ZXIgYW5kIGFuc3dlciBhbnl3YXlcclxuXHJcblxyXG5teVZlaGljbGVTY2hlbWEubWV0aG9kcy5zZXRQYXNzd29yZCA9IGFzeW5jIGZ1bmN0aW9uIChwd2Q6IHN0cmluZyk6IFByb21pc2U8UHJvamVjdFZlaGljbGVEb2N1bWVudD4ge1xyXG4gICAgY29uc3Qgc2FsdDogc3RyaW5nID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmdlblNhbHQoMTApXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT5cclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdFcnJvciB3aXRoIHNhbHQgZ2VuZXJhdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgY29uc3QgcHdkSGFzaCA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5oYXNoKHB3ZCwgc2FsdClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggcGFzc3dvcmQgZW5jcnlwdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgdGhpcy5zYWx0ID0gc2FsdDtcclxuICAgIHRoaXMucHdkX2hhc2ggPSBwd2RIYXNoO1xyXG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xyXG59O1xyXG5cclxubXlWZWhpY2xlU2NoZW1hLm1ldGhvZHMudmFsaWRhdGVQYXNzd29yZCA9IGFzeW5jIGZ1bmN0aW9uIChwd2Q6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgY29uc3QgaGFzaGVkUHcgPSBhd2FpdCBiY3J5cHRcclxuICAgICAgICAuaGFzaChwd2QsIHRoaXMuc2FsdClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggcGFzc3dvcmQgZW5jcnlwdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucHdkX2hhc2ggPT09IGhhc2hlZFB3O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFZlaGljbGVNb2RlbDogTW9kZWw8UHJvamVjdFZlaGljbGVEb2N1bWVudD4gPSBtb25nb29zZS5tb2RlbCgnTXlWZWhpY2xlJywgbXlWZWhpY2xlU2NoZW1hLCAnTXlWZWhpY2xlcycpO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFZlaGljbGVCeUlkKHZlaGljbGVJZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPFByb2plY3RWZWhpY2xlRG9jdW1lbnQ+IHtcclxuICAgIGNvbnN0IGNhckRvYyA9IGF3YWl0IFZlaGljbGVNb2RlbC5maW5kT25lKHsgX2lkOiB2ZWhpY2xlSWQgfSkuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gIWNhckRvY1xyXG4gICAgICAgID8gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB2ZWhpY2xlIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoY2FyRG9jKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVZlaGljbGUoZGF0YTogQW55S2V5czxQcm9qZWN0VmVoaWNsZURvY3VtZW50Pik6IFByb21pc2U8VHlwZXMuT2JqZWN0SWQ+IHtcclxuICAgIGNvbnN0IHZlaGljbGU6IFByb2plY3RWZWhpY2xlRG9jdW1lbnQgPSBuZXcgVmVoaWNsZU1vZGVsKGRhdGEpO1xyXG4gICAgYXdhaXQgdmVoaWNsZS5zYXZlKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIlNlcnZlciBpbnRlcm5hbCBlcnJvclwiKSkpXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZlaGljbGUuX2lkKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlVmVoaWNsZShmaWx0ZXI6IEZpbHRlclF1ZXJ5PFByb2plY3RWZWhpY2xlRG9jdW1lbnQ+KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdmVoaWNsZTogUHJvamVjdFZlaGljbGVEb2N1bWVudFxyXG4gICAgdHJ5IHtcclxuICAgICAgICB2ZWhpY2xlID0gYXdhaXQgZ2V0VmVoaWNsZUJ5SWQoZmlsdGVyLl9pZClcclxuICAgICAgICBmb3IgKGxldCBpZHggaW4gdmVoaWNsZS5lbmpveWVycykge1xyXG4gICAgICAgICAgICBhd2FpdCByZW1vdmVVc2VyRW5qb3llZFZlaGljbGUodmVoaWNsZS5lbmpveWVyc1tpZHhdLCB2ZWhpY2xlLl9pZClcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb2JqOiB7IGRlbGV0ZWRDb3VudD86IG51bWJlciB9ID0gYXdhaXQgVmVoaWNsZU1vZGVsLmRlbGV0ZU9uZShmaWx0ZXIpLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuICFvYmouZGVsZXRlZENvdW50XHJcbiAgICAgICAgPyBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ05vIHZlaGljbGUgd2l0aCB0aGF0IGlkZW50aWZpZXInKSlcclxuICAgICAgICA6IFByb21pc2UucmVzb2x2ZSgpO1xyXG59IFxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFZlaGljbGVzQnlVc2VySWQodXNlcklkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8TXlWZWhpY2xlW10+IHtcclxuICAgIGxldCB2ZWhpY2xlczogUHJvamVjdFZlaGljbGVEb2N1bWVudFtdID0gW11cclxuICAgIGxldCBwcm9qZWN0VmVoaWNsZXM6IE15VmVoaWNsZVtdID0gW11cclxuICAgIHRyeSB7XHJcbiAgICAgICAgdmVoaWNsZXMgPSBhd2FpdCBWZWhpY2xlTW9kZWwuZmluZCgpXHJcblxyXG4gICAgICAgIC8vIFRPRE8gdW4gZ2lvcm5vIGZvcnNlIHNpIG1ldHRlcmEgbWVnbGlvXHJcbiAgICAgICAgdmVoaWNsZXMgPSB2ZWhpY2xlcy5maWx0ZXIoZWxlbSA9PiBlbGVtLm93bmVyLnRvU3RyaW5nKCkgPT09IHVzZXJJZC50b1N0cmluZygpKVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHZlaGljbGUgb2YgdmVoaWNsZXMpIHtcclxuICAgICAgICAgICAgcHJvamVjdFZlaGljbGVzLnB1c2goYXdhaXQgZ2V0RnVsbFZlaGljbGVEYXRhKHZlaGljbGUuX2lkKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJvamVjdFZlaGljbGVzLmxlbmd0aFxyXG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKHByb2plY3RWZWhpY2xlcylcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHZlaGljbGVzIHJlbGF0ZWQgdG8gdGhlIHVzZXJcIikpXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBhc3N3b3JkKF9pZDogVHlwZXMuT2JqZWN0SWQsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB2ZWhpY2xlOiBQcm9qZWN0VmVoaWNsZURvY3VtZW50O1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB2ZWhpY2xlID0gYXdhaXQgZ2V0VmVoaWNsZUJ5SWQoX2lkKTtcclxuICAgICAgICBhd2FpdCB2ZWhpY2xlLnNldFBhc3N3b3JkKHBhc3N3b3JkKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHNldFZlaGljbGVTdGF0dXMgPSBhc3luYyAoXHJcbiAgICB2ZWhpY2xlSWQ6IFR5cGVzLk9iamVjdElkLFxyXG4gICAgbmV3U3RhdHVzOiBWZWhpY2xlU3RhdHVzXHJcbik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgLy8gVE8gRE8gZW1pdCB0byB0aGUgb3duZXIgd2hlbiB0aGUgdmVoaWNsZSBjaGFuZ2Ugc3RhdHVzID9cclxuICAgIGxldCByZXN1bHQgPSBWZWhpY2xlTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodmVoaWNsZUlkLCB7XHJcbiAgICAgICAgc3RhdHVzOiBuZXdTdGF0dXNcclxuICAgIH0pLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKSlcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB2ZWhpY2xlIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBmdW5jdGlvbiBhZGQgYSB1c2VySWQgdG8gdGhlICdlbmpveWVycycgYXJyYXlcclxuICogQHBhcmFtIHZlaGljbGVJZCByZXByZXNlbnRzIHRoZSB2ZWhpY2xlIHRvIHVwZGF0ZVxyXG4gKiBAcGFyYW0gZW5qb3llcklkIHJlcHJlc2VudCB0aGUgZW5qb3llciBpZCB0byBpbnNlcnRcclxuICogQHBhcmFtIGVuam95ZXJOYW1lIHJlcHJlc2VudHMgZW5qb3llciBuYW1lXHJcbiAqIEBwYXJhbSBlbmpveWVyU3VybmFtZSByZXByZXNlbnRzIGVuam95ZXIgc3VybmFtZVxyXG4gKiBAcGFyYW0gaW9TZXJ2ZXIgdXNlZCB0byBpbXBsZW1lbnQgd2ViIHNvY2tldCBjb25uZWN0aW9uXHJcbiAqIEBwYXJhbSBvbkNvbXBsZXRlIHVzZWQgdG8gc2VuZCBhIHJlc3BvbnNlXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkRW5qb3llcihcclxuICAgIHZlaGljbGVJZDogVHlwZXMuT2JqZWN0SWQsXHJcbiAgICBlbmpveWVySWQ6IFR5cGVzLk9iamVjdElkLFxyXG4gICAgZW5qb3llck5hbWU6IHN0cmluZyxcclxuICAgIGVuam95ZXJTdXJuYW1lOiBzdHJpbmcsXHJcbiAgICBpb1NlcnZlcjogU2VydmVyLFxyXG4gICAgb25Db21wbGV0ZTogKHJlczogc3RyaW5nKSA9PiB2b2lkXHJcbikgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB2ZWhpY2xlOiBQcm9qZWN0VmVoaWNsZURvY3VtZW50XHJcbiAgICBsZXQgcmVzOiBzdHJpbmcgPSBcIlwiXHJcbiAgICBsZXQgdGVtcDogYW55XHJcbiAgICBsZXQgZmxhZzogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG4gICAgdmVoaWNsZSA9IGF3YWl0IGdldFZlaGljbGVCeUlkKHZlaGljbGVJZClcclxuXHJcbiAgICBjb25zdCBlbmpveWVyUmVxRW1pdHRlcjogRW5qb3llclJlcXVlc3RFbWl0dGVyID0gbmV3IEVuam95ZXJSZXF1ZXN0RW1pdHRlcihpb1NlcnZlciwgdmVoaWNsZS5vd25lcilcclxuXHJcbiAgICBmb3IgKGxldCBpZHggaW4gdmVoaWNsZS5lbmpveWVycykge1xyXG4gICAgICAgIGlmICh2ZWhpY2xlLmVuam95ZXJzW2lkeF0udG9TdHJpbmcoKSA9PT0gZW5qb3llcklkLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJVc2VycyBhbHJlYWR5IGluc2lkZSB0aGUgZW5qb3llcnNcIikpXHJcbiAgICB9XHJcblxyXG4gICAgZW5qb3llclJlcUVtaXR0ZXIuZW1pdCh7XHJcbiAgICAgICAgZW5qb3llcklkOiBlbmpveWVySWQudG9TdHJpbmcoKSxcclxuICAgICAgICBlbmpveWVyTmFtZTogZW5qb3llck5hbWUsXHJcbiAgICAgICAgZW5qb3llclN1cm5hbWU6IGVuam95ZXJTdXJuYW1lLFxyXG4gICAgICAgIHZlaGljbGVJZDogdmVoaWNsZUlkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgdmVoaWNsZU1vZGVsOiB2ZWhpY2xlLnR5cGVcclxuICAgIH0pXHJcblxyXG5cclxuICAgIC8vIGdldHMgYSBjb25uZWN0aW9uIGZyb20gdGhlIHBvb2xcclxuICAgIGxldCB0ZWRpcyA9IGF3YWl0IHBvb2wuZ2V0VGVkaXMoKVxyXG5cclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcclxuICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgICAgcmVzID0gISh0ZW1wID0gYXdhaXQgdGVkaXMuZ2V0KHZlaGljbGUub3duZXIudG9TdHJpbmcoKSkpID8gXCJcIiA6IHRlbXAgYXMgc3RyaW5nXHJcbiAgICAgICAgICAgIGlmIChyZXMgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBWZWhpY2xlTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodmVoaWNsZUlkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHB1c2g6IHsgZW5qb3llcnM6IGVuam95ZXJJZCB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKSlcclxuICAgICAgICAgICAgICAgIGF3YWl0IHVwZGF0ZVVzZXJFbmpveWVkVmVoaWNsZShlbmpveWVySWQsIHZlaGljbGVJZClcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUocmVzKVxyXG4gICAgICAgICAgICAgICAgZmxhZyA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChyZXMgPT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZShyZXMpXHJcbiAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgNTAwMClcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKVxyXG4gICAgICAgICAgICBpZiAocmVzID09PSBcIlwiKSBvbkNvbXBsZXRlKFwiZmFsc2VcIilcclxuICAgICAgICAgICAgLy9wb3AgdGhlIHBhaXJcclxuICAgICAgICAgICAgYXdhaXQgdGVkaXMuZGVsKHZlaGljbGUub3duZXIudG9TdHJpbmcoKSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGVkaXMgc2JhbmZhXCIpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyBnaXZlcyBiYWNrIHRoZSBjb25uZWN0aW9uXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBwb29sLnB1dFRlZGlzKHRlZGlzKVxyXG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUZXVkcyBzYmFuZmEyXCIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSwgNjAwMDApXHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2kgc3BhY2NhIG5lb2wgdHJ1XCIpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVWZWhpY2xlUHN3KHZlaGljbGVJZDogVHlwZXMuT2JqZWN0SWQsIHBzdzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzYWx0OiBzdHJpbmcgPSBhd2FpdCBiY3J5cHRcclxuICAgICAgICAuZ2VuU2FsdCgxMClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggc2FsdCBnZW5lcmF0aW9uJykpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICBjb25zdCBwd2RIYXNoID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmhhc2gocHN3LCBzYWx0KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignRXJyb3Igd2l0aCBwYXNzd29yZCBlbmNyeXB0aW9uJykpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHZlaGljbGVJZCwge1xyXG4gICAgICAgIHNhbHQ6IHNhbHQsXHJcbiAgICAgICAgcHdkX2hhc2g6IHB3ZEhhc2hcclxuICAgIH0pLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpKVxyXG5cclxuICAgIGlmICghcmVzdWx0KSByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdmVoaWNsZSB3aXRoIHRoYXQgaWRlbnRpZmllclwiKSlcclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGFuZ2VPd25lcih2ZWhpY2xlSWQ6IFR5cGVzLk9iamVjdElkLCBvd25lcklkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0ICBWZWhpY2xlTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodmVoaWNsZUlkLCB7XHJcbiAgICAgICAgIG93bmVyOiBvd25lcklkXHJcbiAgICB9KS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKSlcclxuXHJcbiAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHZlaGljbGUgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcblxyXG4gICAgaWYgKHJlc3VsdC5vd25lciA9PT0gb3duZXJJZCkgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIlVzZXIgYWxyZWFkeSBvd25lciBvZiB0aGUgY2FyXCIpKVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZUVuam95ZXIodmVoaWNsZUlkOiBUeXBlcy5PYmplY3RJZCwgZW5qb3llcklkOiBUeXBlcy5PYmplY3RJZCkgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnNvbGUubG9nKFwic29ubyBkZW50cm8gbGEgcmVtb3ZlXCIpXHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHZlaGljbGVJZCwge1xyXG4gICAgICAgICRwdWxsOiB7IGVuam95ZXJzOiBlbmpveWVySWQgfVxyXG4gICAgfSkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpXHJcblxyXG4gICAgaWYgKCFyZXN1bHQpIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB2ZWhpY2xlIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG5cclxuICAgIGF3YWl0IHJlbW92ZVVzZXJFbmpveWVkVmVoaWNsZShlbmpveWVySWQsIHZlaGljbGVJZCkuY2F0Y2goZXJyID0+IGVycilcclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRGdWxsVmVoaWNsZURhdGEodmVoaWNsZUlkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8TXlWZWhpY2xlPntcclxuICAgIHRyeSB7XHJcblxyXG4gICAgICAgIGxldCBlbmpveWVyczogVXNlclZlaGljbGVbXSA9IFtdXHJcbiAgICAgICAgbGV0IHZlaGljbGU6IFByb2plY3RWZWhpY2xlRG9jdW1lbnQgPSBhd2FpdCBnZXRWZWhpY2xlQnlJZCh2ZWhpY2xlSWQpXHJcbiAgICAgICAgbGV0IHVzZXI6IFVzZXJEb2N1bWVudCA9IGF3YWl0IGdldFVzZXJCeUlkKHZlaGljbGUub3duZXIpXHJcbiAgICAgICAgbGV0IG93bmVyOiBVc2VyVmVoaWNsZSA9IHtcclxuICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxyXG4gICAgICAgICAgICBzdXJuYW1lOnVzZXIuc3VybmFtZSxcclxuICAgICAgICAgICAgc3RhdHVzOiB1c2VyLnN0YXR1cyxcclxuICAgICAgICAgICAgdXNlcklkOiB1c2VyLl9pZCxcclxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIG5pY2tuYW1lOiB1c2VyLm5pY2tuYW1lXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpZHggaW4gdmVoaWNsZS5lbmpveWVycykge1xyXG4gICAgICAgICAgICBsZXQgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHZlaGljbGUuZW5qb3llcnNbaWR4XSlcclxuICAgICAgICAgICAgZW5qb3llcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBzdXJuYW1lOnVzZXIuc3VybmFtZSxcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlci5faWQsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHVzZXIuc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgICAgICBuaWNrbmFtZTogdXNlci5uaWNrbmFtZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmVoaWNsZUlkOiB2ZWhpY2xlLl9pZCxcclxuICAgICAgICAgICAgb3duZXI6IG93bmVyLFxyXG4gICAgICAgICAgICBzdGF0dXM6IHZlaGljbGUuc3RhdHVzLFxyXG4gICAgICAgICAgICBsZWdhbEluZm9zOiB2ZWhpY2xlLmxlZ2FsSW5mb3MsXHJcbiAgICAgICAgICAgIGVuam95ZXJzOiBlbmpveWVycyxcclxuICAgICAgICAgICAgdHlwZTogdmVoaWNsZS50eXBlXHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG59Il19