"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.OwnerResponseListener = void 0;
var client_listener_1 = require("./base/client-listener");
var __1 = require("../..");
/**
 * Class that wraps socket.io functionality to listen
 * to a 'owner-response' client event.
 * Such event allows the client to join a socket.io room for listening
 * specific chat, so that he can listen only to messages of such chat.
 */
var OwnerResponseListener = /** @class */ (function (_super) {
    __extends(OwnerResponseListener, _super);
    function OwnerResponseListener(client) {
        return _super.call(this, client, 'owner-response') || this;
    }
    OwnerResponseListener.prototype.listen = function () {
        var _this = this;
        _super.prototype.listen.call(this, function (data) { return __awaiter(_this, void 0, void 0, function () {
            var tedis;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __1.pool.getTedis()
                        // stores the response
                        // TODO you should store <userId, {vehicleId, response}>
                    ];
                    case 1:
                        tedis = _a.sent();
                        // stores the response
                        // TODO you should store <userId, {vehicleId, response}>
                        return [4 /*yield*/, tedis.set(data.ownerId, data.res.toString())
                            // gives back the connection
                        ];
                    case 2:
                        // stores the response
                        // TODO you should store <userId, {vehicleId, response}>
                        _a.sent();
                        // gives back the connection
                        __1.pool.putTedis(tedis);
                        return [2 /*return*/, (data.res) ? Promise.resolve() : Promise.resolve()]; //Promise.reject()
                }
            });
        }); });
    };
    return OwnerResponseListener;
}(client_listener_1.ClientListener));
exports.OwnerResponseListener = OwnerResponseListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3duZXItcmVzcG9uc2UtbGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZXZlbnRzL2NsaWVudC1saXN0ZW5lcnMvb3duZXItcmVzcG9uc2UtbGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsMERBQXdEO0FBRXhELDJCQUE2QjtBQUU3Qjs7Ozs7R0FLRztBQUNGO0lBQTJDLHlDQUE0QjtJQUNwRSwrQkFBWSxNQUFjO2VBQ3RCLGtCQUFNLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQztJQUNuQyxDQUFDO0lBRU0sc0NBQU0sR0FBYjtRQUFBLGlCQWVDO1FBZEcsaUJBQU0sTUFBTSxZQUFDLFVBQU8sSUFBa0I7Ozs7NEJBR3RCLHFCQUFNLFFBQUksQ0FBQyxRQUFRLEVBQUU7d0JBRWpDLHNCQUFzQjt3QkFDdEIsd0RBQXdEO3NCQUh2Qjs7d0JBQTdCLEtBQUssR0FBRyxTQUFxQjt3QkFFakMsc0JBQXNCO3dCQUN0Qix3REFBd0Q7d0JBQ3hELHFCQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUVsRCw0QkFBNEI7MEJBRnNCOzt3QkFGbEQsc0JBQXNCO3dCQUN0Qix3REFBd0Q7d0JBQ3hELFNBQWtELENBQUE7d0JBRWxELDRCQUE0Qjt3QkFDNUIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTt3QkFFcEIsc0JBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFBLENBQUEsa0JBQWtCOzs7YUFDN0UsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0FBQyxBQXJCQSxDQUEyQyxnQ0FBYyxHQXFCekQ7QUFyQmEsc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvJztcclxuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcclxuaW1wb3J0IHsgT3duZXJSZXNEYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVsL2V2ZW50cy9vd25lci1yZXMtZGF0YVwiXHJcbmltcG9ydCB7IENsaWVudExpc3RlbmVyIH0gZnJvbSAnLi9iYXNlL2NsaWVudC1saXN0ZW5lcic7XHJcbmltcG9ydCB7IFRlZGlzLCBUZWRpc1Bvb2wgfSBmcm9tIFwidGVkaXNcIjtcclxuaW1wb3J0IHsgcG9vbCB9IGZyb20gJy4uLy4uJztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyB0aGF0IHdyYXBzIHNvY2tldC5pbyBmdW5jdGlvbmFsaXR5IHRvIGxpc3RlblxyXG4gKiB0byBhICdvd25lci1yZXNwb25zZScgY2xpZW50IGV2ZW50LlxyXG4gKiBTdWNoIGV2ZW50IGFsbG93cyB0aGUgY2xpZW50IHRvIGpvaW4gYSBzb2NrZXQuaW8gcm9vbSBmb3IgbGlzdGVuaW5nXHJcbiAqIHNwZWNpZmljIGNoYXQsIHNvIHRoYXQgaGUgY2FuIGxpc3RlbiBvbmx5IHRvIG1lc3NhZ2VzIG9mIHN1Y2ggY2hhdC5cclxuICovXHJcbiBleHBvcnQgY2xhc3MgT3duZXJSZXNwb25zZUxpc3RlbmVyIGV4dGVuZHMgQ2xpZW50TGlzdGVuZXI8T3duZXJSZXNEYXRhPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihjbGllbnQ6IFNvY2tldCkge1xyXG4gICAgICAgIHN1cGVyKGNsaWVudCwgJ293bmVyLXJlc3BvbnNlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxpc3RlbigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5saXN0ZW4oYXN5bmMgKGRhdGE6IE93bmVyUmVzRGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0cyBhIGNvbm5lY3Rpb24gZnJvbSB0aGUgcG9vbFxyXG4gICAgICAgICAgICBsZXQgdGVkaXMgPSBhd2FpdCBwb29sLmdldFRlZGlzKClcclxuXHJcbiAgICAgICAgICAgIC8vIHN0b3JlcyB0aGUgcmVzcG9uc2VcclxuICAgICAgICAgICAgLy8gVE9ETyB5b3Ugc2hvdWxkIHN0b3JlIDx1c2VySWQsIHt2ZWhpY2xlSWQsIHJlc3BvbnNlfT5cclxuICAgICAgICAgICAgYXdhaXQgdGVkaXMuc2V0KGRhdGEub3duZXJJZCwgZGF0YS5yZXMudG9TdHJpbmcoKSlcclxuXHJcbiAgICAgICAgICAgIC8vIGdpdmVzIGJhY2sgdGhlIGNvbm5lY3Rpb25cclxuICAgICAgICAgICAgcG9vbC5wdXRUZWRpcyh0ZWRpcylcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0YS5yZXMpPyBQcm9taXNlLnJlc29sdmUoKSA6IFByb21pc2UucmVzb2x2ZSgpLy9Qcm9taXNlLnJlamVjdCgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSJdfQ==