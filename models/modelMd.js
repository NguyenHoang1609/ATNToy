var mongoose = require('mongoose');

var modelSchema = mongoose.Schema(
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

var modelModel = mongoose.model("models", modelSchema);

module.exports = modelModel;