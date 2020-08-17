const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const authMiddleware = require('./../middleware/auth');

const User = require("../../models/User");

//Register User
router.post("/register", async (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (!username || !password)
        return res
            .status(400)
            .json({
                response: "Username or Password not provided."
            });

    await User.findOne({
        username: username
    }).then((user) => {
        if (user)
            return res.status(400).json({
                response: "Username already taken."
            });

        const newUser = new User({
            username,
            password,
        });

        bcrypt.genSalt((error, salt) => {
            bcrypt.hash(newUser.password, salt, (error, hash) => {
                if (error) throw error;
                newUser.password = hash;
                newUser.save().then((user) =>

                    jwt.sign({
                            id: user.id,
                            username: user.username
                        },
                        process.env.JWT_ACCESS_SECRET, (error, token) => {
                            if (error) throw error;
                            res.send({
                                id: user.id,
                                username: user.username,
                                token: token

                            })
                        }
                    )
                );
            });
        });
    });
});

//Login user
router.post("/login", async (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (!username || !password)
        return res
            .status(400)
            .json({
                response: "Username or Password not provided."
            });

    await User.findOne({
        username: username
    }).then((user) => {
        if (!user)
            return res.status(400).json({
                response: "Username does not exsist."
            });
        bcrypt.compare(password, user.password).then(equal => {
            if (!equal) return res.status(400).json({
                response: "Wrong Username or Password."
            });

            jwt.sign({
                    id: user.id,
                    username: user.username
                },
                process.env.JWT_ACCESS_SECRET, (error, token) => {
                    if (error) throw error;
                    res.send({
                        id: user.id,
                        username: user.username,
                        token: token

                    })
                }
            )
        })


    });
});

//Get user
router.get("/user", authMiddleware, async (req, res) => {
    User.findById(req.user.id).then(user => res.json(user));
});
module.exports = router;