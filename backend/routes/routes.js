const express = require('express');
const router = express.Router();
const ProductSchema = require('../models/products.js');
const ReviewSchema = require('../models/reviews.js');
const path = require('path');

//Get All
router.get('/', async (req, res) => {
  try {
    const items = await ProductSchema.find();
    res.json(items);

  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

//Get One
router.get('/id/:id', getProduct, (req, res) => {
  try {
    res.json(res.product);
  } catch (err) {
    res.status(404).json({message: err.message})
  }
});

//Create
router.post('/', async (req, res) => {
  const product = new ProductSchema({
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

//Delete
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Deleted Item'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

//Photo
router.get('/image/:dir/:id', async (req, res) => {
  let file = path.join(__dirname, '../images', req.params.dir, req.params.id);

  try {
    res.sendFile(file);
  } catch (err) {
    res.status(500).json({message: err});
  }
});

//middleware getProduct
async function getProduct(req, res, next) {
  let product;
  try {
    product = await ProductSchema.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product'});
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product
  next();
}

// Reviews
//Get All
router.get('/getreviews/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const items = await ReviewSchema.find({ itemId: productId });
    res.send(items);

  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.post('/addreview', async (req, res) => {
  const review = new ReviewSchema({
    itemId: req.body.itemId,
    userName: req.body.userName,
    rating: req.body.rating,
    comment: req.body.comment
  });
  
  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

module.exports = router;