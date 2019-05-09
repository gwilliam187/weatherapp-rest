import { User } from '../../db/mongodb/models/userModel';

export const viewUsers = (req, res) => {
	User.find((err, docs) => {
		if(!err) {
			res.json({
				status: 'success',
				source: 'REST',
				action: 'View - User',
				message: docs
			});
		} else {
			res.json({
				status: 'failed',
				source: 'REST',
				action: 'View - User',
				message: err
			});
		}
	});
};

export const addUser = (req, res) => {
	/* 
		Example req.body
		{ _id: 'sandiaga_uno' } 
	*/
	const newUser = new User({
		_id : req.body._id
	});
	newUser.save((err, docs)=>{
		if(!err) {
			res.json({
				status: 'success',
				source: 'REST',
				action: 'Add - User',
				message: docs
			});
		} else {
			res.json({
				status: 'failed',
				source: 'REST',
				action: 'Add - User',
				message: err
			});
		}
	});
};

export const deleteUser = (req, res) => {
	const id = req.params.userId;
	User.findByIdAndDelete(id, (err, docs) => {
		if(!err) {
			res.json({
				status: 'success',
				source: 'REST',
				action: 'Delete - User',
				message: docs
			});
		} else {	
			res.json({
				status: 'failed',
				source: 'REST',
				action: 'Delete - User',
				message: err
			});
		}
	});
};