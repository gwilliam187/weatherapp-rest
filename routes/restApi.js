import express from 'express';

import { User } from '../db/mongodb/models/userModel';
import { Tree } from '../db/mongodb/models/treeModel';

const router = express.Router();

router.route('/users')

	// Gets all users
	.get((req, res) => {
		User.find((err, users) => {
			if(err) {
				res.send(err);
			} else {
				res.json(users);
			}
		})
	})

	// Creates a user
	.post((req, res) => {
		/*
			Example req.body
			{ _id: 'sandiaga_uno' }
		*/
		const _id = req.body._id
		const data = new User({
			_id : _id
		})
		data.save((err, user)=>{
			if (err) {
				res.send(err);
			} else {
				//console.log(user._id+" added")
				const msg = err ? {status: 'failed', message: err} : {status: 'success', message: user}
				res.json(msg)
			}
		})
	});

router.route('/users/:userId')

	// Gets a specified user with their cities
	.get((req, res) => {
		User.findById(req.params.userId, (err, user) => {
			if(err) res.send(err);

			res.json(user);
		})
	})

	// Creates a city for a specified user
	.post( async(req, res) => {
		/**
		 *	Example req.body -> normal form
		 *  	_id, cityName, isPublic
		 */
		const _id = req.params.userId
		const city = {
			id : req.body.id,
			cityName: req.body.cityName,
			isPublic: req.body.isPublic
		}

		const user = await User.findById(_id)
		console.log(user)
		let userCities = user.cities
		let cityAlreadyExist = false
		userCities.forEach((existingCity)=>{
			if 	(existingCity.id===city.id)
				cityAlreadyExist = true
		})
		if (!cityAlreadyExist) {
			userCities.push(city)
			User.update({_id: _id}, {
				$set: {
					cities: userCities
				}
			}, (err, response) => {
				const msg = err ? {status: 'failed', message: err} : {status: 'success', message: response}
				res.json(msg)
			})
		}else{
			res.json({
				status: "failed",
				message: "City already exist"
			})
		}

		// User.updateOne(
		// 	{ _id: _id },
		// 	{ $addToSet: { cities: city } },
		// 	(err, rawResponse) => {
		// 		if(err) {
		// 			res.send(err);
		// 		} else {
		// 			res.json(rawResponse);
		// 		}
		// 	})
	})

	// Deletes a specified user
	.delete((req, res) => {
		User.findByIdAndDelete(req.params.userId, (err, user) => {
			if(err) {
				res.send(err);
			} else {	
				res.json({
					status: 'success',
					message: user
				});
			}
		});
	});

router.route('/users/:userId/:cityId')
	
	// Edits a specified city for a specified user
	.put((req, res) => {
		/* 
			Example req.body
			{ 
				_id: 'foo,id',
				cityName: 'foo',
				isPublic: true 
			}
		*/
		const userId = req.params.userId;
		const cityId = req.params.cityId;
		const cityName = req.body.cityName;

		User.updateOne(
			{ '_id': userId, 'cities.id': cityId },
			{ $set: { 'cities.$.cityName': cityName } },
			(err, rawResponse) => {
				if(err) {
					res.send(err);
				} else {
					res.json({
						status: 'success',
						message: rawResponse
					});
				}
			});
	})

	// Deletes a specified city from a specified user
	.delete((req, res) => {
		User.updateOne(
			{ _id: req.params.userId }, 
			{ $pull: { 'cities': { 'id': req.params.cityId } } },
			(err, rawResponse) => {
				if(err) {
					res.send(err);
				} else {
					res.json({
						status: 'success',
						message: rawResponse
					});
				}n
			}
		)
	});

router.route('/trees')
	
	// Gets all trees
	.get((req, res) => {
		Tree.find((err, trees) => {
			if(err) {
				res.send(err);
			} else {
				res.json(trees);
			}
		});
	})

	// Creates a tree
	.post((req, res) => {
		/*
			Example req.body
			{ 
				_id: 'apple tree', 
				description: 'an apple tree'
			}
		*/
		const _id = req.body._id;
		const description = req.body.description;
		const data = new Tree({
			_id : _id,
			description: description
		});
		data.save((err, tree) => {
			if (err) {
				res.send(err);
			} else {
				//console.log(tree._id+" added")
				const msg = err ? {status: 'failed', message: err} : {status: 'success', message: tree}
				res.json(msg)
			}
		})
	});

router.route('/trees/:treeId')
	
	// Gets specified tree
	.get((req, res) => {
		Tree.findById(req.params.treeId, (err, tree) => {
			if(err) {
				res.send(err);
			} else {
				res.json(tree);
			}
		});
	})

	// Edits a specified tree
	.put((req, res) => {
		/* 
			Example req.body
			{ 
				description: 'change me' 
			}
		*/
		const id = "apple tree";
		const update = {
			$set: { 'description': req.body.description }
		};
		const options = {
			new: true
		};

		Tree.findByIdAndUpdate(id, update, options, (err, doc) => {
				if(err) {
					res.send(err);
				} else {
					res.json({
						status: 'success',
						message: doc
					});
				}
			});
	})

	// Deletes specified tree
	.delete((req, res) => {
		Tree.findByIdAndDelete(req.params.treeId, (err, tree) => {
			if(err) {
				res.send(err);
			} else {	
				res.json({
					status: 'success',
					message: tree
				});
			}
		});
	});

export default router;