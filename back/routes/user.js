const express = require('express');
const router = express.Router({ mergeParams: true });
const fs = require('fs')

const User = require('../models/User');

router.post('/signin', async (req, res) => {
    const {email, password} = req.body
    const user = await User.findUser(email, password)
    if (user) {
        req.session.user = user._id
        fs.appendFile('./data/logs.txt', '| LOGIN' + ' | ' + email + ' | ' + new Date()  + ' |\n', err => { err ? console.log(err) : {}})
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

router.post('/signout', (req, res) => {
    const email = req.body.e
    fs.appendFile('./data/logs.txt', '| LOGOUT' + ' | ' + email + ' | ' + new Date()  + ' |\n', err => { err ? console.log(err) : {}})
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

router.patch('/:id', async (req, res) => {
  const update = req.body;
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, update, {new: true})
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (err) {
    res.send(err)
  }
});
  

module.exports = router;
