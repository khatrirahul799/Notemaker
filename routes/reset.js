const crypto = require('crypto');
const path = require('path');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const express = require('express');
//const fs = require('fs');
const router = express.Router();
const rootDir = require('../path/path');
const users = require('../Schemas/users');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

router.get('/reset', (req, res, next) => {
    res.render(path.join(rootDir, 'views', 'reset.ejs'), {
        csrfToken: req.csrfToken(),
        UserID: users._id
    });
})

router.post('/reset', (req, res, next) => {
    crypto.randomBytes(32, (err, Buffer) => {
        if (err) {
            console.log(err);
            res.redirect('/reset');
        }
        const token = Buffer.toString('hex');
        users.findOne({
                email: req.body.email
            })
            .then(user => {
                if (!user) {
                    res.redirect('/reset');
                }

                user.resetToken = token,
                    user.resetExpirationDate = Date.now() + 3600000,
                    user.save();
            }).then(result => {
                res.redirect('/login');
                transporter.sendMail({
                    from: 'khatrirahul7999@outlook.com',
                    to: req.body.email,
                    subject: 'Reset Password Link',
                    html: `<p>Click <a href="http://localhost:3000/reset/${token}">here<a> to reset your password</p>`
                })

            })
            .catch(err => {
                console.log(err);
            })

    })
})

router.get('/reset/:token', (req, res, next) => {
    const token1 = req.params.token;
    users.findOne({
            resetToken: token1
        })
        .then(user => {
            if (!user) {
                res.redirect('/login');
            } else {
                res.render(path.join(rootDir, 'views', 'updatePassword.ejs'), {
                    csrfToken: req.csrfToken(),
                    UserID: user._id,
                    token: token1
                });
            }
        })
        .catch(err => {
            console.log(err);
        });

});

router.post('/update', (req, res, next) => {
    const UserID = req.body.UserID;
    const token = req.body.token;
    const password = req.body.password;
    users.findOne({
            resetToken: token,
            _id: UserID
        })
        .then(user => {
            if (!user) {
                console.log('error occured try again')
            }
            user.password = password;
            user.resetToken = undefined;
            return user.save();
        }).then(() => {
            return res.send("Successfully")
        })
        .catch(err => {
            console.log(err);
        });
})


module.exports = router;