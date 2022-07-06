const crypto = require('crypto');
const express = require('express');
const UserModel = require('../models/User');
const LoginRouter = express.Router();
const { generateJwtToken } = require('../utils/jwtUtils');

LoginRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const formateEmail = email ? email.toLowerCase() : null;
    try {
        const hash = crypto.createHash('sha256');
        const hashedPassword = hash.update(password).digest('hex');
        console.log('input password===', password);
        console.log('hashed password===', hashedPassword);
        const user = await UserModel.query().where('email', '=', formateEmail).first();
        if (user) {
            if (user.password === hashedPassword) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                const token = await generateJwtToken(payload);
                res.status(200).send({
                    data: {
                        code: 200,
                        token,
                        // ...payload
                    }
                })
            } else {
                res.status(400).send({
                    data: {
                        code: 400,
                        message: "Invalid Password."
                    }
                })
            }
        } else {
            res.status(400).send({
                data: {
                    code: 400,
                    message: 'Invalid Email.'
                }
            })
        }
    } catch (error) {
        console.log("current login error: ", error.message);
        res.status(500).send({
            data: {
                code: 500,
                message: error.message
            }
        })
    }
});

module.exports = { LoginRouter }