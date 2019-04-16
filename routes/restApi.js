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
			if(err) res.send(err);

			res.json({
				message: 'success',
				data: user
			});
		});
	});

router.route('/userCities/:userId/:cityId')
	
	// Edits a specified city for a specified user
	.put((req, res) => {

	})

	// Deletes a specified city from a specified user
	.delete(async(req, res) => {
		const _id = req.params.userId
		const cityArg = req.params.cityId
		cityArg.replace('+', ' ')
		const user = await User.findById(_id)
		console.log(user)
		let userCities = Array()
		user.cities.forEach((existingCity)=>{
			console.log(existingCity + " === "+ cityArg)
			if 	(existingCity._id!== cityArg) {
				userCities.push(existingCity)
			}
		})
		//userCities.push(city)
		User.updateMany({_id: _id}, {
			$set : {
				cities: userCities
			}
		}, (err)=>{
			const msg = err ? {message: 'failed'} : {message: 'success'}
			res.json(msg)
		})
	});

export default router;