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
        if (!dbRole) {
            return res.status(400).send({
                data: {
                    code: 400,
                    message: "Deleted item does not exist."
                }
            })
        }
        const delRole = await RoleModel.query().deleteById(delId);
        console.log("delRole ==== ", delRole);
        res.status(200).send({
            data: {
                code: 200,
                message: "Deleted role successed."
            }
        })
    } catch (error) {
        console.log('delete role error ', error.message);
        res.status(500).send({
            data: {
                code: 500,
                message: error.message
            }
        })
    }
});
/**
 * update role
 */
RoleRouter.put('/role/update', async (req, res) => {
    const { upId, roleName, permissions } = req.body;
    try {
        const dbRole = await RoleModel.query().where('role_name', '=', roleName).first();
        if (!dbRole) {
            return res.status(400).send({
                data: {
                    code: 400,
                    message: 'Updated role does not exist.'
                }
            })
        }
        const updatedRole = await RoleModel.query().findById(upId).patch({
            role_name: roleName,
            permissions
        })
        if (updatedRole) {
            res.status(200).send({
                data: {
                    code: 200,
                    message: "Updated role successed."
                }
            })
        }
    } catch (error) {
        console.log("call update role error ", error.message);
        res.status(500).send({
            data: {
                code: 500,
                message: error.message
            }
        })
    }

});
/**
 * list & search user
 */
RoleRouter.get('/role/list', async (req, res) => {
    const { page, sizePerPage, searchKey } = req.query;
    console.log(page, sizePerPage);
    try {
        const [roles, counts] = await Promise.all([
            RoleModel.query().where(function () {
                if (searchKey) {
                    this.where('role_name', '=', searchKey)
                }
            }).limit(sizePerPage).offset(sizePerPage * (page - 1)),
            RoleModel.query().count({ count: '*' }).where(function () {
                if (searchKey) {
                    this.where('role_name', '=', searchKey)
                }
            }).first()
        ])
        res.status(200).send({
            data: {
                code: 200,
                total: counts.count,
                roles

            }
        })
    } catch (error) {
        console.log('call role list error ', error.message);
        res.status(500).send({
            data: {
                code: 500,
                message: error.message
            }
        })
    }

});

module.exports = { RoleRouter }