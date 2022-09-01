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
        required: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS9yb3V0aW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFFO0FBdUJyRSxFQUFFO0FBQ0Ysb0ZBQW9GO0FBQ3ZFLFFBQUEsYUFBYSxHQUFHLElBQUksaUJBQU0sQ0FDbkM7SUFDSSxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELFdBQVcsRUFBRTtRQUNULElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLFNBQVM7S0FDckI7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDZCxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7S0FDekI7SUFDRCxJQUFJLEVBQUU7SUFDRixzQ0FBc0M7S0FDekM7Q0FDSixDQUNKLENBQUE7QUFFWSxRQUFBLFlBQVksR0FBOEIsa0JBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLHFCQUFhLEVBQUUsVUFBVSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UsIHtNb2RlbCwgU2NoZW1hLCBTY2hlbWFUeXBlcywgVHlwZXN9IGZyb20gJ21vbmdvb3NlJztcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRpbmUge1xyXG5cclxuICAgIC8vcm91dGluZSBuYW1lXHJcbiAgICBuYW1lOiBzdHJpbmdcclxuXHJcbiAgICAvL0FDIHRlbXBlcmF0dXJlXHJcbiAgICB0ZW1wZXJhdHVyZTogbnVtYmVyLFxyXG5cclxuICAgIC8vdGhpcyBtYXkgbmVlZCB0byBiZSByZXByZXNlbnRlZCBhcyBhIHdob2xlIGNvbGxlY3Rpb24gaWYgaXQncyBtb3JlIHRoYW4ganVzdCBvbmUgc2V0IG9mIGxpZ2h0c1xyXG4gICAgbGlnaHRzQ29sb3I6IHN0cmluZyxcclxuXHJcbiAgICAvL3JlcHJlc2VudCB3aGljaCBnZW5yZSBpcyByZWxhdGVkIHRvIGEgY2VydGFpbiByb3V0aW5lXHJcbiAgICBtdXNpYzogc3RyaW5nW11cclxuXHJcbiAgICAvL2NvcnJlY3QgdGhlIHR5cGVcclxuICAgIHBhdGg6IGFueVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRpbmVTdWJEb2N1bWVudCBleHRlbmRzIFJvdXRpbmUsIFR5cGVzLlN1YmRvY3VtZW50IHt9XHJcblxyXG4vL1xyXG4vLyBUT0RPIHdoZW4gdGVzdGluZyBpcyBkb25lIHJlcGxhY2Ugbm9ybWFsIHR5ZSB3aXRoIFNjaGVtYVR5cGVzLnR5cGUsIGFuZCBpZDogZmFsc2VcclxuZXhwb3J0IGNvbnN0IFJvdXRpbmVTY2hlbWEgPSBuZXcgU2NoZW1hPFJvdXRpbmVTdWJEb2N1bWVudD4oXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgdGVtcGVyYXR1cmU6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgIH0sIFxyXG4gICAgICAgIGxpZ2h0c0NvbG9yOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgZGVmYXVsdDogXCIjRkZGRkZGXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIG11c2ljOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFtTdHJpbmddLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXCJjbGFzc2ljYWxcIl1cclxuICAgICAgICB9LCBcclxuICAgICAgICBwYXRoOiB7XHJcbiAgICAgICAgICAgIC8vIG5lZWRlZCBkYXRhIHRvIHdvcmsgd2l0aCBnb29nbGUgYXBpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pXHJcblxyXG5leHBvcnQgY29uc3QgUm91dGluZU1vZGVsOiBNb2RlbDxSb3V0aW5lU3ViRG9jdW1lbnQ+ID0gbW9uZ29vc2UubW9kZWwoXCJSb3V0aW5lXCIsIFJvdXRpbmVTY2hlbWEsIFwiUm91dGluZXNcIilcclxuXHJcbiJdfQ==