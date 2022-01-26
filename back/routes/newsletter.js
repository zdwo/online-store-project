const express = require('express');
const router = express.Router({ mergeParams: true });

const Receiver = require('../models/NL-Receiver');

router.get('/', async (req, res) => {
  try {
    const result = await Receiver.find({});
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Receiver.findById(id);
        return res.json(result);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
  try {
    const data = new Receiver({ ...req.body });
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
    await Receiver.findByIdAndUpdate(id, data);
    const result = await Receiver.findById(id);
    return res.send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Receiver.findByIdAndDelete(id);
    return res.send(id);
  } catch {
    return res.status(500).send(err);
  }
});

module.exports = router;
