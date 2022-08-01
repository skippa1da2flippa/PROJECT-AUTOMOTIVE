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
exports.ServerError = void 0;
var msgs404 = [
    "No user with that identifier",
    'Notification not found',
    "No vehicle with that identifier",
    "No vehicles related to the user",
    "No enjoyed vehicles related to this user",
    "No user routine found matching the id",
    "No user/notification with that identifier",
    "One of them doesn't exists on the database, operation negated"
];
var msgs400 = [
    'Role already set',
    "There shouldn't be more than one client vehicle listening to a specific vehicle room",
    "Users already inside the enjoyers",
    "User already owner of the car",
    "Routine name already with that value",
    "Vehicle already inside the collection"
];
var msgs500 = [
    "Internal server error",
    'Error with password encryption',
    'Error with salt generation'
];
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, ServerError.prototype);
        if (msgs404.includes(message))
            _this.statusCode = 404;
        else if (msgs500.includes(message))
            _this.statusCode = 500;
        else if (msgs400.includes(message))
            _this.statusCode = 400;
        return _this;
    }
    ServerError.prototype.getErrorMessage = function () {
        return 'Something went wrong: ' + this.message;
    };
    return ServerError;
}(Error));
exports.ServerError = ServerError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL2Vycm9ycy9zZXJ2ZXItZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTSxPQUFPLEdBQWE7SUFDdEIsOEJBQThCO0lBQzlCLHdCQUF3QjtJQUN4QixpQ0FBaUM7SUFDakMsaUNBQWlDO0lBQ2pDLDBDQUEwQztJQUMxQyx1Q0FBdUM7SUFDdkMsMkNBQTJDO0lBQzNDLCtEQUErRDtDQUNsRSxDQUFBO0FBRUQsSUFBTSxPQUFPLEdBQWE7SUFDdEIsa0JBQWtCO0lBQ2xCLHNGQUFzRjtJQUN0RixtQ0FBbUM7SUFDbkMsK0JBQStCO0lBQy9CLHNDQUFzQztJQUN0Qyx1Q0FBdUM7Q0FDMUMsQ0FBQTtBQUVELElBQU0sT0FBTyxHQUFhO0lBQ3RCLHVCQUF1QjtJQUN2QixnQ0FBZ0M7SUFDaEMsNEJBQTRCO0NBQy9CLENBQUE7QUFHRDtJQUFpQywrQkFBSztJQUdsQyxxQkFBWSxPQUFlO1FBQTNCLFlBQ0ksa0JBQU0sT0FBTyxDQUFDLFNBUWpCO1FBUEcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRW5ELElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFBRSxLQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQTthQUUvQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQUUsS0FBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUE7YUFFcEQsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUFFLEtBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFBOztJQUM3RCxDQUFDO0lBRUQscUNBQWUsR0FBZjtRQUNFLE9BQU8sd0JBQXdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNqRCxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBakJELENBQWlDLEtBQUssR0FpQnJDO0FBakJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IG1zZ3M0MDQ6IHN0cmluZ1tdID0gWyBcclxuICAgIFwiTm8gdXNlciB3aXRoIHRoYXQgaWRlbnRpZmllclwiLCBcclxuICAgICdOb3RpZmljYXRpb24gbm90IGZvdW5kJywgXHJcbiAgICBcIk5vIHZlaGljbGUgd2l0aCB0aGF0IGlkZW50aWZpZXJcIiwgXHJcbiAgICBcIk5vIHZlaGljbGVzIHJlbGF0ZWQgdG8gdGhlIHVzZXJcIixcclxuICAgIFwiTm8gZW5qb3llZCB2ZWhpY2xlcyByZWxhdGVkIHRvIHRoaXMgdXNlclwiLFxyXG4gICAgXCJObyB1c2VyIHJvdXRpbmUgZm91bmQgbWF0Y2hpbmcgdGhlIGlkXCIsXHJcbiAgICBcIk5vIHVzZXIvbm90aWZpY2F0aW9uIHdpdGggdGhhdCBpZGVudGlmaWVyXCIsXHJcbiAgICBcIk9uZSBvZiB0aGVtIGRvZXNuJ3QgZXhpc3RzIG9uIHRoZSBkYXRhYmFzZSwgb3BlcmF0aW9uIG5lZ2F0ZWRcIlxyXG5dXHJcblxyXG5jb25zdCBtc2dzNDAwOiBzdHJpbmdbXSA9IFtcclxuICAgICdSb2xlIGFscmVhZHkgc2V0JyxcclxuICAgIFwiVGhlcmUgc2hvdWxkbid0IGJlIG1vcmUgdGhhbiBvbmUgY2xpZW50IHZlaGljbGUgbGlzdGVuaW5nIHRvIGEgc3BlY2lmaWMgdmVoaWNsZSByb29tXCIsXHJcbiAgICBcIlVzZXJzIGFscmVhZHkgaW5zaWRlIHRoZSBlbmpveWVyc1wiLFxyXG4gICAgXCJVc2VyIGFscmVhZHkgb3duZXIgb2YgdGhlIGNhclwiLFxyXG4gICAgXCJSb3V0aW5lIG5hbWUgYWxyZWFkeSB3aXRoIHRoYXQgdmFsdWVcIixcclxuICAgIFwiVmVoaWNsZSBhbHJlYWR5IGluc2lkZSB0aGUgY29sbGVjdGlvblwiXHJcbl1cclxuXHJcbmNvbnN0IG1zZ3M1MDA6IHN0cmluZ1tdID0gW1xyXG4gICAgXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiwgXHJcbiAgICAnRXJyb3Igd2l0aCBwYXNzd29yZCBlbmNyeXB0aW9uJywgXHJcbiAgICAnRXJyb3Igd2l0aCBzYWx0IGdlbmVyYXRpb24nXHJcbl1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICByZWFkb25seSBzdGF0dXNDb2RlOiBudW1iZXI7XHJcbiAgXHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgU2VydmVyRXJyb3IucHJvdG90eXBlKTtcclxuXHJcbiAgICAgICAgaWYgKG1zZ3M0MDQuaW5jbHVkZXMobWVzc2FnZSkpIHRoaXMuc3RhdHVzQ29kZSA9IDQwNFxyXG5cclxuICAgICAgICBlbHNlIGlmIChtc2dzNTAwLmluY2x1ZGVzKG1lc3NhZ2UpKSB0aGlzLnN0YXR1c0NvZGUgPSA1MDBcclxuXHJcbiAgICAgICAgZWxzZSBpZiAobXNnczQwMC5pbmNsdWRlcyhtZXNzYWdlKSkgdGhpcy5zdGF0dXNDb2RlID0gNDAwIFxyXG4gICAgfVxyXG4gIFxyXG4gICAgZ2V0RXJyb3JNZXNzYWdlKCkge1xyXG4gICAgICByZXR1cm4gJ1NvbWV0aGluZyB3ZW50IHdyb25nOiAnICsgdGhpcy5tZXNzYWdlO1xyXG4gICAgfVxyXG59Il19