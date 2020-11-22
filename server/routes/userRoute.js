import express from "express";
import {
  signUp,
  signIn,
  secret,
  googleOAuth,
  facebookOAuth,
} from "../controllers/userCont.js";
import passport from "passport";
import {
  JwtStrategy,
  FacebookTokenStrategy,
  LocalStrategy,
  GooglePlusTokenStrategy,
} from "../passport.js";
import { Strategy } from "passport-local";

const userRouter = express.Router();

const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });

userRouter.route("/signup").post(signUp);

userRouter.route("/signin").post(passportSignIn, signIn);

userRouter
  .route("/oauth/google")
  .post(passport.authenticate("googleToken", { session: false }), googleOAuth);

userRouter
  .route("/oauth/facebook")
  .post(
    passport.authenticate("facebookToken", { session: false }),
    facebookOAuth
  );

userRouter.route("/secret").get(passportJWT, secret);

export default userRouter;
