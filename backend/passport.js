const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');

const User = require('./models/user');

passport.use(User.createStrategy());
// passport.use(new LocalStrategy(
//     {
//         usernameField : 'userEmail',
//         passwordField : 'userPassword',
//         session : true,
//         passReqToCallback : false,
//     }, function(userEmail, userPassword, done) {
//         User.findOne({ userEmail : userEmail }, async function(err, user) {
//             if (err) return done(err);
//             if (!user) return done(null, false, { errorCode : 4001 });
//             return await bcrypt.compare(user.userPasword, userPassword);
//         })
//     }
// ))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());