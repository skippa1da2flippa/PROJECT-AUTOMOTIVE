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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehiclesByUserId = exports.deleteVehicle = exports.createVehicle = exports.getVehicleById = exports.VehicleModel = exports.myVehicleSchema = exports.ModelTypes = void 0;
var mongoose = __importStar(require("mongoose"));
var mongoose_1 = require("mongoose");
var __1 = require("../..");
var enjoyer_request_emitter_1 = require("../../events/emitters/enjoyer-request-emitter");
var legalInfos_1 = require("./legalInfos");
var server_error_1 = require("../errors/server-error");
var user_1 = require("./user");
/*
    This collection is thought not to be an embedded document due to the fact that many users can use the same Vehicle, setting this schema as
    a normal collection will probably allow us to code faster while devolping who can control the Vehicle through this app
*/
var ModelTypes;
(function (ModelTypes) {
    ModelTypes["projectZ"] = "projectZ";
    // cars names
})(ModelTypes = exports.ModelTypes || (exports.ModelTypes = {}));
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
 * @param ioServer
 * @param onComplete this thing should be built like this:
 * const onComplete = (result: string): void => {
      if (result === "false") {
         // ...
         res.send(403).json();
      }
      else {
         // ...
         res.send(204).json();
      }
   };
 */
exports.myVehicleSchema.methods.addEnjoyer = function (enjoyerId, enjoyerName, enjoyerSurname, ioServer, onComplete) {
    return __awaiter(this, void 0, void 0, function () {
        var res, temp, enojerReqEmitter, tedis, interval;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res = "";
                    enojerReqEmitter = new enjoyer_request_emitter_1.EnjoyerRequestEmitter(ioServer, this.owner);
                    enojerReqEmitter.emit({
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
                                    return [4 /*yield*/, (0, user_1.updateUserEnjoyedVehicles)(enjoyerId, this._id)];
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
        var obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.VehicleModel.deleteOne(filter).catch(function (err) {
                        return Promise.reject(new server_error_1.ServerError('Internal server error'));
                    })];
                case 1:
                    obj = _a.sent();
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
        var vehicles, err_1;
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
                    err_1 = _a.sent();
                    Promise.reject(new server_error_1.ServerError('Internal server error'));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, vehicles.length
                        ? Promise.resolve(vehicles)
                        : Promise.reject(new server_error_1.ServerError("No vehicles related to the user"))];
            }
        });
    });
}
exports.getVehiclesByUserId = getVehiclesByUserId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktdmVoaWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS9teS12ZWhpY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBQ3JDLHFDQUE2RjtBQUU3RiwyQkFBNkI7QUFDN0IseUZBQXNGO0FBQ3RGLDJDQUFrRjtBQUNsRix1REFBb0Q7QUFDcEQsK0JBQXdHO0FBRXhHOzs7RUFHRTtBQUdGLElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNsQixtQ0FBcUIsQ0FBQTtJQUNyQixhQUFhO0FBQ2pCLENBQUMsRUFIVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUdyQjtBQTBERCwwREFBMEQ7QUFHN0MsUUFBQSxlQUFlLEdBQUcsSUFBSSxpQkFBTSxDQUNyQztJQUNJLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxzQkFBVyxDQUFDLE1BQU07UUFDeEIsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDeEM7SUFFRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsc0JBQVcsQ0FBQyxRQUFRO1FBQzFCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBRUQsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLDZCQUFnQjtRQUN0QixPQUFPLEVBQUUsY0FBTSxPQUFBLENBQUMsRUFBRSxDQUFDLEVBQUosQ0FBSTtLQUN0QjtJQUVELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxDQUFDLHNCQUFXLENBQUMsUUFBUSxDQUFDO1FBQzVCLE9BQU8sRUFBRSxFQUFFO0tBQ2Q7Q0FDSixFQUNELEVBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxDQUNyQixDQUFB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c0JBQU8sQ0FBQyxHQUFHLENBQUMsWUFBWTs0QkFDcEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSwwQkFBVyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7NEJBQ3BFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUM7Ozs7Q0FDM0I7QUFSRCxzQ0FRQztBQUVELFNBQXNCLG1CQUFtQixDQUFDLE1BQXNCOzs7Ozs7b0JBQ3hELFFBQVEsR0FBNkIsRUFBRSxDQUFBOzs7O29CQUU1QixxQkFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFBOztvQkFBckQsUUFBUSxHQUFHLFNBQTBDLENBQUE7Ozs7b0JBRXJELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSwwQkFBVyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQTs7d0JBRzVELHNCQUFPLFFBQVEsQ0FBQyxNQUFNO3dCQUNsQixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQzNCLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksMEJBQVcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLEVBQUE7Ozs7Q0FDM0U7QUFYRCxrREFXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHsgQW55S2V5cywgRG9jdW1lbnQsIEZpbHRlclF1ZXJ5LCBNb2RlbCwgU2NoZW1hLCBTY2hlbWFUeXBlcywgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gJ3NvY2tldC5pbyc7XHJcbmltcG9ydCB7IHBvb2wgfSBmcm9tICcuLi8uLic7XHJcbmltcG9ydCB7IEVuam95ZXJSZXF1ZXN0RW1pdHRlciB9IGZyb20gJy4uLy4uL2V2ZW50cy9lbWl0dGVycy9lbmpveWVyLXJlcXVlc3QtZW1pdHRlcic7XHJcbmltcG9ydCB7IExlZ2FsSW5mb3MsIExlZ2FsSW5mb3NTY2hlbWEsIExlZ2FsSW5mb3NTdWJEb2N1bWVudCB9IGZyb20gJy4vbGVnYWxJbmZvcydcclxuaW1wb3J0IHsgU2VydmVyRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL3NlcnZlci1lcnJvclwiXHJcbmltcG9ydCB7IGdldFVzZXJCeUlkLCByZW1vdmVVc2VyRW5qb3llZFZlaGljbGUsIHVwZGF0ZVVzZXJFbmpveWVkVmVoaWNsZXMsIFVzZXJEb2N1bWVudCB9IGZyb20gJy4vdXNlcic7XHJcblxyXG4vKlxyXG4gICAgVGhpcyBjb2xsZWN0aW9uIGlzIHRob3VnaHQgbm90IHRvIGJlIGFuIGVtYmVkZGVkIGRvY3VtZW50IGR1ZSB0byB0aGUgZmFjdCB0aGF0IG1hbnkgdXNlcnMgY2FuIHVzZSB0aGUgc2FtZSBWZWhpY2xlLCBzZXR0aW5nIHRoaXMgc2NoZW1hIGFzIFxyXG4gICAgYSBub3JtYWwgY29sbGVjdGlvbiB3aWxsIHByb2JhYmx5IGFsbG93IHVzIHRvIGNvZGUgZmFzdGVyIHdoaWxlIGRldm9scGluZyB3aG8gY2FuIGNvbnRyb2wgdGhlIFZlaGljbGUgdGhyb3VnaCB0aGlzIGFwcFxyXG4qL1xyXG5cclxuXHJcbmV4cG9ydCBlbnVtIE1vZGVsVHlwZXMge1xyXG4gICAgcHJvamVjdFogPSAncHJvamVjdFonXHJcbiAgICAvLyBjYXJzIG5hbWVzXHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHByb2plY3RWZWhpY2xlIHtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBjYXIgbW9kZWwgXHJcbiAgICAgKi9cclxuICAgIHR5cGU6IE1vZGVsVHlwZXMsIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgY2FyIG93bmVyXHJcbiAgICAgKi9cclxuICAgIG93bmVyOiBUeXBlcy5PYmplY3RJZCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgb3RoZXIgdXNlcnMgZGlmZmVyZW50IGZyb20gdGhlIG93bmVyIHdobyBoYXZlIGFjY2VzcyB0byB0aGUgY2FyXHJcbiAgICAgKi9cclxuICAgIGVuam95ZXJzOiBUeXBlcy5PYmplY3RJZFtdLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBsZWdhbCBpbmZvIGFib3V0IHRoZSBjYXJcclxuICAgICAqL1xyXG4gICAgbGVnYWxJbmZvczogTGVnYWxJbmZvc1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0ZSB0aGF0IHRoZSBub3RpZmljYXRpb24gd2FzIGNyZWF0ZWQgYXQuXHJcbiAgICAgKiBJdCBpcyBhdXRvbWF0aWNhbGx5IGluc2VydGVkIGJ5IHRoZSBkYXRhYmFzZVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVkQXQ/OiBEYXRlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0ZSB0aGF0IHRoZSBub3RpZmljYXRpb24gd2FzIGxhc3QgdXBkYXRlZCBhdC5cclxuICAgICAqIEl0IGlzIGF1dG9tYXRpY2FsbHkgaW5zZXJ0ZWQgYW5kIHVwZGF0ZWQgYnkgdGhlIGRhdGFiYXNlXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZWRBdD86IERhdGU7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHByb2plY3RWZWhpY2xlRG9jdW1lbnQgZXh0ZW5kcyBwcm9qZWN0VmVoaWNsZSwgRG9jdW1lbnQge1xyXG4gICAgbGVnYWxJbmZvczogTGVnYWxJbmZvc1N1YkRvY3VtZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBhZGQgYSB1c2VySWQgdG8gdGhlICdlbmpveWVycycgYXJyYXlcclxuICAgICAqIEBwYXJhbSBlbmpveWVySWQgcmVwcmVzZW50IHRoZSBlbmpveWVyIGlkIHRvIGluc2VydFxyXG4gICAgICogQHBhcmFtIGVuam95ZXJOYW1lIHJlcHJlc2VudHMgZW5qb3llciBuYW1lXHJcbiAgICAgKiBAcGFyYW0gZW5qb3llclN1cm5hbWUgcmVwcmVzZW50cyBlbmpveWVyIHN1cm5hbWVcclxuICAgICAqIEBwYXJhbSBpb1NlcnZlciB1c2VkIHRvIGltcGxlbWVudCB3ZWIgc29ja2V0IGNvbm5lY3Rpb24gXHJcbiAgICAgKi9cclxuICAgIGFkZEVuam95ZXIoZW5qb3llcklkOiBUeXBlcy5PYmplY3RJZCwgZW5qb3llck5hbWU6IHN0cmluZywgZW5qb3llclN1cm5hbWU6IHN0cmluZywgaW9TZXJ2ZXI6IFNlcnZlcikgOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZW1vdmUgYSB1c2VySWQgZnJvbSB0aGUgJ2Vuam95ZXJzJyBhcnJheVxyXG4gICAgICogQHBhcmFtIHVzZXJJZCByZXByZXNlbnQgdGhlIGVuam95ZXIgaWQgdG8gcmVtb3ZlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUVuam95ZXIoZW5qb3llcklkOiBUeXBlcy5PYmplY3RJZCkgOiBQcm9taXNlPHZvaWQ+XHJcbn1cclxuXHJcbi8vIFRPIERPIGltcGxlbWVudCByZW1vdmUgb3duZXIvY2hhbmdlIG93bmVyIGluIGEgc2FmZSB3YXlcclxuXHJcblxyXG5leHBvcnQgY29uc3QgbXlWZWhpY2xlU2NoZW1hID0gbmV3IFNjaGVtYTxwcm9qZWN0VmVoaWNsZURvY3VtZW50PihcclxuICAgIHtcclxuICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGluZGV4OiB0cnVlLFxyXG4gICAgICAgICAgICBlbnVtOiBbTW9kZWxUeXBlcy5wcm9qZWN0Wi52YWx1ZU9mKCldXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb3duZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbGVnYWxJbmZvczoge1xyXG4gICAgICAgICAgICB0eXBlOiBMZWdhbEluZm9zU2NoZW1hLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiAoe30pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5qb3llcnM6IHtcclxuICAgICAgICAgICAgdHlwZTogW1NjaGVtYVR5cGVzLk9iamVjdElkXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW11cclxuICAgICAgICB9XHJcbiAgICB9LCBcclxuICAgIHt0aW1lc3RhbXBzOiB0cnVlfVxyXG4pXHJcblxyXG5cclxuLy8gVE8gRE8gcmVtZW1iZXIgdG8gcHV0IGluIHRoZSBmcm9udC1lbmQgdGhlIDYwIHNlYyBsaW1pdCBmb3IgdGhlIG93bmVyIHRvIGFuc3dlciBhbmQgYW5zd2VyIGFueXdheVxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSBlbmpveWVySWQgXHJcbiAqIEBwYXJhbSBpb1NlcnZlciBcclxuICogQHBhcmFtIG9uQ29tcGxldGUgdGhpcyB0aGluZyBzaG91bGQgYmUgYnVpbHQgbGlrZSB0aGlzOiBcclxuICogY29uc3Qgb25Db21wbGV0ZSA9IChyZXN1bHQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0ID09PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgIHJlcy5zZW5kKDQwMykuanNvbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgICAvLyAuLi5cclxuICAgICAgICAgcmVzLnNlbmQoMjA0KS5qc29uKCk7XHJcbiAgICAgIH1cclxuICAgfTtcclxuICovXHJcbm15VmVoaWNsZVNjaGVtYS5tZXRob2RzLmFkZEVuam95ZXIgPSBhc3luYyBmdW5jdGlvbiAoXHJcbiAgICBlbmpveWVySWQ6IFR5cGVzLk9iamVjdElkLCBcclxuICAgIGVuam95ZXJOYW1lOiBzdHJpbmcsXHJcbiAgICBlbmpveWVyU3VybmFtZTogc3RyaW5nLFxyXG4gICAgaW9TZXJ2ZXI6IFNlcnZlciwgXHJcbiAgICBvbkNvbXBsZXRlOiAocmVzOiBzdHJpbmcpID0+IHZvaWRcclxuICAgICkgOiBQcm9taXNlPHZvaWQ+IHtcclxuXHJcbiAgICBsZXQgcmVzOiBzdHJpbmcgPSBcIlwiXHJcbiAgICBsZXQgdGVtcDogYW55XHJcbiAgICBjb25zdCBlbm9qZXJSZXFFbWl0dGVyOiBFbmpveWVyUmVxdWVzdEVtaXR0ZXIgPSBuZXcgRW5qb3llclJlcXVlc3RFbWl0dGVyKGlvU2VydmVyLCB0aGlzLm93bmVyKVxyXG4gICAgXHJcbiAgICBlbm9qZXJSZXFFbWl0dGVyLmVtaXQoe1xyXG4gICAgICAgIGVuam95ZXJJZDogZW5qb3llcklkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgZW5qb3llck5hbWU6IGVuam95ZXJOYW1lLFxyXG4gICAgICAgIGVuam95ZXJTdXJuYW1lOiBlbmpveWVyU3VybmFtZSxcclxuICAgICAgICB2ZWhpY2xlSWQ6IHRoaXMuX2lkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgdmVoaWNsZU1vZGVsOiB0aGlzLnR5cGVcclxuICAgIH0pXHJcblxyXG4gICAgLy8gZ2V0cyBhIGNvbm5lY3Rpb24gZnJvbSB0aGUgcG9vbFxyXG4gICAgbGV0IHRlZGlzID0gYXdhaXQgcG9vbC5nZXRUZWRpcygpXHJcblxyXG4gICAgLy8gVE8gRE8gdG8gY2hlY2tcclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcclxuICAgICAgICByZXMgPSAhKHRlbXAgPSBhd2FpdCB0ZWRpcy5nZXQodGhpcy5vd253ZXIudG9TdHJpbmcoKSkpID8gXCJcIiA6IHRlbXAgYXMgc3RyaW5nXHJcbiAgICAgICAgaWYgKHJlcyA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmpveWVycy5wdXNoKGVuam95ZXJJZClcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5zYXZlKClcclxuICAgICAgICAgICAgYXdhaXQgdXBkYXRlVXNlckVuam95ZWRWZWhpY2xlcyhlbmpveWVySWQsIHRoaXMuX2lkKVxyXG4gICAgICAgICAgICBvbkNvbXBsZXRlKHJlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVzID09PSBcImZhbHNlXCIpIG9uQ29tcGxldGUocmVzKVxyXG4gICAgfSwgNTAwMClcclxuICAgIFxyXG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbClcclxuICAgICAgICBpZiAocmVzID09PSBcIlwiKSBvbkNvbXBsZXRlKFwiZmFsc2VcIilcclxuICAgICAgICAgXHJcbiAgICAgICAgLy9wb3AgdGhlIHBhaXJcclxuICAgICAgICBhd2FpdCB0ZWRpcy5kZWwodGhpcy5vd25lci50b1N0cmluZygpKVxyXG5cclxuICAgICAgICAvLyBnaXZlcyBiYWNrIHRoZSBjb25uZWN0aW9uIFxyXG4gICAgICAgIHBvb2wucHV0VGVkaXModGVkaXMpXHJcbiAgICB9LCA2MDAwMClcclxufVxyXG5cclxubXlWZWhpY2xlU2NoZW1hLm1ldGhvZHMucmVtb3ZlRW5qb3llciA9IGFzeW5jIGZ1bmN0aW9uIChlbmpveWVySWQ6IFR5cGVzLk9iamVjdElkKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgdGhpcy5lbmpveWVycyA9IHRoaXMuZW5qb3llci5maWx0ZXIoKGVsZW06IFR5cGVzLk9iamVjdElkKSA9PiBlbGVtICE9PSBlbmpveWVySWQpXHJcbiAgICBhd2FpdCB0aGlzLnNhdmUoKS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpKSlcclxuICAgIGF3YWl0IHJlbW92ZVVzZXJFbmpveWVkVmVoaWNsZShlbmpveWVySWQsIHRoaXMuX2lkKVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBWZWhpY2xlTW9kZWw6IE1vZGVsPHByb2plY3RWZWhpY2xlRG9jdW1lbnQ+ID0gbW9uZ29vc2UubW9kZWwoJ015VmVoaWNsZScsIG15VmVoaWNsZVNjaGVtYSwgJ015VmVoaWNsZXMnKTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRWZWhpY2xlQnlJZCh2ZWhpY2xlSWQ6IFR5cGVzLk9iamVjdElkKTogUHJvbWlzZTxwcm9qZWN0VmVoaWNsZURvY3VtZW50PiB7XHJcbiAgICBjb25zdCBjYXJEb2MgPSBhd2FpdCBWZWhpY2xlTW9kZWwuZmluZE9uZSh7IF9pZDogdmVoaWNsZUlkIH0pLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuICFjYXJEb2NcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdmVoaWNsZSB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKGNhckRvYyk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVWZWhpY2xlKGRhdGE6IEFueUtleXM8cHJvamVjdFZlaGljbGVEb2N1bWVudD4pOiBQcm9taXNlPHByb2plY3RWZWhpY2xlRG9jdW1lbnQ+IHtcclxuICAgIGNvbnN0IHZlaGljbGU6IHByb2plY3RWZWhpY2xlRG9jdW1lbnQgPSBuZXcgVmVoaWNsZU1vZGVsKGRhdGEpO1xyXG4gICAgcmV0dXJuIHZlaGljbGUuc2F2ZSgpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVWZWhpY2xlKGZpbHRlcjogRmlsdGVyUXVlcnk8cHJvamVjdFZlaGljbGVEb2N1bWVudD4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IG9iajogeyBkZWxldGVkQ291bnQ/OiBudW1iZXIgfSA9IGF3YWl0IFZlaGljbGVNb2RlbC5kZWxldGVPbmUoZmlsdGVyKS5jYXRjaCgoZXJyKSA9PlxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAhb2JqLmRlbGV0ZWRDb3VudFxyXG4gICAgICAgID8gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB2ZWhpY2xlIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoKTtcclxufSBcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRWZWhpY2xlc0J5VXNlcklkKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPHByb2plY3RWZWhpY2xlRG9jdW1lbnRbXT4ge1xyXG4gICAgbGV0IHZlaGljbGVzOiBwcm9qZWN0VmVoaWNsZURvY3VtZW50W10gPSBbXVxyXG4gICAgdHJ5IHtcclxuICAgICAgICB2ZWhpY2xlcyA9IGF3YWl0IFZlaGljbGVNb2RlbC5maW5kKHsgb3duZXI6IHVzZXJJZCB9KVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2ZWhpY2xlcy5sZW5ndGhcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSh2ZWhpY2xlcylcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHZlaGljbGVzIHJlbGF0ZWQgdG8gdGhlIHVzZXJcIikpXHJcbn1cclxuXHJcblxyXG4iXX0=