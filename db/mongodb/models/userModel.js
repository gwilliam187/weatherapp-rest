import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    _id : {
        type: String
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
});

export const User = mongoose.model('User', userSchema);