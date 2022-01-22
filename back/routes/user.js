const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../models/User');
const { route } = require('./products');

router.post('/signin', async (req, res) => {
    // const email = req.body.email
    // const psw = req.body.password
    const {email, password} = req.body
    const user = await User.findUser(email, password)
    if (user) {
        req.session.user = user._id
        res.json({
            msg: 'Welcome!',
            auth: true
        })
    } else {
        res.json({
            msg: 'Unable to login.',
            auth: false
        })
    }
})

router.post('/signup', (req, res) => {
    const user = new User(req.body)
    req.session.user = user._id
    user.save().then((result) => {
        res.json({
            msg: 'Account created!',
            auth: true
        })
    }).catch((err) => {
        res.json({
            msg: 'Unable to create the account.',
            auth: false
        })
    })
})

router.get('/signedin', (req, res) => {
    if (req.session.user) {
        return res.json({
            auth: true,
            msg: "You are logged in."
        })
    }
    return res.json({
        auth: false,
        msg: "You are not loggen in."
    })
})

router.get('/signout', (req, res) => {
    req.session.destroy()
    res.json({
        auth: false
    })
})


module.exports = router;
