console.log(`======${process.env.ENV ? process.env.ENV : "dev"}======`);
const config = {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    mongo_connstr: process.env.MONGO_CONNSTR,
    mysqlHost: process.env.MYSQL_HOST,
    mysqlDatabase: process.env.MYSQL_DATABASE,
    mysqlUser: process.env.MYSQL_USER,
    mysqlPassword: process.env.MYSQL_PASSWORD,
    mysqlPort: process.env.MYSQL_PORT

}
module.exports = config;