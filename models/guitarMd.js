var mongoose = require('mongoose');

var guitarSchema = mongoose.Schema(
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
var guitarModel = mongoose.model("guitars", guitarSchema);

module.exports = guitarModel;