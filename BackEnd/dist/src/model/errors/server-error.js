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
    "No vehicles related to the user"
];
var msgs400 = ['Role already set'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL2Vycm9ycy9zZXJ2ZXItZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTSxPQUFPLEdBQWE7SUFDdEIsOEJBQThCO0lBQzlCLHdCQUF3QjtJQUN4QixpQ0FBaUM7SUFDakMsaUNBQWlDO0NBQ3BDLENBQUE7QUFFRCxJQUFNLE9BQU8sR0FBYSxDQUFDLGtCQUFrQixDQUFDLENBQUE7QUFFOUMsSUFBTSxPQUFPLEdBQWE7SUFDdEIsdUJBQXVCO0lBQ3ZCLGdDQUFnQztJQUNoQyw0QkFBNEI7Q0FDL0IsQ0FBQTtBQUdEO0lBQWlDLCtCQUFLO0lBR2xDLHFCQUFZLE9BQWU7UUFBM0IsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FRakI7UUFQRyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbkQsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUFFLEtBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFBO2FBRS9DLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFBRSxLQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQTthQUVwRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQUUsS0FBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUE7O0lBQzdELENBQUM7SUFFRCxxQ0FBZSxHQUFmO1FBQ0UsT0FBTyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2pELENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFqQkQsQ0FBaUMsS0FBSyxHQWlCckM7QUFqQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgbXNnczQwNDogc3RyaW5nW10gPSBbIFxyXG4gICAgXCJObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyXCIsIFxyXG4gICAgJ05vdGlmaWNhdGlvbiBub3QgZm91bmQnLCBcclxuICAgIFwiTm8gdmVoaWNsZSB3aXRoIHRoYXQgaWRlbnRpZmllclwiLCBcclxuICAgIFwiTm8gdmVoaWNsZXMgcmVsYXRlZCB0byB0aGUgdXNlclwiXHJcbl1cclxuXHJcbmNvbnN0IG1zZ3M0MDA6IHN0cmluZ1tdID0gWydSb2xlIGFscmVhZHkgc2V0J10gXHJcblxyXG5jb25zdCBtc2dzNTAwOiBzdHJpbmdbXSA9IFtcclxuICAgIFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIsIFxyXG4gICAgJ0Vycm9yIHdpdGggcGFzc3dvcmQgZW5jcnlwdGlvbicsIFxyXG4gICAgJ0Vycm9yIHdpdGggc2FsdCBnZW5lcmF0aW9uJ1xyXG5dXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNlcnZlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgcmVhZG9ubHkgc3RhdHVzQ29kZTogbnVtYmVyO1xyXG4gIFxyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIFNlcnZlckVycm9yLnByb3RvdHlwZSk7XHJcblxyXG4gICAgICAgIGlmIChtc2dzNDA0LmluY2x1ZGVzKG1lc3NhZ2UpKSB0aGlzLnN0YXR1c0NvZGUgPSA0MDRcclxuXHJcbiAgICAgICAgZWxzZSBpZiAobXNnczUwMC5pbmNsdWRlcyhtZXNzYWdlKSkgdGhpcy5zdGF0dXNDb2RlID0gNTAwXHJcblxyXG4gICAgICAgIGVsc2UgaWYgKG1zZ3M0MDAuaW5jbHVkZXMobWVzc2FnZSkpIHRoaXMuc3RhdHVzQ29kZSA9IDQwMCBcclxuICAgIH1cclxuICBcclxuICAgIGdldEVycm9yTWVzc2FnZSgpIHtcclxuICAgICAgcmV0dXJuICdTb21ldGhpbmcgd2VudCB3cm9uZzogJyArIHRoaXMubWVzc2FnZTtcclxuICAgIH1cclxufSJdfQ==