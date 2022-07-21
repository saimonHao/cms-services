const { connectMySql } = require('./connection');

async function insertMysql(table,insertArrayObj){
  try{
    let data=await connectMySql(table).insert(insertArrayObj);
    return data;
  }catch(error){
    throw error;
  }
}

async function batchInsert(table,insertArrayObj,batchSize){
  try{
    let data=await connectMySql.batchInsert(table,insertArrayObj,batchSize);
    return data;
  }catch(error){
    throw error;
  }
}

async function getMysqlPageData(table, outFieldsObj, limit,offset) {
  let data;
  try {
      data = await connectMySql(table)
        .select(outFieldsObj)
        .limit(limit)
        .offset(offset)
  } catch (error) {
    throw error;
  }
  return JSON.parse(JSON.stringify(data));
}

async function getMysqlWhereInData(table, field,inArray,outFieldsObj) {
  let data;
  try {
      data = await connectMySql(table)
        .select(outFieldsObj)
        .where(function() {
          inArray.forEach(id => {
            this.orWhere(field, id)
          });
        })
  } catch (error) {
    throw error;
  }
  return JSON.parse(JSON.stringify(data));
}

async function deleteByWhereIn(table, field,inArray) {
  let data;
  try {
      await connectMySql(table)
      .where(function() {
        inArray.forEach(id => {
          this.orWhere(field, id)
        });
      })
      .del()
  } catch (error) {
    throw error;
  }
  return JSON.parse(JSON.stringify(data));
}

async function updateMysql(table,whereObj,updateObj){
  try{
    let data=await connectMySql(table)
    .where(whereObj)
    .update(updateObj);
    return data;
  }catch(error){
    throw error;
  }
}

module.exports={insertMysql,getMysqlPageData,getMysqlWhereInData,deleteByWhereIn,updateMysql,batchInsert}