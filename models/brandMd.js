var mongoose = require('mongoose');

var BrandSchema = mongoose.Schema(
    {
        name : String
    }
);

var brandModel = mongoose.model("brands", BrandSchema);

module.exports = brandModel;