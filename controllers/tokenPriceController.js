'use strict';
require('dotenv').config()
const mongoose = require('mongoose'),
  TokenPrice = mongoose.model('TokenPrice');

exports.addNew = function (req, res) {
  try {
    let newTokenPrice = new TokenPrice(req.body);
    newTokenPrice.save(function (err, tokenPrice) {
      if (err) {
        return res.status(400).send({ ok: false, error: { message: err, code: 400 } });
      } else {
        return res.status(200).send({ ok: true, result: tokenPrice });
      }
    });
  } catch (err) {
    return res.status(500).send({ ok: false, error: { message: err, code: 500 } });
  }
};

exports.findBySymbol = function (req, res) {

  const symbol = req.params.symbol;
  if (symbol === null || symbol === undefined) {
    return res.status(400).send({ ok: false, error: { message: 'Please attack field symbol', code: 400 } });
  }

  try {
    TokenPrice.find({
      symbol: symbol
    }, function (err, tokenPrice) {

      if (err) {
        return res.status(500).send({ ok: false, error: { message: err, code: 500 } });
      }

      if (!tokenPrice) return res.status(400).send({ ok: false, message: `Token ${symbol} is not exist` });

      return res.status(200).send({ ok: true, result: tokenPrice });
    });
  } catch (err) {
    return res.status(500).send({ ok: false, error: { message: err, code: 500 } });
  }

};
