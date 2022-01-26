const express = require('express');
const router = express.Router({ mergeParams: true });

const Order = require('../models/Order');

router.get('/', async (req, res) => {
  try {
    const result = await Order.find({});
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Order.findById(id);
        return res.json(result);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
  try {
    const data = new Order({ ...req.body });
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
    await Order.findByIdAndUpdate(id, data);
    const result = await Order.findById(id);
    return res.send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Order.findByIdAndDelete(id);
    return res.send(id);
  } catch {
    return res.status(500).send(err);
  }
});

module.exports = router;
