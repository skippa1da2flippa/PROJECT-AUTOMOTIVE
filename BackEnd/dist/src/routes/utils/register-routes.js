/**
 * import { Express } from 'express';

import { router as authRouter } from '../auth-routes';
import { router as chatRouter } from '../chat-routes';
import { router as leaderboardRouter } from '../leaderboard-routes';
import { router as matchRouter } from '../match-routes';
import { router as matchmakingRouter } from '../matchmaking-routes';
import { router as modRouter } from '../moderator-routes';
import { router as notificationRouter } from '../notification-routes';
import { router as userRouter } from '../user-routes';
import { router as relRouter } from '../relationship-routes';
import { router as mongoDbApiRouter } from '../frontend-integration-testing/mongodb-api-routes';
import { API_BASE_URL, IS_TESTING_MODE } from '../../index';

export const registerRoutes = (app: Express) => {
    app.use(API_BASE_URL, authRouter);
    app.use(API_BASE_URL, chatRouter);
    app.use(API_BASE_URL, leaderboardRouter);
    app.use(API_BASE_URL, matchRouter);
    app.use(API_BASE_URL, matchmakingRouter);
    app.use(API_BASE_URL, modRouter);
    app.use(API_BASE_URL, notificationRouter);
    app.use(API_BASE_URL, relRouter);
    app.use(API_BASE_URL, userRouter);

    if (IS_TESTING_MODE) {
        app.use(API_BASE_URL, mongoDbApiRouter);
    }
};
 TO DO quando route vengono implementgate

 */ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItcm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3JvdXRlcy91dGlscy9yZWdpc3Rlci1yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGltcG9ydCB7IEV4cHJlc3MgfSBmcm9tICdleHByZXNzJztcclxuXHJcbmltcG9ydCB7IHJvdXRlciBhcyBhdXRoUm91dGVyIH0gZnJvbSAnLi4vYXV0aC1yb3V0ZXMnO1xyXG5pbXBvcnQgeyByb3V0ZXIgYXMgY2hhdFJvdXRlciB9IGZyb20gJy4uL2NoYXQtcm91dGVzJztcclxuaW1wb3J0IHsgcm91dGVyIGFzIGxlYWRlcmJvYXJkUm91dGVyIH0gZnJvbSAnLi4vbGVhZGVyYm9hcmQtcm91dGVzJztcclxuaW1wb3J0IHsgcm91dGVyIGFzIG1hdGNoUm91dGVyIH0gZnJvbSAnLi4vbWF0Y2gtcm91dGVzJztcclxuaW1wb3J0IHsgcm91dGVyIGFzIG1hdGNobWFraW5nUm91dGVyIH0gZnJvbSAnLi4vbWF0Y2htYWtpbmctcm91dGVzJztcclxuaW1wb3J0IHsgcm91dGVyIGFzIG1vZFJvdXRlciB9IGZyb20gJy4uL21vZGVyYXRvci1yb3V0ZXMnO1xyXG5pbXBvcnQgeyByb3V0ZXIgYXMgbm90aWZpY2F0aW9uUm91dGVyIH0gZnJvbSAnLi4vbm90aWZpY2F0aW9uLXJvdXRlcyc7XHJcbmltcG9ydCB7IHJvdXRlciBhcyB1c2VyUm91dGVyIH0gZnJvbSAnLi4vdXNlci1yb3V0ZXMnO1xyXG5pbXBvcnQgeyByb3V0ZXIgYXMgcmVsUm91dGVyIH0gZnJvbSAnLi4vcmVsYXRpb25zaGlwLXJvdXRlcyc7XHJcbmltcG9ydCB7IHJvdXRlciBhcyBtb25nb0RiQXBpUm91dGVyIH0gZnJvbSAnLi4vZnJvbnRlbmQtaW50ZWdyYXRpb24tdGVzdGluZy9tb25nb2RiLWFwaS1yb3V0ZXMnO1xyXG5pbXBvcnQgeyBBUElfQkFTRV9VUkwsIElTX1RFU1RJTkdfTU9ERSB9IGZyb20gJy4uLy4uL2luZGV4JztcclxuXHJcbmV4cG9ydCBjb25zdCByZWdpc3RlclJvdXRlcyA9IChhcHA6IEV4cHJlc3MpID0+IHtcclxuICAgIGFwcC51c2UoQVBJX0JBU0VfVVJMLCBhdXRoUm91dGVyKTtcclxuICAgIGFwcC51c2UoQVBJX0JBU0VfVVJMLCBjaGF0Um91dGVyKTtcclxuICAgIGFwcC51c2UoQVBJX0JBU0VfVVJMLCBsZWFkZXJib2FyZFJvdXRlcik7XHJcbiAgICBhcHAudXNlKEFQSV9CQVNFX1VSTCwgbWF0Y2hSb3V0ZXIpO1xyXG4gICAgYXBwLnVzZShBUElfQkFTRV9VUkwsIG1hdGNobWFraW5nUm91dGVyKTtcclxuICAgIGFwcC51c2UoQVBJX0JBU0VfVVJMLCBtb2RSb3V0ZXIpO1xyXG4gICAgYXBwLnVzZShBUElfQkFTRV9VUkwsIG5vdGlmaWNhdGlvblJvdXRlcik7XHJcbiAgICBhcHAudXNlKEFQSV9CQVNFX1VSTCwgcmVsUm91dGVyKTtcclxuICAgIGFwcC51c2UoQVBJX0JBU0VfVVJMLCB1c2VyUm91dGVyKTtcclxuXHJcbiAgICBpZiAoSVNfVEVTVElOR19NT0RFKSB7XHJcbiAgICAgICAgYXBwLnVzZShBUElfQkFTRV9VUkwsIG1vbmdvRGJBcGlSb3V0ZXIpO1xyXG4gICAgfVxyXG59O1xyXG4gVE8gRE8gcXVhbmRvIHJvdXRlIHZlbmdvbm8gaW1wbGVtZW50Z2F0ZVxyXG5cclxuICovIl19