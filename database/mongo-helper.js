const { connectMongodb } = require('./connection');
const { config } = require('../config');

//查找数据列表
async function find(whereObj, collectionName, outFieldsObj) {
    let data = [];
    try {
        let db = await connectMongodb();
        data = await new Promise((resolve, reject) => {
            let dbase = db.db(config.mongo_database);
            dbase
                .collection(collectionName)
                .find(whereObj)
                .project(outFieldsObj)
                .toArray(function (err, res) {
                    if (err) {
                        reject(err);
                        return (data = []);
                    }
                    resolve(res);
                });
        });
    } catch (error) {
        throw error;
    }
    return data;
}

//查找单条数据
async function findOne(whereObj, collectionName) {
    let data = [];
    try {
        let db = await connectMongodb();
        data = await new Promise((resolve, reject) => {
            let dbase = db.db(config.mongo_database);
            dbase.collection(collectionName).findOne(whereObj, function (err, res) {
                if (err) {
                    reject(err);
                    return (data = []);
                }
                resolve(res);
            });
        });
    } catch (error) {
        throw error;
    }
    return data;
}

//查询总数
async function findTotal(whereObj, collectionName) {
    let count = 0;
    try {
        let db = await connectMongodb();
        count = await new Promise((resolve, rejects) => {
            let dbase = db.db(config.mongo_database);
            dbase
                .collection(collectionName)
                .countDocuments(whereObj, function (err, res) {
                    if (err) {
                        rejects(err);
                        return (count = 0);
                    }
                    resolve(res);
                });
        });
    } catch (error) {
        throw error;
    }
    return count;
}

//聚合函数查询数据
async function findDataByGroup(groupObj, collectionName) {
    let data = [];
    try {
        let db = await connectMongodb();
        data = await new Promise((resolve, rejects) => {
            let dbase = db.db(config.mongo_database);
            dbase
                .collection(collectionName)
                .aggregate(groupObj)
                .toArray(function (err, res) {
                    if (err) {
                        rejects(err);
                        return (data = []);
                    }
                    resolve(res);
                });
        });
    } catch (error) {
        throw error;
    }
    return data;
}

//分页查询数据
async function findPage(
    whereObj,
    collectionName,
    limitSize,
    skipSize,
    sortObj = {},
    outFieldsObj = {}
) {
    let data = [];
    try {
        let db = await connectMongodb();
        data = await new Promise((resolve, reject) => {
            let dbase = db.db(config.mongo_database);
            dbase
                .collection(collectionName)
                .find(whereObj)
                .sort(sortObj)
                .limit(limitSize)
                .skip(skipSize)
                .project(outFieldsObj)
                .toArray(function (err, res) {
                    if (err) {
                        reject(err);
                        return (data = []);
                    }
                    resolve(res);
                });
        });
    } catch (error) {
        throw error;
    }
    return data;
}

module.exports = { find, findOne, findPage, findDataByGroup, findTotal }