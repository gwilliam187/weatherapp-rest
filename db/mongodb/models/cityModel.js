import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    _id : String,
    cityName: String,
    isPublic: Boolean,
    owners: [String]
}, { versionKey: false });


export const City = mongoose.model('City', citySchema);