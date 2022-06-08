'use strict';
require('dotenv').config()
const mongoose = require('mongoose'),
  TokenTradePair = mongoose.model('TokenTradePair');

exports.addNew = function (req, res) {
  try {
    let newTokenTradePair = new TokenTradePair(req.body);
    newTokenTradePair.save(function (err, tokenTradePair) {
      if (err) {
        return res.status(400).send({ ok: false, error: { message: err, code: 400 } });
      } else {
        return res.status(200).send({ ok: true, result: tokenTradePair });
      }
    });
  } catch (err) {
    return res.status(500).send({ ok: false, error: { message: err, code: 500 } });
  }
};

exports.findByTokenTradePairOwner = function (req, res) {

  const owner = req.params.owner;
  if (owner === null || owner === undefined) {
    return res.status(400).send({ ok: false, error: { message: 'Please attack field TokenTradePairName or symbol', code: 400 } });
  }

  try {
    TokenTradePair.findOne({
      owner: owner
    }, function (err, tokenTradePair) {

      if (err) {
        return res.status(500).send({ ok: false, error: { message: err, code: 500 } });
      }

      if (!tokenTradePair) return res.status(400).send({ ok: false, message: `TokenTradePair ${tokenTradePair} is not exist` });

      return res.status(200).send({ ok: true, result: tokenTradePair });
    });
  } catch (err) {
    return res.status(500).send({ ok: false, error: { message: err, code: 500 } });
  }

};
