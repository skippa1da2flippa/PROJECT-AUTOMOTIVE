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
exports.pool = exports.ioServer = exports.IS_TESTING_MODE = exports.API_BASE_URL = exports.app = void 0;
var dotenv = __importStar(require("dotenv"));
var path = __importStar(require("path"));
var http = __importStar(require("http"));
var express_1 = __importDefault(require("express"));
// import { registerRoutes } from './routes/utils/register-routes';
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
// Remember that the runtime working dir is <root>/dist/src
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
exports.app = (0, express_1.default)();
/* Endpoints base url */
exports.API_BASE_URL = "api";
/* True if testing, false otherwise. Allows other modules to know if we're in testing mode */
exports.IS_TESTING_MODE = process.env.TEST === 'true';
// If testing, set test db uri, else use the other
var dbUri = exports.IS_TESTING_MODE ? process.env.TEST_DB_URI : process.env.DB_URI;
var serverPort = parseInt(process.env.PORT, 10);
var serverHost = process.env.HOST;
/* Database Connection */
console.log('Demanding the sauce...');
(mongoose
    .connect(dbUri, {})
    .then(function () {
    console.log('Sauce received!');
})
    .catch(function (err) {
    console.log('Error Occurred during Mongoose Connection');
    console.log(err);
}));
var httpServer = http.createServer(exports.app);
httpServer.listen(serverPort, serverHost, function () {
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
// registerRoutes(app);
/* socket.io server setup */
exports.ioServer = new io.Server(httpServer, {
    cors: {
        methods: ['GET', 'POST'],
        credentials: false,
    },
});
exports.ioServer.on('connection', function (client) {
    return __awaiter(this, void 0, void 0, function () {
        var serverJoined, ownerCarControl;
        return __generator(this, function (_a) {
            console.log(chalk_1.default.bgGreen("socket.io client ".concat(client.id, " connected")));
            serverJoined = new server_joined_1.ServerJoinedListener(client, exports.ioServer);
            serverJoined.listen();
            ownerCarControl = new owner_response_listener_1.OwnerResponseListener(client);
            ownerCarControl.listen();
            client.on('disconnect', function () {
                console.log(chalk_1.default.bgRed("socket.io client ".concat(client.id, " disconnected")));
            });
            return [2 /*return*/];
        });
    });
});
// Redis pool set-up
exports.pool = new tedis_1.TedisPool({
    port: Number(process.env.REDIS_PORT),
    host: "127.0.0.1",
    password: process.env.REDIS_PASSWORD
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBaUM7QUFDakMseUNBQTZCO0FBQzdCLHlDQUE2QjtBQUM3QixvREFBMkM7QUFDM0MsbUVBQW1FO0FBQ25FLDhDQUF3QjtBQUN4Qiw0Q0FBZ0M7QUFDaEMsbUNBQXNDO0FBQ3RDLHVDQUEwQztBQUMxQywrQ0FBbUM7QUFDbkMsOERBQWtEO0FBQ2xELGdEQUEwQjtBQUMxQix5RUFBOEU7QUFDOUUsNkZBQXlGO0FBQ3pGLCtCQUF5QztBQUd6QywyREFBMkQ7QUFDM0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFbEQsUUFBQSxHQUFHLEdBQVksSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFFdEMsd0JBQXdCO0FBQ1gsUUFBQSxZQUFZLEdBQVcsS0FBSyxDQUFDO0FBRTFDLDZGQUE2RjtBQUNoRixRQUFBLGVBQWUsR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7QUFFcEUsa0RBQWtEO0FBQ2xELElBQU0sS0FBSyxHQUFXLHVCQUFlLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBcUIsQ0FBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFnQixDQUFDO0FBQzFHLElBQU0sVUFBVSxHQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUUxRCxJQUFNLFVBQVUsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQWMsQ0FBRTtBQUV2RCx5QkFBeUI7QUFD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QUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBQ3hCLFdBQVcsRUFBRSxLQUFLO0tBQ3JCO0NBQ0osQ0FBQyxDQUFDO0FBRUgsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQWdCLE1BQWlCOzs7O1lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQywyQkFBb0IsTUFBTSxDQUFDLEVBQUUsZUFBWSxDQUFDLENBQUMsQ0FBQztZQUloRSxZQUFZLEdBQXlCLElBQUksb0NBQW9CLENBQUMsTUFBTSxFQUFFLGdCQUFRLENBQUMsQ0FBQztZQUN0RixZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFaEIsZUFBZSxHQUEyQixJQUFJLCtDQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2pGLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUV4QixNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtnQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLDJCQUFvQixNQUFNLENBQUMsRUFBRSxrQkFBZSxDQUFDLENBQUMsQ0FBQztZQUMzRSxDQUFDLENBQUMsQ0FBQzs7OztDQUNOLENBQUMsQ0FBQztBQUdILG9CQUFvQjtBQUNQLFFBQUEsSUFBSSxHQUFHLElBQUksaUJBQVMsQ0FBQztJQUM5QixJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBb0IsQ0FBQztJQUM5QyxJQUFJLEVBQUUsV0FBVztJQUNqQixRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUF3QjtDQUNqRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkb3RlbnYgZnJvbSAnZG90ZW52JztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0ICogYXMgaHR0cCBmcm9tICdodHRwJztcclxuaW1wb3J0IGV4cHJlc3MsIHsgRXhwcmVzcyB9IGZyb20gJ2V4cHJlc3MnO1xyXG4vLyBpbXBvcnQgeyByZWdpc3RlclJvdXRlcyB9IGZyb20gJy4vcm91dGVzL3V0aWxzL3JlZ2lzdGVyLXJvdXRlcyc7XHJcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xyXG5pbXBvcnQgKiBhcyBpbyBmcm9tICdzb2NrZXQuaW8nO1xyXG5pbXBvcnQgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xyXG5pbXBvcnQgZmlsdGVyID0gcmVxdWlyZSgnY29udGVudC1maWx0ZXInKTtcclxuaW1wb3J0ICogYXMgd2luc3RvbiBmcm9tICd3aW5zdG9uJztcclxuaW1wb3J0ICogYXMgZXhwcmVzc1dpbnN0b24gZnJvbSAnZXhwcmVzcy13aW5zdG9uJztcclxuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcclxuaW1wb3J0IHsgU2VydmVySm9pbmVkTGlzdGVuZXIgfSBmcm9tIFwiLi9ldmVudHMvY2xpZW50LWxpc3RlbmVycy9zZXJ2ZXItam9pbmVkXCJcclxuaW1wb3J0IHsgT3duZXJSZXNwb25zZUxpc3RlbmVyIH0gZnJvbSBcIi4vZXZlbnRzL2NsaWVudC1saXN0ZW5lcnMvb3duZXItcmVzcG9uc2UtbGlzdGVuZXJcIlxyXG5pbXBvcnQgeyBUZWRpcywgVGVkaXNQb29sIH0gZnJvbSBcInRlZGlzXCI7XHJcblxyXG5cclxuLy8gUmVtZW1iZXIgdGhhdCB0aGUgcnVudGltZSB3b3JraW5nIGRpciBpcyA8cm9vdD4vZGlzdC9zcmNcclxuZG90ZW52LmNvbmZpZyh7IHBhdGg6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi8uZW52JykgfSk7XHJcblxyXG5leHBvcnQgY29uc3QgYXBwOiBFeHByZXNzID0gZXhwcmVzcygpO1xyXG5cclxuLyogRW5kcG9pbnRzIGJhc2UgdXJsICovXHJcbmV4cG9ydCBjb25zdCBBUElfQkFTRV9VUkw6IHN0cmluZyA9IFwiYXBpXCI7XHJcblxyXG4vKiBUcnVlIGlmIHRlc3RpbmcsIGZhbHNlIG90aGVyd2lzZS4gQWxsb3dzIG90aGVyIG1vZHVsZXMgdG8ga25vdyBpZiB3ZSdyZSBpbiB0ZXN0aW5nIG1vZGUgKi9cclxuZXhwb3J0IGNvbnN0IElTX1RFU1RJTkdfTU9ERTogYm9vbGVhbiA9IHByb2Nlc3MuZW52LlRFU1QgPT09ICd0cnVlJztcclxuXHJcbi8vIElmIHRlc3RpbmcsIHNldCB0ZXN0IGRiIHVyaSwgZWxzZSB1c2UgdGhlIG90aGVyXHJcbmNvbnN0IGRiVXJpOiBzdHJpbmcgPSBJU19URVNUSU5HX01PREUgPyBwcm9jZXNzLmVudi5URVNUX0RCX1VSSSBhcyBzdHJpbmcgIDogcHJvY2Vzcy5lbnYuREJfVVJJIGFzIHN0cmluZztcclxuY29uc3Qgc2VydmVyUG9ydDogbnVtYmVyID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuUE9SVCwgMTApO1xyXG5cclxuY29uc3Qgc2VydmVySG9zdDogc3RyaW5nID0gcHJvY2Vzcy5lbnYuSE9TVCBhcyBzdHJpbmcgO1xyXG5cclxuLyogRGF0YWJhc2UgQ29ubmVjdGlvbiAqL1xyXG5jb25zb2xlLmxvZygnRGVtYW5kaW5nIHRoZSBzYXVjZS4uLicpO1xyXG5cclxuKFxyXG4gICAgbW9uZ29vc2VcclxuICAgIC5jb25uZWN0KGRiVXJpLCB7fSlcclxuICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnU2F1Y2UgcmVjZWl2ZWQhJyk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgT2NjdXJyZWQgZHVyaW5nIE1vbmdvb3NlIENvbm5lY3Rpb24nKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSlcclxuXHJcbilcclxuXHJcbmNvbnN0IGh0dHBTZXJ2ZXI6IGh0dHAuU2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcclxuaHR0cFNlcnZlci5saXN0ZW4oc2VydmVyUG9ydCwgc2VydmVySG9zdCwgKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coYEhUVFAgU2VydmVyIHN0YXJ0ZWQgb24gJHtzZXJ2ZXJIb3N0fToke3NlcnZlclBvcnR9YCk7XHJcbn0pO1xyXG5cclxuLyogQWxsb3dzIHNlcnZlciB0byByZXNwb25kIHRvIGEgcGFydGljdWxhciByZXF1ZXN0IHRoYXQgYXNrcyB3aGljaCByZXF1ZXN0IG9wdGlvbnMgaXQgYWNjZXB0cyAqL1xyXG5hcHAudXNlKGNvcnMoKSk7XHJcblxyXG4vKiBBbHRlcm5hdGl2ZSB0byBib2R5cGFyc2VyIHdoaWNoIGlzIGRlcHJlY2F0ZWQgKi9cclxuYXBwLnVzZShleHByZXNzLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XHJcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpOyAvLyBUbyBwYXJzZSB0aGUgaW5jb21pbmcgcmVxdWVzdHMgd2l0aCBKU09OIHBheWxvYWRzXHJcblxyXG4vLyBBbGxvdyBjcm9zcy1vcmlnaW5cclxuYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICcqJyk7XHJcbiAgICByZXMuaGVhZGVyKFxyXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJyxcclxuICAgICAgICAnT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCwgQXV0aG9yaXphdGlvbidcclxuICAgICk7XHJcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJywgJyonKTtcclxuICAgIG5leHQoKTtcclxufSk7XHJcblxyXG4vKiBTYW5pdGl6ZSBpbnB1dCB0byBhdm9pZCBOb1NRTCBpbmplY3Rpb25zICovXHJcbmFwcC51c2UoZmlsdGVyKHsgbWV0aG9kTGlzdDogWydHRVQnLCAnUE9TVCcsICdQQVRDSCcsICdERUxFVEUnXSB9KSk7XHJcblxyXG4vKiBFeHByZXNzIFJlcXVlc3RzIGFuZCBSZXNwb25zZXMgbG9nZ2VyICovXHJcbmNvbnN0IHZlcmJvc2VMb2dnaW5nOiBib29sZWFuID0gcHJvY2Vzcy5lbnYuVkVSQk9TRSA9PT0gJ3RydWUnO1xyXG5pZiAodmVyYm9zZUxvZ2dpbmcpIHtcclxuICAgIGV4cHJlc3NXaW5zdG9uLnJlcXVlc3RXaGl0ZWxpc3QucHVzaCgnYm9keScpO1xyXG4gICAgZXhwcmVzc1dpbnN0b24ucmVzcG9uc2VXaGl0ZWxpc3QucHVzaCgnYm9keScpO1xyXG5cclxuICAgIGFwcC51c2UoXHJcbiAgICAgICAgZXhwcmVzc1dpbnN0b24ubG9nZ2VyKHtcclxuICAgICAgICAgICAgdHJhbnNwb3J0czogW25ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSgpXSxcclxuICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxyXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcclxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0Lmpzb24oKSxcclxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LnByZXR0eVByaW50KHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcml6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIG1ldGE6IHRydWUsIC8vIEVuYWJsZSBsb2dnaW5nIG9mIG1ldGFkYXRhXHJcbiAgICAgICAgICAgIG1zZzogJ0hUVFAge3tyZXEubWV0aG9kfX0ge3tyZXEudXJsfX0gfCB7e3Jlcy5zdGF0dXNDb2RlfX0ge3tyZXMucmVzcG9uc2VUaW1lfX1tcycsXHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbn1cclxuXHJcbi8qIFJlZ2lzdGVyIGV4cHJlc3Mgcm91dGVzICovXHJcbi8vIHJlZ2lzdGVyUm91dGVzKGFwcCk7XHJcblxyXG4vKiBzb2NrZXQuaW8gc2VydmVyIHNldHVwICovXHJcbmV4cG9ydCBjb25zdCBpb1NlcnZlcjogaW8uU2VydmVyID0gbmV3IGlvLlNlcnZlcihodHRwU2VydmVyLCB7XHJcbiAgICBjb3JzOiB7XHJcbiAgICAgICAgbWV0aG9kczogWydHRVQnLCAnUE9TVCddLFxyXG4gICAgICAgIGNyZWRlbnRpYWxzOiBmYWxzZSxcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuaW9TZXJ2ZXIub24oJ2Nvbm5lY3Rpb24nLCBhc3luYyBmdW5jdGlvbiAoY2xpZW50OiBpby5Tb2NrZXQpIHtcclxuICAgIGNvbnNvbGUubG9nKGNoYWxrLmJnR3JlZW4oYHNvY2tldC5pbyBjbGllbnQgJHtjbGllbnQuaWR9IGNvbm5lY3RlZGApKTtcclxuXHJcbiAgICAvLyBBIGNsaWVudCBqb2lucyBpdHMgcHJpdmF0ZSByb29tLCBzbyB0aGF0IHRoZSBzZXJ2ZXIgaGFzIGEgd2F5Ly9cclxuICAgIC8vIHRvIHNlbmQgcmVxdWVzdCBzcGVjaWZpY2FsbHkgdG8gaGltXHJcbiAgICBjb25zdCBzZXJ2ZXJKb2luZWQ6IFNlcnZlckpvaW5lZExpc3RlbmVyID0gbmV3IFNlcnZlckpvaW5lZExpc3RlbmVyKGNsaWVudCwgaW9TZXJ2ZXIpO1xyXG4gICAgc2VydmVySm9pbmVkLmxpc3RlbigpO1xyXG5cclxuICAgIGNvbnN0IG93bmVyQ2FyQ29udHJvbDogT3duZXJSZXNwb25zZUxpc3RlbmVyID0gIG5ldyBPd25lclJlc3BvbnNlTGlzdGVuZXIoY2xpZW50KVxyXG4gICAgb3duZXJDYXJDb250cm9sLmxpc3RlbigpXHJcblxyXG4gICAgY2xpZW50Lm9uKCdkaXNjb25uZWN0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmJnUmVkKGBzb2NrZXQuaW8gY2xpZW50ICR7Y2xpZW50LmlkfSBkaXNjb25uZWN0ZWRgKSk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cclxuLy8gUmVkaXMgcG9vbCBzZXQtdXBcclxuZXhwb3J0IGNvbnN0IHBvb2wgPSBuZXcgVGVkaXNQb29sKHtcclxuICAgIHBvcnQ6IE51bWJlcihwcm9jZXNzLmVudi5SRURJU19QT1JUIGFzIHN0cmluZyksXHJcbiAgICBob3N0OiBcIjEyNy4wLjAuMVwiLFxyXG4gICAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52LlJFRElTX1BBU1NXT1JEIGFzIHN0cmluZ1xyXG59KTtcclxuXHJcblxyXG5cclxuIl19