const express = require('express');
const router = express.Router();
const orderSchema = require('../models/orders.js');
const bcrypt = require('bcrypt');
const path = require('path');
const ObjectID = require('mongodb').ObjectID;

//Create order
router.post('/createOrder', async (req, res) => {
  console.log(Date)
  try {
    //scramble card number
    let accountNo = "************" + req.body.accountNo.substring(12);
  

    //Save order to Db
    const order = new orderSchema({ 
      account: req.body.account,
      date: req.body.date,
      address: req.body.address,
      country: req.body.country,
      province: req.body.province,
      city: req.body.city,
      postal: req.body.postal,
      paymentType: req.body.paymentType,
      accountNo: accountNo,
      products: req.body.products,
      status: 'received',
      trackingNo: 'n/a'
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

//get order by account
router.get('/account/:accountID', async (req, res) => {
  if (ObjectID.isValid(req.params.accountID)){
    const orders = await orderSchema.find({ account: req.params.accountID});

    if (orders) {
      res.json(orders);
    } else {
      res.status(404).send();
    }
  }
});

//get single order
//get order by account
router.get('/order/:ID', async (req, res) => {
  if (ObjectID.isValid(req.params.ID)){
    const orders = await orderSchema.find({ _id: req.params.ID});
    console.log('inside')
    let x = orders[0];

    console.log(x);
    if (x) {
      const view = {
        id: x._i,
        account: x.account,
        date: x.date,
        address: x.address,
        country: x.country,
        province: x.province,
        city: x.city,
        postal: x.postal,
        paymentType: x.paymentType,
        accountNo: x.accountNo,
        products: x.products,
        status: x.status,
        trackingNo: x.statusNo
      }
      res.json(view);
    } else {
      res.status(404).send();
    }
  }
});

module.exports = router;