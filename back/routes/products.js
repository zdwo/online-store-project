const express = require('express');
const router = express.Router({ mergeParams: true });

const Collection = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const result = await Collection.find({});
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/electronics', async (req, res) => {
  try {
    const result = await Collection.find({category: "electronics"});
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/clothing', async (req, res) => {
  try {
    const result = await Collection.find({category: "clothing"});
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/jewelery', async (req, res) => {
  try {
    const result = await Collection.find({category: "jewelery"});
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Collection.findById(id);
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = new Collection({ ...req.body });
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
    await Collection.findByIdAndUpdate(id, data);
    const result = await Collection.findById(id);
    return res.send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Collection.findByIdAndDelete(id);
    return res.send(id);
  } catch {
    return res.status(500).send(err);
  }
});

module.exports = router;
