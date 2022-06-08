const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const TokenPriceSchema = new Schema({
    symbol: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
        maxlength: 255
    },
    time: {
        type: Date,
        required: true
    }
});


mongoose.model('TokenPrice', TokenPriceSchema);
