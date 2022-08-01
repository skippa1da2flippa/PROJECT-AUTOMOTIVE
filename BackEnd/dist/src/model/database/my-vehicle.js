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
exports.removeEnjoyer = exports.changeOwner = exports.updateVehiclePsw = exports.addEnjoyer = exports.setVehicleStatus = exports.updatePassword = exports.getVehiclesByUserId = exports.deleteVehicle = exports.createVehicle = exports.getVehicleById = exports.VehicleModel = exports.myVehicleSchema = exports.VehicleStatus = exports.ModelTypes = void 0;
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
        var vehicles, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vehicles = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, exports.VehicleModel.find()
                        // TO DO un giorno forse si mettera meglio
                    ];
                case 2:
                    vehicles = _a.sent();
                    // TO DO un giorno forse si mettera meglio
                    vehicles = vehicles.filter(function (elem) { return elem.owner.toString() === userId.toString(); });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    return [2 /*return*/, Promise.reject(new server_error_1.ServerError('Internal server error'))];
                case 4: return [2 /*return*/, vehicles.length
                        ? Promise.resolve(vehicles)
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
                    return [4 /*yield*/, __1.pool.getTedis()
                        // TO DO to check
                    ];
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
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    clearInterval(interval);
                                    if (res === "")
                                        onComplete("false");
                                    //pop the pair
                                    return [4 /*yield*/, tedis.del(vehicle.owner.toString())
                                        // gives back the connection
                                    ];
                                case 1:
                                    //pop the pair
                                    _a.sent();
                                    // gives back the connection
                                    __1.pool.putTedis(tedis);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 60000);
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
                    return [4 /*yield*/, (0, user_1.removeUserEnjoyedVehicle)(enjoyerId, vehicleId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
            }
        });
    });
}
exports.removeEnjoyer = removeEnjoyer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktdmVoaWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS9teS12ZWhpY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBQ3JDLHFDQUE2RjtBQUU3RiwyQkFBNkI7QUFDN0IseUZBQXNGO0FBQ3RGLDJDQUFrRjtBQUNsRix1REFBb0Q7QUFDcEQsK0JBT2dCO0FBQ2hCLGtEQUE0QjtBQUU1Qjs7O0VBR0U7QUFHRixJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDbEIsbUNBQXFCLENBQUE7SUFDckIsYUFBYTtBQUNqQixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFFRCxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDckIsb0NBQW1CLENBQUE7SUFDbkIsa0NBQWlCLENBQUE7QUFDckIsQ0FBQyxFQUhXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBR3hCO0FBa0VELDBEQUEwRDtBQUc3QyxRQUFBLGVBQWUsR0FBRyxJQUFJLGlCQUFNLENBQ3JDO0lBQ0ksSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHNCQUFXLENBQUMsTUFBTTtRQUN4QixRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN4QztJQUVELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxzQkFBVyxDQUFDLFFBQVE7UUFDMUIsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFFRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsc0JBQVcsQ0FBQyxNQUFNO1FBQ3hCLFFBQVEsRUFBRSxLQUFLO0tBQ2xCO0lBRUQsUUFBUSxFQUFFO1FB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LEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO3FCQUNqQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLDBCQUFXLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxFQUF4RCxDQUF3RCxDQUFDLEVBQUE7O29CQUZyRSxNQUFNLEdBQUcsU0FFNEQ7b0JBRXpFLElBQUksQ0FBQyxNQUFNO3dCQUFFLHNCQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSwwQkFBVyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsRUFBQTtvQkFDdEYscUJBQU0sSUFBQSwrQkFBd0IsRUFBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUE7O29CQUFwRCxTQUFvRCxDQUFBO29CQUNwRCxzQkFBTyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUE7Ozs7Q0FDM0I7QUFURCxzQ0FTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHsgQW55S2V5cywgRG9jdW1lbnQsIEZpbHRlclF1ZXJ5LCBNb2RlbCwgU2NoZW1hLCBTY2hlbWFUeXBlcywgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gJ3NvY2tldC5pbyc7XHJcbmltcG9ydCB7IHBvb2wgfSBmcm9tICcuLi8uLic7XHJcbmltcG9ydCB7IEVuam95ZXJSZXF1ZXN0RW1pdHRlciB9IGZyb20gJy4uLy4uL2V2ZW50cy9lbWl0dGVycy9lbmpveWVyLXJlcXVlc3QtZW1pdHRlcic7XHJcbmltcG9ydCB7IExlZ2FsSW5mb3MsIExlZ2FsSW5mb3NTY2hlbWEsIExlZ2FsSW5mb3NTdWJEb2N1bWVudCB9IGZyb20gJy4vbGVnYWxJbmZvcydcclxuaW1wb3J0IHsgU2VydmVyRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL3NlcnZlci1lcnJvclwiXHJcbmltcG9ydCB7XHJcbiAgICBnZXRVc2VyQnlJZCxcclxuICAgIHJlbW92ZVVzZXJFbmpveWVkVmVoaWNsZSxcclxuICAgIHVwZGF0ZVVzZXJFbmpveWVkVmVoaWNsZSxcclxuICAgIFVzZXJEb2N1bWVudCwgVXNlck1vZGVsLFxyXG4gICAgVXNlclNjaGVtYSxcclxuICAgIFVzZXJTdGF0dXNcclxufSBmcm9tICcuL3VzZXInO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRcIjtcclxuXHJcbi8qXHJcbiAgICBUaGlzIGNvbGxlY3Rpb24gaXMgdGhvdWdodCBub3QgdG8gYmUgYW4gZW1iZWRkZWQgZG9jdW1lbnQgZHVlIHRvIHRoZSBmYWN0IHRoYXQgbWFueSB1c2VycyBjYW4gdXNlIHRoZSBzYW1lIFZlaGljbGUsIHNldHRpbmcgdGhpcyBzY2hlbWEgYXMgXHJcbiAgICBhIG5vcm1hbCBjb2xsZWN0aW9uIHdpbGwgcHJvYmFibHkgYWxsb3cgdXMgdG8gY29kZSBmYXN0ZXIgd2hpbGUgZGV2b2xwaW5nIHdobyBjYW4gY29udHJvbCB0aGUgVmVoaWNsZSB0aHJvdWdoIHRoaXMgYXBwXHJcbiovXHJcblxyXG5cclxuZXhwb3J0IGVudW0gTW9kZWxUeXBlcyB7XHJcbiAgICBwcm9qZWN0WiA9ICdwcm9qZWN0WidcclxuICAgIC8vIGNhcnMgbmFtZXNcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVmVoaWNsZVN0YXR1cyB7XHJcbiAgICBPZmZsaW5lID0gJ09mZmxpbmUnLFxyXG4gICAgT25saW5lID0gJ09ubGluZSdcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBwcm9qZWN0VmVoaWNsZSB7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgY2FyIG1vZGVsIFxyXG4gICAgICovXHJcbiAgICB0eXBlOiBNb2RlbFR5cGVzLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBjYXIgaGFzIGEgcGFzc3dvcmQgYmVjYXVzZTpcclxuICAgICAqIGFjY2VzcyB0byBoaXMgb3duIHJvdXRlIGFuZCByZWNlaXZlIGl0cyB0b2tlbiBieSBsb2dnaW5nIGluIHdpdGggaXRzIGlkIGFuZCBpdHMgcHN3XHJcbiAgICAgKiBQUyB2ZWhpY2xlIHBzdyBpcyBtZWFudCB0byBiZSBrbm93biBqdXN0IHRvIHRoZSB2ZWhpY2xlXHJcbiAgICAgKiAqL1xyXG4gICAgcHdkX2hhc2g6IHN0cmluZztcclxuXHJcbiAgICBzYWx0OiBzdHJpbmc7XHJcblxyXG4gICAgc3RhdHVzOiBWZWhpY2xlU3RhdHVzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgY2FyIG93bmVyXHJcbiAgICAgKi9cclxuICAgIG93bmVyOiBUeXBlcy5PYmplY3RJZCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgb3RoZXIgdXNlcnMgZGlmZmVyZW50IGZyb20gdGhlIG93bmVyIHdobyBoYXZlIGFjY2VzcyB0byB0aGUgY2FyXHJcbiAgICAgKi9cclxuICAgIGVuam95ZXJzOiBUeXBlcy5PYmplY3RJZFtdLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBsZWdhbCBpbmZvIGFib3V0IHRoZSBjYXJcclxuICAgICAqL1xyXG4gICAgbGVnYWxJbmZvczogTGVnYWxJbmZvc1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0ZSB0aGF0IHRoZSBub3RpZmljYXRpb24gd2FzIGNyZWF0ZWQgYXQuXHJcbiAgICAgKiBJdCBpcyBhdXRvbWF0aWNhbGx5IGluc2VydGVkIGJ5IHRoZSBkYXRhYmFzZVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVkQXQ/OiBEYXRlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0ZSB0aGF0IHRoZSBub3RpZmljYXRpb24gd2FzIGxhc3QgdXBkYXRlZCBhdC5cclxuICAgICAqIEl0IGlzIGF1dG9tYXRpY2FsbHkgaW5zZXJ0ZWQgYW5kIHVwZGF0ZWQgYnkgdGhlIGRhdGFiYXNlXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZWRBdD86IERhdGU7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFByb2plY3RWZWhpY2xlRG9jdW1lbnQgZXh0ZW5kcyBwcm9qZWN0VmVoaWNsZSwgRG9jdW1lbnQge1xyXG4gICAgbGVnYWxJbmZvczogTGVnYWxJbmZvc1N1YkRvY3VtZW50O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBhIG5ldyBwYXNzd29yZCB1c2luZyBiY3J5cHQgaGFzaGluZyBhbmQgc2FsdCBnZW5lcmF0aW9uIGZ1bmN0aW9uc1xyXG4gICAgICogQHBhcmFtIHB3ZCBuZXcgcGFzc3dvcmQgdG8gc2V0XHJcbiAgICAgKi9cclxuICAgIHNldFBhc3N3b3JkKHB3ZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgdGhlIHZhbGlkaXR5IG9mIHRoZSBwYXNzd29yZCB3aXRoIHRoZSBvbmUgc3RvcmVkIG9uIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHBhcmFtIHB3ZCB0aGUgcGFzc3dvcmQgdG8gY2hlY2tcclxuICAgICAqL1xyXG4gICAgdmFsaWRhdGVQYXNzd29yZChwd2Q6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj47XHJcbn1cclxuXHJcbi8vIFRPIERPIGltcGxlbWVudCByZW1vdmUgb3duZXIvY2hhbmdlIG93bmVyIGluIGEgc2FmZSB3YXlcclxuXHJcblxyXG5leHBvcnQgY29uc3QgbXlWZWhpY2xlU2NoZW1hID0gbmV3IFNjaGVtYTxQcm9qZWN0VmVoaWNsZURvY3VtZW50PihcclxuICAgIHtcclxuICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGluZGV4OiB0cnVlLFxyXG4gICAgICAgICAgICBlbnVtOiBbTW9kZWxUeXBlcy5wcm9qZWN0Wi52YWx1ZU9mKCldXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb3duZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2FsdDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHB3ZF9oYXNoOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbGVnYWxJbmZvczoge1xyXG4gICAgICAgICAgICB0eXBlOiBMZWdhbEluZm9zU2NoZW1hLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiAoe30pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5qb3llcnM6IHtcclxuICAgICAgICAgICAgdHlwZTogW1NjaGVtYVR5cGVzLk9iamVjdElkXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW11cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGF0dXM6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBWZWhpY2xlU3RhdHVzLk9mZmxpbmVcclxuICAgICAgICB9XHJcbiAgICB9LCBcclxuICAgIHt0aW1lc3RhbXBzOiB0cnVlfVxyXG4pXHJcblxyXG5cclxuLy8gVE8gRE8gcmVtZW1iZXIgdG8gcHV0IGluIHRoZSBmcm9udC1lbmQgdGhlIDYwIHNlYyBsaW1pdCBmb3IgdGhlIG93bmVyIHRvIGFuc3dlciBhbmQgYW5zd2VyIGFueXdheVxyXG5cclxuXHJcbm15VmVoaWNsZVNjaGVtYS5tZXRob2RzLnNldFBhc3N3b3JkID0gYXN5bmMgZnVuY3Rpb24gKHB3ZDogc3RyaW5nKTogUHJvbWlzZTxQcm9qZWN0VmVoaWNsZURvY3VtZW50PiB7XHJcbiAgICBjb25zdCBzYWx0OiBzdHJpbmcgPSBhd2FpdCBiY3J5cHRcclxuICAgICAgICAuZ2VuU2FsdCgxMClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggc2FsdCBnZW5lcmF0aW9uJykpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICBjb25zdCBwd2RIYXNoID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmhhc2gocHdkLCBzYWx0KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignRXJyb3Igd2l0aCBwYXNzd29yZCBlbmNyeXB0aW9uJykpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB0aGlzLnNhbHQgPSBzYWx0O1xyXG4gICAgdGhpcy5wd2RfaGFzaCA9IHB3ZEhhc2g7XHJcbiAgICByZXR1cm4gdGhpcy5zYXZlKCk7XHJcbn07XHJcblxyXG5teVZlaGljbGVTY2hlbWEubWV0aG9kcy52YWxpZGF0ZVBhc3N3b3JkID0gYXN5bmMgZnVuY3Rpb24gKHB3ZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICBjb25zdCBoYXNoZWRQdyA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5oYXNoKHB3ZCwgdGhpcy5zYWx0KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignRXJyb3Igd2l0aCBwYXNzd29yZCBlbmNyeXB0aW9uJykpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5wd2RfaGFzaCA9PT0gaGFzaGVkUHc7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgVmVoaWNsZU1vZGVsOiBNb2RlbDxQcm9qZWN0VmVoaWNsZURvY3VtZW50PiA9IG1vbmdvb3NlLm1vZGVsKCdNeVZlaGljbGUnLCBteVZlaGljbGVTY2hlbWEsICdNeVZlaGljbGVzJyk7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VmVoaWNsZUJ5SWQodmVoaWNsZUlkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8UHJvamVjdFZlaGljbGVEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgY2FyRG9jID0gYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRPbmUoeyBfaWQ6IHZlaGljbGVJZCB9KS5jYXRjaCgoZXJyKSA9PlxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAhY2FyRG9jXHJcbiAgICAgICAgPyBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ05vIHZlaGljbGUgd2l0aCB0aGF0IGlkZW50aWZpZXInKSlcclxuICAgICAgICA6IFByb21pc2UucmVzb2x2ZShjYXJEb2MpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVmVoaWNsZShkYXRhOiBBbnlLZXlzPFByb2plY3RWZWhpY2xlRG9jdW1lbnQ+KTogUHJvbWlzZTxUeXBlcy5PYmplY3RJZD4ge1xyXG4gICAgY29uc3QgdmVoaWNsZTogUHJvamVjdFZlaGljbGVEb2N1bWVudCA9IG5ldyBWZWhpY2xlTW9kZWwoZGF0YSk7XHJcbiAgICBhd2FpdCB2ZWhpY2xlLnNhdmUoKS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiU2VydmVyIGludGVybmFsIGVycm9yXCIpKSlcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmVoaWNsZS5faWQpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVWZWhpY2xlKGZpbHRlcjogRmlsdGVyUXVlcnk8UHJvamVjdFZlaGljbGVEb2N1bWVudD4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB2ZWhpY2xlOiBQcm9qZWN0VmVoaWNsZURvY3VtZW50XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHZlaGljbGUgPSBhd2FpdCBnZXRWZWhpY2xlQnlJZChmaWx0ZXIuX2lkKVxyXG4gICAgICAgIGZvciAobGV0IGlkeCBpbiB2ZWhpY2xlLmVuam95ZXJzKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHJlbW92ZVVzZXJFbmpveWVkVmVoaWNsZSh2ZWhpY2xlLmVuam95ZXJzW2lkeF0sIHZlaGljbGUuX2lkKVxyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvYmo6IHsgZGVsZXRlZENvdW50PzogbnVtYmVyIH0gPSBhd2FpdCBWZWhpY2xlTW9kZWwuZGVsZXRlT25lKGZpbHRlcikuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gIW9iai5kZWxldGVkQ291bnRcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdmVoaWNsZSB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKCk7XHJcbn0gXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VmVoaWNsZXNCeVVzZXJJZCh1c2VySWQ6IFR5cGVzLk9iamVjdElkKTogUHJvbWlzZTxQcm9qZWN0VmVoaWNsZURvY3VtZW50W10+IHtcclxuICAgIGxldCB2ZWhpY2xlczogUHJvamVjdFZlaGljbGVEb2N1bWVudFtdID0gW11cclxuICAgIHRyeSB7XHJcbiAgICAgICAgdmVoaWNsZXMgPSBhd2FpdCBWZWhpY2xlTW9kZWwuZmluZCgpXHJcbiAgICAgICAgLy8gVE8gRE8gdW4gZ2lvcm5vIGZvcnNlIHNpIG1ldHRlcmEgbWVnbGlvXHJcbiAgICAgICAgdmVoaWNsZXMgPSB2ZWhpY2xlcy5maWx0ZXIoZWxlbSA9PiBlbGVtLm93bmVyLnRvU3RyaW5nKCkgPT09IHVzZXJJZC50b1N0cmluZygpKVxyXG5cclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZlaGljbGVzLmxlbmd0aFxyXG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKHZlaGljbGVzKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdmVoaWNsZXMgcmVsYXRlZCB0byB0aGUgdXNlclwiKSlcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlUGFzc3dvcmQoX2lkOiBUeXBlcy5PYmplY3RJZCwgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHZlaGljbGU6IFByb2plY3RWZWhpY2xlRG9jdW1lbnQ7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHZlaGljbGUgPSBhd2FpdCBnZXRWZWhpY2xlQnlJZChfaWQpO1xyXG4gICAgICAgIGF3YWl0IHZlaGljbGUuc2V0UGFzc3dvcmQocGFzc3dvcmQpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3Qgc2V0VmVoaWNsZVN0YXR1cyA9IGFzeW5jIChcclxuICAgIHZlaGljbGVJZDogVHlwZXMuT2JqZWN0SWQsXHJcbiAgICBuZXdTdGF0dXM6IFZlaGljbGVTdGF0dXNcclxuKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICAvLyBUTyBETyBlbWl0IHRvIHRoZSBvd25lciB3aGVuIHRoZSB2ZWhpY2xlIGNoYW5nZSBzdGF0dXMgP1xyXG4gICAgbGV0IHJlc3VsdCA9IFZlaGljbGVNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh2ZWhpY2xlSWQsIHtcclxuICAgICAgICBzdGF0dXM6IG5ld1N0YXR1c1xyXG4gICAgfSkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpKVxyXG5cclxuICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ05vIHZlaGljbGUgd2l0aCB0aGF0IGlkZW50aWZpZXInKSlcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGZ1bmN0aW9uIGFkZCBhIHVzZXJJZCB0byB0aGUgJ2Vuam95ZXJzJyBhcnJheVxyXG4gKiBAcGFyYW0gdmVoaWNsZUlkIHJlcHJlc2VudHMgdGhlIHZlaGljbGUgdG8gdXBkYXRlXHJcbiAqIEBwYXJhbSBlbmpveWVySWQgcmVwcmVzZW50IHRoZSBlbmpveWVyIGlkIHRvIGluc2VydFxyXG4gKiBAcGFyYW0gZW5qb3llck5hbWUgcmVwcmVzZW50cyBlbmpveWVyIG5hbWVcclxuICogQHBhcmFtIGVuam95ZXJTdXJuYW1lIHJlcHJlc2VudHMgZW5qb3llciBzdXJuYW1lXHJcbiAqIEBwYXJhbSBpb1NlcnZlciB1c2VkIHRvIGltcGxlbWVudCB3ZWIgc29ja2V0IGNvbm5lY3Rpb25cclxuICogQHBhcmFtIG9uQ29tcGxldGUgdXNlZCB0byBzZW5kIGEgcmVzcG9uc2VcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRFbmpveWVyKFxyXG4gICAgdmVoaWNsZUlkOiBUeXBlcy5PYmplY3RJZCxcclxuICAgIGVuam95ZXJJZDogVHlwZXMuT2JqZWN0SWQsXHJcbiAgICBlbmpveWVyTmFtZTogc3RyaW5nLFxyXG4gICAgZW5qb3llclN1cm5hbWU6IHN0cmluZyxcclxuICAgIGlvU2VydmVyOiBTZXJ2ZXIsXHJcbiAgICBvbkNvbXBsZXRlOiAocmVzOiBzdHJpbmcpID0+IHZvaWRcclxuKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHZlaGljbGU6IFByb2plY3RWZWhpY2xlRG9jdW1lbnRcclxuICAgIGxldCByZXM6IHN0cmluZyA9IFwiXCJcclxuICAgIGxldCB0ZW1wOiBhbnlcclxuICAgIGxldCBmbGFnOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICB2ZWhpY2xlID0gYXdhaXQgZ2V0VmVoaWNsZUJ5SWQodmVoaWNsZUlkKVxyXG5cclxuICAgIGNvbnN0IGVuam95ZXJSZXFFbWl0dGVyOiBFbmpveWVyUmVxdWVzdEVtaXR0ZXIgPSBuZXcgRW5qb3llclJlcXVlc3RFbWl0dGVyKGlvU2VydmVyLCB2ZWhpY2xlLm93bmVyKVxyXG5cclxuXHJcbiAgICBmb3IgKGxldCBpZHggaW4gdmVoaWNsZS5lbmpveWVycykge1xyXG4gICAgICAgIGlmICh2ZWhpY2xlLmVuam95ZXJzW2lkeF0udG9TdHJpbmcoKSA9PT0gZW5qb3llcklkLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJVc2VycyBhbHJlYWR5IGluc2lkZSB0aGUgZW5qb3llcnNcIikpXHJcbiAgICB9XHJcblxyXG4gICAgZW5qb3llclJlcUVtaXR0ZXIuZW1pdCh7XHJcbiAgICAgICAgZW5qb3llcklkOiBlbmpveWVySWQudG9TdHJpbmcoKSxcclxuICAgICAgICBlbmpveWVyTmFtZTogZW5qb3llck5hbWUsXHJcbiAgICAgICAgZW5qb3llclN1cm5hbWU6IGVuam95ZXJTdXJuYW1lLFxyXG4gICAgICAgIHZlaGljbGVJZDogdmVoaWNsZUlkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgdmVoaWNsZU1vZGVsOiB2ZWhpY2xlLnR5cGVcclxuICAgIH0pXHJcblxyXG5cclxuICAgIC8vIGdldHMgYSBjb25uZWN0aW9uIGZyb20gdGhlIHBvb2xcclxuICAgIGxldCB0ZWRpcyA9IGF3YWl0IHBvb2wuZ2V0VGVkaXMoKVxyXG5cclxuICAgIC8vIFRPIERPIHRvIGNoZWNrXHJcbiAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICAgIHJlcyA9ICEodGVtcCA9IGF3YWl0IHRlZGlzLmdldCh2ZWhpY2xlLm93bmVyLnRvU3RyaW5nKCkpKSA/IFwiXCIgOiB0ZW1wIGFzIHN0cmluZ1xyXG4gICAgICAgICAgICBpZiAocmVzID09PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHZlaGljbGVJZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICRwdXNoOiB7IGVuam95ZXJzOiBlbmpveWVySWQgfVxyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB1cGRhdGVVc2VyRW5qb3llZFZlaGljbGUoZW5qb3llcklkLCB2ZWhpY2xlSWQpXHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKHJlcylcclxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocmVzID09PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUocmVzKVxyXG4gICAgICAgICAgICAgICAgZmxhZyA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIDUwMDApXHJcblxyXG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbClcclxuICAgICAgICBpZiAocmVzID09PSBcIlwiKSBvbkNvbXBsZXRlKFwiZmFsc2VcIilcclxuXHJcbiAgICAgICAgLy9wb3AgdGhlIHBhaXJcclxuICAgICAgICBhd2FpdCB0ZWRpcy5kZWwodmVoaWNsZS5vd25lci50b1N0cmluZygpKVxyXG5cclxuICAgICAgICAvLyBnaXZlcyBiYWNrIHRoZSBjb25uZWN0aW9uXHJcbiAgICAgICAgcG9vbC5wdXRUZWRpcyh0ZWRpcylcclxuICAgIH0sIDYwMDAwKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVmVoaWNsZVBzdyh2ZWhpY2xlSWQ6IFR5cGVzLk9iamVjdElkLCBwc3c6IHN0cmluZykge1xyXG4gICAgY29uc3Qgc2FsdDogc3RyaW5nID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmdlblNhbHQoMTApXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT5cclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdFcnJvciB3aXRoIHNhbHQgZ2VuZXJhdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgY29uc3QgcHdkSGFzaCA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5oYXNoKHBzdywgc2FsdClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggcGFzc3dvcmQgZW5jcnlwdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IFZlaGljbGVNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh2ZWhpY2xlSWQsIHtcclxuICAgICAgICBzYWx0OiBzYWx0LFxyXG4gICAgICAgIHB3ZF9oYXNoOiBwd2RIYXNoXHJcbiAgICB9KS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKSlcclxuXHJcbiAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHZlaGljbGUgd2l0aCB0aGF0IGlkZW50aWZpZXJcIikpXHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hhbmdlT3duZXIodmVoaWNsZUlkOiBUeXBlcy5PYmplY3RJZCwgb3duZXJJZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCByZXN1bHQgPSBhd2FpdCAgVmVoaWNsZU1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHZlaGljbGVJZCwge1xyXG4gICAgICAgICBvd25lcjogb3duZXJJZFxyXG4gICAgfSkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpXHJcblxyXG4gICAgaWYgKCFyZXN1bHQpIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB2ZWhpY2xlIHdpdGggdGhhdCBpZGVudGlmaWVyXCIpKVxyXG5cclxuICAgIGlmIChyZXN1bHQub3duZXIgPT09IG93bmVySWQpIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJVc2VyIGFscmVhZHkgb3duZXIgb2YgdGhlIGNhclwiKSlcclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVFbmpveWVyKHZlaGljbGVJZDogVHlwZXMuT2JqZWN0SWQsIGVuam95ZXJJZDogVHlwZXMuT2JqZWN0SWQpIDogUHJvbWlzZTx2b2lkPiB7XHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IFZlaGljbGVNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh2ZWhpY2xlSWQsIHtcclxuICAgICAgICAkcHVsbDogeyBlbmpveWVyczogZW5qb3llcklkIH1cclxuICAgIH0pLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIikpKVxyXG5cclxuICAgIGlmICghcmVzdWx0KSByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiTm8gdmVoaWNsZSB3aXRoIHRoYXQgaWRlbnRpZmllclwiKSlcclxuICAgIGF3YWl0IHJlbW92ZVVzZXJFbmpveWVkVmVoaWNsZShlbmpveWVySWQsIHZlaGljbGVJZClcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG59XHJcblxyXG5cclxuIl19