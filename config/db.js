const mysql=require('mysql2/promise');

const myCreatePool=mysql.createPool(
  {

    host:'localhost',
    user:'root',
    password:'rrk@mysql123',
    database:'todoapp_db'
  }
);


module.exports=myCreatePool;