const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/model/User');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
    passport.use('local-signin',
        new LocalStrategy({ usernameField: 'user', passwordField: 'password', passReqToCallback: true }, function (req, user, password, done) {

            var Users = User;
            User.findOne({ where: { user: user } }).then(function (user) {
                if (!user) {
                    return done(null, false, { message: 'Esta conta não existe' });
                }
                if (password != user.password) {
                    return done(null, false, { message: 'Senha Inválida' });
                } else {
                    return done(null, user);
                }
            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, { message: 'Something went wrong with your Signin' });
            });
        }
        ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });


    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findOne({
            where: { id: id }
        }).then(function (user) {
            if (user) {
                done(null, user);
            }
            else {
                done(user.errors, null);
            }
        });

    });
};
