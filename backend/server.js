// Created by Kyle Powell
// C0768550

require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectMongo = require('connect-mongo');
const session = require('express-session');

const productRouter = require('./routes/routes.js');
const accountRouter = require('./routes/accountsRoutes.js');

const minutes = 60000;

// Uses
app.use(express.json());
app.use(session({
  name: "sid",
  secret: "a",
  resave: false,
  saveUninitialized: false,
  unset: "destroy",
  store: connectMongo.create({
    mongoUrl: process.env.DATABASE_URL,
    dbName: 'ProjectDb'
  }),
  cookie: {
    sameSite: 'strict',
    httpOnly: false,
    maxAge: 30 * minutes,
  }
}));
app.use('/Products', productRouter);
app.use('/Accounts', accountRouter);

//Connect
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

app.get('/asd', function(req, res) {
  req.session.someRandomVar = 'shieett';
  req.session.store;
  console.log(req.session)
  res.send("asd")
  //req.session.save();
})