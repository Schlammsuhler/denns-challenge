var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var fetch = require('node-fetch');
var _ = require('lodash')
var url = 'https://blockchain.info/ticker';
var headers = {
  "Content-Type": "application/json"
}

/* GET BTCUSD price */
router.get('/', async function (req, res, next) {
  fetch(url, {headers})
      .catch(err => {
        next(createError(404));
        console.error(err)
      })
      .then(res => res.json())
      .then(prices => {
        res.status(200).render('crypto-price', {prices, crypto: 'BTC', currency: 'USD'});
      });
});

module.exports = router;
