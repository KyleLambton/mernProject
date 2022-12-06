const express = require('express');
const router = express.Router();
const Product = require('../models/Kayaks.js');
const path = require('path');

//Get Image
router.get('/images/:filename', (req, res) => {
  var file = path.join(__dirname, '../../images', req.params.filename);

  try {
    res.sendFile(file);
    //res.send({message: file})
  } catch (err) {
    res.status(500).json({message: err});
  }
});

//Get All
router.get('/', async (req, res) => {
  try {
    const items = await Product.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

//Get List of IDs
router.get('/identifiers', async (req, res) => {
  try {
    const items = await Product.find().select({ id: 1});
    res.json(items);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

//Get One
router.get('/:id', getProduct, (req, res) => {
  try {
    res.json(res.product);
  } catch (err) {
    res.status(404).json({message: err.message})
  }
});

//Get Field
router.get('/:id/:field', getProduct, (req, res) => {
  const x = req.params.field;
    const item = eval('res.product.' + x)
    res.json(item);
});

//Create
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    colour: req.body.colour,
    manufacturer: req.body.manufacturer,
    startingDateAvailable: req.body.startingDateAvailable,
    endingDateAvailable: req.body.endingDateAvailable,
    image: req.body.image,
    description: req.body.description,
    seats: req.body.seats,
    weight: req.body.weight,
    length: req.body.length
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

//Put (Replace)
router.put('/:id', getProduct, async (req, res) => {
  res.product.name = req.body.name;
  res.product.price = req.body.price;
  res.product.colour = req.body.colour;
  res.product.manufacturer = req.body.manufacturer;
  res.product.startingDateAvailable = req.body.startingDateAvailable;
  res.product.endingDateAvailable = req.body.endingDateAvailable;
  res.product.image = req.body.image;
  res.product.description = req.body.description;
  res.product.seats = req.body.seats;
  res.product.weight = req.body.weight;
  res.product.length = req.body.length;

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

//Patch
router.patch('/:id/:field', getProduct, async (req, res) => {
  let x = req.params.field;
  eval('res.product.'+ x + ' = req.body.'+ x);

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

//Delete
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Deleted Item'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

//middleware GetProduct
async function getProduct(req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product'});
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product
  next();
}

module.exports = router;