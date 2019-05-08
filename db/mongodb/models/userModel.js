import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: {
        type: String
    }
}, { versionKey: false });

export const User = mongoose.model('User', userSchema);