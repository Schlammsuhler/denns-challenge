var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var mysql = require('mysql');
var _ = require('lodash')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'docker',
  password: 'docker',
  database: 'docker'
});

/* Add a db entry */
router.get('/', function (req, res, next) {
  let {userid, coins, status} = req.query;

  userid = _.toNumber(userid)
  if (!_.identity(userid) || !_.isInteger(userid) || userid < 0) {
    console.log(userid);
    return next(createError(400, 'Parameter userid is invalid'));
  }

  status = _.toNumber(status)
  if (status !== 0 && status !== 1) {
    return next(createError(400, 'Parameter status is invalid'));
  }

  coins = _.toNumber(coins)
  if (!_.isInteger(coins)) {
    return next(createError(400, 'Parameter coins is invalid'));
  }

  if (status === 1 && coins < 0) {
    return next(createError(400, 'Parameter coins can only be negative if the status is 0'));
  }

  try {
    connection.query('INSERT INTO posts (iduser, coin, status) VALUES (?,?,?)', [userid, coins, status], function (err, rows, fields) {
      if (err) throw err;
      if (rows.affectedRows === 1) {
        res.status(200).json({STATUS: 'OK'})
      } else {
        throw new Error('Nothing changed')
      }
    });
  } catch (err) {
    next(createError(500));
  }
});

module.exports = router;
