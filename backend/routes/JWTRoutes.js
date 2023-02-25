const express = require('express');
const router = express.Router();
const accountSchema = require('../models/accounts.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Get account with jwt
router.get('/loggedin', authenticateToken, async (req, res) => {
  //find user in db
  const account = await accountSchema.find({ userName: req.account.userName });

  console.log(account[0])
  res.json(account[0]);
});


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
      dob: req.body.dob,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      userName: req.body.userName,
      password: hashedPass })

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
      // Create JWT
      const userName = req.body.userName;
      // const sig = { userName: userName };

      // const accessToken = generateAccessToken(sig);
      // const refreshToken = jwt.sign(sig, process.env.REFRESH_TOKEN_SECRET);
      // rfTokens.push(refreshToken);

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


//refreshToken
router.post('/token', (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);
  if (!rfTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, account) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ userName: account.userName});
    res.json({ accessToken: accessToken});
  });
});


///////////////////// MiddleWare ////////////////////

//Get Account with Token 
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
    if (err) return res.sendStatus(403);

    req.account = account;
    next();
  })
}

// Generate Token
function generateAccessToken(sig) {
  return jwt.sign(sig, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5s' });
}

module.exports = router;