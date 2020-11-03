'use strict';

// Load environment variables from .env
require('dotenv').config();
const client = require('./DBconection.js');
// Application dependencies
const express = require('express');
const cors = require('cors');
// const pg = require('pg');
// Application setup
const PORT = process.env.PORT || 4000;
const server =  express();
// server.use(cors());
server.set('view engine','ejs');
server.use(express.static('./public'));


// server.get('/',(request,response) => {
//     response.send('IT WORK');
// });
server.get('/', (req,res)=>{
  client.query('select * from users')
    .then((results)=> {console.table(results.rows);var names=[];var attend=[]; results.rows.forEach((ele)=>{names.push(ele.first_name);attend.push(ele.attendance);});   res.render('./index',{names:names,attend:attend });
    });});

client.connect()
  .then(()=>{
    server.listen(PORT, () => console.log(`App is listening on ${PORT}`,Date()));
  })
  .catch(e => {console.log(e);});
// .then(()=> console.log('Connected Successfully'))
// .catch(e=>console.log('hi'));

server.use('*',(req,res)=>{
  res.status(404).send('Go kill your self :*(');
});

