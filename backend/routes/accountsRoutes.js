const express = require('express');
const router = express.Router();
const accountSchema = require('../models/accounts.js');
const bcrypt = require('bcrypt');
const path = require('path');
const ObjectID = require('mongodb').ObjectID;

//const multer = require('multer');
//const GridFS = require('multer-gridfs-storage');

//Create account
router.post('/createAccount', async (req, res) => {
  try {
    //Encrypting password
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    //Save account to Db
    const account = new accountSchema({ 
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userImage: "userImage.png",
      dob: req.body.dob,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      userName: req.body.userName,
      password: hashedPass });

    const newAccount = await account.save();
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

//Login
router.post('/login', async (req, res) => {
  
  //find user in db
  const account = await accountSchema.find({ userName: req.body.userName });
  
  if (account[0] == undefined) {
    return res.send({ userFound: false});
  }

  //check if password matches
  try {
    if (await bcrypt.compare(req.body.password, account[0].password)) {
      //store session
      req.session.accountID = account[0]._id;
      req.session.name = account[0].userName;

      res.send({ userFound: true, auth: true, sessionThing: req.session});
    } else {
      res.send({ userFound: true, auth: false});
    }
  } catch {
    res.status(500).send('Error with pass encryption');
  }
});

//AdminLogin
router.post('/adminlogin', async (req, res) => {
  
  //find user in db
  const account = await accountSchema.find({ userName: req.body.userName });
  
  if (account[0] == undefined) {
    return res.send({ userFound: false});
  }

  //check if password matches
  try {
    if (await bcrypt.compare(req.body.password, account[0].password)) {
      //store session
      req.session.accountID = account[0]._id;
      req.session.name = account[0].userName;

      if (account[0].role != 'Admin') {
        return res.send({ isAdmin: false });
      }

      res.send({ userFound: true, auth: true });
    } else {
      res.send({ userFound: true, auth: false});
    }
  } catch {
    res.status(500).send('Error with pass encryption');
  }
});

//Get Role
router.get('/getrole', async (req, res) => {
  try {
    let account = await accountSchema.find({ _id: req.session.accountID });

    let role = account[0].role;

    res.send({ role: role });
  } catch {
    res.status(500).send('Error with getting Role');
  }
});

//Log out
router.get('/logout', async (req, res) => {
  req.session = null;
  
  res.send();
});

//Check db to see if name exists
router.post('/userCheck', async (req, res) => {
  const account = await accountSchema.find({ userName: req.body.userName });

  if (account[0] != undefined) {
    //Name is in use
    res.json({ nameFree: false });
  } else {
    //Name free
    res.json({ nameFree: true });
  }
});

//Check Auth
router.get('/auth', async (req, res) => {
  const account = await accountSchema.find({ _id: req.session.accountID });

  if (account[0]) {
    res.json(account[0].userName);
  } else {
    res.status(404).send();
  }
});

//Get Account
router.get('/getAccount', async (req, res) => {
  const account = await accountSchema.find({ _id: req.session.accountID });
  let x = account[0];

  if (account[0]) {
    const view = {
      id: x._id,
      userName: x.userName,
      firstName: x.firstName,
      lastName: x.lastName,
      userImage: x.userImage,
      dob: x.dob,
      email: x.email,
      address: x.address,
      city: x.city,
      country: x.country,
      province: "Ontario",
      postal: "N9L4G6",
      role: x.role
    }
    console.log(view)
    res.json(view);
  } else {
    res.status(404).send();
  }
});

//Get Account Photo by ID
router.get('/getUserImage/:id', async (req, res) => {
  if (ObjectID.isValid(req.params.id)) {
    const account = await accountSchema.find({ _id: req.params.id }, {userImage: 1});
    let x = account[0];

    console.log(x);
    if (account[0]) {
      let file = path.join(__dirname, '../images/acc', x.userImage);

      res.sendFile(file);
    } else {
      res.status(404).send();
    }
  } else {
    res.send({ message: "Not a valid ID" });
  }
});

module.exports = router;