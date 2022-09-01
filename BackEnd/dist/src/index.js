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
exports.pool = exports.ioServer = exports.httpServer = exports.dbUri = exports.IS_TESTING_MODE = exports.API_BASE_URL = exports.app = void 0;
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
/* Database Connection */
console.log('Demanding the sauce...');
(mongoose
    .connect(exports.dbUri, {})
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, vehicleData, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Sauce received!');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
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
            case 2:
                data = _a.sent();
                return [4 /*yield*/, (0, my_vehicle_1.createVehicle)({
                        type: my_vehicle_1.ModelTypes.projectZ,
                        pwd_hash: '$2b$10$u4YAbPtjj2oCbZWKgFi1NuTqpvHlj2.A7ATGkEy8PM5eSCbZdK/Da',
                        salt: '$2b$10$u4YAbPtjj2oCbZWKgFi1Nu',
                        owner: data.id
                    })];
            case 3:
                vehicleData = _a.sent();
                console.log("user: ");
                console.log(data._id);
                console.log("and his vehicle: ");
                console.log(vehicleData._id);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.log("errore o della create user o della vehicle");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
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
var redisPort = parseInt(process.env.REDIS_PORT);
// Redis pool set-up
exports.pool = new tedis_1.TedisPool({
    port: redisPort,
    host: "127.0.0.1",
    password: process.env.REDIS_PASSWORD
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBaUM7QUFDakMseUNBQTZCO0FBQzdCLHlDQUE2QjtBQUM3QixvREFBeUM7QUFDekMsa0VBQThEO0FBQzlELDhDQUF3QjtBQUN4Qiw0Q0FBZ0M7QUFDaEMsK0NBQW1DO0FBQ25DLDhEQUFrRDtBQUNsRCxnREFBMEI7QUFDMUIseUVBQTRFO0FBQzVFLDZGQUF1RjtBQUN2RiwrQkFBZ0M7QUFDaEMsNkZBQWdHO0FBQ2hHLDhDQUErRDtBQUMvRCwwREFBc0U7QUFDdEUsOERBQXFFO0FBQ3JFLG1DQUFzQztBQUN0Qyx1Q0FBMEM7QUFDMUMscUNBQStCO0FBRy9CLDJEQUEyRDtBQUMzRCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUVsRCxRQUFBLEdBQUcsR0FBWSxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUV0Qyx3QkFBd0I7QUFDWCxRQUFBLFlBQVksR0FBVyxNQUFNLENBQUM7QUFFM0MsNkZBQTZGO0FBQ2hGLFFBQUEsZUFBZSxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztBQUVwRSxrREFBa0Q7QUFDckMsUUFBQSxLQUFLLEdBQVcsdUJBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFxQixDQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQWdCLENBQUM7QUFDakgsSUFBTSxVQUFVLEdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FB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O0FBRUgsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQWdCLE1BQWlCOzs7O1lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQywyQkFBb0IsTUFBTSxDQUFDLEVBQUUsZUFBWSxDQUFDLENBQUMsQ0FBQztZQUloRSxZQUFZLEdBQXlCLElBQUksb0NBQW9CLENBQUMsTUFBTSxFQUFFLGdCQUFRLENBQUMsQ0FBQztZQUN0RixZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFaEIsZUFBZSxHQUEyQixJQUFJLCtDQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2pGLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUVsQixxQkFBcUIsR0FBa0MsSUFBSSx1REFBNkIsQ0FBQyxNQUFNLEVBQUUsZ0JBQVEsQ0FBQyxDQUFBO1lBQ2hILHFCQUFxQixDQUFDLE1BQU0sRUFBRSxDQUFBO1lBRTlCLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsMkJBQW9CLE1BQU0sQ0FBQyxFQUFFLGtCQUFlLENBQUMsQ0FBQyxDQUFDO1lBQzNFLENBQUMsQ0FBQyxDQUFDOzs7O0NBQ04sQ0FBQyxDQUFDO0FBR0gsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDbEQsb0JBQW9CO0FBQ1AsUUFBQSxJQUFJLEdBQUcsSUFBSSxpQkFBUyxDQUFDO0lBQzlCLElBQUksRUFBRSxTQUFTO0lBQ2YsSUFBSSxFQUFFLFdBQVc7SUFDakIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBd0I7Q0FDakQsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCc7XHJcbmltcG9ydCBleHByZXNzLCB7RXhwcmVzc30gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7cmVnaXN0ZXJSb3V0ZXN9IGZyb20gJy4vcm91dGVzL3V0aWxzL3JlZ2lzdGVyLXJvdXRlcyc7XHJcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xyXG5pbXBvcnQgKiBhcyBpbyBmcm9tICdzb2NrZXQuaW8nO1xyXG5pbXBvcnQgKiBhcyB3aW5zdG9uIGZyb20gJ3dpbnN0b24nO1xyXG5pbXBvcnQgKiBhcyBleHByZXNzV2luc3RvbiBmcm9tICdleHByZXNzLXdpbnN0b24nO1xyXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xyXG5pbXBvcnQge1NlcnZlckpvaW5lZExpc3RlbmVyfSBmcm9tIFwiLi9ldmVudHMvY2xpZW50LWxpc3RlbmVycy9zZXJ2ZXItam9pbmVkXCJcclxuaW1wb3J0IHtPd25lclJlc3BvbnNlTGlzdGVuZXJ9IGZyb20gXCIuL2V2ZW50cy9jbGllbnQtbGlzdGVuZXJzL293bmVyLXJlc3BvbnNlLWxpc3RlbmVyXCJcclxuaW1wb3J0IHtUZWRpc1Bvb2x9IGZyb20gXCJ0ZWRpc1wiO1xyXG5pbXBvcnQge0ZyaWVuZFJlcXVlc3RBY2NlcHRlZExpc3RlbmVyfSBmcm9tIFwiLi9ldmVudHMvY2xpZW50LWxpc3RlbmVycy9mcmllbmQtcmVxdWVzdC1hY2NlcHRlZFwiO1xyXG5pbXBvcnQge2NyZWF0ZVVzZXIsIFVzZXJEb2N1bWVudH0gZnJvbSBcIi4vbW9kZWwvZGF0YWJhc2UvdXNlclwiO1xyXG5pbXBvcnQge2NyZWF0ZVZlaGljbGUsIE1vZGVsVHlwZXN9IGZyb20gXCIuL21vZGVsL2RhdGFiYXNlL215LXZlaGljbGVcIjtcclxuaW1wb3J0IHtOb3RpZmljYXRpb24sIE5vdFR5cGVzfSBmcm9tIFwiLi9tb2RlbC9kYXRhYmFzZS9ub3RpZmljYXRpb25cIjtcclxuaW1wb3J0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuaW1wb3J0IGZpbHRlciA9IHJlcXVpcmUoJ2NvbnRlbnQtZmlsdGVyJyk7XHJcbmltcG9ydCB7VHlwZXN9IGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuXHJcbi8vIFJlbWVtYmVyIHRoYXQgdGhlIHJ1bnRpbWUgd29ya2luZyBkaXIgaXMgPHJvb3Q+L2Rpc3Qvc3JjXHJcbmRvdGVudi5jb25maWcoeyBwYXRoOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLmVudicpIH0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFwcDogRXhwcmVzcyA9IGV4cHJlc3MoKTtcclxuXHJcbi8qIEVuZHBvaW50cyBiYXNlIHVybCAqL1xyXG5leHBvcnQgY29uc3QgQVBJX0JBU0VfVVJMOiBzdHJpbmcgPSBcIi9hcGlcIjtcclxuXHJcbi8qIFRydWUgaWYgdGVzdGluZywgZmFsc2Ugb3RoZXJ3aXNlLiBBbGxvd3Mgb3RoZXIgbW9kdWxlcyB0byBrbm93IGlmIHdlJ3JlIGluIHRlc3RpbmcgbW9kZSAqL1xyXG5leHBvcnQgY29uc3QgSVNfVEVTVElOR19NT0RFOiBib29sZWFuID0gcHJvY2Vzcy5lbnYuVEVTVCA9PT0gJ3RydWUnO1xyXG5cclxuLy8gSWYgdGVzdGluZywgc2V0IHRlc3QgZGIgdXJpLCBlbHNlIHVzZSB0aGUgb3RoZXJcclxuZXhwb3J0IGNvbnN0IGRiVXJpOiBzdHJpbmcgPSBJU19URVNUSU5HX01PREUgPyBwcm9jZXNzLmVudi5URVNUX0RCX1VSSSBhcyBzdHJpbmcgIDogcHJvY2Vzcy5lbnYuREJfVVJJIGFzIHN0cmluZztcclxuY29uc3Qgc2VydmVyUG9ydDogbnVtYmVyID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuUE9SVCwgMTApO1xyXG5cclxuY29uc3Qgc2VydmVySG9zdDogc3RyaW5nID0gcHJvY2Vzcy5lbnYuSE9TVCBhcyBzdHJpbmcgO1xyXG5cclxuXHJcbi8qIERhdGFiYXNlIENvbm5lY3Rpb24gKi9cclxuY29uc29sZS5sb2coJ0RlbWFuZGluZyB0aGUgc2F1Y2UuLi4nKTtcclxuXHJcbihcclxuICAgIG1vbmdvb3NlXHJcbiAgICAuY29ubmVjdChkYlVyaSwge30pXHJcbiAgICAudGhlbihhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1NhdWNlIHJlY2VpdmVkIScpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhOiBVc2VyRG9jdW1lbnQgPSBhd2FpdCBjcmVhdGVVc2VyKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYXNoXCIsXHJcbiAgICAgICAgICAgICAgICBzdXJuYW1lOiBcImNhdGNoRW1cIixcclxuICAgICAgICAgICAgICAgIGVtYWlsOiBcIm1ld0Bwb2tlbW9uLmNvbVwiLFxyXG4gICAgICAgICAgICAgICAgbmlja25hbWU6IFwiQWxsXCIsXHJcbiAgICAgICAgICAgICAgICBzYWx0OiAnJDJiJDEwJHU0WUFiUHRqajJvQ2JaV0tnRmkxTnUnLFxyXG4gICAgICAgICAgICAgICAgcHdkX2hhc2g6ICckMmIkMTAkdTRZQWJQdGpqMm9DYlpXS2dGaTFOdVRxcHZIbGoyLkE3QVRHa0V5OFBNNWVTQ2JaZEsvRGEnLFxyXG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZGVyOiBuZXcgVHlwZXMuT2JqZWN0SWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogTm90VHlwZXMuY2FyT2NjdXBpZWRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb25zdCB2ZWhpY2xlRGF0YSA9IGF3YWl0IGNyZWF0ZVZlaGljbGUoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogTW9kZWxUeXBlcy5wcm9qZWN0WixcclxuICAgICAgICAgICAgICAgIHB3ZF9oYXNoOiAnJDJiJDEwJHU0WUFiUHRqajJvQ2JaV0tnRmkxTnVUcXB2SGxqMi5BN0FUR2tFeThQTTVlU0NiWmRLL0RhJyxcclxuICAgICAgICAgICAgICAgIHNhbHQ6ICckMmIkMTAkdTRZQWJQdGpqMm9DYlpXS2dGaTFOdScsXHJcbiAgICAgICAgICAgICAgICBvd25lcjogZGF0YS5pZFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyOiBcIilcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5faWQpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYW5kIGhpcyB2ZWhpY2xlOiBcIilcclxuICAgICAgICAgICAgY29uc29sZS5sb2codmVoaWNsZURhdGEuX2lkKVxyXG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JlIG8gZGVsbGEgY3JlYXRlIHVzZXIgbyBkZWxsYSB2ZWhpY2xlXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBPY2N1cnJlZCBkdXJpbmcgTW9uZ29vc2UgQ29ubmVjdGlvbicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KVxyXG5cclxuKVxyXG5cclxuZXhwb3J0IGNvbnN0IGh0dHBTZXJ2ZXI6IGh0dHAuU2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcclxuaHR0cFNlcnZlci5saXN0ZW4oc2VydmVyUG9ydCwgc2VydmVySG9zdCwgKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coYEhUVFAgU2VydmVyIHN0YXJ0ZWQgb24gJHtzZXJ2ZXJIb3N0fToke3NlcnZlclBvcnR9YCk7XHJcbn0pO1xyXG5cclxuLyogQWxsb3dzIHNlcnZlciB0byByZXNwb25kIHRvIGEgcGFydGljdWxhciByZXF1ZXN0IHRoYXQgYXNrcyB3aGljaCByZXF1ZXN0IG9wdGlvbnMgaXQgYWNjZXB0cyAqL1xyXG5hcHAudXNlKGNvcnMoKSk7XHJcblxyXG4vKiBBbHRlcm5hdGl2ZSB0byBib2R5cGFyc2VyIHdoaWNoIGlzIGRlcHJlY2F0ZWQgKi9cclxuYXBwLnVzZShleHByZXNzLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XHJcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpOyAvLyBUbyBwYXJzZSB0aGUgaW5jb21pbmcgcmVxdWVzdHMgd2l0aCBKU09OIHBheWxvYWRzXHJcblxyXG4vLyBBbGxvdyBjcm9zcy1vcmlnaW5cclxuYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICcqJyk7XHJcbiAgICByZXMuaGVhZGVyKFxyXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJyxcclxuICAgICAgICAnT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCwgQXV0aG9yaXphdGlvbidcclxuICAgICk7XHJcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJywgJyonKTtcclxuICAgIG5leHQoKTtcclxufSk7XHJcblxyXG4vKiBTYW5pdGl6ZSBpbnB1dCB0byBhdm9pZCBOb1NRTCBpbmplY3Rpb25zICovXHJcbmFwcC51c2UoZmlsdGVyKHsgbWV0aG9kTGlzdDogWydHRVQnLCAnUE9TVCcsICdQQVRDSCcsICdERUxFVEUnXSB9KSk7XHJcblxyXG4vKiBFeHByZXNzIFJlcXVlc3RzIGFuZCBSZXNwb25zZXMgbG9nZ2VyICovXHJcbmNvbnN0IHZlcmJvc2VMb2dnaW5nOiBib29sZWFuID0gcHJvY2Vzcy5lbnYuVkVSQk9TRSA9PT0gJ3RydWUnO1xyXG5pZiAodmVyYm9zZUxvZ2dpbmcpIHtcclxuICAgIGV4cHJlc3NXaW5zdG9uLnJlcXVlc3RXaGl0ZWxpc3QucHVzaCgnYm9keScpO1xyXG4gICAgZXhwcmVzc1dpbnN0b24ucmVzcG9uc2VXaGl0ZWxpc3QucHVzaCgnYm9keScpO1xyXG5cclxuICAgIGFwcC51c2UoXHJcbiAgICAgICAgZXhwcmVzc1dpbnN0b24ubG9nZ2VyKHtcclxuICAgICAgICAgICAgdHJhbnNwb3J0czogW25ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSgpXSxcclxuICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxyXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcclxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0Lmpzb24oKSxcclxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LnByZXR0eVByaW50KHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcml6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIG1ldGE6IHRydWUsIC8vIEVuYWJsZSBsb2dnaW5nIG9mIG1ldGFkYXRhXHJcbiAgICAgICAgICAgIG1zZzogJ0hUVFAge3tyZXEubWV0aG9kfX0ge3tyZXEudXJsfX0gfCB7e3Jlcy5zdGF0dXNDb2RlfX0ge3tyZXMucmVzcG9uc2VUaW1lfX1tcycsXHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbn1cclxuXHJcbi8qIFJlZ2lzdGVyIGV4cHJlc3Mgcm91dGVzICovXHJcbnJlZ2lzdGVyUm91dGVzKGFwcCk7XHJcblxyXG4vKiBzb2NrZXQuaW8gc2VydmVyIHNldHVwICovXHJcbmV4cG9ydCBjb25zdCBpb1NlcnZlcjogaW8uU2VydmVyID0gbmV3IGlvLlNlcnZlcihodHRwU2VydmVyLCB7XHJcbiAgICBjb3JzOiB7XHJcbiAgICAgICAgbWV0aG9kczogWydHRVQnLCAnUE9TVCddLFxyXG4gICAgICAgIGNyZWRlbnRpYWxzOiBmYWxzZSxcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuaW9TZXJ2ZXIub24oJ2Nvbm5lY3Rpb24nLCBhc3luYyBmdW5jdGlvbiAoY2xpZW50OiBpby5Tb2NrZXQpIHtcclxuICAgIGNvbnNvbGUubG9nKGNoYWxrLmJnR3JlZW4oYHNvY2tldC5pbyBjbGllbnQgJHtjbGllbnQuaWR9IGNvbm5lY3RlZGApKTtcclxuXHJcbiAgICAvLyBBIGNsaWVudCBqb2lucyBpdHMgcHJpdmF0ZSByb29tLCBzbyB0aGF0IHRoZSBzZXJ2ZXIgaGFzIGEgd2F5Ly9cclxuICAgIC8vIHRvIHNlbmQgcmVxdWVzdCBzcGVjaWZpY2FsbHkgdG8gaGltXHJcbiAgICBjb25zdCBzZXJ2ZXJKb2luZWQ6IFNlcnZlckpvaW5lZExpc3RlbmVyID0gbmV3IFNlcnZlckpvaW5lZExpc3RlbmVyKGNsaWVudCwgaW9TZXJ2ZXIpO1xyXG4gICAgc2VydmVySm9pbmVkLmxpc3RlbigpO1xyXG5cclxuICAgIGNvbnN0IG93bmVyQ2FyQ29udHJvbDogT3duZXJSZXNwb25zZUxpc3RlbmVyID0gIG5ldyBPd25lclJlc3BvbnNlTGlzdGVuZXIoY2xpZW50KVxyXG4gICAgb3duZXJDYXJDb250cm9sLmxpc3RlbigpXHJcblxyXG4gICAgY29uc3QgZnJpZW5kUmVxdWVzdEFjY2VwdGVkOiBGcmllbmRSZXF1ZXN0QWNjZXB0ZWRMaXN0ZW5lciA9IG5ldyBGcmllbmRSZXF1ZXN0QWNjZXB0ZWRMaXN0ZW5lcihjbGllbnQsIGlvU2VydmVyKVxyXG4gICAgZnJpZW5kUmVxdWVzdEFjY2VwdGVkLmxpc3RlbigpXHJcblxyXG4gICAgY2xpZW50Lm9uKCdkaXNjb25uZWN0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmJnUmVkKGBzb2NrZXQuaW8gY2xpZW50ICR7Y2xpZW50LmlkfSBkaXNjb25uZWN0ZWRgKSk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cclxuY29uc3QgcmVkaXNQb3J0ID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuUkVESVNfUE9SVClcclxuLy8gUmVkaXMgcG9vbCBzZXQtdXBcclxuZXhwb3J0IGNvbnN0IHBvb2wgPSBuZXcgVGVkaXNQb29sKHtcclxuICAgIHBvcnQ6IHJlZGlzUG9ydCxcclxuICAgIGhvc3Q6IFwiMTI3LjAuMC4xXCIsXHJcbiAgICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuUkVESVNfUEFTU1dPUkQgYXMgc3RyaW5nXHJcbn0pO1xyXG5cclxuIl19