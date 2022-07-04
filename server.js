require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const body_parser = require('body-parser');
const { Model, knexSnakeCaseMappers } = require('objection');
const config = require("./config")
const { verifyToken } = require('./utils/jwtUtils');
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
let router = express.Router();
router.get("/", (req, res) => {
    res.status(200).send("Hello social media service service!");
});

const { LoginRouter } = require('./controllers/login-controller');
const { UserRouter } = require('./controllers/user-controller');

app.use('/cms/api/v1.0', LoginRouter);
app.use('/cms/api/v1.0/*', verifyToken);
app.use('/cms/api/v1.0', UserRouter);
// router.use(LoginRouter)
// router.use(UserRouter);

// app.use('/cms/api/v1.0', router);
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
// [END app]

module.exports = app;