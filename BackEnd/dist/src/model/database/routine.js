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
// TO DO when testing is done replace normal tye with SchemaTypes.type
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbC9kYXRhYmFzZS9yb3V0aW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFFO0FBd0JyRSxzRUFBc0U7QUFDekQsUUFBQSxhQUFhLEdBQUcsSUFBSSxpQkFBTSxDQUNuQztJQUNJLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsSUFBSTtLQUNmO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELFdBQVcsRUFBRTtRQUNULElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLFNBQVM7S0FDckI7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDZCxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7S0FDekI7SUFDRCxJQUFJLEVBQUU7SUFDRixzQ0FBc0M7S0FDekM7Q0FDSixDQUNKLENBQUE7QUFFWSxRQUFBLFlBQVksR0FBOEIsa0JBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLHFCQUFhLEVBQUUsVUFBVSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UsIHtNb2RlbCwgU2NoZW1hLCBTY2hlbWFUeXBlcywgVHlwZXN9IGZyb20gJ21vbmdvb3NlJztcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRpbmUge1xyXG5cclxuICAgIC8vcm91dGluZSBuYW1lXHJcbiAgICBuYW1lOiBzdHJpbmdcclxuXHJcbiAgICAvL0FDIHRlbXBlcmF0dXJlXHJcbiAgICB0ZW1wZXJhdHVyZTogbnVtYmVyLFxyXG5cclxuICAgIC8vdGhpcyBtYXkgbmVlZCB0byBiZSByZXByZXNlbnRlZCBhcyBhIHdob2xlIGNvbGxlY3Rpb24gaWYgaXQncyBtb3JlIHRoYW4ganVzdCBvbmUgc2V0IG9mIGxpZ2h0c1xyXG4gICAgbGlnaHRzQ29sb3I6IHN0cmluZyxcclxuXHJcbiAgICAvL3JlcHJlc2VudCB3aGljaCBnZW5yZSBpcyByZWxhdGVkIHRvIGEgY2VydGFpbiByb3V0aW5lXHJcbiAgICBtdXNpYzogc3RyaW5nW11cclxuXHJcbiAgICAvL2NvcnJlY3QgdGhlIHR5cGVcclxuICAgIHBhdGg6IGFueVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRpbmVTdWJEb2N1bWVudCBleHRlbmRzIFJvdXRpbmUsIFR5cGVzLlN1YmRvY3VtZW50IHt9XHJcblxyXG5cclxuLy8gVE8gRE8gd2hlbiB0ZXN0aW5nIGlzIGRvbmUgcmVwbGFjZSBub3JtYWwgdHllIHdpdGggU2NoZW1hVHlwZXMudHlwZVxyXG5leHBvcnQgY29uc3QgUm91dGluZVNjaGVtYSA9IG5ldyBTY2hlbWE8Um91dGluZVN1YkRvY3VtZW50PihcclxuICAgIHtcclxuICAgICAgICBuYW1lOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsIFxyXG4gICAgICAgICAgICB1bmlxdWU6IHRydWVcclxuICAgICAgICB9LCBcclxuICAgICAgICB0ZW1wZXJhdHVyZToge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgbGlnaHRzQ29sb3I6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIiNGRkZGRkZcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbXVzaWM6IHtcclxuICAgICAgICAgICAgdHlwZTogW1N0cmluZ10sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtcImNsYXNzaWNhbFwiXVxyXG4gICAgICAgIH0sIFxyXG4gICAgICAgIHBhdGg6IHtcclxuICAgICAgICAgICAgLy8gbmVlZGVkIGRhdGEgdG8gd29yayB3aXRoIGdvb2dsZSBhcGlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbilcclxuXHJcbmV4cG9ydCBjb25zdCBSb3V0aW5lTW9kZWw6IE1vZGVsPFJvdXRpbmVTdWJEb2N1bWVudD4gPSBtb25nb29zZS5tb2RlbChcIlJvdXRpbmVcIiwgUm91dGluZVNjaGVtYSwgXCJSb3V0aW5lc1wiKVxyXG5cclxuIl19