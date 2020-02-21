const mongoose = require('mongoose');
const PriceSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			trim: true
		},
		name: {
			type: String,
			trim: true
		},
		pricing: [
			{
				price: {
					type: String,
			        trim: true
				},
				priceName: {
					type: String,
					trim: true
				},
				value: {
					type: String,
			        trim: true
				}
			}
		]
	},
	{ minimize: false },
);
const Price = mongoose.model('Price', PriceSchema);
module.exports = Price;



