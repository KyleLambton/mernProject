const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const url ='mongodb+srv://tester:test1234@mernprojectdb.ayygnma.mongodb.net/test';

const items = require('./reviews.json');

//Insert Batch
MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  var dbo = db.db("ProjectDb");
  dbo.collection("reviews").insertMany(items, (err, res) => {
    if (err) throw err;
    console.log("Database Created and Populated");
    db.close();
  });
});