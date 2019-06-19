import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	region: {
		type: String
	},
	country:{
		type: String
	},
	location:{
		type: String
	},
	countryCapital:{
		type: String
	},
	callingCode:{
		type: String
	},
	currency:{
		type: String
	},
	countrySurfaceArea:{
		type: Number
	},
	governmentType:{
		type: String
	},
	averageMaleHeight:{
		type: String
	},
	nationalDish:{
		type: String
	},
	population:{
		type: String
	},
	lifeExpectancy:{
		type: String
	},
	yearlyAverageTemperature:{
		type: String
	},
	countryYearOfIndependence:{
		type: String
	}
})

export const City = mongoose.model("City", citySchema)