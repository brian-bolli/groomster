import * as passport from "passport";

import { googleStrategy, googleRouter } from "./GoogleOauth";
import { Application } from "express";

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
});

passport.use(googleStrategy);

export default (app: Application) => {
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(googleRouter);
}
