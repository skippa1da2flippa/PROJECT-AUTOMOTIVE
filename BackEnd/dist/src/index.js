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
exports.ioServer = exports.httpServer = exports.pool = exports.dbUri = exports.IS_TESTING_MODE = exports.API_BASE_URL = exports.app = void 0;
var dotenv = __importStar(require("dotenv"));
var path = __importStar(require("path"));
var http = __importStar(require("http"));
var express_1 = __importDefault(require("express"));
var register_routes_1 = require("./routes/utils/register-routes");
var cors_1 = __importDefault(require("cors"));
var io = __importStar(require("socket.io"));
var winston = __importStar(require("winston"));
var expressWinston = __importStar(require("express-winston"));
var chalk_1 = __importDefault(require("chalk"));
var server_joined_1 = require("./events/client-listeners/server-joined");
var owner_response_listener_1 = require("./events/client-listeners/owner-response-listener");
var tedis_1 = require("tedis");
var friend_request_accepted_1 = require("./events/client-listeners/friend-request-accepted");
var user_1 = require("./model/database/user");
var my_vehicle_1 = require("./model/database/my-vehicle");
var notification_1 = require("./model/database/notification");
var mongoose = require("mongoose");
var filter = require("content-filter");
var mongoose_1 = require("mongoose");
// Remember that the runtime working dir is <root>/dist/src
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
exports.app = (0, express_1.default)();
/* Endpoints base url */
exports.API_BASE_URL = "/api";
/* True if testing, false otherwise. Allows other modules to know if we're in testing mode */
exports.IS_TESTING_MODE = process.env.TEST === 'true';
// If testing, set test db uri, else use the other
exports.dbUri = exports.IS_TESTING_MODE ? process.env.TEST_DB_URI : process.env.DB_URI;
var serverPort = parseInt(process.env.PORT, 10);
var serverHost = process.env.HOST;
var redisPort = parseInt(process.env.REDIS_PORT);
// Redis pool set-up
exports.pool = new tedis_1.TedisPool({
    port: redisPort,
    host: "127.0.0.1",
    password: process.env.REDIS_PASSWORD
});
/* Database Connection */
console.log('Demanding the sauce...');
(mongoose
    .connect(exports.dbUri, {})
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var ted, users, data, vehicleData, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Sauce received!');
                return [4 /*yield*/, exports.pool.getTedis()];
            case 1:
                ted = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 8, , 9]);
                return [4 /*yield*/, ted.del("6310e39cd79ebaa7f59df822")];
            case 3:
                _a.sent();
                return [4 /*yield*/, user_1.UserModel.find().catch(function (err) { console.log("LA findALL ha fallito"); })];
            case 4:
                users = _a.sent();
                if (!(users && !users.length)) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, user_1.createUser)({
                        name: "ash",
                        surname: "catchEm",
                        email: "mew@pokemon.com",
                        nickname: "All",
                        salt: '$2b$10$u4YAbPtjj2oCbZWKgFi1Nu',
                        pwd_hash: '$2b$10$u4YAbPtjj2oCbZWKgFi1NuTqpvHlj2.A7ATGkEy8PM5eSCbZdK/Da',
                        notifications: [
                            {
                                sender: new mongoose_1.Types.ObjectId(),
                                type: notification_1.NotTypes.carOccupied
                            }
                        ]
                    })];
            case 5:
                data = _a.sent();
                return [4 /*yield*/, (0, my_vehicle_1.createVehicle)({
                        type: my_vehicle_1.ModelTypes.projectZ,
                        pwd_hash: '$2b$10$u4YAbPtjj2oCbZWKgFi1NuTqpvHlj2.A7ATGkEy8PM5eSCbZdK/Da',
                        salt: '$2b$10$u4YAbPtjj2oCbZWKgFi1Nu',
                        owner: data.id
                    })];
            case 6:
                vehicleData = _a.sent();
                console.log("user: ");
                console.log(data._id);
                console.log("and his vehicle: ");
                console.log(vehicleData._id);
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                err_1 = _a.sent();
                console.log("errore o della create user o della vehicle");
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); })
    .catch(function (err) {
    console.log('Error Occurred during Mongoose Connection');
    console.log(err);
}));
exports.httpServer = http.createServer(exports.app);
exports.httpServer.listen(serverPort, serverHost, function () {
    console.log("HTTP Server started on ".concat(serverHost, ":").concat(serverPort));
});
/* Allows server to respond to a particular request that asks which request options it accepts */
exports.app.use((0, cors_1.default)());
/* Alternative to bodyparser which is deprecated */
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json()); // To parse the incoming requests with JSON payloads
// Allow cross-origin
exports.app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});
/* Sanitize input to avoid NoSQL injections */
exports.app.use(filter({ methodList: ['GET', 'POST', 'PATCH', 'DELETE'] }));
/* Express Requests and Responses logger */
var verboseLogging = process.env.VERBOSE === 'true';
if (verboseLogging) {
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    exports.app.use(expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json(), winston.format.prettyPrint({
            colorize: true,
        })),
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}} | {{res.statusCode}} {{res.responseTime}}ms',
    }));
}
/* Register express routes */
(0, register_routes_1.registerRoutes)(exports.app);
/* socket.io server setup */
exports.ioServer = new io.Server(exports.httpServer, {
    cors: {
        methods: ['GET', 'POST'],
        credentials: false,
    },
});
exports.ioServer.on('connection', function (client) {
    return __awaiter(this, void 0, void 0, function () {
        var serverJoined, ownerCarControl, friendRequestAccepted;
        return __generator(this, function (_a) {
            console.log(chalk_1.default.bgGreen("socket.io client ".concat(client.id, " connected")));
            serverJoined = new server_joined_1.ServerJoinedListener(client, exports.ioServer);
            serverJoined.listen();
            ownerCarControl = new owner_response_listener_1.OwnerResponseListener(client);
            ownerCarControl.listen();
            friendRequestAccepted = new friend_request_accepted_1.FriendRequestAcceptedListener(client, exports.ioServer);
            friendRequestAccepted.listen();
            client.on('disconnect', function () {
                console.log(chalk_1.default.bgRed("socket.io client ".concat(client.id, " disconnected")));
            });
            return [2 /*return*/];
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBaUM7QUFDakMseUNBQTZCO0FBQzdCLHlDQUE2QjtBQUM3QixvREFBeUM7QUFDekMsa0VBQThEO0FBQzlELDhDQUF3QjtBQUN4Qiw0Q0FBZ0M7QUFDaEMsK0NBQW1DO0FBQ25DLDhEQUFrRDtBQUNsRCxnREFBMEI7QUFDMUIseUVBQTRFO0FBQzVFLDZGQUF1RjtBQUN2RiwrQkFBZ0M7QUFDaEMsNkZBQWdHO0FBQ2hHLDhDQUFzRjtBQUN0RiwwREFBc0U7QUFDdEUsOERBQXFFO0FBQ3JFLG1DQUFzQztBQUN0Qyx1Q0FBMEM7QUFDMUMscUNBQStCO0FBRy9CLDJEQUEyRDtBQUMzRCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUVsRCxRQUFBLEdBQUcsR0FBWSxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUV0Qyx3QkFBd0I7QUFDWCxRQUFBLFlBQVksR0FBVyxNQUFNLENBQUM7QUFFM0MsNkZBQTZGO0FBQ2hGLFFBQUEsZUFBZSxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztBQUVwRSxrREFBa0Q7QUFDckMsUUFBQSxLQUFLLEdBQVcsdUJBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFxQixDQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQWdCLENBQUM7QUFDakgsSUFBTSxVQUFVLEdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FB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TSxFQUFFLGdCQUFRLENBQUMsQ0FBQTtZQUNoSCxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUU5QixNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtnQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLDJCQUFvQixNQUFNLENBQUMsRUFBRSxrQkFBZSxDQUFDLENBQUMsQ0FBQztZQUMzRSxDQUFDLENBQUMsQ0FBQzs7OztDQUNOLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGRvdGVudiBmcm9tICdkb3RlbnYnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnO1xyXG5pbXBvcnQgZXhwcmVzcywge0V4cHJlc3N9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQge3JlZ2lzdGVyUm91dGVzfSBmcm9tICcuL3JvdXRlcy91dGlscy9yZWdpc3Rlci1yb3V0ZXMnO1xyXG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJztcclxuaW1wb3J0ICogYXMgaW8gZnJvbSAnc29ja2V0LmlvJztcclxuaW1wb3J0ICogYXMgd2luc3RvbiBmcm9tICd3aW5zdG9uJztcclxuaW1wb3J0ICogYXMgZXhwcmVzc1dpbnN0b24gZnJvbSAnZXhwcmVzcy13aW5zdG9uJztcclxuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcclxuaW1wb3J0IHtTZXJ2ZXJKb2luZWRMaXN0ZW5lcn0gZnJvbSBcIi4vZXZlbnRzL2NsaWVudC1saXN0ZW5lcnMvc2VydmVyLWpvaW5lZFwiXHJcbmltcG9ydCB7T3duZXJSZXNwb25zZUxpc3RlbmVyfSBmcm9tIFwiLi9ldmVudHMvY2xpZW50LWxpc3RlbmVycy9vd25lci1yZXNwb25zZS1saXN0ZW5lclwiXHJcbmltcG9ydCB7VGVkaXNQb29sfSBmcm9tIFwidGVkaXNcIjtcclxuaW1wb3J0IHtGcmllbmRSZXF1ZXN0QWNjZXB0ZWRMaXN0ZW5lcn0gZnJvbSBcIi4vZXZlbnRzL2NsaWVudC1saXN0ZW5lcnMvZnJpZW5kLXJlcXVlc3QtYWNjZXB0ZWRcIjtcclxuaW1wb3J0IHtjcmVhdGVVc2VyLCBVc2VyRG9jdW1lbnQsIFVzZXJNb2RlbCwgVXNlclNjaGVtYX0gZnJvbSBcIi4vbW9kZWwvZGF0YWJhc2UvdXNlclwiO1xyXG5pbXBvcnQge2NyZWF0ZVZlaGljbGUsIE1vZGVsVHlwZXN9IGZyb20gXCIuL21vZGVsL2RhdGFiYXNlL215LXZlaGljbGVcIjtcclxuaW1wb3J0IHtOb3RpZmljYXRpb24sIE5vdFR5cGVzfSBmcm9tIFwiLi9tb2RlbC9kYXRhYmFzZS9ub3RpZmljYXRpb25cIjtcclxuaW1wb3J0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuaW1wb3J0IGZpbHRlciA9IHJlcXVpcmUoJ2NvbnRlbnQtZmlsdGVyJyk7XHJcbmltcG9ydCB7VHlwZXN9IGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuXHJcbi8vIFJlbWVtYmVyIHRoYXQgdGhlIHJ1bnRpbWUgd29ya2luZyBkaXIgaXMgPHJvb3Q+L2Rpc3Qvc3JjXHJcbmRvdGVudi5jb25maWcoeyBwYXRoOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLmVudicpIH0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFwcDogRXhwcmVzcyA9IGV4cHJlc3MoKTtcclxuXHJcbi8qIEVuZHBvaW50cyBiYXNlIHVybCAqL1xyXG5leHBvcnQgY29uc3QgQVBJX0JBU0VfVVJMOiBzdHJpbmcgPSBcIi9hcGlcIjtcclxuXHJcbi8qIFRydWUgaWYgdGVzdGluZywgZmFsc2Ugb3RoZXJ3aXNlLiBBbGxvd3Mgb3RoZXIgbW9kdWxlcyB0byBrbm93IGlmIHdlJ3JlIGluIHRlc3RpbmcgbW9kZSAqL1xyXG5leHBvcnQgY29uc3QgSVNfVEVTVElOR19NT0RFOiBib29sZWFuID0gcHJvY2Vzcy5lbnYuVEVTVCA9PT0gJ3RydWUnO1xyXG5cclxuLy8gSWYgdGVzdGluZywgc2V0IHRlc3QgZGIgdXJpLCBlbHNlIHVzZSB0aGUgb3RoZXJcclxuZXhwb3J0IGNvbnN0IGRiVXJpOiBzdHJpbmcgPSBJU19URVNUSU5HX01PREUgPyBwcm9jZXNzLmVudi5URVNUX0RCX1VSSSBhcyBzdHJpbmcgIDogcHJvY2Vzcy5lbnYuREJfVVJJIGFzIHN0cmluZztcclxuY29uc3Qgc2VydmVyUG9ydDogbnVtYmVyID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuUE9SVCwgMTApO1xyXG5cclxuY29uc3Qgc2VydmVySG9zdDogc3RyaW5nID0gcHJvY2Vzcy5lbnYuSE9TVCBhcyBzdHJpbmcgO1xyXG5cclxuXHJcbmNvbnN0IHJlZGlzUG9ydCA9IHBhcnNlSW50KHByb2Nlc3MuZW52LlJFRElTX1BPUlQpXHJcbi8vIFJlZGlzIHBvb2wgc2V0LXVwXHJcbmV4cG9ydCBjb25zdCBwb29sID0gbmV3IFRlZGlzUG9vbCh7XHJcbiAgICBwb3J0OiByZWRpc1BvcnQsXHJcbiAgICBob3N0OiBcIjEyNy4wLjAuMVwiLFxyXG4gICAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52LlJFRElTX1BBU1NXT1JEIGFzIHN0cmluZ1xyXG59KTtcclxuXHJcblxyXG4vKiBEYXRhYmFzZSBDb25uZWN0aW9uICovXHJcbmNvbnNvbGUubG9nKCdEZW1hbmRpbmcgdGhlIHNhdWNlLi4uJyk7XHJcblxyXG4oXHJcbiAgICBtb25nb29zZVxyXG4gICAgLmNvbm5lY3QoZGJVcmksIHt9KVxyXG4gICAgLnRoZW4oYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTYXVjZSByZWNlaXZlZCEnKTtcclxuICAgICAgICBsZXQgdGVkID0gYXdhaXQgcG9vbC5nZXRUZWRpcygpXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGVkLmRlbChcIjYzMTBlMzljZDc5ZWJhYTdmNTlkZjgyMlwiKVxyXG4gICAgICAgICAgICBsZXQgdXNlcnMgPSBhd2FpdCBVc2VyTW9kZWwuZmluZCgpLmNhdGNoKGVyciA9PiB7IGNvbnNvbGUubG9nKFwiTEEgZmluZEFMTCBoYSBmYWxsaXRvXCIpfSlcclxuICAgICAgICAgICAgaWYgKHVzZXJzICYmICF1c2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhOiBVc2VyRG9jdW1lbnQgPSBhd2FpdCBjcmVhdGVVc2VyKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1cm5hbWU6IFwiY2F0Y2hFbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBcIm1ld0Bwb2tlbW9uLmNvbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lOiBcIkFsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNhbHQ6ICckMmIkMTAkdTRZQWJQdGpqMm9DYlpXS2dGaTFOdScsXHJcbiAgICAgICAgICAgICAgICAgICAgcHdkX2hhc2g6ICckMmIkMTAkdTRZQWJQdGpqMm9DYlpXS2dGaTFOdVRxcHZIbGoyLkE3QVRHa0V5OFBNNWVTQ2JaZEsvRGEnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZGVyOiBuZXcgVHlwZXMuT2JqZWN0SWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IE5vdFR5cGVzLmNhck9jY3VwaWVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZlaGljbGVEYXRhID0gYXdhaXQgY3JlYXRlVmVoaWNsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogTW9kZWxUeXBlcy5wcm9qZWN0WixcclxuICAgICAgICAgICAgICAgICAgICBwd2RfaGFzaDogJyQyYiQxMCR1NFlBYlB0amoyb0NiWldLZ0ZpMU51VHFwdkhsajIuQTdBVEdrRXk4UE01ZVNDYlpkSy9EYScsXHJcbiAgICAgICAgICAgICAgICAgICAgc2FsdDogJyQyYiQxMCR1NFlBYlB0amoyb0NiWldLZ0ZpMU51JyxcclxuICAgICAgICAgICAgICAgICAgICBvd25lcjogZGF0YS5pZFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXI6IFwiKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5faWQpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFuZCBoaXMgdmVoaWNsZTogXCIpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh2ZWhpY2xlRGF0YS5faWQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yZSBvIGRlbGxhIGNyZWF0ZSB1c2VyIG8gZGVsbGEgdmVoaWNsZVwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgT2NjdXJyZWQgZHVyaW5nIE1vbmdvb3NlIENvbm5lY3Rpb24nKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSlcclxuXHJcbilcclxuXHJcbmV4cG9ydCBjb25zdCBodHRwU2VydmVyOiBodHRwLlNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XHJcbmh0dHBTZXJ2ZXIubGlzdGVuKHNlcnZlclBvcnQsIHNlcnZlckhvc3QsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGBIVFRQIFNlcnZlciBzdGFydGVkIG9uICR7c2VydmVySG9zdH06JHtzZXJ2ZXJQb3J0fWApO1xyXG59KTtcclxuXHJcbi8qIEFsbG93cyBzZXJ2ZXIgdG8gcmVzcG9uZCB0byBhIHBhcnRpY3VsYXIgcmVxdWVzdCB0aGF0IGFza3Mgd2hpY2ggcmVxdWVzdCBvcHRpb25zIGl0IGFjY2VwdHMgKi9cclxuYXBwLnVzZShjb3JzKCkpO1xyXG5cclxuLyogQWx0ZXJuYXRpdmUgdG8gYm9keXBhcnNlciB3aGljaCBpcyBkZXByZWNhdGVkICovXHJcbmFwcC51c2UoZXhwcmVzcy51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xyXG5hcHAudXNlKGV4cHJlc3MuanNvbigpKTsgLy8gVG8gcGFyc2UgdGhlIGluY29taW5nIHJlcXVlc3RzIHdpdGggSlNPTiBwYXlsb2Fkc1xyXG5cclxuLy8gQWxsb3cgY3Jvc3Mtb3JpZ2luXHJcbmFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO1xyXG4gICAgcmVzLmhlYWRlcihcclxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsXHJcbiAgICAgICAgJ09yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHQsIEF1dGhvcml6YXRpb24nXHJcbiAgICApO1xyXG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcycsICcqJyk7XHJcbiAgICBuZXh0KCk7XHJcbn0pO1xyXG5cclxuLyogU2FuaXRpemUgaW5wdXQgdG8gYXZvaWQgTm9TUUwgaW5qZWN0aW9ucyAqL1xyXG5hcHAudXNlKGZpbHRlcih7IG1ldGhvZExpc3Q6IFsnR0VUJywgJ1BPU1QnLCAnUEFUQ0gnLCAnREVMRVRFJ10gfSkpO1xyXG5cclxuLyogRXhwcmVzcyBSZXF1ZXN0cyBhbmQgUmVzcG9uc2VzIGxvZ2dlciAqL1xyXG5jb25zdCB2ZXJib3NlTG9nZ2luZzogYm9vbGVhbiA9IHByb2Nlc3MuZW52LlZFUkJPU0UgPT09ICd0cnVlJztcclxuaWYgKHZlcmJvc2VMb2dnaW5nKSB7XHJcbiAgICBleHByZXNzV2luc3Rvbi5yZXF1ZXN0V2hpdGVsaXN0LnB1c2goJ2JvZHknKTtcclxuICAgIGV4cHJlc3NXaW5zdG9uLnJlc3BvbnNlV2hpdGVsaXN0LnB1c2goJ2JvZHknKTtcclxuXHJcbiAgICBhcHAudXNlKFxyXG4gICAgICAgIGV4cHJlc3NXaW5zdG9uLmxvZ2dlcih7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydHM6IFtuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoKV0sXHJcbiAgICAgICAgICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcclxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LmNvbG9yaXplKCksXHJcbiAgICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5qc29uKCksXHJcbiAgICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5wcmV0dHlQcmludCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3JpemU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBtZXRhOiB0cnVlLCAvLyBFbmFibGUgbG9nZ2luZyBvZiBtZXRhZGF0YVxyXG4gICAgICAgICAgICBtc2c6ICdIVFRQIHt7cmVxLm1ldGhvZH19IHt7cmVxLnVybH19IHwge3tyZXMuc3RhdHVzQ29kZX19IHt7cmVzLnJlc3BvbnNlVGltZX19bXMnLFxyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG59XHJcblxyXG4vKiBSZWdpc3RlciBleHByZXNzIHJvdXRlcyAqL1xyXG5yZWdpc3RlclJvdXRlcyhhcHApO1xyXG5cclxuLyogc29ja2V0LmlvIHNlcnZlciBzZXR1cCAqL1xyXG5leHBvcnQgY29uc3QgaW9TZXJ2ZXI6IGlvLlNlcnZlciA9IG5ldyBpby5TZXJ2ZXIoaHR0cFNlcnZlciwge1xyXG4gICAgY29yczoge1xyXG4gICAgICAgIG1ldGhvZHM6IFsnR0VUJywgJ1BPU1QnXSxcclxuICAgICAgICBjcmVkZW50aWFsczogZmFsc2UsXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbmlvU2VydmVyLm9uKCdjb25uZWN0aW9uJywgYXN5bmMgZnVuY3Rpb24gKGNsaWVudDogaW8uU29ja2V0KSB7XHJcbiAgICBjb25zb2xlLmxvZyhjaGFsay5iZ0dyZWVuKGBzb2NrZXQuaW8gY2xpZW50ICR7Y2xpZW50LmlkfSBjb25uZWN0ZWRgKSk7XHJcblxyXG4gICAgLy8gQSBjbGllbnQgam9pbnMgaXRzIHByaXZhdGUgcm9vbSwgc28gdGhhdCB0aGUgc2VydmVyIGhhcyBhIHdheS8vXHJcbiAgICAvLyB0byBzZW5kIHJlcXVlc3Qgc3BlY2lmaWNhbGx5IHRvIGhpbVxyXG4gICAgY29uc3Qgc2VydmVySm9pbmVkOiBTZXJ2ZXJKb2luZWRMaXN0ZW5lciA9IG5ldyBTZXJ2ZXJKb2luZWRMaXN0ZW5lcihjbGllbnQsIGlvU2VydmVyKTtcclxuICAgIHNlcnZlckpvaW5lZC5saXN0ZW4oKTtcclxuXHJcbiAgICBjb25zdCBvd25lckNhckNvbnRyb2w6IE93bmVyUmVzcG9uc2VMaXN0ZW5lciA9ICBuZXcgT3duZXJSZXNwb25zZUxpc3RlbmVyKGNsaWVudClcclxuICAgIG93bmVyQ2FyQ29udHJvbC5saXN0ZW4oKVxyXG5cclxuICAgIGNvbnN0IGZyaWVuZFJlcXVlc3RBY2NlcHRlZDogRnJpZW5kUmVxdWVzdEFjY2VwdGVkTGlzdGVuZXIgPSBuZXcgRnJpZW5kUmVxdWVzdEFjY2VwdGVkTGlzdGVuZXIoY2xpZW50LCBpb1NlcnZlcilcclxuICAgIGZyaWVuZFJlcXVlc3RBY2NlcHRlZC5saXN0ZW4oKVxyXG5cclxuICAgIGNsaWVudC5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5iZ1JlZChgc29ja2V0LmlvIGNsaWVudCAke2NsaWVudC5pZH0gZGlzY29ubmVjdGVkYCkpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuIl19