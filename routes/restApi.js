import express from 'express';

import { User } from '../db/mongodb/models/userModel';

const router = express.Router();

router.route('/users')

	// Gets all users
	.get((req, res) => {
		User.find((err, users) => {
			if(err) res.send(err);

			res.json(users);
		})
	})

	// Creates a user
	.post((req, res) => {
		const _id = req.body._id
		const data = new User({
			_id : _id
		})
		data.save((err, user)=>{
			if (err) return console.log(err)

			//console.log(user._id+" added")
			const msg = err ? {message: 'failed'} : {message: 'success'}
			res.json(msg)
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
		const _id = req.params.userId
		//console.log(req.body.citiesJSON)
		const city = JSON.parse(req.body.cityJSON); // API caller passes cities in form of JSON array
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
			{ 
				'_id': userId, 
				'cities._id': cityId
			},
			{ $set: 
				{ 
					'cities.$.cityName': cityName 
				}
			},
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

	// Deletes a specified city from a specified user
	.delete((req, res) => {
		User.update(
			{ _id: req.params.userId }, 
			{ $pullAll: { _id: req.params.cityId } }
		)
	});

export default router;