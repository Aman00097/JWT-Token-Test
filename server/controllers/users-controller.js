require('dotenv').config();
const User = require('../model/users-model');

const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge,
    })
}

exports.getUsers = (req, res) => {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(404)
            .json({ message: 'Login Failed', error: err.message })
        );
}


exports.login = (req, res) => {
    const { email, password } = req.body
    User.login(email, password)
        .then((user) => {
            const token = createToken(user._id);
            res.cookie("jwt", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000
            });
            res.status(200).json({ message: 'Login Successful', user })
        })
        .catch((err) => {
            console.log(err)
            if (err.message === 'incorrect email') err.email = 'Email is not registered'
            if (err.message === 'incorrect password') err.password = 'Password is incorrect'
            res.json(err)
        });
}

exports.register = (req, res) => {
    User.create(req.body)
        .then((user) => {
            const token = createToken(user._id);
            res.cookie("jwt", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000
            });
            res.status(200).json({ message: 'Login Successful', user })
        })
        .catch((err) => {
            console.log(err)
        });
}