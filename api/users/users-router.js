const express = require('express')
const router = express.Router()
const userModel = require('./users-model')

router.get('/', (req, res, next) => {
    userModel.find()
    .then(users => {
        res.status(200).json(users)
    })
})

router.post('/', (req, res, next) => {
    userModel.add(req.body)
    .then(newUser => {
        res.status(201).json(newUser)
    }).catch(next)
})



module.exports = router