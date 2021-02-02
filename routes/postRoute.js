const express = require('express')
const router = express.Router()

const Post = require('../models/PostModel')

router.get('/', async (req, res) => {
  try {
    const info = await Post.find()
    res.json(info)
  } catch (err) {
    res.json({ message: err })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const info = await Post.findOne({ _id: req.params.id })
    res.json(info)
  } catch (err) {
    res.json({ message: err })
  }
})

router.post('/', async (req, res) => {
  const info = new Post({
    title: req.body.title,
    body: req.body.body,
  })

  try {
    const savedInfo = await info.save().then(data => res.json(data))
    res.json(savedInfo)
  } catch (err) {
    res.json({ message: err })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const info = await Post.findOneAndRemove({ _id: req.params.id })
    res.json(info)
  } catch (err) {
    res.json({ message: err })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const infoToUpdate = await Post.updateOne(
      { _id: req.params.id },
      { $set: { body: req.body.body } }
    )
    res.json(infoToUpdate)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
