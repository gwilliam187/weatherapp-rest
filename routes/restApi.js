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
		const _id = req.body._id
		const data = new User({
			_id : _id
		})
		data.save((err, user)=>{
			if (err) {
				res.send(err);
			} else {
				//console.log(user._id+" added")
				const msg = err ? {message: 'failed', data: user} : {message: 'success', data: user}
				res.json(msg)
			}
		})
	});

router.route('/users/:userId')

	// Gets a specified user
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
			_id : req.body._id,
			cityName: req.body.cityName,
			isPublic: req.body.isPublic
		}
		const user = await User.findById(_id)
		console.log(user);
		let userCities = user.cities;
		userCities.push(city)
		User.update({_id: _id}, {
			$set : {
				cities: userCities
			}
		}, (err, response)=>{
			const msg = err ? {message: 'failed'} : {message: 'success'}
			res.json(msg)
		})
	})

	// Deletes a specified user
	.delete((req, res) => {
		User.findByIdAndDelete(req.params.userId, (err, user) => {
			if(err) {
				res.send(err);
			} else {	
				res.json({
					message: 'success',
					data: user
				});
			}
		});
	});

router.route('/userCities/:userId/:cityId')
	
	// Edits a specified city for a specified user
	.put((req, res) => {
		/* 
			Example req.body
			{ cityName: 'foo' }
		*/
		const userId = req.params.userId;
		const cityId = req.params.cityId;
		const cityName = req.body.cityName;

		User.updateOne(
			{ '_id': userId, 'cities._id': cityId },
			{ $set: { 'cities.$.cityName': cityName } },
			(err, rawResponse) => {
				if(err) {
					res.send(err);
				} else {
					res.json({
						message: 'success',
						data: rawResponse
					});
				}
			});
	})

	.delete((req, res) => {
		User.updateOne(
			{ _id: req.params.userId }, 
			{ $pull: { 'cities': { '_id': req.params.cityId } } },
			(err, rawResponse) => {
				if(err) {
					res.send(err);
				} else {
					res.json({
						message: 'success',
						data: rawResponse
					});
				}
			}
		)
	});

export default router;