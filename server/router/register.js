const express = require('express'),
    router = express.Router(),
    passport = require('passport');
 
router.get('/',
    require('connect-ensure-login').ensureLoggedOut(),
    (req, res) => {
        res.render('../views/register', {
            user : null,
            errors : {
                username : req.flash('username'),
                email : req.flash('email')
            }
        });
    });
 
router.post('/',
    require('connect-ensure-login').ensureLoggedOut(),
    passport.authenticate('localRegister', {
        successRedirect : '/',
        failureRedirect : '/register',
        failureFlash : true
    })
);
 
 
module.exports = router;