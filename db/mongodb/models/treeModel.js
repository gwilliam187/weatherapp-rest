import mongoose from 'mongoose';

const treeSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    description : {
        type: String
    }
}, { versionKey: false });

export const Tree = mongoose.model('Tree', treeSchema);