import { Tree } from '../../db/mongodb/models/treeModel';

export const viewTrees = (req, res) => {
	Tree.find((err, docs) => {
		if(!err) {
			res.json({
				status: 'success',
				source: 'REST',
				action: 'View - Tree',
				message: docs
			});
		} else {
			res.json({
				status: 'failed',
				source: 'REST',
				action: 'View - Tree',
				message: err
			});
		}
	});
};

export const addTree = (req, res) => {
	/*
		Example req.body
		{ _id: 'apple tree', 
			description: 'an apple tree' }
	*/
	const newTree = new Tree({
		_id : req.body._id,
		description: req.body.description
	});
	newTree.save((err, doc) => {
		if(!err) {
			res.json({
				status: 'success',
				source: 'REST',
				action: 'Add - Tree', 
				message: doc
			});
		} else {
			res.json({
				status: 'failed',
				source: 'REST',
				action: 'Add - Tree',
				message: err
			});
		}
	});
};

export const editTree = (req, res) => {
	/*
		Example req.body
		{ _id: 'apple tree', 
			description: 'an apple tree' }
	*/
	const id = req.params.treeId;
	const update = { 'description': req.body.description };
	const options = { new: true };
	Tree.findByIdAndUpdate(id, update, options, (err, doc) => {
		if(!err) {
			res.json({
				status: 'success',
				source: 'REST',
				action: 'Edit - Tree',
				message: doc
			});
		} else {
			res.json({
				status: 'failed',
				source: 'REST',
				action: 'Edit - Tree',
				message: err
			});			
		}
	});
};

export const deleteTree = (req, res) => {
	const id = req.params.treeId;
	Tree.findByIdAndDelete(id, (err, doc) => {
		if(!err) {
			res.json({
				status: 'success',
				source: 'REST',
				action: 'Delete - Tree',
				message: doc
			});
		} else {	
			res.json({
				status: 'failed',
				source: 'REST',
				action: 'Delete - Tree',
				message: err
			});
		}
	});
};
