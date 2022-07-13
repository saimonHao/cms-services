require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const body_parser = require('body-parser');
const { Model, knexSnakeCaseMappers } = require('objection');
const config = require('./config');
const Knex = require('knex')({
    client: 'mysql',
    connection: {
        host: config.mysqlHost,
        user: config.mysqlUser,
        password: config.mysqlPassword,
        port: config.mysqlPort,
        database: config.mysqlDatabase,
        charset: "utf8mb4"
    },
    pool: { min: 0, max: 10 },
    knexSnakeCaseMappers
});
Model.knex(Knex);
app.use(body_parser.json());
app.use(
    cors({
        origin: '*',
        exposeHeaders: ['Authorization'],
        credentials: true,
        allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
        allowHeaders: ['Authorization', 'Content-Type'],
        keepHeadersOnError: true
    })
);
// 设置所有HTTP请求的服务器响应超时时间(毫秒)
app.use(function (req, res, next) {
    res.setTimeout(40 * 60 * 1000);
    next();
});
app.get("/", (req, res) => {
    const items = new Set([1, 2, 2, 3, 4, 5])
    const array = Array.from(items);
    console.log(array);
    res.status(200).send("Hello cms service!");
});



const { LoginRouter } = require('./controllers/login-controller');
const { UserRouter, authenticate } = require('./controllers/user-controller');
const { RoleRouter } = require('./controllers/role-controller');
//不需要验证权限
router.use(LoginRouter)
router.use(RoleRouter);

// router.use(authenticate);

//需要验证权限
router.use(UserRouter);
app.use("/cms/api/v1.0", router)
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
// [END app]

module.exports = app;