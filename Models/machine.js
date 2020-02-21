const mongoose = require('mongoose');
const MachineSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			trim: true
		},
		name: {
			type: String,
			trim: true
		},
		priceId: {
			type: mongoose.Schema.Types.ObjectId, ref: 'Price'
		}
	},
	{ minimize: false },
);
const machine = mongoose.model('Machine', MachineSchema);
module.exports = machine;
