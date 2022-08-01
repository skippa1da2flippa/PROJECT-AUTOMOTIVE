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
var mongoose = require("mongoose");
var filter = require("content-filter");
var winston = __importStar(require("winston"));
var expressWinston = __importStar(require("express-winston"));
var chalk_1 = __importDefault(require("chalk"));
var server_joined_1 = require("./events/client-listeners/server-joined");
var owner_response_listener_1 = require("./events/client-listeners/owner-response-listener");
var tedis_1 = require("tedis");
var friend_request_accepted_1 = require("./events/client-listeners/friend-request-accepted");
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
    .then(function () {
    console.log('Sauce received!');
})
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
// TO DO non si avvia con jest
exports.pool = new tedis_1.TedisPool({
    port: redisPort,
    host: "127.0.0.1",
    password: process.env.REDIS_PASSWORD
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBaUM7QUFDakMseUNBQTZCO0FBQzdCLHlDQUE2QjtBQUM3QixvREFBMkM7QUFDM0Msa0VBQWdFO0FBQ2hFLDhDQUF3QjtBQUN4Qiw0Q0FBZ0M7QUFDaEMsbUNBQXNDO0FBQ3RDLHVDQUEwQztBQUMxQywrQ0FBbUM7QUFDbkMsOERBQWtEO0FBQ2xELGdEQUEwQjtBQUMxQix5RUFBOEU7QUFDOUUsNkZBQXlGO0FBQ3pGLCtCQUFrQztBQUNsQyw2RkFBZ0c7QUFHaEcsMkRBQTJEO0FBQzNELE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRWxELFFBQUEsR0FBRyxHQUFZLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBRXRDLHdCQUF3QjtBQUNYLFFBQUEsWUFBWSxHQUFXLE1BQU0sQ0FBQztBQUUzQyw2RkFBNkY7QUFDaEYsUUFBQSxlQUFlLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDO0FBRXBFLGtEQUFrRDtBQUNyQyxRQUFBLEtBQUssR0FBVyx1QkFBZSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQXFCLENBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBZ0IsQ0FBQztBQUNqSCxJQUFNLFVBQVUsR0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFMUQsSUFBTSxVQUFVLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFjLENBQUU7QUFFdkQseUJBQXlCO0FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUV0QyxDQUNJLFFBQVE7S0FDUCxPQUFPLENBQUMsYUFBSyxFQUFFLEVBQUUsQ0FBQztLQUNsQixJQUFJLENBQUM7SUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDO0tBQ0QsS0FBSyxDQUFDLFVBQUMsR0FBRztJQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLENBQUMsQ0FBQztJQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUVMLENBQUE7QUFFWSxRQUFBLFVBQVUsR0FBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFHLENBQUMsQ0FBQztBQUM5RCxrQkFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFO0lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQTBCLFVBQVUsY0FBSSxVQUFVLENBQUUsQ0FBQyxDQUFDO0FBQ3RFLENBQUMsQ0FBQyxDQUFDO0FBRUgsaUdBQWlHO0FBQ2pHLFdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEdBQUUsQ0FBQyxDQUFDO0FBRWhCLG1EQUFtRDtBQUNuRCxXQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNoRCxXQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLG9EQUFvRDtBQUU3RSxxQkFBcUI7QUFDckIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUM1QixHQUFHLENBQUMsTUFBTSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLEdBQUcsQ0FBQyxNQUFNLENBQ04sOEJBQThCLEVBQzlCLCtEQUErRCxDQUNsRSxDQUFDO0lBQ0YsR0FBRyxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoRCxJQUFJLEVBQUUsQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDO0FBRUgsOENBQThDO0FBQzlDLFdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFcEUsMkNBQTJDO0FBQzNDLElBQU0sY0FBYyxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQztBQUMvRCxJQUFJLGNBQWMsRUFBRTtJQUNoQixjQUFjLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFOUMsV0FBRyxDQUFDLEdBQUcsQ0FDSCxjQUFjLENBQUMsTUFBTSxDQUFDO1FBQ2xCLFVBQVUsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM5QyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQzFCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQ3JCLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUMsQ0FDTDtRQUNELElBQUksRUFBRSxJQUFJO1FBQ1YsR0FBRyxFQUFFLDZFQUE2RTtLQUNyRixDQUFDLENBQ0wsQ0FBQztDQUNMO0FBRUQsNkJBQTZCO0FBQzdCLElBQUEsZ0NBQWMsRUFBQyxXQUFHLENBQUMsQ0FBQztBQUVwQiw0QkFBNEI7QUFDZixRQUFBLFFBQVEsR0FBYyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRTtJQUN6RCxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBQ3hCLFdBQVcsRUFBRSxLQUFLO0tBQ3JCO0NBQ0osQ0FBQyxDQUFDO0FBRUgsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQWdCLE1BQWlCOzs7O1lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQywyQkFBb0IsTUFBTSxDQUFDLEVBQUUsZUFBWSxDQUFDLENBQUMsQ0FBQztZQUloRSxZQUFZLEdBQXlCLElBQUksb0NBQW9CLENBQUMsTUFBTSxFQUFFLGdCQUFRLENBQUMsQ0FBQztZQUN0RixZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFaEIsZUFBZSxHQUEyQixJQUFJLCtDQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2pGLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUVsQixxQkFBcUIsR0FBa0MsSUFBSSx1REFBNkIsQ0FBQyxNQUFNLEVBQUUsZ0JBQVEsQ0FBQyxDQUFBO1lBQ2hILHFCQUFxQixDQUFDLE1BQU0sRUFBRSxDQUFBO1lBRTlCLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsMkJBQW9CLE1BQU0sQ0FBQyxFQUFFLGtCQUFlLENBQUMsQ0FBQyxDQUFDO1lBQzNFLENBQUMsQ0FBQyxDQUFDOzs7O0NBQ04sQ0FBQyxDQUFDO0FBR0gsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDbEQsb0JBQW9CO0FBQ3BCLDhCQUE4QjtBQUNqQixRQUFBLElBQUksR0FBRyxJQUFJLGlCQUFTLENBQUM7SUFDOUIsSUFBSSxFQUFFLFNBQVM7SUFDZixJQUFJLEVBQUUsV0FBVztJQUNqQixRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUF3QjtDQUNqRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkb3RlbnYgZnJvbSAnZG90ZW52JztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0ICogYXMgaHR0cCBmcm9tICdodHRwJztcclxuaW1wb3J0IGV4cHJlc3MsIHsgRXhwcmVzcyB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyByZWdpc3RlclJvdXRlcyB9IGZyb20gJy4vcm91dGVzL3V0aWxzL3JlZ2lzdGVyLXJvdXRlcyc7XHJcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xyXG5pbXBvcnQgKiBhcyBpbyBmcm9tICdzb2NrZXQuaW8nO1xyXG5pbXBvcnQgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xyXG5pbXBvcnQgZmlsdGVyID0gcmVxdWlyZSgnY29udGVudC1maWx0ZXInKTtcclxuaW1wb3J0ICogYXMgd2luc3RvbiBmcm9tICd3aW5zdG9uJztcclxuaW1wb3J0ICogYXMgZXhwcmVzc1dpbnN0b24gZnJvbSAnZXhwcmVzcy13aW5zdG9uJztcclxuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcclxuaW1wb3J0IHsgU2VydmVySm9pbmVkTGlzdGVuZXIgfSBmcm9tIFwiLi9ldmVudHMvY2xpZW50LWxpc3RlbmVycy9zZXJ2ZXItam9pbmVkXCJcclxuaW1wb3J0IHsgT3duZXJSZXNwb25zZUxpc3RlbmVyIH0gZnJvbSBcIi4vZXZlbnRzL2NsaWVudC1saXN0ZW5lcnMvb3duZXItcmVzcG9uc2UtbGlzdGVuZXJcIlxyXG5pbXBvcnQgeyBUZWRpc1Bvb2wgfSBmcm9tIFwidGVkaXNcIjtcclxuaW1wb3J0IHtGcmllbmRSZXF1ZXN0QWNjZXB0ZWRMaXN0ZW5lcn0gZnJvbSBcIi4vZXZlbnRzL2NsaWVudC1saXN0ZW5lcnMvZnJpZW5kLXJlcXVlc3QtYWNjZXB0ZWRcIjtcclxuXHJcblxyXG4vLyBSZW1lbWJlciB0aGF0IHRoZSBydW50aW1lIHdvcmtpbmcgZGlyIGlzIDxyb290Pi9kaXN0L3NyY1xyXG5kb3RlbnYuY29uZmlnKHsgcGF0aDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLy5lbnYnKSB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBhcHA6IEV4cHJlc3MgPSBleHByZXNzKCk7XHJcblxyXG4vKiBFbmRwb2ludHMgYmFzZSB1cmwgKi9cclxuZXhwb3J0IGNvbnN0IEFQSV9CQVNFX1VSTDogc3RyaW5nID0gXCIvYXBpXCI7XHJcblxyXG4vKiBUcnVlIGlmIHRlc3RpbmcsIGZhbHNlIG90aGVyd2lzZS4gQWxsb3dzIG90aGVyIG1vZHVsZXMgdG8ga25vdyBpZiB3ZSdyZSBpbiB0ZXN0aW5nIG1vZGUgKi9cclxuZXhwb3J0IGNvbnN0IElTX1RFU1RJTkdfTU9ERTogYm9vbGVhbiA9IHByb2Nlc3MuZW52LlRFU1QgPT09ICd0cnVlJztcclxuXHJcbi8vIElmIHRlc3RpbmcsIHNldCB0ZXN0IGRiIHVyaSwgZWxzZSB1c2UgdGhlIG90aGVyXHJcbmV4cG9ydCBjb25zdCBkYlVyaTogc3RyaW5nID0gSVNfVEVTVElOR19NT0RFID8gcHJvY2Vzcy5lbnYuVEVTVF9EQl9VUkkgYXMgc3RyaW5nICA6IHByb2Nlc3MuZW52LkRCX1VSSSBhcyBzdHJpbmc7XHJcbmNvbnN0IHNlcnZlclBvcnQ6IG51bWJlciA9IHBhcnNlSW50KHByb2Nlc3MuZW52LlBPUlQsIDEwKTtcclxuXHJcbmNvbnN0IHNlcnZlckhvc3Q6IHN0cmluZyA9IHByb2Nlc3MuZW52LkhPU1QgYXMgc3RyaW5nIDtcclxuXHJcbi8qIERhdGFiYXNlIENvbm5lY3Rpb24gKi9cclxuY29uc29sZS5sb2coJ0RlbWFuZGluZyB0aGUgc2F1Y2UuLi4nKTtcclxuXHJcbihcclxuICAgIG1vbmdvb3NlXHJcbiAgICAuY29ubmVjdChkYlVyaSwge30pXHJcbiAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1NhdWNlIHJlY2VpdmVkIScpO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIE9jY3VycmVkIGR1cmluZyBNb25nb29zZSBDb25uZWN0aW9uJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pXHJcblxyXG4pXHJcblxyXG5leHBvcnQgY29uc3QgaHR0cFNlcnZlcjogaHR0cC5TZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihhcHApO1xyXG5odHRwU2VydmVyLmxpc3RlbihzZXJ2ZXJQb3J0LCBzZXJ2ZXJIb3N0LCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgSFRUUCBTZXJ2ZXIgc3RhcnRlZCBvbiAke3NlcnZlckhvc3R9OiR7c2VydmVyUG9ydH1gKTtcclxufSk7XHJcblxyXG4vKiBBbGxvd3Mgc2VydmVyIHRvIHJlc3BvbmQgdG8gYSBwYXJ0aWN1bGFyIHJlcXVlc3QgdGhhdCBhc2tzIHdoaWNoIHJlcXVlc3Qgb3B0aW9ucyBpdCBhY2NlcHRzICovXHJcbmFwcC51c2UoY29ycygpKTtcclxuXHJcbi8qIEFsdGVybmF0aXZlIHRvIGJvZHlwYXJzZXIgd2hpY2ggaXMgZGVwcmVjYXRlZCAqL1xyXG5hcHAudXNlKGV4cHJlc3MudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcclxuYXBwLnVzZShleHByZXNzLmpzb24oKSk7IC8vIFRvIHBhcnNlIHRoZSBpbmNvbWluZyByZXF1ZXN0cyB3aXRoIEpTT04gcGF5bG9hZHNcclxuXHJcbi8vIEFsbG93IGNyb3NzLW9yaWdpblxyXG5hcHAudXNlKGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgJyonKTtcclxuICAgIHJlcy5oZWFkZXIoXHJcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnLFxyXG4gICAgICAgICdPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0LCBBdXRob3JpemF0aW9uJ1xyXG4gICAgKTtcclxuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnLCAnKicpO1xyXG4gICAgbmV4dCgpO1xyXG59KTtcclxuXHJcbi8qIFNhbml0aXplIGlucHV0IHRvIGF2b2lkIE5vU1FMIGluamVjdGlvbnMgKi9cclxuYXBwLnVzZShmaWx0ZXIoeyBtZXRob2RMaXN0OiBbJ0dFVCcsICdQT1NUJywgJ1BBVENIJywgJ0RFTEVURSddIH0pKTtcclxuXHJcbi8qIEV4cHJlc3MgUmVxdWVzdHMgYW5kIFJlc3BvbnNlcyBsb2dnZXIgKi9cclxuY29uc3QgdmVyYm9zZUxvZ2dpbmc6IGJvb2xlYW4gPSBwcm9jZXNzLmVudi5WRVJCT1NFID09PSAndHJ1ZSc7XHJcbmlmICh2ZXJib3NlTG9nZ2luZykge1xyXG4gICAgZXhwcmVzc1dpbnN0b24ucmVxdWVzdFdoaXRlbGlzdC5wdXNoKCdib2R5Jyk7XHJcbiAgICBleHByZXNzV2luc3Rvbi5yZXNwb25zZVdoaXRlbGlzdC5wdXNoKCdib2R5Jyk7XHJcblxyXG4gICAgYXBwLnVzZShcclxuICAgICAgICBleHByZXNzV2luc3Rvbi5sb2dnZXIoe1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRzOiBbbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKCldLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IHdpbnN0b24uZm9ybWF0LmNvbWJpbmUoXHJcbiAgICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5jb2xvcml6ZSgpLFxyXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuanNvbigpLFxyXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQucHJldHR5UHJpbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yaXplOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgbWV0YTogdHJ1ZSwgLy8gRW5hYmxlIGxvZ2dpbmcgb2YgbWV0YWRhdGFcclxuICAgICAgICAgICAgbXNnOiAnSFRUUCB7e3JlcS5tZXRob2R9fSB7e3JlcS51cmx9fSB8IHt7cmVzLnN0YXR1c0NvZGV9fSB7e3Jlcy5yZXNwb25zZVRpbWV9fW1zJyxcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxufVxyXG5cclxuLyogUmVnaXN0ZXIgZXhwcmVzcyByb3V0ZXMgKi9cclxucmVnaXN0ZXJSb3V0ZXMoYXBwKTtcclxuXHJcbi8qIHNvY2tldC5pbyBzZXJ2ZXIgc2V0dXAgKi9cclxuZXhwb3J0IGNvbnN0IGlvU2VydmVyOiBpby5TZXJ2ZXIgPSBuZXcgaW8uU2VydmVyKGh0dHBTZXJ2ZXIsIHtcclxuICAgIGNvcnM6IHtcclxuICAgICAgICBtZXRob2RzOiBbJ0dFVCcsICdQT1NUJ10sXHJcbiAgICAgICAgY3JlZGVudGlhbHM6IGZhbHNlLFxyXG4gICAgfSxcclxufSk7XHJcblxyXG5pb1NlcnZlci5vbignY29ubmVjdGlvbicsIGFzeW5jIGZ1bmN0aW9uIChjbGllbnQ6IGlvLlNvY2tldCkge1xyXG4gICAgY29uc29sZS5sb2coY2hhbGsuYmdHcmVlbihgc29ja2V0LmlvIGNsaWVudCAke2NsaWVudC5pZH0gY29ubmVjdGVkYCkpO1xyXG5cclxuICAgIC8vIEEgY2xpZW50IGpvaW5zIGl0cyBwcml2YXRlIHJvb20sIHNvIHRoYXQgdGhlIHNlcnZlciBoYXMgYSB3YXkvL1xyXG4gICAgLy8gdG8gc2VuZCByZXF1ZXN0IHNwZWNpZmljYWxseSB0byBoaW1cclxuICAgIGNvbnN0IHNlcnZlckpvaW5lZDogU2VydmVySm9pbmVkTGlzdGVuZXIgPSBuZXcgU2VydmVySm9pbmVkTGlzdGVuZXIoY2xpZW50LCBpb1NlcnZlcik7XHJcbiAgICBzZXJ2ZXJKb2luZWQubGlzdGVuKCk7XHJcblxyXG4gICAgY29uc3Qgb3duZXJDYXJDb250cm9sOiBPd25lclJlc3BvbnNlTGlzdGVuZXIgPSAgbmV3IE93bmVyUmVzcG9uc2VMaXN0ZW5lcihjbGllbnQpXHJcbiAgICBvd25lckNhckNvbnRyb2wubGlzdGVuKClcclxuXHJcbiAgICBjb25zdCBmcmllbmRSZXF1ZXN0QWNjZXB0ZWQ6IEZyaWVuZFJlcXVlc3RBY2NlcHRlZExpc3RlbmVyID0gbmV3IEZyaWVuZFJlcXVlc3RBY2NlcHRlZExpc3RlbmVyKGNsaWVudCwgaW9TZXJ2ZXIpXHJcbiAgICBmcmllbmRSZXF1ZXN0QWNjZXB0ZWQubGlzdGVuKClcclxuXHJcbiAgICBjbGllbnQub24oJ2Rpc2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coY2hhbGsuYmdSZWQoYHNvY2tldC5pbyBjbGllbnQgJHtjbGllbnQuaWR9IGRpc2Nvbm5lY3RlZGApKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG5jb25zdCByZWRpc1BvcnQgPSBwYXJzZUludChwcm9jZXNzLmVudi5SRURJU19QT1JUKVxyXG4vLyBSZWRpcyBwb29sIHNldC11cFxyXG4vLyBUTyBETyBub24gc2kgYXZ2aWEgY29uIGplc3RcclxuZXhwb3J0IGNvbnN0IHBvb2wgPSBuZXcgVGVkaXNQb29sKHtcclxuICAgIHBvcnQ6IHJlZGlzUG9ydCxcclxuICAgIGhvc3Q6IFwiMTI3LjAuMC4xXCIsXHJcbiAgICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuUkVESVNfUEFTU1dPUkQgYXMgc3RyaW5nXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuIl19