const express = require('express');
const UserModel = require('../models/User');
const LoginRouter = express.Router();
const { generateJwtToken } = require('../utils/jwtUtils');
LoginRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const token = generateJwtToken({email,password});
    try {
        res.status(200).send({
            data: {
                code: 200,
                token
            }
        })
    } catch (error) {
        console.log("find users error: ", error.message);
        res.status(500).send({
            data: {
                code: 500,
                message: error.message
            }
        })
    }
});

module.exports = { LoginRouter }