var mongoose = require('mongoose');

var dollSchema = mongoose.Schema(
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

var dollModel = mongoose.model("dolls", dollSchema);

module.exports = dollModel;