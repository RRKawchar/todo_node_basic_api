require('dotenv').config();
const mysql=require('mysql2/promise');

const myCreatePool=mysql.createPool(
  {

    host:'localhost',
    user:'root',
    password:process.env.DB_PASSWORD,
    database:'todoapp_db'
  }
);


module.exports=myCreatePool;