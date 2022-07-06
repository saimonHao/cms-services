const express = require('express');
const UserRouter = express.Router();
const UserModel = require('../models/User');

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
module.exports = { UserRouter }