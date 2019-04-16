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
	.post((req, res) => {

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
	.delete((req, res) => {

	});

export default router;