import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    _id: false,
    id : {
        type: String,
        required: true
    },
    cityName: {
        type: String
    },
    isPublic: {
        type: Boolean
    }
})

const userSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    cities : {
        type: [citySchema],
        default: []
    }
}, { versionKey: false });

export const User = mongoose.model('User', userSchema);