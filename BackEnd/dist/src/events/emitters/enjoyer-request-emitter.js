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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnjoyerRequestEmitter = void 0;
var room_emitter_1 = require("./base/room-emitter");
/**
 * Class that wraps socket.io functionality to generate a "enjoyer-request" event
 * for a specific owner.
 * This class defines how the server emits a message to the car owner advising him some "enjoyer"
 * want to connnect to his own car
 */
var EnjoyerRequestEmitter = /** @class */ (function (_super) {
    __extends(EnjoyerRequestEmitter, _super);
    /**
     * @param ioServer socket.io server instance
     * @param ownerId id of the owner who has to be notified
     */
    function EnjoyerRequestEmitter(ioServer, ownerId) {
        var eventName = "enjoyer-request";
        return _super.call(this, ioServer, eventName, ownerId.toString()) || this;
    }
    return EnjoyerRequestEmitter;
}(room_emitter_1.RoomEmitter));
exports.EnjoyerRequestEmitter = EnjoyerRequestEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5qb3llci1yZXF1ZXN0LWVtaXR0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZXZlbnRzL2VtaXR0ZXJzL2Vuam95ZXItcmVxdWVzdC1lbWl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLG9EQUFrRDtBQUlsRDs7Ozs7R0FLRztBQUNIO0lBQTJDLHlDQUEyQjtJQUNsRTs7O09BR0c7SUFDSCwrQkFBbUIsUUFBZ0IsRUFBRSxPQUF1QjtRQUN4RCxJQUFNLFNBQVMsR0FBVyxpQkFBaUIsQ0FBQztlQUU1QyxrQkFBTSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQUFDLEFBVkQsQ0FBMkMsMEJBQVcsR0FVckQ7QUFWWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlcyB9IGZyb20gXCJtb25nb29zZVwiO1xyXG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwic29ja2V0LmlvXCI7XHJcbmltcG9ydCB7IFJvb21FbWl0dGVyIH0gZnJvbSBcIi4vYmFzZS9yb29tLWVtaXR0ZXJcIjtcclxuaW1wb3J0IHsgRW5qb3llck1lc3NhZ2UgfSBmcm9tIFwiLi4vLi4vbW9kZWwvZXZlbnRzL2Vuam95ZXItcmVxbWVzc2FnZVwiXHJcblxyXG5cclxuLyoqXHJcbiAqIENsYXNzIHRoYXQgd3JhcHMgc29ja2V0LmlvIGZ1bmN0aW9uYWxpdHkgdG8gZ2VuZXJhdGUgYSBcImVuam95ZXItcmVxdWVzdFwiIGV2ZW50XHJcbiAqIGZvciBhIHNwZWNpZmljIG93bmVyLlxyXG4gKiBUaGlzIGNsYXNzIGRlZmluZXMgaG93IHRoZSBzZXJ2ZXIgZW1pdHMgYSBtZXNzYWdlIHRvIHRoZSBjYXIgb3duZXIgYWR2aXNpbmcgaGltIHNvbWUgXCJlbmpveWVyXCJcclxuICogd2FudCB0byBjb25ubmVjdCB0byBoaXMgb3duIGNhclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVuam95ZXJSZXF1ZXN0RW1pdHRlciBleHRlbmRzIFJvb21FbWl0dGVyPEVuam95ZXJNZXNzYWdlPiB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBpb1NlcnZlciBzb2NrZXQuaW8gc2VydmVyIGluc3RhbmNlXHJcbiAgICAgKiBAcGFyYW0gb3duZXJJZCBpZCBvZiB0aGUgb3duZXIgd2hvIGhhcyB0byBiZSBub3RpZmllZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoaW9TZXJ2ZXI6IFNlcnZlciwgb3duZXJJZDogVHlwZXMuT2JqZWN0SWQpIHtcclxuICAgICAgICBjb25zdCBldmVudE5hbWU6IHN0cmluZyA9IGBlbmpveWVyLXJlcXVlc3RgO1xyXG5cclxuICAgICAgICBzdXBlcihpb1NlcnZlciwgZXZlbnROYW1lLCBvd25lcklkLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG59Il19