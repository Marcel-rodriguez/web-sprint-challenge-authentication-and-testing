// do not make changes to this file
const router = require('express').Router();
const jokesModel = require('./jokes-model')

router.get('/', (req, res) => {
  jokesModel.find()
  .then(jokes => {
    res.status(200).json(jokes)
  })
});

module.exports = router;
