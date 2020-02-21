var express = require('express');
var router = express.Router();
const machine = require('../Models/machine');
const Price = require('../Models/price');
const mongoose = require('mongoose');

module.exports = function (router) {
	// For get price
	router.get('/pricing-models', function (req, res, next) {
		Price.find({}).then(response => {
			res.send(200, response = {'status': 200, 'return': 'Pricing List', 'Data': response});
			return next();
		}).catch(error => {
			return error;
		});
	});

	// For Add Price
	router.post('/pricing-models', function (req, res, next) {
		let name = req.body.name;
		Price.create({ name: name, pricing: req.body.pricing }).then(response => {
			res.send(200, 'Price Add Successfully');
			return next();
		}).catch(error => {
			return error;
		});
	});

	// For get Indiviual Price
	router.get('/pricing-models/:_id', function (req, res, next) {
		Price.findOne({ _id: req.params }).then(response => {
			if (Object.values(response).length) {
				res.send(200, response = {'status': 200, 'return': 'Individual Pricing Data', 'Data': response});
			} else {
				res.send(400, 'No Data Found');
			}
			return next();
		}).catch(error => {
			return error;
		});
	});

	// For update Indiviual Price
	router.put('/pricing-models/:_id', function (req, res, next) {
		Price.findOneAndUpdate({ _id: req.params }, { $set: { pricing: req.body.pricing } }, { new: true }).then(response => {
			res.send(200, response);
			return next();
		}).catch(error => {
			return error;
		});
	});

	// For get Price
	router.get('/pricing-models/:_id/prices', function (req, res, next) {
		Price.findOne({ _id: req.params }).then(response => {
			if (response) {
				res.send(200, response = {'status': 200, 'return': 'Pricing Data', 'Data': response.pricing});
			} else {
				res.send(400, 'No Data Found');
			}
			return next();
		}).catch(error => {
			return error;
		});
	});

	// For Add New Price
	router.post('/pricing-models/:_id/prices', function (req, res, next) {
		Price.update({ _id: req.params._id }, { $push: { pricing: req.body.pricing } }, { new: true }).then(response => {
			res.send(200, 'New Price Added Successfully');
			return next();
		}).catch(error => {
			return error;
		});
	});

	// For Delete Price
	router.put('/pricing-models/:_id/prices/:priceId', function (req, res, next) {
		Price.update({ _id: req.params._id },
			{ $pull: { pricing: { '_id': req.params.priceId } } }).then(response => {
			if (response) {
				res.send(200, 'Price Deleted Successfully');
			} else {
				res.send(400, 'No Data Found');
			}
			return next();
		}).catch(error => {
			return error;
		});
	});

	// For Update pricing model
	router.put('/machines/:_id/prices/:priceId', function (req, res, next) {
		machine.findOneAndUpdate({ _id: req.params._id }, {$set: {priceId: req.params.priceId}}, {new: true}).then(response => {
			if (response) {
				res.send(200, 'Price Added Successfully');
			} else {
				res.send(400, 'No Data Found');
			}
			return next();
		}).catch(error => {
			return error;
		});
	});

	// For get Price from machine
	router.get('/machines/:_id/prices', function (req, res, next) {
		machine.findOne({ _id: req.params }).populate({
			path: 'priceId'
		}).then(response => {
			if (response) {
				res.send(200, response = {'status': 200, 'return': 'Machine Pricing Data', 'Data': response});
			} else {
				res.send(400, 'No Data Found');
			}
			return next();
		}).catch(error => {
			return error;
		});
	});

	// For Delete Price from machine
	router.post('/machines/:_id/prices/:priceId', function (req, res, next) {
		machine.findOneAndUpdate({ _id: req.params._id },
			{ $unset: { priceId: '' } }, {new: true}).then(response => {
			if (response) {
				res.send(200, 'Price Remove Successfully');
			} else {
				res.send(400, 'No Data Found');
			}
			return next();
		}).catch(error => {
			return error;
		});
	});
};

