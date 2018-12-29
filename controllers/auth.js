const bcrypt = require('bcrypt');
const passport = require('passport');

exports.getLoginPage = (req, res, next) => {
  res.render('login');
};

exports.getRegisterPage = (req, res, next) => {
  res.render('register');
};

exports.registerPost = (req, res, next) => {
    const {
        name,
        email,
        password,
        password2
    } = req.body;
    const errors = [];

    if(!name || !email || !password || !password2) {
        errors.push({msg: 'Please enter all fields'});
    }

    if(password !== password2) {
        errors.push({msg: 'Passwords do not match'});
    }

    if(password.length < 6) {
        errors.push({msg: 'Password must be at least 6 characters'});
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({email: email})
            .then(user => {
                if(user) {
                    errors.push({msg: 'Email already exists'});
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    bcrypt.getSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw  err;
                            newUser.password  = hash;
                            newUser
                                .save()
                                .then(user => {
                                    req.flash(
                                        'success_msg',
                                        'You are now registered and can log in'
                                    );

                                    res.redirect('/auth/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                    })
                }
            })
    }


}

exports.loginPost = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
};

exports.logout =  (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
};