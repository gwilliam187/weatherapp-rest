import express from 'express';

import { City } from '../db/mongodb/models/cityModel'

import {getEmployees, insertEmployee, updateEmployee, deleteEmployee} from "../db/mysql/query";
import db from "../db/mysql/db";

const router = express.Router();

router.route('/cities')

	// Gets all cities
	.get((req, res)=>{
		City.find((err, cities)=>{
			if (err){
				res.error(err)
			} else{
				res.json(cities)
			}
		})
	})

	// Adds a city
	.post((req, res)=> {
		const newCity = new City({
			_id: req.body._id,
			region: req.body.region,
			country: req.body.country,
			location: req.body.location,
			countryCapital: req.body.countryCapital,
			callingCode: req.body.callingCode,
			currency: req.body.currency,
			countrySurfaceArea: req.body.countrySurfaceArea,
			governmentType: req.body.governmentType,
			averageMaleHeight: req.body.averageMaleHeight,
			nationalDish: req.body.nationalDish,
			population: req.body.population,
			lifeExpectancy: req.body.lifeExpectancy,
			yearlyAverageTemperature: req.body.yearlyAverageTemperature,
			countryYearOfIndependence: req.body.countryYearOfIndependence
		})

		newCity.save((err, city) => {
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
	})

	// Update one document
	.put((req, res)=>{
		City.findByIdAndUpdate(
			{
				_id: req.body._id
			},
			{
				$set: {
					region: req.body.region,
					country: req.body.country,
					location: req.body.location,
					countryCapital: req.body.countryCapital,
					callingCode: req.body.callingCode,
					currency: req.body.currency,
					countrySurfaceArea: req.body.countrySurfaceArea,
					governmentType: req.body.governmentType,
					averageMaleHeight: req.body.averageMaleHeight,
					nationalDish: req.body.nationalDish,
					population: req.body.population,
					lifeExpectancy: req.body.lifeExpectancy,
					yearlyAverageTemperature: req.body.yearlyAverageTemperature,
					countryYearOfIndependence: req.body.countryYearOfIndependence
				}
			},
			{
				new: true
			}, (err, doc)=>{
				if	(err) {
					res.json({
						status: 'failed',
						source: 'REST',
						action: 'Edit - City',
						message: err
					});
				} else {
					res.json({
						status: 'success',
						source: 'REST',
						action: 'Edit - City',
						message: doc
					});
				}
			})
	})

	.delete((req, res)=>{
		City.findByIdAndDelete({_id: req.query._id}, (err, doc)=>{
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
					message: doc
				});
			}
		})
	})

const host = '127.0.0.1'//'sgu.pdm-commsult.intranet'
const dbUser = 'root'
const dbPass = '!QAZxsw2'
const dbName = 'employees'

router.route('/employees')
	.get(async(req, res)=>{
		const conn = db(host, dbUser, dbPass, dbName )

		conn.connect()
		if (typeof req.query.limit!=='undefined') {
			res.json(await getEmployees(conn, req.query.limit))
		}else {
			res.json(await getEmployees(conn))
		}
		conn.end()
	})

	.post(async(req, res)=>{
		const conn = db(host, dbUser, dbPass, dbName )
		conn.connect()
		if (await insertEmployee(conn, req.body.emp_no, req.body.first_name, req.body.last_name, req.body.birth_date, req.body.gender, req.body.title, req.body.hire_date, req.body.dept_name)===true){
			res.json({status: 'success'})
		} else{
			res.json({status: 'failed'})
		}
		conn.end()
	})

	.put(async(req, res)=>{
		const conn = db(host, dbUser, dbPass, dbName )
		conn.connect()
		if (await updateEmployee(conn, req.body.emp_no, req.body.first_name, req.body.last_name, req.body.birth_date, req.body.gender, req.body.title, req.body.hire_date, req.body.dept_name)===true){
			res.json({status: 'success'})
		} else{
			res.json({status: 'failed'})
		}
		conn.end()
	})

	.delete(async(req, res)=>{
		const conn = db(host, dbUser, dbPass, dbName )
		conn.connect()
		if (await deleteEmployee(conn, req.query.emp_no)===true){
			res.json({status: 'success'})
		} else{
			res.json({status: 'failed'})
		}
		conn.end()
	})

export default router;