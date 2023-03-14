const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const url ='mongodb+srv://tester:test1234@mernprojectdb.ayygnma.mongodb.net/test';

const items = require('./reviews.json');

//Insert Batch
MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  var dbo = db.db("ProjectDb");
  
  dbo.collection("accounts").updateMany(
    {},
    { $push: { userPhoto: "userPhoto.png" }}
  );
  console.log("Should be updated");
});