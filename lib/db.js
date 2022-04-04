'use strict';

const {MongoClient} = require('mongodb')
const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env;

const mongoURL = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
let connection

async function connectDB() {
  if (connection) return connection;

  let client
  try {
    client = await MongoClient.connect(mongoURL,{
      useNewUrlParser:true,
    })
    connection = client.db(DB_NAME)
  }catch (err) {
    console.log("Could not connect to MongoDB", err)
    process.exit(1)
  }

  return connection;
}


module.exports = connectDB;