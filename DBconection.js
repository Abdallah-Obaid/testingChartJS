// 'use strict'
// const pg = require('pg');
// const client = new pg.Client(process.env.DATABASE_URL)
// const Client =  require('pg').Client
var akraftny;

const {Client} =  require('pg')
console.log(Client)
const client =new Client({
    user:"postgres",
    password:"1234",
    port: 5432,
    database:"postgres"
})

module.exports=client;