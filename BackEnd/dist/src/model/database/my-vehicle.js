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
exports.getVehiclesByUserId = exports.deleteVehicle = exports.createCar = exports.getVehicleById = exports.VehicleModel = exports.myVehicleSchema = exports.ModelTypes = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var __1 = require("../..");
var enjoyer_request_emitter_1 = require("../../events/emitters/enjoyer-request-emitter");
var legalInfos_1 = require("./legalInfos");
var server_error_1 = require("../errors/server-error");
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
                                    if (!(res === "true")) return [3 /*break*/, 3];
                                    this.enjoyers.push(enjoyerId);
                                    return [4 /*yield*/, this.save()];
                                case 2:
                                    _a.sent();
                                    onComplete(res);
                                    return [3 /*break*/, 4];
                                case 3:
                                    if (res === "false")
                                        onComplete(res);
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
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
                    return [2 /*return*/, Promise.resolve()];
            }
        });
    });
};
exports.VehicleModel = mongoose_1.default.model('MyVehicle', exports.myVehicleSchema, 'MyVehicles');
function getVehicleById(carId) {
    return __awaiter(this, void 0, void 0, function () {
        var carDoc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.VehicleModel.findOne({ _id: carId }).catch(function (err) {
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
function createCar(data) {
    return __awaiter(this, void 0, void 0, function () {
        var car;
        return __generator(this, function (_a) {
            car = new exports.VehicleModel(data);
            return [2 /*return*/, car.save()];
        });
    });
}
exports.createCar = createCar;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktdmVoaWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS9teS12ZWhpY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXVHO0FBRXZHLDJCQUE2QjtBQUM3Qix5RkFBc0Y7QUFDdEYsMkNBQWtGO0FBQ2xGLHVEQUFvRDtBQUVwRDs7O0VBR0U7QUFHRixJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDbEIsbUNBQXFCLENBQUE7SUFDckIsYUFBYTtBQUNqQixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUEwREQsMERBQTBEO0FBRzdDLFFBQUEsZUFBZSxHQUFHLElBQUksaUJBQU0sQ0FDckM7SUFDSSxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsc0JBQVcsQ0FBQyxNQUFNO1FBQ3hCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ3hDO0lBRUQsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLHNCQUFXLENBQUMsUUFBUTtRQUMxQixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUVELFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRSw2QkFBZ0I7UUFDdEIsT0FBTyxFQUFFLGNBQU0sT0FBQSxDQUFDLEVBQUUsQ0FBQyxFQUFKLENBQUk7S0FDdEI7SUFFRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsQ0FBQyxzQkFBVyxDQUFDLFFBQVEsQ0FBQztRQUM1QixPQUFPLEVBQUUsRUFBRTtLQUNkO0NBQ0osRUFDRCxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FDckIsQ0FBQTtBQUdELG9HQUFvRztBQUNwRzs7Ozs7Ozs7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QkFDeEQsUUFBUSxHQUE2QixFQUFFLENBQUE7Ozs7b0JBRTVCLHFCQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUE7O29CQUFyRCxRQUFRLEdBQUcsU0FBMEMsQ0FBQTs7OztvQkFFckQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLDBCQUFXLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFBOzt3QkFHNUQsc0JBQU8sUUFBUSxDQUFDLE1BQU07d0JBQ2xCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSwwQkFBVyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsRUFBQTs7OztDQUMzRTtBQVhELGtEQVdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgU2NoZW1hVHlwZXMsIFR5cGVzLCBEb2N1bWVudCwgTW9kZWwsIEFueUtleXMsIEZpbHRlclF1ZXJ5IH0gZnJvbSAnbW9uZ29vc2UnO1xyXG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tICdzb2NrZXQuaW8nO1xyXG5pbXBvcnQgeyBwb29sIH0gZnJvbSAnLi4vLi4nO1xyXG5pbXBvcnQgeyBFbmpveWVyUmVxdWVzdEVtaXR0ZXIgfSBmcm9tICcuLi8uLi9ldmVudHMvZW1pdHRlcnMvZW5qb3llci1yZXF1ZXN0LWVtaXR0ZXInO1xyXG5pbXBvcnQgeyBMZWdhbEluZm9zLCBMZWdhbEluZm9zU2NoZW1hLCBMZWdhbEluZm9zU3ViRG9jdW1lbnQgfSBmcm9tICcuL2xlZ2FsSW5mb3MnXHJcbmltcG9ydCB7IFNlcnZlckVycm9yIH0gZnJvbSBcIi4uL2Vycm9ycy9zZXJ2ZXItZXJyb3JcIlxyXG5cclxuLypcclxuICAgIFRoaXMgY29sbGVjdGlvbiBpcyB0aG91Z2h0IG5vdCB0byBiZSBhbiBlbWJlZGRlZCBkb2N1bWVudCBkdWUgdG8gdGhlIGZhY3QgdGhhdCBtYW55IHVzZXJzIGNhbiB1c2UgdGhlIHNhbWUgVmVoaWNsZSwgc2V0dGluZyB0aGlzIHNjaGVtYSBhcyBcclxuICAgIGEgbm9ybWFsIGNvbGxlY3Rpb24gd2lsbCBwcm9iYWJseSBhbGxvdyB1cyB0byBjb2RlIGZhc3RlciB3aGlsZSBkZXZvbHBpbmcgd2hvIGNhbiBjb250cm9sIHRoZSBWZWhpY2xlIHRocm91Z2ggdGhpcyBhcHBcclxuKi9cclxuXHJcblxyXG5leHBvcnQgZW51bSBNb2RlbFR5cGVzIHtcclxuICAgIHByb2plY3RaID0gJ3Byb2plY3RaJ1xyXG4gICAgLy8gY2FycyBuYW1lc1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBwcm9qZWN0VmVoaWNsZSB7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgY2FyIG1vZGVsIFxyXG4gICAgICovXHJcbiAgICB0eXBlOiBNb2RlbFR5cGVzLCBcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGNhciBvd25lclxyXG4gICAgICovXHJcbiAgICBvd25lcjogVHlwZXMuT2JqZWN0SWQsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIG90aGVyIHVzZXJzIGRpZmZlcmVudCBmcm9tIHRoZSBvd25lciB3aG8gaGF2ZSBhY2Nlc3MgdG8gdGhlIGNhclxyXG4gICAgICovXHJcbiAgICBlbmpveWVyczogVHlwZXMuT2JqZWN0SWRbXSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgbGVnYWwgaW5mbyBhYm91dCB0aGUgY2FyXHJcbiAgICAgKi9cclxuICAgIGxlZ2FsSW5mb3M6IExlZ2FsSW5mb3NcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGUgdGhhdCB0aGUgbm90aWZpY2F0aW9uIHdhcyBjcmVhdGVkIGF0LlxyXG4gICAgICogSXQgaXMgYXV0b21hdGljYWxseSBpbnNlcnRlZCBieSB0aGUgZGF0YWJhc2VcclxuICAgICAqL1xyXG4gICAgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0ZSB0aGF0IHRoZSBub3RpZmljYXRpb24gd2FzIGxhc3QgdXBkYXRlZCBhdC5cclxuICAgICAqIEl0IGlzIGF1dG9tYXRpY2FsbHkgaW5zZXJ0ZWQgYW5kIHVwZGF0ZWQgYnkgdGhlIGRhdGFiYXNlXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZWRBdD86IERhdGU7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHByb2plY3RWZWhpY2xlRG9jdW1lbnQgZXh0ZW5kcyBwcm9qZWN0VmVoaWNsZSwgRG9jdW1lbnQge1xyXG4gICAgbGVnYWxJbmZvczogTGVnYWxJbmZvc1N1YkRvY3VtZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBhZGQgYSB1c2VySWQgdG8gdGhlICdlbmpveWVycycgYXJyYXlcclxuICAgICAqIEBwYXJhbSBlbmpveWVySWQgcmVwcmVzZW50IHRoZSBlbmpveWVyIGlkIHRvIGluc2VydFxyXG4gICAgICogQHBhcmFtIGVuam95ZXJOYW1lIHJlcHJlc2VudHMgZW5qb3llciBuYW1lXHJcbiAgICAgKiBAcGFyYW0gZW5qb3llclN1cm5hbWUgcmVwcmVzZW50cyBlbmpveWVyIHN1cm5hbWVcclxuICAgICAqIEBwYXJhbSBpb1NlcnZlciB1c2VkIHRvIGltcGxlbWVudCB3ZWIgc29ja2V0IGNvbm5lY3Rpb24gXHJcbiAgICAgKi9cclxuICAgIGFkZEVuam95ZXIoZW5qb3llcklkOiBUeXBlcy5PYmplY3RJZCwgZW5qb3llck5hbWU6IHN0cmluZywgZW5qb3llclN1cm5hbWU6IHN0cmluZywgaW9TZXJ2ZXI6IFNlcnZlcikgOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZW1vdmUgYSB1c2VySWQgZnJvbSB0aGUgJ2Vuam95ZXJzJyBhcnJheVxyXG4gICAgICogQHBhcmFtIHVzZXJJZCByZXByZXNlbnQgdGhlIGVuam95ZXIgaWQgdG8gcmVtb3ZlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUVuam95ZXIoZW5qb3llcklkOiBUeXBlcy5PYmplY3RJZCkgOiBQcm9taXNlPHZvaWQ+XHJcbn1cclxuXHJcbi8vIFRPIERPIGltcGxlbWVudCByZW1vdmUgb3duZXIvY2hhbmdlIG93bmVyIGluIGEgc2FmZSB3YXlcclxuXHJcblxyXG5leHBvcnQgY29uc3QgbXlWZWhpY2xlU2NoZW1hID0gbmV3IFNjaGVtYTxwcm9qZWN0VmVoaWNsZURvY3VtZW50PihcclxuICAgIHtcclxuICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGluZGV4OiB0cnVlLFxyXG4gICAgICAgICAgICBlbnVtOiBbTW9kZWxUeXBlcy5wcm9qZWN0Wi52YWx1ZU9mKCldXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb3duZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbGVnYWxJbmZvczoge1xyXG4gICAgICAgICAgICB0eXBlOiBMZWdhbEluZm9zU2NoZW1hLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiAoe30pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5qb3llcnM6IHtcclxuICAgICAgICAgICAgdHlwZTogW1NjaGVtYVR5cGVzLk9iamVjdElkXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW11cclxuICAgICAgICB9XHJcbiAgICB9LCBcclxuICAgIHt0aW1lc3RhbXBzOiB0cnVlfVxyXG4pXHJcblxyXG5cclxuLy8gVE8gRE8gcmVtZW1iZXIgdG8gcHV0IGluIHRoZSBmcm9udC1lbmQgdGhlIDYwIHNlYyBsaW1pdCBmb3IgdGhlIG93bmVyIHRvIGFuc3dlciBhbmQgYW5zd2VyIGFueXdheVxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSBlbmpveWVySWQgXHJcbiAqIEBwYXJhbSBpb1NlcnZlciBcclxuICogQHBhcmFtIG9uQ29tcGxldGUgdGhpcyB0aGluZyBzaG91bGQgYmUgYnVpbHQgbGlrZSB0aGlzOiBcclxuICogY29uc3Qgb25Db21wbGV0ZSA9IChyZXN1bHQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0ID09PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgIHJlcy5zZW5kKDQwMykuanNvbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgICAvLyAuLi5cclxuICAgICAgICAgcmVzLnNlbmQoMjA0KS5qc29uKCk7XHJcbiAgICAgIH1cclxuICAgfTtcclxuICovXHJcbm15VmVoaWNsZVNjaGVtYS5tZXRob2RzLmFkZEVuam95ZXIgPSBhc3luYyBmdW5jdGlvbiAoXHJcbiAgICBlbmpveWVySWQ6IFR5cGVzLk9iamVjdElkLCBcclxuICAgIGVuam95ZXJOYW1lOiBzdHJpbmcsXHJcbiAgICBlbmpveWVyU3VybmFtZTogc3RyaW5nLFxyXG4gICAgaW9TZXJ2ZXI6IFNlcnZlciwgXHJcbiAgICBvbkNvbXBsZXRlOiAocmVzOiBzdHJpbmcpID0+IHZvaWRcclxuICAgICkgOiBQcm9taXNlPHZvaWQ+IHtcclxuXHJcbiAgICBsZXQgcmVzOiBzdHJpbmcgPSBcIlwiXHJcbiAgICBsZXQgdGVtcDogYW55XHJcbiAgICBjb25zdCBlbm9qZXJSZXFFbWl0dGVyOiBFbmpveWVyUmVxdWVzdEVtaXR0ZXIgPSBuZXcgRW5qb3llclJlcXVlc3RFbWl0dGVyKGlvU2VydmVyLCB0aGlzLm93bmVyKVxyXG4gICAgXHJcbiAgICBlbm9qZXJSZXFFbWl0dGVyLmVtaXQoe1xyXG4gICAgICAgIGVuam95ZXJJZDogZW5qb3llcklkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgZW5qb3llck5hbWU6IGVuam95ZXJOYW1lLFxyXG4gICAgICAgIGVuam95ZXJTdXJuYW1lOiBlbmpveWVyU3VybmFtZSxcclxuICAgICAgICB2ZWhpY2xlSWQ6IHRoaXMuX2lkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgdmVoaWNsZU1vZGVsOiB0aGlzLnR5cGVcclxuICAgIH0pXHJcblxyXG4gICAgLy8gZ2V0cyBhIGNvbm5lY3Rpb24gZnJvbSB0aGUgcG9vbFxyXG4gICAgbGV0IHRlZGlzID0gYXdhaXQgcG9vbC5nZXRUZWRpcygpXHJcblxyXG4gICAgLy8gVE8gRE8gdG8gY2hlY2tcclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcclxuICAgICAgICByZXMgPSAhKHRlbXAgPSBhd2FpdCB0ZWRpcy5nZXQodGhpcy5vd253ZXIudG9TdHJpbmcoKSkpID8gXCJcIiA6IHRlbXAgYXMgc3RyaW5nXHJcbiAgICAgICAgaWYgKHJlcyA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmpveWVycy5wdXNoKGVuam95ZXJJZClcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5zYXZlKClcclxuICAgICAgICAgICAgb25Db21wbGV0ZShyZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJlcyA9PT0gXCJmYWxzZVwiKSBvbkNvbXBsZXRlKHJlcylcclxuICAgIH0sIDUwMDApXHJcbiAgICBcclxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpXHJcbiAgICAgICAgaWYgKHJlcyA9PT0gXCJcIikgb25Db21wbGV0ZShcImZhbHNlXCIpXHJcbiAgICAgICAgIFxyXG4gICAgICAgIC8vcG9wIHRoZSBwYWlyXHJcbiAgICAgICAgYXdhaXQgdGVkaXMuZGVsKHRoaXMub3duZXIudG9TdHJpbmcoKSlcclxuXHJcbiAgICAgICAgLy8gZ2l2ZXMgYmFjayB0aGUgY29ubmVjdGlvbiBcclxuICAgICAgICBwb29sLnB1dFRlZGlzKHRlZGlzKVxyXG4gICAgfSwgNjAwMDApXHJcbn1cclxuXHJcbm15VmVoaWNsZVNjaGVtYS5tZXRob2RzLnJlbW92ZUVuam95ZXIgPSBhc3luYyBmdW5jdGlvbiAoZW5qb3llcklkOiBUeXBlcy5PYmplY3RJZCkgOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRoaXMuZW5qb3llcnMgPSB0aGlzLmVuam95ZXIuZmlsdGVyKChlbGVtOiBUeXBlcy5PYmplY3RJZCkgPT4gZWxlbSAhPT0gZW5qb3llcklkKVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIkludGVybmFsIHNlcnZlciBlcnJvclwiKSkpXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFZlaGljbGVNb2RlbDogTW9kZWw8cHJvamVjdFZlaGljbGVEb2N1bWVudD4gPSBtb25nb29zZS5tb2RlbCgnTXlWZWhpY2xlJywgbXlWZWhpY2xlU2NoZW1hLCAnTXlWZWhpY2xlcycpO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFZlaGljbGVCeUlkKGNhcklkOiBUeXBlcy5PYmplY3RJZCk6IFByb21pc2U8cHJvamVjdFZlaGljbGVEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgY2FyRG9jID0gYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRPbmUoeyBfaWQ6IGNhcklkIH0pLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuICFjYXJEb2NcclxuICAgICAgICA/IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignTm8gdmVoaWNsZSB3aXRoIHRoYXQgaWRlbnRpZmllcicpKVxyXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKGNhckRvYyk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVDYXIoZGF0YTogQW55S2V5czxwcm9qZWN0VmVoaWNsZURvY3VtZW50Pik6IFByb21pc2U8cHJvamVjdFZlaGljbGVEb2N1bWVudD4ge1xyXG4gICAgY29uc3QgY2FyOiBwcm9qZWN0VmVoaWNsZURvY3VtZW50ID0gbmV3IFZlaGljbGVNb2RlbChkYXRhKTtcclxuICAgIHJldHVybiBjYXIuc2F2ZSgpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVWZWhpY2xlKGZpbHRlcjogRmlsdGVyUXVlcnk8cHJvamVjdFZlaGljbGVEb2N1bWVudD4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IG9iajogeyBkZWxldGVkQ291bnQ/OiBudW1iZXIgfSA9IGF3YWl0IFZlaGljbGVNb2RlbC5kZWxldGVPbmUoZmlsdGVyKS5jYXRjaCgoZXJyKSA9PlxyXG4gICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAhb2JqLmRlbGV0ZWRDb3VudFxyXG4gICAgICAgID8gUHJvbWlzZS5yZWplY3QobmV3IFNlcnZlckVycm9yKCdObyB2ZWhpY2xlIHdpdGggdGhhdCBpZGVudGlmaWVyJykpXHJcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoKTtcclxufSBcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRWZWhpY2xlc0J5VXNlcklkKHVzZXJJZDogVHlwZXMuT2JqZWN0SWQpOiBQcm9taXNlPHByb2plY3RWZWhpY2xlRG9jdW1lbnRbXT4ge1xyXG4gICAgbGV0IHZlaGljbGVzOiBwcm9qZWN0VmVoaWNsZURvY3VtZW50W10gPSBbXVxyXG4gICAgdHJ5IHtcclxuICAgICAgICB2ZWhpY2xlcyA9IGF3YWl0IFZlaGljbGVNb2RlbC5maW5kKHsgb3duZXI6IHVzZXJJZCB9KVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgU2VydmVyRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2ZWhpY2xlcy5sZW5ndGhcclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSh2ZWhpY2xlcylcclxuICAgICAgICA6IFByb21pc2UucmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihcIk5vIHZlaGljbGVzIHJlbGF0ZWQgdG8gdGhlIHVzZXJcIikpXHJcbn0iXX0=