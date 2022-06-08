const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const TradeHistorySchema = new Schema({
    /* 0: sell 1:buy */
    sellOrBuy: {
        type: Boolean,
        required: true
    },
    info: {
        type: Object,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('TradeHistory', TradeHistorySchema);