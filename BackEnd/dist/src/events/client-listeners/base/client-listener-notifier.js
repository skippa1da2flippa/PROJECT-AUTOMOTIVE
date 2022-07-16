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
exports.ClientListenerNotifier = void 0;
var client_listener_1 = require("./client-listener");
/**
 * Abstract class that wraps functionality used to listen
 * to client-emitted socket.io events and emit events based
 * on the listened data
 */
var ClientListenerNotifier = /** @class */ (function (_super) {
    __extends(ClientListenerNotifier, _super);
    function ClientListenerNotifier(ioServer, ioClient, eventName) {
        var _this = _super.call(this, ioClient, eventName) || this;
        _this.ioServer = ioServer;
        return _this;
    }
    return ClientListenerNotifier;
}(client_listener_1.ClientListener));
exports.ClientListenerNotifier = ClientListenerNotifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LWxpc3RlbmVyLW5vdGlmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2V2ZW50cy9jbGllbnQtbGlzdGVuZXJzL2Jhc2UvY2xpZW50LWxpc3RlbmVyLW5vdGlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHFEQUFtRDtBQUVuRDs7OztHQUlHO0FBQ0g7SUFBd0QsMENBQWlCO0lBTXJFLGdDQUFzQixRQUFnQixFQUFFLFFBQWdCLEVBQUUsU0FBaUI7UUFBM0UsWUFDSSxrQkFBTSxRQUFRLEVBQUUsU0FBUyxDQUFDLFNBRzdCO1FBREcsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7O0lBQzdCLENBQUM7SUFDTCw2QkFBQztBQUFELENBQUMsQUFYRCxDQUF3RCxnQ0FBYyxHQVdyRTtBQVhxQix3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2ZXIsIFNvY2tldCB9IGZyb20gJ3NvY2tldC5pbyc7XHJcbmltcG9ydCB7IENsaWVudExpc3RlbmVyIH0gZnJvbSAnLi9jbGllbnQtbGlzdGVuZXInO1xyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0IGNsYXNzIHRoYXQgd3JhcHMgZnVuY3Rpb25hbGl0eSB1c2VkIHRvIGxpc3RlblxyXG4gKiB0byBjbGllbnQtZW1pdHRlZCBzb2NrZXQuaW8gZXZlbnRzIGFuZCBlbWl0IGV2ZW50cyBiYXNlZFxyXG4gKiBvbiB0aGUgbGlzdGVuZWQgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENsaWVudExpc3RlbmVyTm90aWZpZXI8VD4gZXh0ZW5kcyBDbGllbnRMaXN0ZW5lcjxUPiB7XHJcbiAgICAvKipcclxuICAgICAqIFNlcnZlciBpbnN0YW5jZSB1c2VkIHRvIHNlbmQgbm90aWZpY2F0aW9uIHRvIG90aGVyIGNsaWVudHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGlvU2VydmVyOiBTZXJ2ZXI7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGlvU2VydmVyOiBTZXJ2ZXIsIGlvQ2xpZW50OiBTb2NrZXQsIGV2ZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaW9DbGllbnQsIGV2ZW50TmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW9TZXJ2ZXIgPSBpb1NlcnZlcjtcclxuICAgIH1cclxufVxyXG4iXX0=