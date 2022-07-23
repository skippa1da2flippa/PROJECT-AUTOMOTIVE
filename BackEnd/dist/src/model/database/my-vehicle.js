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
exports.setVehicleStatus = exports.updatePassword = exports.getVehiclesByUserId = exports.deleteVehicle = exports.createVehicle = exports.getVehicleById = exports.VehicleModel = exports.myVehicleSchema = exports.VehicleStatus = exports.ModelTypes = void 0;
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
    }
}, { timestamps: true });
// TO DO remember to put in the front-end the 60 sec limit for the owner to answer and answer anyway
/**
 *
 * @param enjoyerId
 * @param enjoyerName
 * @param enjoyerSurname
 * @param ioServer
 * @param onComplete
  */
exports.myVehicleSchema.methods.addEnjoyer = function (enjoyerId, enjoyerName, enjoyerSurname, ioServer, onComplete) {
    return __awaiter(this, void 0, void 0, function () {
        var res, temp, enjoyerReqEmitter, tedis, interval;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res = "";
                    enjoyerReqEmitter = new enjoyer_request_emitter_1.EnjoyerRequestEmitter(ioServer, this.owner);
                    enjoyerReqEmitter.emit({
                        enjoyerId: enjoyerId.toString(),
                        enjoyerName: enjoyerName,
                        enjoyerSurname: enjoyerSurname,
                        vehicleId: this._id.toString(),
                        vehicleModel: this.type
                    });
                    return [4 /*yield*/, __1.pool.getTedis()
                        // TO DO to check
                    ];
                case 1:
                    tedis = _a.sent();
                    interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tedis.get(this.ownwer.toString())];
                                case 1:
                                    res = !(temp = _a.sent()) ? "" : temp;
                                    if (!(res === "true")) return [3 /*break*/, 4];
                                    this.enjoyers.push(enjoyerId);
                                    return [4 /*yield*/, this.save()];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, (0, user_1.updateUserEnjoyedVehicle)(enjoyerId, this._id)];
                                case 3:
                                    _a.sent();
                                    onComplete(res);
                                    return [3 /*break*/, 5];
                                case 4:
                                    if (res === "false")
                                        onComplete(res);
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
                                    return [4 /*yield*/, tedis.del(this.owner.toString())
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
};
exports.myVehicleSchema.methods.removeEnjoyer = function (enjoyerId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    this.enjoyers = this.enjoyer.filter(function (elem) { return elem !== enjoyerId; });
                    return [4 /*yield*/, this.save().catch(function (err) { return Promise.reject(new server_error_1.ServerError("Internal server error")); })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, user_1.removeUserEnjoyedVehicle)(enjoyerId, this._id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
            }
        });
    });
};
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
            vehicle = new exports.VehicleModel(data);
            return [2 /*return*/, vehicle.save()];
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
                    return [4 /*yield*/, exports.VehicleModel.find({ owner: userId })];
                case 2:
                    vehicles = _a.sent();
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
/**
 * Sets the status of the provided user to the provided value
 * and notifies his friends of the change.
 * @param userId id of the user whose status has to be changed
 * @param newStatus new status of the user
 * @return updated user
 * @private
 */
var setVehicleStatus = function (vehicleId, newStatus) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicle;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getVehicleById(vehicleId)];
            case 1:
                vehicle = _a.sent();
                vehicle.status = newStatus;
                return [2 /*return*/, vehicle.save()];
        }
    });
}); };
exports.setVehicleStatus = setVehicleStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktdmVoaWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS9teS12ZWhpY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBQ3JDLHFDQUE2RjtBQUU3RiwyQkFBNkI7QUFDN0IseUZBQXNGO0FBQ3RGLDJDQUFrRjtBQUNsRix1REFBb0Q7QUFDcEQsK0JBT2dCO0FBQ2hCLGtEQUE0QjtBQUU1Qjs7O0VBR0U7QUFHRixJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDbEIsbUNBQXFCLENBQUE7SUFDckIsYUFBYTtBQUNqQixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFFRCxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDckIsb0NBQW1CLENBQUE7SUFDbkIsa0NBQWlCLENBQUE7QUFDckIsQ0FBQyxFQUhXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBR3hCO0FBaUZELDBEQUEwRDtBQUc3QyxRQUFBLGVBQWUsR0FBRyxJQUFJLGlCQUFNLENBQ3JDO0lBQ0ksSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHNCQUFXLENBQUMsTUFBTTtRQUN4QixRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN4QztJQUVELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxzQkFBVyxDQUFDLFFBQVE7UUFDMUIsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFFRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsc0JBQVcsQ0FBQyxNQUFNO1FBQ3hCLFFBQVEsRUFBRSxLQUFLO0tBQ2xCO0lBRUQsUUFBUSxFQUFFO1FB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QkFHbkUsc0JBQU8sUUFBUSxDQUFDLE1BQU07d0JBQ2xCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSwwQkFBVyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsRUFBQTs7OztDQUMzRTtBQVhELGtEQVdDO0FBSUQsU0FBc0IsY0FBYyxDQUFDLEdBQW1CLEVBQUUsUUFBZ0I7Ozs7Ozs7b0JBR3hELHFCQUFNLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBQTs7b0JBQW5DLE9BQU8sR0FBRyxTQUF5QixDQUFDO29CQUNwQyxxQkFBTSxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFBOztvQkFBbkMsU0FBbUMsQ0FBQzs7OztvQkFFcEMsc0JBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFHLENBQUMsRUFBQzt3QkFFL0Isc0JBQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFDOzs7O0NBQzVCO0FBVEQsd0NBU0M7QUFFRDs7Ozs7OztHQU9HO0FBQ0ksSUFBTSxnQkFBZ0IsR0FBRyxVQUM1QixTQUF5QixFQUN6QixTQUF3Qjs7OztvQkFFYyxxQkFBTSxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUE7O2dCQUFqRSxPQUFPLEdBQTJCLFNBQStCO2dCQUNyRSxPQUFPLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDM0Isc0JBQVEsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFDOzs7S0FDMUIsQ0FBQztBQVBXLFFBQUEsZ0JBQWdCLG9CQU8zQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHsgQW55S2V5cywgRG9jdW1lbnQsIEZpbHRlclF1ZXJ5LCBNb2RlbCwgU2NoZW1hLCBTY2hlbWFUeXBlcywgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gJ3NvY2tldC5pbyc7XHJcbmltcG9ydCB7IHBvb2wgfSBmcm9tICcuLi8uLic7XHJcbmltcG9ydCB7IEVuam95ZXJSZXF1ZXN0RW1pdHRlciB9IGZyb20gJy4uLy4uL2V2ZW50cy9lbWl0dGVycy9lbmpveWVyLXJlcXVlc3QtZW1pdHRlcic7XHJcbmltcG9ydCB7IExlZ2FsSW5mb3MsIExlZ2FsSW5mb3NTY2hlbWEsIExlZ2FsSW5mb3NTdWJEb2N1bWVudCB9IGZyb20gJy4vbGVnYWxJbmZvcydcclxuaW1wb3J0IHsgU2VydmVyRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL3NlcnZlci1lcnJvclwiXHJcbmltcG9ydCB7XHJcbiAgICBnZXRVc2VyQnlJZCxcclxuICAgIHJlbW92ZVVzZXJFbmpveWVkVmVoaWNsZSxcclxuICAgIHVwZGF0ZVVzZXJFbmpveWVkVmVoaWNsZSxcclxuICAgIFVzZXJEb2N1bWVudCxcclxuICAgIFVzZXJTY2hlbWEsXHJcbiAgICBVc2VyU3RhdHVzXHJcbn0gZnJvbSAnLi91c2VyJztcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0XCI7XHJcblxyXG4vKlxyXG4gICAgVGhpcyBjb2xsZWN0aW9uIGlzIHRob3VnaHQgbm90IHRvIGJlIGFuIGVtYmVkZGVkIGRvY3VtZW50IGR1ZSB0byB0aGUgZmFjdCB0aGF0IG1hbnkgdXNlcnMgY2FuIHVzZSB0aGUgc2FtZSBWZWhpY2xlLCBzZXR0aW5nIHRoaXMgc2NoZW1hIGFzIFxyXG4gICAgYSBub3JtYWwgY29sbGVjdGlvbiB3aWxsIHByb2JhYmx5IGFsbG93IHVzIHRvIGNvZGUgZmFzdGVyIHdoaWxlIGRldm9scGluZyB3aG8gY2FuIGNvbnRyb2wgdGhlIFZlaGljbGUgdGhyb3VnaCB0aGlzIGFwcFxyXG4qL1xyXG5cclxuXHJcbmV4cG9ydCBlbnVtIE1vZGVsVHlwZXMge1xyXG4gICAgcHJvamVjdFogPSAncHJvamVjdFonXHJcbiAgICAvLyBjYXJzIG5hbWVzXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZlaGljbGVTdGF0dXMge1xyXG4gICAgT2ZmbGluZSA9ICdPZmZsaW5lJyxcclxuICAgIE9ubGluZSA9ICdPbmxpbmUnXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcHJvamVjdFZlaGljbGUge1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGNhciBtb2RlbCBcclxuICAgICAqL1xyXG4gICAgdHlwZTogTW9kZWxUeXBlcyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgY2FyIGhhcyBhIHBhc3N3b3JkIGJlY2F1c2U6XHJcbiAgICAgKiBhY2Nlc3MgdG8gaGlzIG93biByb3V0ZSBhbmQgcmVjZWl2ZSBpdHMgdG9rZW4gYnkgbG9nZ2luZyBpbiB3aXRoIGl0cyBpZCBhbmQgaXRzIHBzd1xyXG4gICAgICogUFMgdmVoaWNsZSBwc3cgaXMgbWVhbnQgdG8gYmUga25vd24ganVzdCB0byB0aGUgdmVoaWNsZVxyXG4gICAgICogKi9cclxuICAgIHB3ZF9oYXNoOiBzdHJpbmc7XHJcblxyXG4gICAgc2FsdDogc3RyaW5nO1xyXG5cclxuICAgIHN0YXR1czogVmVoaWNsZVN0YXR1cztcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGNhciBvd25lclxyXG4gICAgICovXHJcbiAgICBvd25lcjogVHlwZXMuT2JqZWN0SWQsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIG90aGVyIHVzZXJzIGRpZmZlcmVudCBmcm9tIHRoZSBvd25lciB3aG8gaGF2ZSBhY2Nlc3MgdG8gdGhlIGNhclxyXG4gICAgICovXHJcbiAgICBlbmpveWVyczogVHlwZXMuT2JqZWN0SWRbXSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgbGVnYWwgaW5mbyBhYm91dCB0aGUgY2FyXHJcbiAgICAgKi9cclxuICAgIGxlZ2FsSW5mb3M6IExlZ2FsSW5mb3NcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGUgdGhhdCB0aGUgbm90aWZpY2F0aW9uIHdhcyBjcmVhdGVkIGF0LlxyXG4gICAgICogSXQgaXMgYXV0b21hdGljYWxseSBpbnNlcnRlZCBieSB0aGUgZGF0YWJhc2VcclxuICAgICAqL1xyXG4gICAgY3JlYXRlZEF0PzogRGF0ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGUgdGhhdCB0aGUgbm90aWZpY2F0aW9uIHdhcyBsYXN0IHVwZGF0ZWQgYXQuXHJcbiAgICAgKiBJdCBpcyBhdXRvbWF0aWNhbGx5IGluc2VydGVkIGFuZCB1cGRhdGVkIGJ5IHRoZSBkYXRhYmFzZVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVkQXQ/OiBEYXRlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0VmVoaWNsZURvY3VtZW50IGV4dGVuZHMgcHJvamVjdFZlaGljbGUsIERvY3VtZW50IHtcclxuICAgIGxlZ2FsSW5mb3M6IExlZ2FsSW5mb3NTdWJEb2N1bWVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gYWRkIGEgdXNlcklkIHRvIHRoZSAnZW5qb3llcnMnIGFycmF5XHJcbiAgICAgKiBAcGFyYW0gZW5qb3llcklkIHJlcHJlc2VudCB0aGUgZW5qb3llciBpZCB0byBpbnNlcnRcclxuICAgICAqIEBwYXJhbSBlbmpveWVyTmFtZSByZXByZXNlbnRzIGVuam95ZXIgbmFtZVxyXG4gICAgICogQHBhcmFtIGVuam95ZXJTdXJuYW1lIHJlcHJlc2VudHMgZW5qb3llciBzdXJuYW1lXHJcbiAgICAgKiBAcGFyYW0gaW9TZXJ2ZXIgdXNlZCB0byBpbXBsZW1lbnQgd2ViIHNvY2tldCBjb25uZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gb25Db21wbGV0ZSB1c2VkIHRvIHNlbmQgYSByZXNwb25zZVxyXG4gICAgICovXHJcbiAgICBhZGRFbmpveWVyKGVuam95ZXJJZDogVHlwZXMuT2JqZWN0SWQsIGVuam95ZXJOYW1lOiBzdHJpbmcsIGVuam95ZXJTdXJuYW1lOiBzdHJpbmcsIGlvU2VydmVyOiBTZXJ2ZXIsIG9uQ29tcGxldGU6KHJlczogc3RyaW5nKSA9PiB2b2lkKSA6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHJlbW92ZSBhIHVzZXJJZCBmcm9tIHRoZSAnZW5qb3llcnMnIGFycmF5XHJcbiAgICAgKiBAcGFyYW0gdXNlcklkIHJlcHJlc2VudCB0aGUgZW5qb3llciBpZCB0byByZW1vdmVcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlRW5qb3llcihlbmpveWVySWQ6IFR5cGVzLk9iamVjdElkKSA6IFByb21pc2U8dm9pZD5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBhIG5ldyBwYXNzd29yZCB1c2luZyBiY3J5cHQgaGFzaGluZyBhbmQgc2FsdCBnZW5lcmF0aW9uIGZ1bmN0aW9uc1xyXG4gICAgICogQHBhcmFtIHB3ZCBuZXcgcGFzc3dvcmQgdG8gc2V0XHJcbiAgICAgKi9cclxuICAgIHNldFBhc3N3b3JkKHB3ZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyRG9jdW1lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgdGhlIHZhbGlkaXR5IG9mIHRoZSBwYXNzd29yZCB3aXRoIHRoZSBvbmUgc3RvcmVkIG9uIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHBhcmFtIHB3ZCB0aGUgcGFzc3dvcmQgdG8gY2hlY2tcclxuICAgICAqL1xyXG4gICAgdmFsaWRhdGVQYXNzd29yZChwd2Q6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj47XHJcbn1cclxuXHJcbi8vIFRPIERPIGltcGxlbWVudCByZW1vdmUgb3duZXIvY2hhbmdlIG93bmVyIGluIGEgc2FmZSB3YXlcclxuXHJcblxyXG5leHBvcnQgY29uc3QgbXlWZWhpY2xlU2NoZW1hID0gbmV3IFNjaGVtYTxQcm9qZWN0VmVoaWNsZURvY3VtZW50PihcclxuICAgIHtcclxuICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGluZGV4OiB0cnVlLFxyXG4gICAgICAgICAgICBlbnVtOiBbTW9kZWxUeXBlcy5wcm9qZWN0Wi52YWx1ZU9mKCldXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb3duZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2FsdDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5TdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHB3ZF9oYXNoOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbGVnYWxJbmZvczoge1xyXG4gICAgICAgICAgICB0eXBlOiBMZWdhbEluZm9zU2NoZW1hLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiAoe30pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5qb3llcnM6IHtcclxuICAgICAgICAgICAgdHlwZTogW1NjaGVtYVR5cGVzLk9iamVjdElkXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW11cclxuICAgICAgICB9XHJcbiAgICB9LCBcclxuICAgIHt0aW1lc3RhbXBzOiB0cnVlfVxyXG4pXHJcblxyXG5cclxuLy8gVE8gRE8gcmVtZW1iZXIgdG8gcHV0IGluIHRoZSBmcm9udC1lbmQgdGhlIDYwIHNlYyBsaW1pdCBmb3IgdGhlIG93bmVyIHRvIGFuc3dlciBhbmQgYW5zd2VyIGFueXdheVxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGVuam95ZXJJZFxyXG4gKiBAcGFyYW0gZW5qb3llck5hbWVcclxuICogQHBhcmFtIGVuam95ZXJTdXJuYW1lXHJcbiAqIEBwYXJhbSBpb1NlcnZlclxyXG4gKiBAcGFyYW0gb25Db21wbGV0ZVxyXG4gICovXHJcbm15VmVoaWNsZVNjaGVtYS5tZXRob2RzLmFkZEVuam95ZXIgPSBhc3luYyBmdW5jdGlvbiAoXHJcbiAgICBlbmpveWVySWQ6IFR5cGVzLk9iamVjdElkLCBcclxuICAgIGVuam95ZXJOYW1lOiBzdHJpbmcsXHJcbiAgICBlbmpveWVyU3VybmFtZTogc3RyaW5nLFxyXG4gICAgaW9TZXJ2ZXI6IFNlcnZlciwgXHJcbiAgICBvbkNvbXBsZXRlOiAocmVzOiBzdHJpbmcpID0+IHZvaWRcclxuICAgICkgOiBQcm9taXNlPHZvaWQ+IHtcclxuXHJcbiAgICBsZXQgcmVzOiBzdHJpbmcgPSBcIlwiXHJcbiAgICBsZXQgdGVtcDogYW55XHJcbiAgICBjb25zdCBlbmpveWVyUmVxRW1pdHRlcjogRW5qb3llclJlcXVlc3RFbWl0dGVyID0gbmV3IEVuam95ZXJSZXF1ZXN0RW1pdHRlcihpb1NlcnZlciwgdGhpcy5vd25lcilcclxuICAgIFxyXG4gICAgZW5qb3llclJlcUVtaXR0ZXIuZW1pdCh7XHJcbiAgICAgICAgZW5qb3llcklkOiBlbmpveWVySWQudG9TdHJpbmcoKSxcclxuICAgICAgICBlbmpveWVyTmFtZTogZW5qb3llck5hbWUsXHJcbiAgICAgICAgZW5qb3llclN1cm5hbWU6IGVuam95ZXJTdXJuYW1lLFxyXG4gICAgICAgIHZlaGljbGVJZDogdGhpcy5faWQudG9TdHJpbmcoKSxcclxuICAgICAgICB2ZWhpY2xlTW9kZWw6IHRoaXMudHlwZVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBnZXRzIGEgY29ubmVjdGlvbiBmcm9tIHRoZSBwb29sXHJcbiAgICBsZXQgdGVkaXMgPSBhd2FpdCBwb29sLmdldFRlZGlzKClcclxuXHJcbiAgICAvLyBUTyBETyB0byBjaGVja1xyXG4gICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHJlcyA9ICEodGVtcCA9IGF3YWl0IHRlZGlzLmdldCh0aGlzLm93bndlci50b1N0cmluZygpKSkgPyBcIlwiIDogdGVtcCBhcyBzdHJpbmdcclxuICAgICAgICBpZiAocmVzID09PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICB0aGlzLmVuam95ZXJzLnB1c2goZW5qb3llcklkKVxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNhdmUoKVxyXG4gICAgICAgICAgICBhd2FpdCB1cGRhdGVVc2VyRW5qb3llZFZlaGljbGUoZW5qb3llcklkLCB0aGlzLl9pZClcclxuICAgICAgICAgICAgb25Db21wbGV0ZShyZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJlcyA9PT0gXCJmYWxzZVwiKSBvbkNvbXBsZXRlKHJlcylcclxuICAgIH0sIDUwMDApXHJcbiAgICBcclxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpXHJcbiAgICAgICAgaWYgKHJlcyA9PT0gXCJcIikgb25Db21wbGV0ZShcImZhbHNlXCIpXHJcbiAgICAgICAgIFxyXG4gICAgICAgIC8vcG9wIHRoZSBwYWlyXHJcbiAgICAgICAgYXdhaXQgdGVkaXMuZGVsKHRoaXMub3duZXIudG9TdHJpbmcoKSlcclxuXHJcbiAgICAgICAgLy8gZ2l2ZXMgYmFjayB0aGUgY29ubmVjdGlvbiBcclxuICAgICAgICBwb29sLnB1dFRlZGlzKHRlZGlzKVxyXG4gICAgfSwgNjAwMDApXHJcbn1cclxuXHJcbm15VmVoaWNsZVNjaGVtYS5tZXRob2RzLnJlbW92ZUVuam95ZXIgPSBhc3luYyBmdW5jdGlvbiAoZW5qb3llcklkOiBUeXBlcy5PYmplY3RJZCkgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRoaXMuZW5qb3llcnMgPSB0aGlzLmVuam95ZXIuZmlsdGVyKChlbGVtOiBUeXBlcy5PYmplY3RJZCkgPT4gZWxlbSAhPT0gZW5qb3llcklkKVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpXHJcbiAgICBhd2FpdCByZW1vdmVVc2VyRW5qb3llZFZlaGljbGUoZW5qb3llcklkLCB0aGlzLl9pZClcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG59XHJcblxyXG5teVZlaGljbGVTY2hlbWEubWV0aG9kcy5zZXRQYXNzd29yZCA9IGFzeW5jIGZ1bmN0aW9uIChwd2Q6IHN0cmluZyk6IFByb21pc2U8UHJvamVjdFZlaGljbGVEb2N1bWVudD4ge1xyXG4gICAgY29uc3Qgc2FsdDogc3RyaW5nID0gYXdhaXQgYmNyeXB0XHJcbiAgICAgICAgLmdlblNhbHQoMTApXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT5cclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdFcnJvciB3aXRoIHNhbHQgZ2VuZXJhdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgY29uc3QgcHdkSGFzaCA9IGF3YWl0IGJjcnlwdFxyXG4gICAgICAgIC5oYXNoKHB3ZCwgc2FsdClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggcGFzc3dvcmQgZW5jcnlwdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgdGhpcy5zYWx0ID0gc2FsdDtcclxuICAgIHRoaXMucHdkX2hhc2ggPSBwd2RIYXNoO1xyXG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xyXG59O1xyXG5cclxubXlWZWhpY2xlU2NoZW1hLm1ldGhvZHMudmFsaWRhdGVQYXNzd29yZCA9IGFzeW5jIGZ1bmN0aW9uIChwd2Q6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgY29uc3QgaGFzaGVkUHcgPSBhd2FpdCBiY3J5cHRcclxuICAgICAgICAuaGFzaChwd2QsIHRoaXMuc2FsdClcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PlxyXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0Vycm9yIHdpdGggcGFzc3dvcmQgZW5jcnlwdGlvbicpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucHdkX2hhc2ggPT09IGhhc2hlZFB3O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFZlaGljbGVNb2RlbDogTW9kZWw8UHJvamVjdFZlaGljbGVEb2N1bWVudD4gPSBtb25nb29zZS5tb2RlbCgnTXlWZWhpY2xlJywgbXlWZWhpY2xlU2NoZW1hLCAnTXlWZWhpY2xlcycpO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFZlaGljbGVCeUlkKHZlaGljbGVJZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPFByb2plY3RWZWhpY2xlRG9jdW1lbnQ+IHtcclxuICAgIGNvbnN0IGNhckRvYyA9IGF3YWl0IFZlaGljbGVNb2RlbC5maW5kT25lKHsgX2lkOiB2ZWhpY2xlSWQgfSkuY2F0Y2goKGVycikgPT5cclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gIWNhckRvY1xyXG4gICAgICAgID8gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB2ZWhpY2xlIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoY2FyRG9jKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVZlaGljbGUoZGF0YTogQW55S2V5czxQcm9qZWN0VmVoaWNsZURvY3VtZW50Pik6IFByb21pc2U8UHJvamVjdFZlaGljbGVEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgdmVoaWNsZTogUHJvamVjdFZlaGljbGVEb2N1bWVudCA9IG5ldyBWZWhpY2xlTW9kZWwoZGF0YSk7XHJcbiAgICByZXR1cm4gdmVoaWNsZS5zYXZlKClcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVZlaGljbGUoZmlsdGVyOiBGaWx0ZXJRdWVyeTxQcm9qZWN0VmVoaWNsZURvY3VtZW50Pik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHZlaGljbGU6IFByb2plY3RWZWhpY2xlRG9jdW1lbnRcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdmVoaWNsZSA9IGF3YWl0IGdldFZlaGljbGVCeUlkKGZpbHRlci5faWQpXHJcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIHZlaGljbGUuZW5qb3llcnMpIHtcclxuICAgICAgICAgICAgYXdhaXQgcmVtb3ZlVXNlckVuam95ZWRWZWhpY2xlKHZlaGljbGUuZW5qb3llcnNbaWR4XSwgdmVoaWNsZS5faWQpXHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9iajogeyBkZWxldGVkQ291bnQ/OiBudW1iZXIgfSA9IGF3YWl0IFZlaGljbGVNb2RlbC5kZWxldGVPbmUoZmlsdGVyKS5jYXRjaCgoZXJyKSA9PlxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAhb2JqLmRlbGV0ZWRDb3VudFxyXG4gICAgICAgID8gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB2ZWhpY2xlIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoKTtcclxufSBcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRWZWhpY2xlc0J5VXNlcklkKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPFByb2plY3RWZWhpY2xlRG9jdW1lbnRbXT4ge1xyXG4gICAgbGV0IHZlaGljbGVzOiBQcm9qZWN0VmVoaWNsZURvY3VtZW50W10gPSBbXVxyXG4gICAgdHJ5IHtcclxuICAgICAgICB2ZWhpY2xlcyA9IGF3YWl0IFZlaGljbGVNb2RlbC5maW5kKHsgb3duZXI6IHVzZXJJZCB9KVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmVoaWNsZXMubGVuZ3RoXHJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUodmVoaWNsZXMpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoXCJObyB2ZWhpY2xlcyByZWxhdGVkIHRvIHRoZSB1c2VyXCIpKVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQYXNzd29yZChfaWQ6IFR5cGVzLk9iamVjdElkLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdmVoaWNsZTogUHJvamVjdFZlaGljbGVEb2N1bWVudDtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdmVoaWNsZSA9IGF3YWl0IGdldFZlaGljbGVCeUlkKF9pZCk7XHJcbiAgICAgICAgYXdhaXQgdmVoaWNsZS5zZXRQYXNzd29yZChwYXNzd29yZCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIHN0YXR1cyBvZiB0aGUgcHJvdmlkZWQgdXNlciB0byB0aGUgcHJvdmlkZWQgdmFsdWVcclxuICogYW5kIG5vdGlmaWVzIGhpcyBmcmllbmRzIG9mIHRoZSBjaGFuZ2UuXHJcbiAqIEBwYXJhbSB1c2VySWQgaWQgb2YgdGhlIHVzZXIgd2hvc2Ugc3RhdHVzIGhhcyB0byBiZSBjaGFuZ2VkXHJcbiAqIEBwYXJhbSBuZXdTdGF0dXMgbmV3IHN0YXR1cyBvZiB0aGUgdXNlclxyXG4gKiBAcmV0dXJuIHVwZGF0ZWQgdXNlclxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNldFZlaGljbGVTdGF0dXMgPSBhc3luYyAoXHJcbiAgICB2ZWhpY2xlSWQ6IFR5cGVzLk9iamVjdElkLFxyXG4gICAgbmV3U3RhdHVzOiBWZWhpY2xlU3RhdHVzXHJcbik6IFByb21pc2U8UHJvamVjdFZlaGljbGVEb2N1bWVudD4gPT4ge1xyXG4gICAgbGV0IHZlaGljbGU6IFByb2plY3RWZWhpY2xlRG9jdW1lbnQgPSBhd2FpdCBnZXRWZWhpY2xlQnlJZCh2ZWhpY2xlSWQpO1xyXG4gICAgdmVoaWNsZS5zdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiAgICByZXR1cm4gIHZlaGljbGUuc2F2ZSgpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxuIl19