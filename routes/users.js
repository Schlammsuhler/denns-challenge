var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var _ = require('lodash')

var users = [
  {
    id: 1,
    name: 'Alfonso',
    age: 28,
    gender: 'm'
  },
  {
    id: 2,
    name: 'Berta',
    age: 19,
    gender: 'f'
  },
  {
    id: 3,
    name: 'Caesar',
    age: 35,
    gender: 'm'
  }
]

/* GET user */
router.get('/:userId', function(req, res, next) {
  console.log({ id: req.params.userId });

  var user = _.find(users, { id: _.toNumber(req.params.userId)})
  if (_.identity(user)) {
    res.status(200).render('profile', user);
  } else {
    next(createError(404));
  }
});

module.exports = router;
