var express = require('express');
var router = express.Router();
const request = require('supertest');
const app = require('./app');
const machine = require('./Models/machine');
const Price = require('./Models/price');
const mongoose = require('mongoose');

describe('Get Endpoints', () => {
	it('should get price data', async () => {
		const res = await request(router)
			.get('http://localhost:5000/api/pricing-models');
		Price.find({}).then(response => {
			res.send(200, response = {'status': 200, 'return': 'Pricing List', 'Data': response});
		}).catch(error => {
			return error;
		});
	});
});

describe('post Endpoints', () => {
	it('should post price data', async () => {
		const res = await request(router)
			.post('http://localhost:5000/api/pricing-models');
		let name = 'gaurav';
		let pricing = [
			{
				price: '5',
				priceName: '5',
				value: '5'
			}
		];
		Price.create({ name: name, pricing: pricing }).then(response => {
			res.send(200, 'Price Add Successfully');
		}).catch(error => {
			return error;
		});
	});
});

describe('Get Endpoints', () => {
	it('should get indiviual price data', async () => {
		const res = await request(router)
			.get('http://localhost:5000/api/pricing-models/:_id');
		Price.findOne({ _id: '5e4beddd1451b47c40b47655' }).then(response => {
			if (Object.values(response).length) {
				res.send(200, response = {'status': 200, 'return': 'Individual Pricing Data', 'Data': response});
			} else {
				res.send(400, 'No Data Found');
			}
		}).catch(error => {
			return error;
		});
	});
});

describe('Update Endpoints', () => {
	it('should update indiviual price data', async () => {
		const res = await request(router)
			.put('http://localhost:5000/api/pricing-models/:_id');
		let pricing = [{
			priceName: '10 minutes',
			price: '50',
			value: '10'
		}];
		Price.findOneAndUpdate({ _id: '5e4bf57edab933112dda372e' }, { $set: { pricing: pricing } }, { new: true }).then(response => {
			res.send(200, response);
		}).catch(error => {
			return error;
		});
	});
});

describe('Get Endpoints', () => {
	it('should get price data', async () => {
		const res = await request(router)
			.get('http://localhost:5000/api/pricing-models/:_id/prices');
		Price.findOne({ _id: '5e4beddd1451b47c40b47655' }).then(response => {
			if (response) {
				res.send(200, response = {'status': 200, 'return': 'Pricing Data', 'Data': response.pricing});
			} else {
				res.send(400, 'No Data Found');
			}
		}).catch(error => {
			return error;
		});
	});
});

describe('post Endpoints', () => {
	it('should add new price', async () => {
		const res = await request(router)
			.get('http://localhost:5000/api/pricing-models/:_id/prices');
		let pricing = [{
			priceName: '100 minutes',
			price: '100',
			value: '100'
		}];
		Price.update({ _id: '5e4beddd1451b47c40b47655'}, { $push: { pricing: pricing } }, { new: true }).then(response => {
			res.send(200, 'New Price Added Successfully');
		}).catch(error => {
			return error;
		});
	});
});

describe('put Endpoints', () => {
	it('should delete price', async () => {
		const res = await request(router)
			.get('http://localhost:5000/api/pricing-models/:_id/prices/:priceId');
		Price.update({ _id: '5e4beddd1451b47c40b47655' },
			{ $pull: { pricing: { '_id': '5e4e5f40778f3434eb0cd5d7' } } }).then(response => {
			if (response) {
				res.send(200, 'Price Deleted Successfully');
			} else {
				res.send(400, 'No Data Found');
			}
		}).catch(error => {
			return error;
		});
	});
});

describe('Put Endpoints', () => {
	it('should delete price', async () => {
		const res = await request(router)
			.get('http://localhost:5000/api/machines/:_id/prices/:priceId');
		machine.findOneAndUpdate({ _id: '5e4d08ede9667f30b94af41a' }, {$set: {priceId: '5e4cc8306d090c50c1f0b436'}}, {new: true}).then(response => {
			if (response) {
				res.send(200, 'Price Added Successfully');
			} else {
				res.send(400, 'No Data Found');
			}
		}).catch(error => {
			return error;
		});
	});
});

describe('Get Endpoints', () => {
	it('should get machine data', async () => {
		const res = await request(router)
			.get('http://localhost:5000/api/machines/:_id/prices');
		machine.findOne({ _id: '5e4d0952e9667f30b94af41b' }).populate({
			path: 'priceId'
		}).then(response => {
			if (response) {
				res.send(200, response = {'status': 200, 'return': 'Machine Pricing Data', 'Data': response});
			} else {
				res.send(400, 'No Data Found');
			}
		}).catch(error => {
			return error;
		});
	});
});

describe('Post Endpoints', () => {
	it('should delete machine data', async () => {
		const res = await request(router)
			.get('http://localhost:5000/api/machines/:_id/prices/:priceId');
		machine.findOneAndUpdate({ _id: '5e4ce070e9667f30b94af419' },
			{ $unset: { priceId: '' } }, {new: true}).then(response => {
			if (response) {
				res.send(200, 'Price Remove Successfully');
			} else {
				res.send(400, 'No Data Found');
			}
		}).catch(error => {
			return error;
		});
	});
});
