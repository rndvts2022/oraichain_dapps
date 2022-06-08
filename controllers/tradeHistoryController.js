'use strict';
require('dotenv').config()
const moment = require('moment')
const mongoose = require('mongoose'),
  TradeHistory = mongoose.model('TradeHistory');


exports.findByTime = function (req, res) {

  try {
    TradeHistory.find({ //query today up to tonight
      created: {
        $gte: req.body.startTime,
        $lt: req.body.endTime
      }
    }, function (err, trades) {

      if (err) {
        return res.status(500).send({ ok: false, error: { message: err, code: 500 } });
      }

      if (!trades) return res.status(400).send({ ok: false, message: `Data empty` });

      return res.status(200).send({ ok: true, result: trades });
    });
  } catch (err) {
    return res.status(500).send({ ok: false, error: { message: err, code: 500 } });
  }

};

exports.findByTimeAndLimit = function (req, res) {
  if (req.body.time === null || req.body.time === undefined) {
    return res.status(400).send({ ok: false, error: { message: 'Please attack field time', code: 400 } });
  }

  if (req.body.limit === null || req.body.limit === undefined) {
    return res.status(400).send({ ok: false, error: { message: 'Please attack field limit', code: 400 } });
  }

  let time = req.body.time;
  let limit = req.body.limit

  let condition;
  if (req.body.isSellOrBuy == undefined || req.body.isSellOrBuy == null) {
    condition = {
      created: {
        $lt: time
      }
    }
  } else {
    condition = {
      created: {
        $lt: time
      },
      sellOrBuy: req.body.isSellOrBuy
    }
  }

  try {
    TradeHistory.find(condition, function (err, trades) {
      if (err) {
        return res.status(500).send({ ok: false, error: { message: err, code: 500 } });
      }

      if (!trades) return res.status(400).send({ ok: false, message: `Data empty` });

      return res.status(200).send({ ok: true, result: trades });
    }).sort({ _id: -1 }).limit(limit);

  } catch (err) {
    return res.status(500).send({ ok: false, error: { message: err, code: 500 } });

  }

};
