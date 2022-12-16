const express = require('express');
const router = express.Router();
const UserSchema = require('../models/users.js');

//Get All
router.get('/', async (req, res) => {
  try {
    const items = await UserSchema.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

//Get One
router.get('/:id', getUser, (req, res) => {
  try {
    res.json(res.user);
  } catch (err) {
    res.status(404).json({message: err.message})
  }
});

//Create
router.post('/', async (req, res) => {
  const user = new UserSchema({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    DoB: req.body.DoB,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    postalCode: req.body.postalCode,
    country: req.body.country,
    phone: req.body.phone,
    email: req.body.email,
    notes: req.body.notes
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

//Put (Replace)
router.put('/:id', getUser, async (req, res) => {
  res.user.lastName = req.body.lastName;
  res.user.firstName = req.body.firstName;
  res.user.DoB = req.body.DoB;
  res.user.address1 = req.body.address1;
  res.user.address2 = req.body.address2;
  res.user.city = req.body.city;
  res.user.postalCode = req.body.postalCode;
  res.user.country = req.body.country;
  res.user.phone = req.body.phone;
  res.user.email = req.body.email;
  res.user.notes = req.body.notes;

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

//Delete
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted Item'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

//middleware GetUser
async function getUser(req, res, next) {
  let user
  try {
    user = await UserSchema.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user'});
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user
  next();
}

module.exports = router;