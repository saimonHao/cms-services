const { Router } = require('express');
const express = require('express');
const RoleModel = require('../models/Role');
const UserModel = require('../models/User');
const RoleRouter = express.Router();
const moment = require('moment');
/**
 * create role
 */
RoleRouter.post('/role/create', async (req, res) => {
    const { roleName, permissions } = req.body;
    try {
        const dbRole = await RoleModel.query().where('role_name', '=', roleName).first();
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
    const { id } = req.params;
    try {
        const dbRole = await RoleModel.query().findById(id);
        if (!dbRole) {
            return res.status(400).send({
                data: {
                    code: 400,
                    message: "Deleted item does not exist."
                }
            })
        }
        const delRole = await RoleModel.query().deleteById(id);
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
        const dbRole = await RoleModel.query().where('id', '=', upId).first();
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
 * update user_role
 */
RoleRouter.put('/role/updateUserRole', async (req, res) => {
    const { uid, roleNames } = req.body;
    try {
        let roleUsers;
        const dbRoles = await RoleModel.query();
        for (let role of dbRoles) {
            if (roleNames.length > 0) {
                roleUsers = role.users === undefined || role.users === null || role.users === "" ? [] : role.users.split(",");
                //移除关联的user
                if (roleUsers.includes(String(uid)) && !roleNames.includes(role.roleName)) {
                    roleUsers = roleUsers.filter(ru => ru !== String(uid));
                }
                //新增关联的user
                if (!roleUsers.includes(String(uid)) && roleNames.includes(role.roleName)) {
                    roleUsers.push(String(uid));
                }
               
                await RoleModel.query().findById(role.id).patch({
                    users: roleUsers.join(",")
                });
            } else {
                let roleUserArr = role.users.split(",");
                const newRoleUserArr = roleUserArr.filter(ru => ru !== String(uid));
                await RoleModel.query().findById(role.id).patch({
                    users: newRoleUserArr.join(",")
                });
            }

        }
        return res.status(200).send({
            data: {
                code: 200,
                message: "Update user role successed."
            }
        })

    } catch (error) {
        console.log("update user role error ", error.message);
        res.status(500).send({
            data: {
                code: 500,
                message: error.message
            }
        })
    }
})
/**
 * list & search user
 */
RoleRouter.get('/role/list', async (req, res) => {
    const { page, sizePerPage, searchKey } = req.query;
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