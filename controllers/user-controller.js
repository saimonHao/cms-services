const express = require('express');
const UserRouter = express.Router();
const UserModel = require('../models/User');
const { verifyToken } = require('../utils/jwtUtils');
const crypto = require('crypto');
const config = require('../config');
const moment = require('moment');
/**
 * insert new user
 */
UserRouter.post('/user/create', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    try {
        const existUser = await UserModel.query().where('email', '=', email).andWhere('name', '=', name).first();
        if (existUser) {
            return res.status(400).send({
                data: {
                    code: 400,
                    message: 'User already exists.'
                }
            })
        }
        const hash = crypto.createHash('sha256');
        const hashedPassword = hash.update(password).digest('hex');
        const user = await UserModel.query().insert({
            name,
            email,
            password: hashedPassword,
            create_time: moment().format('YYYY-MM-DD HH:mm:ss')
        });
        if (user) {
            res.status(200).send({
                data: {
                    code: 200,
                    message: 'Insert user successed.',
                    user
                }
            })
        }
    } catch (error) {
        console.log("insert user error :", error.message);
        return res.status(500).send({
            data: {
                code: 500,
                message: error.message
            }
        })
    }
});
/**
 * delete user by id
 */
UserRouter.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const dbUser = await UserModel.query().where('id', '=', id).first();
        if (!dbUser) {
            return res.status(400).send({
                data: {
                    code: 400,
                    message: "Delete user does not exist."
                }
            })
        }
        const delUser = await UserModel.query().deleteById(id);
        if (delUser) {
            res.status(200).send({
                data: {
                    code: 200,
                    message: "Delete user successed."
                }
            })
        }
    } catch (error) {
        console.log("delete user error :", error.message);
        res.status(500).send({
            data: {
                code: 500,
                message: error.message
            }
        })
    }
});
/**
 * update user
 */
UserRouter.post('/user/update', async (req, res) => {
    const { name, upId } = req.body;
    try {
        const dbUser = await UserModel.query().findById(upId);
        if (!dbUser) {
            return res.status(400).send({
                data: {
                    code: 400,
                    message: 'Update user does not exist.'
                }
            })
        }
        const updateUser = await UserModel.query().patchAndFetchById(upId, {
            name
        });
        if (updateUser) {
            res.status(200).send({
                data: {
                    code: 200,
                    message: 'Update user successed.'
                }
            })
        }
    } catch (error) {
        console.log('update user error :', error.message);
        res.status(500).send({
            data: {
                code: 500,
                message: error.message
            }
        })
    }
});
/**
 * get user list 
 */
UserRouter.get("/user/list", async (req, res) => {
    let { page, size, username } = req.query;
    if (!page) page = 1;
    if (!size) size = 10;
    try {
        const users = await UserModel.query().where(function () {
            if (username) {
                this.where('name', 'LIKE', `%${username}%`)
            }
        }).limit(size).offset(size * (page - 1));
        const total = await UserModel.query()
            .count({ count: '*' })
            .where(function () {
                if (username) {
                    this.where('name', 'LIKE', `%${username}%`)
                }
            }).first();
        //转换sql语句  使用.toKnexQuery().toSQL()
        // console.log(UserModel.query().limit(size).offset(size * (page - 1)).toKnexQuery().toSQL());
        res.status(200).send({
            data: {
                code: 200,
                total: total.count,
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