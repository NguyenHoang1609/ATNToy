var mongoose = require('mongoose');

var CarSchema = mongoose.Schema(
    {
        brand : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "brands"
        },
        name : String,
        price : Number,
        purchases : Number,
        image : String
    }
);

var carModel = mongoose.model("cars", CarSchema);

module.exports = carModel;