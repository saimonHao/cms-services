const express = require('express');
const UserRouter = express.Router();
const UserModel = require('../models/User');

UserRouter.get("/user/list", async (req, res) => {
    try {
        const [users] = await UserModel.query();
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