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

router.patch('/:id', async (req, res) => {
  const update = req.body;
  const id = req.params.id;
  try {
    const order = await Order.findByIdAndUpdate(id, update, {new: true})
    if (!order) {
      return res.status(404).send()
    }
    res.send(order)
  } catch (err) {
    res.send(err)
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
