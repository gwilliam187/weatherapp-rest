import { City } from '../../db/mongodb/models/cityModel';

export const viewCities = (req, res) => {
	City.find((err, docs) => {
		if(!err) {
			res.json({
				status: 'success',
				source: 'REST',
				action: 'View - City',
				message: docs
			});
		} else {
			res.json({
				status: 'success',
				source: 'REST',
				action: 'View - City',
				message: err
			});
		}
	});
};

export const addCity = (req, res) => {
	/*
		Example req.body
		{ _id: 'bandung,id',
			cityName: 'Bandung lautan api',
			isPublic: true,
			owners: ['jokowi'] }
	*/
	const newCity = new City({
		_id : req.body._id,
		cityName: req.body.cityName,
		isPublic: req.body.isPublic,
		owners: req.body.owners
	});
	newCity.save((err, doc)=>{
		if (!err) {
			res.json({
				status: 'success',
				source: 'REST',
				action: 'Add - City',
				message: doc
			});
		} else {
			res.json({
				status: 'failed',
				source: 'REST',
				action: 'Add - City',
				message: err
			});
		}
	})
};

export const editCity = (req, res) => {
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
};

export const deleteCity = (req, res) => {
	const id = req.params.cityId;
	City.findByIdAndDelete(id, (err, doc) => {
		if(!err) {
			res.json({
				status: 'success',
				source: 'REST',
				action: 'Delete - City',
				message: doc
			});
		} else {	
			res.json({
				status: 'failed',
				source: 'REST',
				action: 'Delete - City',
				message: err
			});
		}
	});
};