import express from 'express';

import { User } from '../db/mongodb/models/userModel';

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
		console.log('here')
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
				}
			}
		)
	});

export default router;