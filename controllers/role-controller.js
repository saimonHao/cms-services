const { Router } = require('express');
const express = require('express');
const RoleModel = require('../models/Role');
const RoleRouter = express.Router();
const moment = require('moment');
/**
 * create role
 */
RoleRouter.post('/role/create', async (req, res) => {
    const { roleName, permissions } = req.body;
    try {
        const dbRole = await RoleModel.query().where('name', '=', roleName).first();
        if (dbRole) {
            return res.status(400).send({
                data: {
                    code: 400,
                    message: 'Role name already exists.'
                }
            })
        }
        const newRole = await RoleModel.query().insert({
            role_name: roleName,
            permissions,
            create_time: moment().format("YYYY-MM-DD HH:mm:ss")
        });
        if (newRole) {
            res.status(200).send({
                data: {
                    code: 200,
                    message: "Create role successed.",
                    newRole
                }
            })
        }
    } catch (error) {
        console.log("create user error ", error.message);
        res.status(500).send({
            data: {
                code: 500,
                message: error.message
            }
        })
    }
});
/**
 * delete role
 */
RoleRouter.delete('/role/:id', async (req, res) => {
    const { delId } = req.params;
    try {
        const dbRole = await RoleModel.query().findById(delId);
        if(!dbRole){
            return res.status(400).send({
                data:{
                    code:400,
                    message:"Deleted item does not exist."
                }
            })
        }
    } catch (error) {

    }
});
/**
 * update role
 */
RoleRouter.put('/role/update', async (req, res) => {

});
/**
 * list & search user
 */
RoleRouter.get('/role/list', async (req, res) => {

});

module.exports = { RoleRouter }