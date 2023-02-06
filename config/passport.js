const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const DB = require("../models");
const User = DB.User;

const jwtSecret = process.env.JWT_SECRET || "secret";

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    },
    (jwtPayLoad, done) => {
      return User.findOne({
        where: {
          id: jwtPayLoad.id,
        },
      })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
