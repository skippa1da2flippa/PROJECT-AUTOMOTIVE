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
exports.RoomEmitter = void 0;
var emitter_1 = require("./emitter");
/**
 * Abstract class that wraps socket.io emitter functionality
 * for server-emitted events to a specific set of clients.
 */
var RoomEmitter = /** @class */ (function (_super) {
    __extends(RoomEmitter, _super);
    function RoomEmitter(ioServer, eventName, roomName) {
        var _this = _super.call(this, ioServer, eventName) || this;
        _this.roomName = roomName;
        return _this;
    }
    /**
     * Emit data only on the room specified at initialization
     * @param data
     */
    RoomEmitter.prototype.emit = function (data) {
        this.ioServer.to(this.roomName).emit(this.eventName, data);
    };
    return RoomEmitter;
}(emitter_1.Emitter));
exports.RoomEmitter = RoomEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbS1lbWl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2V2ZW50cy9lbWl0dGVycy9iYXNlL3Jvb20tZW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxxQ0FBb0M7QUFFcEM7OztHQUdHO0FBQ0g7SUFBb0MsK0JBQVU7SUFNMUMscUJBQVksUUFBZ0IsRUFBRSxTQUFpQixFQUFFLFFBQWdCO1FBQWpFLFlBQ0ksa0JBQU0sUUFBUSxFQUFFLFNBQVMsQ0FBQyxTQUc3QjtRQURHLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOztJQUM3QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksMEJBQUksR0FBWCxVQUFZLElBQU87UUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQW5CRCxDQUFvQyxpQkFBTyxHQW1CMUM7QUFuQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tICdzb2NrZXQuaW8nO1xyXG5cclxuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gJy4vZW1pdHRlcic7XHJcblxyXG4vKipcclxuICogQWJzdHJhY3QgY2xhc3MgdGhhdCB3cmFwcyBzb2NrZXQuaW8gZW1pdHRlciBmdW5jdGlvbmFsaXR5XHJcbiAqIGZvciBzZXJ2ZXItZW1pdHRlZCBldmVudHMgdG8gYSBzcGVjaWZpYyBzZXQgb2YgY2xpZW50cy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSb29tRW1pdHRlcjxUPiBleHRlbmRzIEVtaXR0ZXI8VD4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBOYW1lIG9mIHRoZSByb29tIHRoYXQgdGhpcyBpbnN0YW5jZSBlbWl0cyB0b1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgcm9vbU5hbWU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihpb1NlcnZlcjogU2VydmVyLCBldmVudE5hbWU6IHN0cmluZywgcm9vbU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlvU2VydmVyLCBldmVudE5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLnJvb21OYW1lID0gcm9vbU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbWl0IGRhdGEgb25seSBvbiB0aGUgcm9vbSBzcGVjaWZpZWQgYXQgaW5pdGlhbGl6YXRpb25cclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbWl0KGRhdGE6IFQpIHtcclxuICAgICAgICB0aGlzLmlvU2VydmVyLnRvKHRoaXMucm9vbU5hbWUpLmVtaXQodGhpcy5ldmVudE5hbWUsIGRhdGEpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==