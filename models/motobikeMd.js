var mongoose = require('mongoose');

var MotobikeSchema = mongoose.Schema(
    {
        brand : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "brands"
        },
        name : String,
        price : Number,
        purchases : Number,
        image : String, 
        date : String,
        category : String
    }
);

var motobikeModel = mongoose.model("motobikes", MotobikeSchema);

module.exports = motobikeModel;