const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const TokenTradePairSchema = new Schema({
    owner: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    bot: {
        type: Object,
        required: true
    },
    tokenA: {
        type: Object,
        required: true
    },
    tokenB: {
        type: Object,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Date,
        required: true
    },
});


mongoose.model('TokenTradePair', TokenTradePairSchema);