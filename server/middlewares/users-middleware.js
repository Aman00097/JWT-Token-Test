require('dotenv').config();
const User = require('../model/users-model')
const jwt = require('jsonwebtoken')

exports.checkUser = (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
            } else {
                const user = await User.findById(decodedToken.id);
                if (user) res.json({ status: true, user: user.email })
                else res.json({ status: false });
            }
        })
    }
}