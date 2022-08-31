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
    "No vehicles found",
    "No enjoyed vehicles related to this user",
    "No user routine found matching the id",
    "No user/notification with that identifier",
    "One of them doesn't exists on the database, operation negated",
    "No friend with that identifier"
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
        _this.statusCode = 400;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL2Vycm9ycy9zZXJ2ZXItZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTSxPQUFPLEdBQWE7SUFDdEIsOEJBQThCO0lBQzlCLHdCQUF3QjtJQUN4QixpQ0FBaUM7SUFDakMsaUNBQWlDO0lBQ2pDLG1CQUFtQjtJQUNuQiwwQ0FBMEM7SUFDMUMsdUNBQXVDO0lBQ3ZDLDJDQUEyQztJQUMzQywrREFBK0Q7SUFDL0QsZ0NBQWdDO0NBQ25DLENBQUE7QUFFRCxJQUFNLE9BQU8sR0FBYTtJQUN0QixrQkFBa0I7SUFDbEIsc0ZBQXNGO0lBQ3RGLG1DQUFtQztJQUNuQywrQkFBK0I7SUFDL0Isc0NBQXNDO0lBQ3RDLHVDQUF1QztDQUMxQyxDQUFBO0FBRUQsSUFBTSxPQUFPLEdBQWE7SUFDdEIsdUJBQXVCO0lBQ3ZCLGdDQUFnQztJQUNoQyw0QkFBNEI7Q0FDL0IsQ0FBQTtBQUdEO0lBQWlDLCtCQUFLO0lBR2xDLHFCQUFZLE9BQWU7UUFBM0IsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FRakI7UUFYUSxnQkFBVSxHQUFXLEdBQUcsQ0FBQztRQUk5QixNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbkQsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUFFLEtBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFBO2FBRS9DLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFBRSxLQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQTthQUVwRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQUUsS0FBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUE7O0lBQzdELENBQUM7SUFFRCxxQ0FBZSxHQUFmO1FBQ0UsT0FBTyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2pELENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFqQkQsQ0FBaUMsS0FBSyxHQWlCckM7QUFqQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgbXNnczQwNDogc3RyaW5nW10gPSBbIFxyXG4gICAgXCJObyB1c2VyIHdpdGggdGhhdCBpZGVudGlmaWVyXCIsIFxyXG4gICAgJ05vdGlmaWNhdGlvbiBub3QgZm91bmQnLCBcclxuICAgIFwiTm8gdmVoaWNsZSB3aXRoIHRoYXQgaWRlbnRpZmllclwiLCBcclxuICAgIFwiTm8gdmVoaWNsZXMgcmVsYXRlZCB0byB0aGUgdXNlclwiLFxyXG4gICAgXCJObyB2ZWhpY2xlcyBmb3VuZFwiLFxyXG4gICAgXCJObyBlbmpveWVkIHZlaGljbGVzIHJlbGF0ZWQgdG8gdGhpcyB1c2VyXCIsXHJcbiAgICBcIk5vIHVzZXIgcm91dGluZSBmb3VuZCBtYXRjaGluZyB0aGUgaWRcIixcclxuICAgIFwiTm8gdXNlci9ub3RpZmljYXRpb24gd2l0aCB0aGF0IGlkZW50aWZpZXJcIixcclxuICAgIFwiT25lIG9mIHRoZW0gZG9lc24ndCBleGlzdHMgb24gdGhlIGRhdGFiYXNlLCBvcGVyYXRpb24gbmVnYXRlZFwiLFxyXG4gICAgXCJObyBmcmllbmQgd2l0aCB0aGF0IGlkZW50aWZpZXJcIlxyXG5dXHJcblxyXG5jb25zdCBtc2dzNDAwOiBzdHJpbmdbXSA9IFtcclxuICAgICdSb2xlIGFscmVhZHkgc2V0JyxcclxuICAgIFwiVGhlcmUgc2hvdWxkbid0IGJlIG1vcmUgdGhhbiBvbmUgY2xpZW50IHZlaGljbGUgbGlzdGVuaW5nIHRvIGEgc3BlY2lmaWMgdmVoaWNsZSByb29tXCIsXHJcbiAgICBcIlVzZXJzIGFscmVhZHkgaW5zaWRlIHRoZSBlbmpveWVyc1wiLFxyXG4gICAgXCJVc2VyIGFscmVhZHkgb3duZXIgb2YgdGhlIGNhclwiLFxyXG4gICAgXCJSb3V0aW5lIG5hbWUgYWxyZWFkeSB3aXRoIHRoYXQgdmFsdWVcIixcclxuICAgIFwiVmVoaWNsZSBhbHJlYWR5IGluc2lkZSB0aGUgY29sbGVjdGlvblwiXHJcbl1cclxuXHJcbmNvbnN0IG1zZ3M1MDA6IHN0cmluZ1tdID0gW1xyXG4gICAgXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiwgXHJcbiAgICAnRXJyb3Igd2l0aCBwYXNzd29yZCBlbmNyeXB0aW9uJywgXHJcbiAgICAnRXJyb3Igd2l0aCBzYWx0IGdlbmVyYXRpb24nXHJcbl1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICByZWFkb25seSBzdGF0dXNDb2RlOiBudW1iZXIgPSA0MDA7XHJcbiAgXHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgU2VydmVyRXJyb3IucHJvdG90eXBlKTtcclxuXHJcbiAgICAgICAgaWYgKG1zZ3M0MDQuaW5jbHVkZXMobWVzc2FnZSkpIHRoaXMuc3RhdHVzQ29kZSA9IDQwNFxyXG5cclxuICAgICAgICBlbHNlIGlmIChtc2dzNTAwLmluY2x1ZGVzKG1lc3NhZ2UpKSB0aGlzLnN0YXR1c0NvZGUgPSA1MDBcclxuXHJcbiAgICAgICAgZWxzZSBpZiAobXNnczQwMC5pbmNsdWRlcyhtZXNzYWdlKSkgdGhpcy5zdGF0dXNDb2RlID0gNDAwXHJcbiAgICB9XHJcbiAgXHJcbiAgICBnZXRFcnJvck1lc3NhZ2UoKSB7XHJcbiAgICAgIHJldHVybiAnU29tZXRoaW5nIHdlbnQgd3Jvbmc6ICcgKyB0aGlzLm1lc3NhZ2U7XHJcbiAgICB9XHJcbn0iXX0=