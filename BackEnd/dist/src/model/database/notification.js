"use strict";
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
exports.getMostRecentNotifications = exports.NotificationModel = exports.NotificationSchema = exports.NotTypes = void 0;
var mongoose_1 = require("mongoose");
var user_1 = require("./user");
var mongoose_2 = __importDefault(require("mongoose"));
// deletable
/**
 * Enumeration that defines all the possible notification model receivable by a user
 */
var NotTypes;
(function (NotTypes) {
    NotTypes["carOccupied"] = "carOccupied";
    NotTypes["destReached"] = "destReached";
    NotTypes["fuelAlmostOut"] = "fuelAlmostOut";
    NotTypes["friendRequest"] = "friendRequest";
    // many others
})(NotTypes = exports.NotTypes || (exports.NotTypes = {}));
/**
 * A notification is identified by the type
 */
exports.NotificationSchema = new mongoose_1.Schema({
    type: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        enum: [NotTypes.carOccupied.valueOf(), NotTypes.friendRequest.valueOf()],
    },
    sender: {
        type: mongoose_1.SchemaTypes.ObjectId,
        required: true,
    },
}, { timestamps: true });
exports.NotificationModel = mongoose_2.default.model('Notification', exports.NotificationSchema, 'Notification');
/**
 * Returns the most recent notifications of the user, ordered by most recent.
 * @param userId id of the user to retrieve the notifications of
 */
function getMostRecentNotifications(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var not;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.UserModel.findOne({ _id: userId }, { notifications: 1 }).sort({
                        createdAt: -1,
                    })];
                case 1:
                    not = _a.sent();
                    return [2 /*return*/, not.notifications];
            }
        });
    });
}
exports.getMostRecentNotifications = getMostRecentNotifications;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL2RhdGFiYXNlL25vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBc0Q7QUFDdEQsK0JBQTJEO0FBQzNELHNEQUFnQztBQUVoQyxZQUFZO0FBRVo7O0dBRUc7QUFDSCxJQUFZLFFBTVg7QUFORCxXQUFZLFFBQVE7SUFDaEIsdUNBQTJCLENBQUE7SUFDM0IsdUNBQTJCLENBQUE7SUFDM0IsMkNBQStCLENBQUE7SUFDL0IsMkNBQStCLENBQUE7SUFDL0IsY0FBYztBQUNsQixDQUFDLEVBTlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFNbkI7QUFzQ0Q7O0dBRUc7QUFDVyxRQUFBLGtCQUFrQixHQUFHLElBQUksaUJBQU0sQ0FDekM7SUFDSSxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsc0JBQVcsQ0FBQyxNQUFNO1FBQ3hCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQzNFO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLHNCQUFXLENBQUMsUUFBUTtRQUMxQixRQUFRLEVBQUUsSUFBSTtLQUNqQjtDQUNKLEVBQ0QsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQ3ZCLENBQUM7QUFFVyxRQUFBLGlCQUFpQixHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSwwQkFBa0IsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUNwRzs7O0dBR0c7QUFDSCxTQUFzQiwwQkFBMEIsQ0FDNUMsTUFBc0I7Ozs7O3dCQUVJLHFCQUFNLGdCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUMxRixTQUFTLEVBQUUsQ0FBQyxDQUFDO3FCQUNoQixDQUFDLEVBQUE7O29CQUZJLEdBQUcsR0FBaUIsU0FFeEI7b0JBQ0Ysc0JBQU8sR0FBRyxDQUFDLGFBQWEsRUFBQzs7OztDQUM1QjtBQVBELGdFQU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NoZW1hLCBTY2hlbWFUeXBlcywgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCB7VXNlckRvY3VtZW50LCBVc2VyTW9kZWwsIFVzZXJTY2hlbWF9IGZyb20gXCIuL3VzZXJcIjtcclxuaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuLy8gZGVsZXRhYmxlXHJcblxyXG4vKipcclxuICogRW51bWVyYXRpb24gdGhhdCBkZWZpbmVzIGFsbCB0aGUgcG9zc2libGUgbm90aWZpY2F0aW9uIG1vZGVsIHJlY2VpdmFibGUgYnkgYSB1c2VyXHJcbiAqL1xyXG5leHBvcnQgZW51bSBOb3RUeXBlcyB7XHJcbiAgICBjYXJPY2N1cGllZCA9ICdjYXJPY2N1cGllZCcsXHJcbiAgICBkZXN0UmVhY2hlZCA9ICdkZXN0UmVhY2hlZCcsIC8vIHBvcCB1cCBub3QgYSByZWFsIG5vdFxyXG4gICAgZnVlbEFsbW9zdE91dCA9ICdmdWVsQWxtb3N0T3V0JywgLy8gcG9wIHVwIG5vdCBhIHJlYWwgbm90XHJcbiAgICBmcmllbmRSZXF1ZXN0ID0gJ2ZyaWVuZFJlcXVlc3QnLFxyXG4gICAgLy8gbWFueSBvdGhlcnNcclxufVxyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSB0aGF0IHJlcHJlc2VudHMgYSBVc2VyIG5vdGlmaWNhdGlvbiBub3QgbWVhbnQgdG8gcmVwcmVzZW50IFxyXG4gKiBhbm5veWluZyBwb3AgdXAgbm90aWZpY2F0aW9uIGxpa2UgXCJTb21lb25lIHdhbnRzIHRvIGNvbm5lY3QgdG8geW91ciBjYXJcIiBidXRcclxuICogc2ltcGxlIG5vdGlmaWNhdGlvbiBhcyBcImNhck9jY3VwaWVkXCJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm90aWZpY2F0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogVHlwZSBvZiB0aGUgbm90aWZpY2F0aW9uXHJcbiAgICAgKi9cclxuICAgIHR5cGU6IE5vdFR5cGVzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWQgb2YgdGhlIHVzZXIgdGhhdCBzZW50IHRoZSBub3RpZmljYXRpb25cclxuICAgICAqL1xyXG4gICAgc2VuZGVyOiBUeXBlcy5PYmplY3RJZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGUgdGhhdCB0aGUgbm90aWZpY2F0aW9uIHdhcyBjcmVhdGVkIGF0LlxyXG4gICAgICogSXQgaXMgYXV0b21hdGljYWxseSBpbnNlcnRlZCBieSB0aGUgZGF0YWJhc2VcclxuICAgICAqL1xyXG4gICAgY3JlYXRlZEF0PzogRGF0ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGUgdGhhdCB0aGUgbm90aWZpY2F0aW9uIHdhcyBsYXN0IHVwZGF0ZWQgYXQuXHJcbiAgICAgKiBJdCBpcyBhdXRvbWF0aWNhbGx5IGluc2VydGVkIGFuZCB1cGRhdGVkIGJ5IHRoZSBkYXRhYmFzZVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVkQXQ/OiBEYXRlO1xyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIHRoYXQgcmVwcmVzZW50cyBhIG5vdGlmaWNhdGlvbiBzdWItZG9jdW1lbnRcclxuICovXHJcbiBleHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvblN1YkRvY3VtZW50IGV4dGVuZHMgTm90aWZpY2F0aW9uLFxyXG4gICAgVHlwZXMuU3ViZG9jdW1lbnQge31cclxuXHJcblxyXG4vKipcclxuICogQSBub3RpZmljYXRpb24gaXMgaWRlbnRpZmllZCBieSB0aGUgdHlwZVxyXG4gKi9cclxuIGV4cG9ydCBjb25zdCBOb3RpZmljYXRpb25TY2hlbWEgPSBuZXcgU2NoZW1hPE5vdGlmaWNhdGlvblN1YkRvY3VtZW50PihcclxuICAgIHtcclxuICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNjaGVtYVR5cGVzLlN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGVudW06IFtOb3RUeXBlcy5jYXJPY2N1cGllZC52YWx1ZU9mKCksIE5vdFR5cGVzLmZyaWVuZFJlcXVlc3QudmFsdWVPZigpXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbmRlcjoge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWFUeXBlcy5PYmplY3RJZCxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5vdGlmaWNhdGlvbk1vZGVsID0gbW9uZ29vc2UubW9kZWwoJ05vdGlmaWNhdGlvbicsIE5vdGlmaWNhdGlvblNjaGVtYSwgJ05vdGlmaWNhdGlvbicpO1xyXG4vKipcclxuICogUmV0dXJucyB0aGUgbW9zdCByZWNlbnQgbm90aWZpY2F0aW9ucyBvZiB0aGUgdXNlciwgb3JkZXJlZCBieSBtb3N0IHJlY2VudC5cclxuICogQHBhcmFtIHVzZXJJZCBpZCBvZiB0aGUgdXNlciB0byByZXRyaWV2ZSB0aGUgbm90aWZpY2F0aW9ucyBvZlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldE1vc3RSZWNlbnROb3RpZmljYXRpb25zKFxyXG4gICAgdXNlcklkOiBUeXBlcy5PYmplY3RJZFxyXG4pOiBQcm9taXNlPE5vdGlmaWNhdGlvblN1YkRvY3VtZW50W10+IHtcclxuICAgIGNvbnN0IG5vdDogVXNlckRvY3VtZW50ID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyBfaWQ6IHVzZXJJZCB9LCB7IG5vdGlmaWNhdGlvbnM6IDEgfSkuc29ydCh7XHJcbiAgICAgICAgY3JlYXRlZEF0OiAtMSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG5vdC5ub3RpZmljYXRpb25zO1xyXG59XHJcbiJdfQ==