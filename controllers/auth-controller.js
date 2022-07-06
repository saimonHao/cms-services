const express = require('express');
const AuthRouter = express.Router();
const { verifyToken } = require('../utils/jwtUtils');
const config = require('../config');

AuthRouter.get('/sessions', async (req, res) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const result = await verifyToken(token, config.jwtSecret).catch(err => {
                return res.status(500).send({
                    data: {
                        code: 500,
                        message: 'Invalid Token.'
                    }
                })
            });
            if (result) {
                res.status(200).send({
                    data: {
                        code: 200,
                        ...result
                    }
                })
            } else {
                return res.status(400).send({
                    data: {
                        code: 400,
                        message: 'Invalid Token.'
                    }
                })
            }
        } else {
            return res.status(400).send({
                data: {
                    code: 400,
                    message: 'No token provided.'
                }
            })
        }
    } catch (error) {
        console.log("verify token error ", error.message);
    }

});
module.exports = { AuthRouter }