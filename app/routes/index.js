const express = require("express");
const router = express.Router();
const passport = require("passport");
const {users} = require('../helpers/auth')

router.get('/', (req, res) => {
        res.render("authenticate")
});

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/biblioteca',
    failureRedirect: '/',
    failureFlash: true
}
));

// router.get('/pagenotfound', (req, res) => {
//     controller.notfound(req, res);
// });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/signin');
}

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

router.get('/biblioteca', users, (req, res) => {
    res.render("biblioteca")
});

module.exports = router;
