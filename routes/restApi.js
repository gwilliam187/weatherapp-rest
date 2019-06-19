import express from 'express';

import { User } from '../db/mongodb/models/userModel';
import { Tree } from '../db/mongodb/models/treeModel';
import { City } from '../db/mongodb/models/cityModel'

const router = express.Router();

router.route('/cities')

	// Gets all cities
	.get((req, res)=>{
		City.find((err, cities)=>{
			if (err){
				res.error(err)
			} else{
				res.json(cities)
			}
		})
	})

	// Adds a city
	.post((req, res)=> {
		const newCity = new City({
			_id: req.body._id,
			region: req.body.region,
			country: req.body.country,
			location: req.body.location,
			callingCode: req.body.callingCode,
			currency: req.body.currency,
			countrySurfaceArea: req.body.countrySurfaceArea,
			governmentType: req.body.governmentType,
			averageMaleHeight: req.body.averageMaleHeight,
			nationalDish: req.body.nationalDish,
			population: req.body.population,
			lifeExpectancy: req.body.lifeExpectancy,
			yearlyAverageTemperature: req.body.yearlyAverageTemperature,
			countryYearOfIndependence: req.body.countryYearOfIndependence
		})

		newCity.save((err, city) => {
			if (err) {
				res.json({
					status: 'failed',
					source: 'REST',
					action: 'Add - City',
					message: err
				});
			} else {
				res.json({
					status: 'success',
					source: 'REST',
					action: 'Add - City',
					message: city
				});
			}
		})
	})

	// Update one document
	.put((req, res)=>{
		City.findByIdAndUpdate(
			{
				_id: req.body._id
			},
			{
				$set: {
					region: req.body.region,
					country: req.body.country,
					location: req.body.location,
					callingCode: req.body.callingCode,
					currency: req.body.currency,
					countrySurfaceArea: req.body.countrySurfaceArea,
					governmentType: req.body.governmentType,
					averageMaleHeight: req.body.averageMaleHeight,
					nationalDish: req.body.nationalDish,
					population: req.body.population,
					lifeExpectancy: req.body.lifeExpectancy,
					yearlyAverageTemperature: req.body.yearlyAverageTemperature,
					countryYearOfIndependence: req.body.countryYearOfIndependence
				}
			},
			{
				new: true
			}, (err, doc)=>{
				if	(err) {
					res.json({
						status: 'failed',
						source: 'REST',
						action: 'Edit - City',
						message: err
					});
				} else {
					res.json({
						status: 'success',
						source: 'REST',
						action: 'Edit - City',
						message: doc
					});
				}
			})
	})

	.delete((req, res)=>{
		City.findByIdAndDelete({_id: req.query._id}, (err, doc)=>{
			if(err) {
				res.json({
					status: 'failed',
					source: 'REST',
					action: 'Delete - City',
					message: err
				});
			} else {
				res.json({
					status: 'success',
					source: 'REST',
					action: 'Delete - City',
					message: doc
				});
			}
		})
	})

// router.route('/users')
//
// 	// Gets all users
// 	.get((req, res) => {
// 		User.find((err, users) => {
// 			if(err) {
// 				res.send(err);
// 			} else {
// 				res.json(users);
// 			}
// 		})
// 	})
//
// 	// Creates a user
// 	.post((req, res) => {
// 		/*
// 			Example req.body
// 			{ _id: 'sandiaga_uno' }
// 		*/
// 		const _id = req.body._id;
// 		const data = new User({
// 			_id : _id
// 		});
// 		data.save((err, user)=>{
// 			if (err) {
// 				res.json({
// 					status: 'failed',
// 					source: 'REST',
// 					action: 'Add - User',
// 					message: err
// 				});
// 			} else {
// 				res.json({
// 					status: 'success',
// 					source: 'REST',
// 					action: 'Add - User',
// 					message: user
// 				});
//
//
// router.route('/users/:userId')
//
// 	// Gets a specified user with their cities
// 	.get((req, res) => {
// 		User.findById(req.params.userId, (err, user) => {
// 			if(err) res.send(err);
//
// 			res.json(user);
// 		})
// 	})
//
// 	// Creates a city for a specified user
// 	.post( async(req, res) => {
// 		/**
// 		 *	Example req.body -> normal form
// 		 *  	_id, cityName, isPublic
// 		 */
// 		const _id = req.params.userId
// 		const city = {
// 			id : req.body.id,
// 			cityName: req.body.cityName,
// 			isPublic: req.body.isPublic
// 		}
//
// 		const user = await User.findById(_id)
// 		let userCities = user.cities
// 		let cityAlreadyExist = false
// 		userCities.forEach((existingCity)=>{
// 			if 	(existingCity.id===city.id)
// 				cityAlreadyExist = true
// 		})
// 		if (!cityAlreadyExist) {
// 			userCities.push(city)
//
// 			// User.update({_id: _id}, {
// 			// 	$set: {
// 			// 		cities: userCities
// 			// 	}
// 			// }, (err, response) => {
// 			// 	const msg = err ? {status: 'failed', message: err} : {status: 'success', message: response}
// 			// 	res.json(msg)
// 			// })
//
// 			const id = _id;
// 			const update = { $set: { cities: userCities } };
// 			const options = { new: true };
// 			User.findByIdAndUpdate(id, update, options, (err, doc) => {
// 				if(err) {
// 					res.json({
// 						status: 'failed',
// 						source: 'REST',
// 						action: 'Add - User City',
// 						message: err
// 					});
// 				} else {
// 					res.json({
// 						status: 'success',
// 						source: 'REST',
// 						action: 'Add - User City',
// 						message: doc.get('cities').find(city => city.id === req.body.id)
// 					});
// 				}
// 			});
// 		}else{
// 			res.json({
// 				status: 'failed',
// 				source: 'REST',
// 				action: 'Add - User City',
// 				message: 'City already exist'
// 			})
// 		}
//
// 		// User.updateOne(
// 		// 	{ _id: _id },
// 		// 	{ $addToSet: { cities: city } },
// 		// 	(err, rawResponse) => {
// 		// 		if(err) {
// 		// 			res.send(err);
// 		// 		} else {
// 		// 			res.json(rawResponse);
// 		// 		}
// 		// 	})
// 	})
//
// 	// Deletes a specified user
// 	.delete((req, res) => {
// 		User.findByIdAndDelete(req.params.userId, (err, user) => {
// 			if(err) {
// 				res.json({
// 					status: 'failed',
// 					source: 'REST',
// 					action: 'Delete - User',
// 					message: err
// 				});
// 			} else {
// 				res.json({
// 					status: 'success',
// 					source: 'REST',
// 					action: 'Delete - User',
// 					message: user
// 				});
// 			}
// 		});
// 	});
//
// router.route('/users/:userId/:cityId')
//
// 	// Edits a specified city for a specified user
// 	.put((req, res) => {
// 		/*
// 			Example req.body
// 			{
// 				_id: 'foo,id',
// 				cityName: 'foo',
// 				isPublic: true
// 			}
// 		*/
// 		const userId = req.params.userId;
// 		const cityId = req.params.cityId;
// 		const cityName = req.body.cityName;
//
// 		const query = { '_id': userId, 'cities.id': cityId };
// 		const update = { $set: { 'cities.$.cityName': cityName } };
// 		const options = { new: true };
//
// 		User.findOneAndUpdate(query, update, options, (err, doc) => {
// 			if(err) {
// 				res.json({
// 					status: 'failed',
// 					source: 'REST',
// 					action: 'Edit - User City',
// 					message: err
// 				});
// 			} else {
// 				res.json({
// 					status: 'success',
// 					source: 'REST',
// 					action: 'Edit - User City',
// 					message: doc.get('cities').find(city => city.id === cityId)
// 				});
// 			}
// 		});
// 	})
//
// 	// Deletes a specified city from a specified user
// 	.delete((req, res) => {
// 		User.updateOne(
// 			{ _id: req.params.userId },
// 			{ $pull: { 'cities': { 'id': req.params.cityId } } },
// 			(err, rawResponse) => {
// 				if(err) {
// 					res.send(err);
// 				} else {
// 					res.json({
// 						status: 'success',
// 						source: 'REST',
// 						action: 'Delete - User City',
// 						message: rawResponse
// 					});
// 				}n
// 			}
// 		)
// 	});
//
// router.route('/trees')
//
// 	// Gets all trees
// 	.get((req, res) => {
// 		Tree.find((err, trees) => {
// 			if(err) {
// 				res.send(err);
// 			} else {
// 				res.json(trees);
// 			}
// 		});
// 	})
//
// 	// Creates a tree
// 	.post((req, res) => {
// 		/*
// 			Example req.body
// 			{
// 				_id: 'apple tree',
// 				description: 'an apple tree'
// 			}
// 		*/
// 		const _id = req.body._id;
// 		const description = req.body.description;
// 		const data = new Tree({
// 			_id : _id,
// 			description: description
// 		});
// 		data.save((err, tree) => {
// 			if (err) {
// 				console.log(err);
//
// 				// Duplicate key error
// 				if(err.code === 11000) {
// 					const msg = {
// 						status: 'failed',
// 						source: 'REST',
// 						action: 'Add - Tree',
// 						message: 'Tree ID already exists'
// 					};
// 					res.json(msg);
// 				} else {
// 					const msg = {
// 						status: 'failed',
// 						source: 'REST',
// 						action: 'Add - Tree',
// 						message: err
// 					};
// 				}
// 			} else {
// 				res.json({
// 					status: 'success',
// 					source: 'REST',
// 					action: 'Add - Tree',
// 					message: tree
// 				});
// 			}
// 		});
// 	});
//
// router.route('/trees/:treeId')
//
// 	// Gets specified tree
// 	.get((req, res) => {
// 		Tree.findById(req.params.treeId, (err, tree) => {
// 			if(err) {
// 				res.send(err);
// 			} else {
// 				res.json(tree);
// 			}
// 		});
// 	})
//
// 	// Edits a specified tree
// 	.put((req, res) => {
// 		/*
// 			Example req.body
// 			{
// 				description: 'change me'
// 			}
// 		*/
// 		const id = req.params.treeId;
// 		const update = { $set: { 'description': req.body.description } };
// 		const options = { new: true };
// 		Tree.findByIdAndUpdate(id, update, options, (err, doc) => {
// 			if(err) {
// 				res.json({
// 					status: 'failed',
// 					source: 'REST',
// 					action: 'Edit - Tree',
// 					message: err
// 				});
// 			} else {
// 				res.json({
// 					status: 'success',
// 					source: 'REST',
// 					action: 'Edit - Tree',
// 					message: doc
// 				});
// 			}
// 		});
// 	})
//
// 	// Deletes specified tree
// 	.delete((req, res) => {
// 		Tree.findByIdAndDelete(req.params.treeId, (err, tree) => {
// 			if(err) {
// 				res.json({
// 					status: 'failed',
// 					source: 'REST',
// 					action: 'Delete - Tree',
// 					message: err
// 				});
// 			} else {
// 				res.json({
// 					status: 'success',
// 					source: 'REST',
// 					action: 'Delete - Tree',
// 					message: tree
// 				});
// 			}
// 		});
// 	});

export default router;