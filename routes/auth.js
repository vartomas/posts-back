const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('E-mail already exists')

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })
  try {
    await user.save()
    res.send({ id: user._id, name: user.name, email: user.email })
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('email or password is wrong')

  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('email or password is wrong')

  const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  // res.header('auth-token', token).send(token)
  res.send({ id: user._id, name: user.name, email: user.email, token: token })
})

module.exports = router
