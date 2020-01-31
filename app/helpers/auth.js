module.exports = {
    users: function(req, res, next) {
        if (req.isAuthenticated()) {
                return next();            
        } else {
            req.flash('error_msg', 'Erro por favor consulte o administrador')
            res.redirect('/pagenotfound')
        }
    },
}