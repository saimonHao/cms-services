const express = require('express');
const UserRouter = express.Router();
const UserModel = require('../models/User');
const { verifyToken } = require('../utils/jwtUtils');
const config = require('../config');
UserRouter.get("/user/list", async (req, res) => {
    let { page, size, username, create_date } = req.query;
    if (!page) page = 1;
    if (!size) size = 10;
    try {
        const users = await UserModel.query().where(function () {
            if (username) {
                this.where('user_name', 'LIKE', `%${username}%`)
            }
        }).limit(page).offset(size * (page - 1));
        res.status(200).send({
            data: {
                code: 200,
                users
            }
        })
    } catch (error) {
        console.log("get user list error :", error.message);
        res.status(500).send({
            data: {
                code: 500,
                message: error.message
            }
        })
    }
});
const authenticate = async (req, res) => {
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
                });
            }
        } else {
            return res.status(400).send({
                data: {
                    code: 400,
                    message: 'No token provided.'
                }
            });
        }
    } catch (error) {
        console.log("verify token error ", error.message);
    }
}
module.exports = { UserRouter, authenticate }