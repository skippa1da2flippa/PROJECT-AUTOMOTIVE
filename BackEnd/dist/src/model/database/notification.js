"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = exports.NotTypes = void 0;
var mongoose_1 = require("mongoose");
// deletable
/**
 * Enumeration that defines all the possible notification model receivable by a user
 */
var NotTypes;
(function (NotTypes) {
    NotTypes["carOccupied"] = "carOccupied";
    NotTypes["destReached"] = "destReached";
    NotTypes["fuelAlmostOut"] = "fuelAlmostOut";
    // many others
})(NotTypes = exports.NotTypes || (exports.NotTypes = {}));
/**
 * A notification is identified by the type
 */
exports.NotificationSchema = new mongoose_1.Schema({
    type: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        enum: [NotTypes.carOccupied.valueOf(), NotTypes.destReached.valueOf()],
    }
}, { timestamps: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL2RhdGFiYXNlL25vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBc0Q7QUFFdEQsWUFBWTtBQUVaOztHQUVHO0FBQ0gsSUFBWSxRQUtYO0FBTEQsV0FBWSxRQUFRO0lBQ2hCLHVDQUEyQixDQUFBO0lBQzNCLHVDQUEyQixDQUFBO0lBQzNCLDJDQUErQixDQUFBO0lBQy9CLGNBQWM7QUFDbEIsQ0FBQyxFQUxXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBS25CO0FBaUNEOztHQUVHO0FBQ1csUUFBQSxrQkFBa0IsR0FBRyxJQUFJLGlCQUFNLENBQ3pDO0lBQ0ksSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHNCQUFXLENBQUMsTUFBTTtRQUN4QixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN6RTtDQUNKLEVBQ0QsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY2hlbWEsIFNjaGVtYVR5cGVzLCBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcclxuXHJcbi8vIGRlbGV0YWJsZVxyXG5cclxuLyoqXHJcbiAqIEVudW1lcmF0aW9uIHRoYXQgZGVmaW5lcyBhbGwgdGhlIHBvc3NpYmxlIG5vdGlmaWNhdGlvbiBtb2RlbCByZWNlaXZhYmxlIGJ5IGEgdXNlclxyXG4gKi9cclxuZXhwb3J0IGVudW0gTm90VHlwZXMge1xyXG4gICAgY2FyT2NjdXBpZWQgPSAnY2FyT2NjdXBpZWQnLFxyXG4gICAgZGVzdFJlYWNoZWQgPSAnZGVzdFJlYWNoZWQnLCAvLyBwb3AgdXAgbm90IGEgcmVhbCBub3RcclxuICAgIGZ1ZWxBbG1vc3RPdXQgPSAnZnVlbEFsbW9zdE91dCcsIC8vIHBvcCB1cCBub3QgYSByZWFsIG5vdFxyXG4gICAgLy8gbWFueSBvdGhlcnNcclxufVxyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSB0aGF0IHJlcHJlc2VudHMgYSBVc2VyIG5vdGlmaWNhdGlvbiBub3QgbWVhbnQgdG8gcmVwcmVzZW50IFxyXG4gKiBhbm5veWluZyBwb3AgdXAgbm90aWZpY2F0aW9uIGxpa2UgXCJTb21lb25lIHdhbnRzIHRvIGNvbm5lY3QgdG8geW91ciBjYXJcIiBidXRcclxuICogc2ltcGxlIG5vdGlmaWNhdGlvbiBhcyBcImNhck9jY3VwaWVkXCJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm90aWZpY2F0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogVHlwZSBvZiB0aGUgbm90aWZpY2F0aW9uXHJcbiAgICAgKi9cclxuICAgIHR5cGU6IE5vdFR5cGVzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0ZSB0aGF0IHRoZSBub3RpZmljYXRpb24gd2FzIGNyZWF0ZWQgYXQuXHJcbiAgICAgKiBJdCBpcyBhdXRvbWF0aWNhbGx5IGluc2VydGVkIGJ5IHRoZSBkYXRhYmFzZVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVkQXQ/OiBEYXRlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0ZSB0aGF0IHRoZSBub3RpZmljYXRpb24gd2FzIGxhc3QgdXBkYXRlZCBhdC5cclxuICAgICAqIEl0IGlzIGF1dG9tYXRpY2FsbHkgaW5zZXJ0ZWQgYW5kIHVwZGF0ZWQgYnkgdGhlIGRhdGFiYXNlXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZWRBdD86IERhdGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnRlcmZhY2UgdGhhdCByZXByZXNlbnRzIGEgbm90aWZpY2F0aW9uIHN1Yi1kb2N1bWVudFxyXG4gKi9cclxuIGV4cG9ydCBpbnRlcmZhY2UgTm90aWZpY2F0aW9uU3ViRG9jdW1lbnQgZXh0ZW5kcyBOb3RpZmljYXRpb24sXHJcbiAgICBUeXBlcy5TdWJkb2N1bWVudCB7fVxyXG5cclxuXHJcbi8qKlxyXG4gKiBBIG5vdGlmaWNhdGlvbiBpcyBpZGVudGlmaWVkIGJ5IHRoZSB0eXBlXHJcbiAqL1xyXG4gZXhwb3J0IGNvbnN0IE5vdGlmaWNhdGlvblNjaGVtYSA9IG5ldyBTY2hlbWE8Tm90aWZpY2F0aW9uU3ViRG9jdW1lbnQ+KFxyXG4gICAge1xyXG4gICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hVHlwZXMuU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgZW51bTogW05vdFR5cGVzLmNhck9jY3VwaWVkLnZhbHVlT2YoKSwgTm90VHlwZXMuZGVzdFJlYWNoZWQudmFsdWVPZigpXSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgeyB0aW1lc3RhbXBzOiB0cnVlIH1cclxuKTtcclxuIl19