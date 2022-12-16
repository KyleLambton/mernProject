// Created by Kyle Powell
// C0768550

require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

const router = require('./routes/routes.js');
const accountRouter = require('./routes/accountsRoutes.js');
app.use('/Users', router);
app.use('/Accounts', accountRouter);


mongoose.connect(process.env.DATABASE_URL, () =>{
  console.log('connected to mongo')
})
const db = mongoose.connection;
db.on('error', (err) => console.log(err))

function getDB() {
  return db;
}

module.exports = getDB;
app.listen(4000, () => console.log('Server Started on Port 4000'));