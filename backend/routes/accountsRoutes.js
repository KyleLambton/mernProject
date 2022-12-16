const express = require('express');
const router = express.Router();
const accountSchema = require('../models/accounts.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


accounts = [
  {
    "userName": "test",
    "password": "$2b$10$bwFWVDRZw75fG.qmLMP3TecVIOuaN3Qw66p73SoPJKStcR30zcbpW"
  },
  {
    "userName": "test2",
    "password": "$2b$10$xObMY2RSdUkbpxGFfYRXcueiNX4GA1MGnJ.429zNtEQJaLnE6ERyK"
  }
];

let rfTokens = [];

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
    const account = new accountSchema({ userName: req.body.userName,
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
      const sig = { userName: userName };

      const accessToken = generateAccessToken(sig);
      const refreshToken = jwt.sign(sig, process.env.REFRESH_TOKEN_SECRET);
      rfTokens.push(refreshToken);


      res.send({ userFound: true, auth: true, accessToken: accessToken, refreshToken: refreshToken});
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

//Delete rfToken
router.delete('/logout', (req, res) => {
  rfTokens = rfTokens.filter(t => t !== req.body.token);
  res.sendStatus(204);
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