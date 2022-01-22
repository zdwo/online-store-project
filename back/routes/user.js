const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../models/User');

router.post('/signin', async (req, res) => {
    const {email, password} = req.body
    const user = await User.findUser(email, password)
    if (user) {
        req.session.user = user._id
        res.json({
            auth: true
        })
    } else {
        res.json({
            auth: false
        })
    }
})

router.post('/signup', async (req, res) => {
    const email = req.body.email
    const userUnique = await User.findOne({email})
    if (!userUnique) {
        const user = new User(req.body)
        req.session.user = user._id
        user.save().then((result) => {
            res.json({
                auth: true
            })
        }).catch((err) => {
            res.json({
                auth: false
            })
        })
    } else res.send("Email already exists.")
})

router.get('/signedin', (req, res) => {
    if (req.session.user) {
        return res.json({
            auth: true
        })
    }
    return res.json({
        auth: false
    })
})

router.get('/signout', (req, res) => {
    req.session.destroy()
    res.json({
        auth: false
    })
})

router.get('/', async (req, res) => {
    try {
      const result = await User.find({});
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await User.findById(id);
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        return res.send(id);
      } catch {
        return res.status(500).send(err);
      }
})

router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      await User.findByIdAndUpdate(id, data);
      const result = await User.findById(id);
      return res.send(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

module.exports = router;
