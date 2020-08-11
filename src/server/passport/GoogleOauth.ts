import { Router, Request, Response } from "express";
import * as passport from "passport";
import { Strategy as GoogleStrategy, VerifyCallback, Profile } from "passport-google-oauth20";

export const googleRouter = Router();

export const googleStrategy = new GoogleStrategy({
	clientID: process.env.GROOMSTER_GOOGLE_CLIENT_ID,
	clientSecret: process.env.GROOMSTER_GOOGLE_CLIENT_SECRET,
	callbackURL: `${process.env.GROOMSTER_GOOGLE_CLIENT_URL}/auth/google/callback`
}, (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
	console.log(profile);
	return done(null, profile);
});

googleRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

googleRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
	(req: Request, res: Response) => {
		res.redirect('/');
	});

