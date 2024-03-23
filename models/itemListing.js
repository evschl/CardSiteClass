const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    active: {type: Boolean},
    name: {type: String, required: [true, 'Name of item is required']},
    image: {type: String, required: [true, 'Must include at least one picture of item']},
    condition: {type: String, required: [true, 'Item must adhere to some point on our grading scale. If you need help, refer to our guide.']},
    category: {type: String, required: [true, 'Please select which marketplace to display your item in']},
    subcategory: {type: String},
    price: {type: Number, required: [true, 'Please enter a buy price. Please understand that the actual sale price will include sales tax, and thus be higher.']},
    details: {type: String},
    totalOffers: {type: Number},
},
{timestamps: true}
);
//collection name is items in the database
module.exports = mongoose.model('Item', itemSchema);