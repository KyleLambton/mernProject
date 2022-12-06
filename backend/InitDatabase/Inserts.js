const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const url = "mongodb://127.0.0.1:27017/";

//import items from "./Kayaks.json" assert { type: "json" };
const items = require('./Kayaks.json');

//Insert Batch
MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  var dbo = db.db("ProductCatalog");
  dbo.collection("products").insertMany(items, (err, res) => {
    if (err) throw err;
    console.log("Database Created and Populated");
    db.close();
  });
});

// //Querys
// MongoClient.connect(url, (err, db) => {
//   if (err) throw err;
//   var dbo = db.db("ProductCatalog").collection("products");
  
//   // 4. Find Highest Price
//   dbo.find({}).sort({price: -1}).limit(1).toArray((err, res) => {
//     if (err) throw err;
//     console.log("4. Find Highest Price");
//     console.log("Name: " + res[0].name + " Price: $" + res[0].price );
//   });

//   // 5. Earliest Start Date
//   dbo.find({}).sort({startingDateAvailable: 1}).limit(1).toArray((err, res) => {
//     if (err) throw err;
//     console.log("4. Earliest Start Date");
//     console.log("Name: " + res[0].name + " Start Date: " + res[0].startingDateAvailable );
//   });

//   // 7. Find Most Common Color
//   console.log(dbo.aggregate([
//     {$sortByCount: "$colour"}
//   ]))

  
//   .toArray((err, res) => {
//     if (err) throw err;
//     console.log("7. Find Most Common Color");
//     console.log("Name: " + res[0].name + " Color:" + res.color );
//   });
//});