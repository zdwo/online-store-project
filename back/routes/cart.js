const express = require('express');
const { Types } = require('mongoose');
const router = express.Router({ mergeParams: true });

const Collection = require('../models/Cart');

router.get('/', async (req, res) => {
  try {
    const result = await Collection.find({});
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Collection.aggregate(
      [
        {$match: {_id: Types.ObjectId(id)}},
        {$unwind: "$products"},
        {$group: {_id: "$products", count: {$sum: 1}}}
      ]
    );
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
      await Collection.findByIdAndUpdate(id, {$push: {"products": data.products}});
      const result = await Collection.findById(id);
      return res.send(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  router.put('/:id/delete', async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      await Collection.findByIdAndUpdate(id, {$pull: {"products": data.products}});
      const result = await Collection.findById(id);
      return res.send(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  module.exports = router;
