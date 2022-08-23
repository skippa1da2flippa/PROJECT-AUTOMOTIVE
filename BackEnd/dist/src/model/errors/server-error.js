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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL2Vycm9ycy9zZXJ2ZXItZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTSxPQUFPLEdBQWE7SUFDdEIsOEJBQThCO0lBQzlCLHdCQUF3QjtJQUN4QixpQ0FBaUM7SUFDakMsaUNBQWlDO0lBQ2pDLDBDQUEwQztJQUMxQyx1Q0FBdUM7SUFDdkMsMkNBQTJDO0lBQzNDLCtEQUErRDtJQUMvRCxnQ0FBZ0M7Q0FDbkMsQ0FBQTtBQUVELElBQU0sT0FBTyxHQUFhO0lBQ3RCLGtCQUFrQjtJQUNsQixzRkFBc0Y7SUFDdEYsbUNBQW1DO0lBQ25DLCtCQUErQjtJQUMvQixzQ0FBc0M7SUFDdEMsdUNBQXVDO0NBQzFDLENBQUE7QUFFRCxJQUFNLE9BQU8sR0FBYTtJQUN0Qix1QkFBdUI7SUFDdkIsZ0NBQWdDO0lBQ2hDLDRCQUE0QjtDQUMvQixDQUFBO0FBR0Q7SUFBaUMsK0JBQUs7SUFHbEMscUJBQVksT0FBZTtRQUEzQixZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQVFqQjtRQVhRLGdCQUFVLEdBQVcsR0FBRyxDQUFDO1FBSTlCLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQUUsS0FBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUE7YUFFL0MsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUFFLEtBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFBO2FBRXBELElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFBRSxLQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQTs7SUFDN0QsQ0FBQztJQUVELHFDQUFlLEdBQWY7UUFDRSxPQUFPLHdCQUF3QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDakQsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQWpCRCxDQUFpQyxLQUFLLEdBaUJyQztBQWpCWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCBtc2dzNDA0OiBzdHJpbmdbXSA9IFsgXHJcbiAgICBcIk5vIHVzZXIgd2l0aCB0aGF0IGlkZW50aWZpZXJcIiwgXHJcbiAgICAnTm90aWZpY2F0aW9uIG5vdCBmb3VuZCcsIFxyXG4gICAgXCJObyB2ZWhpY2xlIHdpdGggdGhhdCBpZGVudGlmaWVyXCIsIFxyXG4gICAgXCJObyB2ZWhpY2xlcyByZWxhdGVkIHRvIHRoZSB1c2VyXCIsXHJcbiAgICBcIk5vIGVuam95ZWQgdmVoaWNsZXMgcmVsYXRlZCB0byB0aGlzIHVzZXJcIixcclxuICAgIFwiTm8gdXNlciByb3V0aW5lIGZvdW5kIG1hdGNoaW5nIHRoZSBpZFwiLFxyXG4gICAgXCJObyB1c2VyL25vdGlmaWNhdGlvbiB3aXRoIHRoYXQgaWRlbnRpZmllclwiLFxyXG4gICAgXCJPbmUgb2YgdGhlbSBkb2Vzbid0IGV4aXN0cyBvbiB0aGUgZGF0YWJhc2UsIG9wZXJhdGlvbiBuZWdhdGVkXCIsXHJcbiAgICBcIk5vIGZyaWVuZCB3aXRoIHRoYXQgaWRlbnRpZmllclwiXHJcbl1cclxuXHJcbmNvbnN0IG1zZ3M0MDA6IHN0cmluZ1tdID0gW1xyXG4gICAgJ1JvbGUgYWxyZWFkeSBzZXQnLFxyXG4gICAgXCJUaGVyZSBzaG91bGRuJ3QgYmUgbW9yZSB0aGFuIG9uZSBjbGllbnQgdmVoaWNsZSBsaXN0ZW5pbmcgdG8gYSBzcGVjaWZpYyB2ZWhpY2xlIHJvb21cIixcclxuICAgIFwiVXNlcnMgYWxyZWFkeSBpbnNpZGUgdGhlIGVuam95ZXJzXCIsXHJcbiAgICBcIlVzZXIgYWxyZWFkeSBvd25lciBvZiB0aGUgY2FyXCIsXHJcbiAgICBcIlJvdXRpbmUgbmFtZSBhbHJlYWR5IHdpdGggdGhhdCB2YWx1ZVwiLFxyXG4gICAgXCJWZWhpY2xlIGFscmVhZHkgaW5zaWRlIHRoZSBjb2xsZWN0aW9uXCJcclxuXVxyXG5cclxuY29uc3QgbXNnczUwMDogc3RyaW5nW10gPSBbXHJcbiAgICBcIkludGVybmFsIHNlcnZlciBlcnJvclwiLCBcclxuICAgICdFcnJvciB3aXRoIHBhc3N3b3JkIGVuY3J5cHRpb24nLCBcclxuICAgICdFcnJvciB3aXRoIHNhbHQgZ2VuZXJhdGlvbidcclxuXVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIHJlYWRvbmx5IHN0YXR1c0NvZGU6IG51bWJlciA9IDQwMDtcclxuICBcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBTZXJ2ZXJFcnJvci5wcm90b3R5cGUpO1xyXG5cclxuICAgICAgICBpZiAobXNnczQwNC5pbmNsdWRlcyhtZXNzYWdlKSkgdGhpcy5zdGF0dXNDb2RlID0gNDA0XHJcblxyXG4gICAgICAgIGVsc2UgaWYgKG1zZ3M1MDAuaW5jbHVkZXMobWVzc2FnZSkpIHRoaXMuc3RhdHVzQ29kZSA9IDUwMFxyXG5cclxuICAgICAgICBlbHNlIGlmIChtc2dzNDAwLmluY2x1ZGVzKG1lc3NhZ2UpKSB0aGlzLnN0YXR1c0NvZGUgPSA0MDBcclxuICAgIH1cclxuICBcclxuICAgIGdldEVycm9yTWVzc2FnZSgpIHtcclxuICAgICAgcmV0dXJuICdTb21ldGhpbmcgd2VudCB3cm9uZzogJyArIHRoaXMubWVzc2FnZTtcclxuICAgIH1cclxufSJdfQ==