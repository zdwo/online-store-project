const express = require('express');
const router = express.Router({ mergeParams: true });

const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const result = await Product.find({});
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/electronics', async (req, res) => {
  try {
    const result = await Product.find({category: "electronics"});
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/clothing', async (req, res) => {
  try {
    const result = await Product.find({category: "clothing"});
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/jewelery', async (req, res) => {
  try {
    const result = await Product.find({category: "jewelery"});
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findById(id);
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = new Product({ ...req.body });
    const result = await data.save();
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Product.findByIdAndUpdate(id, data);
    const result = await Product.findById(id);
    return res.send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    return res.send(id);
  } catch {
    return res.status(500).send(err);
  }
});

module.exports = router;
