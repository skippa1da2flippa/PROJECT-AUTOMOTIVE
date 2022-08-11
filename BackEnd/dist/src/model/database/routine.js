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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineModel = exports.RoutineSchema = void 0;
var mongoose_1 = __importStar(require("mongoose"));
//
// TODO when testing is done replace normal tye with SchemaTypes.type, and id: false
exports.RoutineSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    temperature: {
        type: Number,
    },
    lightsColor: {
        type: String,
        default: "#FFFFFF"
    },
    music: {
        type: [String],
        default: ["classical"]
    },
    path: {
    // needed data to work with google api
    }
});
exports.RoutineModel = mongoose_1.default.model("Routine", exports.RoutineSchema, "Routines");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS9yb3V0aW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFFO0FBdUJyRSxFQUFFO0FBQ0Ysb0ZBQW9GO0FBQ3ZFLFFBQUEsYUFBYSxHQUFHLElBQUksaUJBQU0sQ0FDbkM7SUFDSSxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDZjtJQUNELFdBQVcsRUFBRTtRQUNULElBQUksRUFBRSxNQUFNO0tBQ2Y7SUFDRCxXQUFXLEVBQUU7UUFDVCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxTQUFTO0tBQ3JCO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2QsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO0tBQ3pCO0lBQ0QsSUFBSSxFQUFFO0lBQ0Ysc0NBQXNDO0tBQ3pDO0NBQ0osQ0FDSixDQUFBO0FBRVksUUFBQSxZQUFZLEdBQThCLGtCQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxxQkFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7TW9kZWwsIFNjaGVtYSwgU2NoZW1hVHlwZXMsIFR5cGVzfSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSb3V0aW5lIHtcclxuXHJcbiAgICAvL3JvdXRpbmUgbmFtZVxyXG4gICAgbmFtZTogc3RyaW5nXHJcblxyXG4gICAgLy9BQyB0ZW1wZXJhdHVyZVxyXG4gICAgdGVtcGVyYXR1cmU6IG51bWJlcixcclxuXHJcbiAgICAvL3RoaXMgbWF5IG5lZWQgdG8gYmUgcmVwcmVzZW50ZWQgYXMgYSB3aG9sZSBjb2xsZWN0aW9uIGlmIGl0J3MgbW9yZSB0aGFuIGp1c3Qgb25lIHNldCBvZiBsaWdodHNcclxuICAgIGxpZ2h0c0NvbG9yOiBzdHJpbmcsXHJcblxyXG4gICAgLy9yZXByZXNlbnQgd2hpY2ggZ2VucmUgaXMgcmVsYXRlZCB0byBhIGNlcnRhaW4gcm91dGluZVxyXG4gICAgbXVzaWM6IHN0cmluZ1tdXHJcblxyXG4gICAgLy9jb3JyZWN0IHRoZSB0eXBlXHJcbiAgICBwYXRoOiBhbnlcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSb3V0aW5lU3ViRG9jdW1lbnQgZXh0ZW5kcyBSb3V0aW5lLCBUeXBlcy5TdWJkb2N1bWVudCB7fVxyXG5cclxuLy9cclxuLy8gVE9ETyB3aGVuIHRlc3RpbmcgaXMgZG9uZSByZXBsYWNlIG5vcm1hbCB0eWUgd2l0aCBTY2hlbWFUeXBlcy50eXBlLCBhbmQgaWQ6IGZhbHNlXHJcbmV4cG9ydCBjb25zdCBSb3V0aW5lU2NoZW1hID0gbmV3IFNjaGVtYTxSb3V0aW5lU3ViRG9jdW1lbnQ+KFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSwgXHJcbiAgICAgICAgICAgIHVuaXF1ZTogdHJ1ZVxyXG4gICAgICAgIH0sIFxyXG4gICAgICAgIHRlbXBlcmF0dXJlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICB9LCBcclxuICAgICAgICBsaWdodHNDb2xvcjoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiI0ZGRkZGRlwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtdXNpYzoge1xyXG4gICAgICAgICAgICB0eXBlOiBbU3RyaW5nXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW1wiY2xhc3NpY2FsXCJdXHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgcGF0aDoge1xyXG4gICAgICAgICAgICAvLyBuZWVkZWQgZGF0YSB0byB3b3JrIHdpdGggZ29vZ2xlIGFwaVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuKVxyXG5cclxuZXhwb3J0IGNvbnN0IFJvdXRpbmVNb2RlbDogTW9kZWw8Um91dGluZVN1YkRvY3VtZW50PiA9IG1vbmdvb3NlLm1vZGVsKFwiUm91dGluZVwiLCBSb3V0aW5lU2NoZW1hLCBcIlJvdXRpbmVzXCIpXHJcblxyXG4iXX0=