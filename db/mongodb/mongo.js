import mongoose from 'mongoose';

const uri = '127.0.0.1';
const port = '27017';
const user = 'admin';
const pass = 'password';
const dbName = 'weatherapp';

mongoose.connect(`mongodb://${ user }:${ pass }@${ uri }:${ port }/${ dbName }?authSource=admin`, 
		{ useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('Connected to MongoDB') })