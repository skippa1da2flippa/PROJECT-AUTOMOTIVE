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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerJoinedListener = void 0;
var chalk_1 = __importDefault(require("chalk"));
var client_listener_notifier_1 = require("./base/client-listener-notifier");
/**
 * Class that wraps socket.io functionality to listen to a 'server-joined' client event.
 * Such event creates a room for the client based on the
 * userId that the login has been made with, which allows the server
 * to send events specifically to the user.
 *
 * This listener also handles "teardown" operations for the user,
 * such as setting its status to offline, removing it from the matchmaking queue
 * and making it leave any match he is currently playing.
 */
var ServerJoinedListener = /** @class */ (function (_super) {
    __extends(ServerJoinedListener, _super);
    function ServerJoinedListener(client, ioServer) {
        return _super.call(this, ioServer, client, 'server-joined') || this;
    }
    ServerJoinedListener.prototype.listen = function () {
        var _this = this;
        _super.prototype.listen.call(this, function (joinData) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.client.join(joinData.userId);
                console.log(chalk_1.default.green.bold("User ".concat(joinData.userId, " joined the server!")));
                // Add disconnect listener that performs teardown operations on the
                // user when he leaves the server (such as setting its status to Offline)
                this.client.on('disconnect', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(chalk_1.default.red.bold("User ".concat(joinData.userId, " disconnected from the server!")));
                                return [4 /*yield*/, this.userTeardown(joinData.userId)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, Promise.resolve()];
            });
        }); });
    };
    /**
     * Execute teardown of the user, which consists in all those operations
     * that must be performed after the user leaves the server.
     * Notably, such operation are the following:
     *  - deconnection from the car
     *
     * @param userId id of the user to teardown
     * @private
     */
    ServerJoinedListener.prototype.userTeardown = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    // Do something in the future to teardown the connection with the car
                }
                catch (err) {
                    console.log(chalk_1.default.bgRed("User teardown on disconnect has failed. Reason: ".concat(err.message)));
                }
                return [2 /*return*/];
            });
        });
    };
    return ServerJoinedListener;
}(client_listener_notifier_1.ClientListenerNotifier));
exports.ServerJoinedListener = ServerJoinedListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWpvaW5lZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ldmVudHMvY2xpZW50LWxpc3RlbmVycy9zZXJ2ZXItam9pbmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUEwQjtBQU8xQiw0RUFBeUU7QUFFekU7Ozs7Ozs7OztHQVNHO0FBQ0g7SUFBMEMsd0NBQWdDO0lBQ3RFLDhCQUFZLE1BQWMsRUFBRSxRQUFnQjtlQUN4QyxrQkFBTSxRQUFRLEVBQUUsTUFBTSxFQUFFLGVBQWUsQ0FBQztJQUM1QyxDQUFDO0lBRU0scUNBQU0sR0FBYjtRQUFBLGlCQWtCQztRQWpCRyxpQkFBTSxNQUFNLFlBQUMsVUFBTyxRQUFrQjs7O2dCQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRWxDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBUSxRQUFRLENBQUMsTUFBTSx3QkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBRTVFLG1FQUFtRTtnQkFDbkUseUVBQXlFO2dCQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUU7Ozs7Z0NBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsZUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBUSxRQUFRLENBQUMsTUFBTSxtQ0FBZ0MsQ0FBQyxDQUMxRSxDQUFDO2dDQUVGLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFBOztnQ0FBeEMsU0FBd0MsQ0FBQzs7OztxQkFDNUMsQ0FBQyxDQUFDO2dCQUVILHNCQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBQzs7YUFDNUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ1csMkNBQVksR0FBMUIsVUFBMkIsTUFBYzs7O2dCQUNyQyxJQUFJO29CQUNBLHFFQUFxRTtpQkFFeEU7Z0JBQUMsT0FBTyxHQUFHLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FDUCxlQUFLLENBQUMsS0FBSyxDQUFDLDBEQUFtRCxHQUFHLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FDaEYsQ0FBQztpQkFDTDs7OztLQUNKO0lBQ0wsMkJBQUM7QUFBRCxDQUFDLEFBNUNELENBQTBDLGlEQUFzQixHQTRDL0Q7QUE1Q1ksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmVyLCBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8nO1xyXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xyXG5cclxuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tICcuLi8uLi9tb2RlbC9ldmVudHMvdXNlci1kYXRhJztcclxuaW1wb3J0IHtcclxuICAgIGdldFVzZXJCeUlkLFxyXG4gICAgVXNlckRvY3VtZW50LFxyXG59IGZyb20gJy4uLy4uL21vZGVsL2RhdGFiYXNlL3VzZXInO1xyXG5pbXBvcnQgeyBDbGllbnRMaXN0ZW5lck5vdGlmaWVyIH0gZnJvbSAnLi9iYXNlL2NsaWVudC1saXN0ZW5lci1ub3RpZmllcic7XHJcblxyXG4vKipcclxuICogQ2xhc3MgdGhhdCB3cmFwcyBzb2NrZXQuaW8gZnVuY3Rpb25hbGl0eSB0byBsaXN0ZW4gdG8gYSAnc2VydmVyLWpvaW5lZCcgY2xpZW50IGV2ZW50LlxyXG4gKiBTdWNoIGV2ZW50IGNyZWF0ZXMgYSByb29tIGZvciB0aGUgY2xpZW50IGJhc2VkIG9uIHRoZVxyXG4gKiB1c2VySWQgdGhhdCB0aGUgbG9naW4gaGFzIGJlZW4gbWFkZSB3aXRoLCB3aGljaCBhbGxvd3MgdGhlIHNlcnZlclxyXG4gKiB0byBzZW5kIGV2ZW50cyBzcGVjaWZpY2FsbHkgdG8gdGhlIHVzZXIuXHJcbiAqXHJcbiAqIFRoaXMgbGlzdGVuZXIgYWxzbyBoYW5kbGVzIFwidGVhcmRvd25cIiBvcGVyYXRpb25zIGZvciB0aGUgdXNlcixcclxuICogc3VjaCBhcyBzZXR0aW5nIGl0cyBzdGF0dXMgdG8gb2ZmbGluZSwgcmVtb3ZpbmcgaXQgZnJvbSB0aGUgbWF0Y2htYWtpbmcgcXVldWVcclxuICogYW5kIG1ha2luZyBpdCBsZWF2ZSBhbnkgbWF0Y2ggaGUgaXMgY3VycmVudGx5IHBsYXlpbmcuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VydmVySm9pbmVkTGlzdGVuZXIgZXh0ZW5kcyBDbGllbnRMaXN0ZW5lck5vdGlmaWVyPFVzZXJEYXRhPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihjbGllbnQ6IFNvY2tldCwgaW9TZXJ2ZXI6IFNlcnZlcikge1xyXG4gICAgICAgIHN1cGVyKGlvU2VydmVyLCBjbGllbnQsICdzZXJ2ZXItam9pbmVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxpc3RlbigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5saXN0ZW4oYXN5bmMgKGpvaW5EYXRhOiBVc2VyRGF0YSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5qb2luKGpvaW5EYXRhLnVzZXJJZCk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5ncmVlbi5ib2xkKGBVc2VyICR7am9pbkRhdGEudXNlcklkfSBqb2luZWQgdGhlIHNlcnZlciFgKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgZGlzY29ubmVjdCBsaXN0ZW5lciB0aGF0IHBlcmZvcm1zIHRlYXJkb3duIG9wZXJhdGlvbnMgb24gdGhlXHJcbiAgICAgICAgICAgIC8vIHVzZXIgd2hlbiBoZSBsZWF2ZXMgdGhlIHNlcnZlciAoc3VjaCBhcyBzZXR0aW5nIGl0cyBzdGF0dXMgdG8gT2ZmbGluZSlcclxuICAgICAgICAgICAgdGhpcy5jbGllbnQub24oJ2Rpc2Nvbm5lY3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgICAgICBjaGFsay5yZWQuYm9sZChgVXNlciAke2pvaW5EYXRhLnVzZXJJZH0gZGlzY29ubmVjdGVkIGZyb20gdGhlIHNlcnZlciFgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnVzZXJUZWFyZG93bihqb2luRGF0YS51c2VySWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGUgdGVhcmRvd24gb2YgdGhlIHVzZXIsIHdoaWNoIGNvbnNpc3RzIGluIGFsbCB0aG9zZSBvcGVyYXRpb25zXHJcbiAgICAgKiB0aGF0IG11c3QgYmUgcGVyZm9ybWVkIGFmdGVyIHRoZSB1c2VyIGxlYXZlcyB0aGUgc2VydmVyLlxyXG4gICAgICogTm90YWJseSwgc3VjaCBvcGVyYXRpb24gYXJlIHRoZSBmb2xsb3dpbmc6XHJcbiAgICAgKiAgLSBkZWNvbm5lY3Rpb24gZnJvbSB0aGUgY2FyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHVzZXJJZCBpZCBvZiB0aGUgdXNlciB0byB0ZWFyZG93blxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyB1c2VyVGVhcmRvd24odXNlcklkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgaW4gdGhlIGZ1dHVyZSB0byB0ZWFyZG93biB0aGUgY29ubmVjdGlvbiB3aXRoIHRoZSBjYXJcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgY2hhbGsuYmdSZWQoYFVzZXIgdGVhcmRvd24gb24gZGlzY29ubmVjdCBoYXMgZmFpbGVkLiBSZWFzb246ICR7ZXJyLm1lc3NhZ2V9YClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19