import express from 'express';

import { User } from '../db/mongodb/models/userModel';
import { City } from '../db/mongodb/models/cityModel';
import { Tree } from '../db/mongodb/models/treeModel';

const router = express.Router();

router.route('/users')

	// Gets all users
	.get((req, res) => {
		User.find((err, users) => {
			if(err) {
				res.json({
					status: 'failed',
					source: 'REST',
					action: 'View - User',
					message: err
				});
			} else {
				res.json({
					status: 'success',
					source: 'REST',
					action: 'View - User',
					message: users
				});
			}
		})
	})

	// Creates a user
	.post((req, res) => {
		/*
			Example req.body
			{ _id: 'sandiaga_uno' }
		*/
		const _id = req.body._id;
		const data = new User({
			_id : _id
		});
		data.save((err, user)=>{
			if (err) {
				res.json({
					status: 'failed',
					source: 'REST',
					action: 'Add - User',
					message: err
				});
			} else {
				res.json({
					status: 'success',
					source: 'REST',
					action: 'Add - User',
					message: user
				});
			}
		})
	});

router.route('/users/:userId')
	.delete((req, res) => {
		User.findByIdAndDelete(req.params.userId, (err, user) => {
			if(err) {
				res.json({
					status: 'failed',
					source: 'REST',
					action: 'Delete - User',
					message: err
				});
			} else {	
				res.json({
					status: 'success',
					source: 'REST',
					action: 'Delete - User',
					message: user
				});
			}
		});
	});

router.route('/cities')

	// Gets all cities
	.get((req, res) => {
		City.find((err, cities) => {
			if(err) {
				res.json({
					status: 'failed',
					source: 'REST',
					action: 'View - City',
					message: err
				});
			} else {
				res.json({
					status: 'success',
					source: 'REST',
					action: 'View - City',
					message: cities
				});
			}
		});
	})

	// Creates a ity
	.post((req, res) => {
		/*
			Example req.body
			{ _id: 'bandung,id',
				cityName: 'Bandung lautan api',
				isPublic: true,
				owners: ['jokowi'] }
		*/
		const data = new City({
			_id : req.body._id,
			cityName: req.body.cityName,
			isPublic: req.body.isPublic,
			owners: req.body.owners
		});
		data.save((err, city)=>{
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
	});

router.route('/cities/:cityId')
	.put((req, res) => {
		/*
			Example req.body
			{ _id: 'bandung,id',
				cityName: 'Bandung lautan api',
				isPublic: true,
				owners: ['jokowi'] }
		*/
		const id = req.params.cityId;
		const update = {
			cityName: req.body.cityName,
			isPublic: req.body.isPublic,
			owners: req.body.owners
		};
		const options = { new: true };
		City.findByIdAndUpdate(id, update, options, (err, doc) => {
			if(!err) {
				res.json({
					status: 'success',
					source: 'REST',
					action: 'Update - City',
					message: doc
				});
			} else {
				res.json({
					status: 'failed',
					source: 'REST',
					action: 'Update - City',
					message: err
				});
			}
		});
	})

	.delete((req, res) => {
		City.findByIdAndDelete(req.params.cityId, (err, city) => {
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
					message: city
				});
			}
		});
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
				console.log(err);

				// Duplicate key error
				if(err.code === 11000) {
					const msg = {
						status: 'failed',
						source: 'REST',
						action: 'Add - Tree',
						message: 'Tree ID already exists'
					};
					res.json(msg);
				} else {
					const msg = {
						status: 'failed',
						source: 'REST',
						action: 'Add - Tree',
						message: err
					};
				}
			} else {
				res.json({
					status: 'success',
					source: 'REST',
					action: 'Add - Tree', 
					message: tree
				});
			}
		});
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
		const id = req.params.treeId;
		const update = { $set: { 'description': req.body.description } };
		const options = { new: true };
		Tree.findByIdAndUpdate(id, update, options, (err, doc) => {
			if(err) {
				res.json({
					status: 'failed',
					source: 'REST',
					action: 'Edit - Tree',
					message: err
				});
			} else {
				res.json({
					status: 'success',
					source: 'REST',
					action: 'Edit - Tree',
					message: doc
				});
			}
		});
	})

	// Deletes specified tree
	.delete((req, res) => {
		Tree.findByIdAndDelete(req.params.treeId, (err, tree) => {
			if(err) {
				res.json({
					status: 'failed',
					source: 'REST',
					action: 'Delete - Tree',
					message: err
				});
			} else {	
				res.json({
					status: 'success',
					source: 'REST',
					action: 'Delete - Tree',
					message: tree
				});
			}
		});
	});

export default router;