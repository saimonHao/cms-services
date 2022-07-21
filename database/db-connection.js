const { config } = require('../config');
const MongoClient = require('mongodb').MongoClient;
const Knex = require('knex');
let dbInstance = null;

async function connectMongodb() {
    try {
        await new Promise((resolve, reject) => {

            if (dbInstance) {
                resolve(dbInstance);
                return;
            }
            let url = config.mongo_connstr;
            const options = {
                maxIdleTimeMS: 5000,
                maxpoolSize: 20
            }
            MongoClient.connect(url, options, function (err, db) {
                if (err) {
                    reject(err);
                    return;
                }
                dbInstance = db;
                resolve(db);
            });
        });
        return dbInstance;
    } catch (error) {
        throw error;
    }
}

const connectMySql = Knex({
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
    useNullAsDefault: true
});

module.exports = { connectMongodb, connectMySql }


